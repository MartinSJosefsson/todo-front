import React, { useState, useEffect, useRef } from 'react';
import './Task.css';
import Sidebar from './Sidebar';
import Header from "./Header.jsx";
import { getAllTodosApi, createTodoApi, updateTodoApi, deleteTodoApi } from '../services/taskService';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [person, setPerson] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getAllTodosApi();
            setTasks(data || []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setDueDate("");
        setPerson("");
        setAttachments([]);
        setEditTaskId(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleFileChange = (e) => {
        const chosen = Array.from(e.target.files || []);
        if (chosen.length === 0) return;

        setAttachments(prev => {
            const next = [...prev];
            chosen.forEach(f => {
                const exists = next.some(
                    g => g.name === f.name && g.size === f.size && g.lastModified === f.lastModified
                );
                if (!exists) next.push(f);
            });
            return next;
        });
    };

    const handleRemoveFile = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleClearPicker = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const taskData = { title, description, dueDate, assignedTo: person };

            if (editTaskId) {
                await updateTodoApi(editTaskId, taskData);
            } else {
                await createTodoApi(taskData);
            }

            resetForm();
            fetchTasks();
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    const handleEdit = (task) => {
        setEditTaskId(task.id);
        setTitle(task.title);
        setDescription(task.description || "");
        setDueDate(task.dueDate || "");
        setPerson(task.assignedTo || "");
        setAttachments([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodoApi(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleToggleStatus = async (task) => {
        try {
            const statusOrder = ["pending", "completed", "in-progress"];
            const currentIndex = statusOrder.indexOf(task.status || "pending");
            const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

            const updatedTask = { ...task, status: nextStatus };
            await updateTodoApi(task.id, updatedTask);

            setTasks(tasks.map(t => t.id === task.id ? { ...t, status: nextStatus } : t));
        } catch (error) {
            console.error("Error toggling task status:", error);
        }
    };

    const getStatusButtonClass = (status) => {
        switch (status) {
            case "completed":
                return "btn btn-sm btn-success";
            case "in-progress":
                return "btn btn-sm btn-primary";
            default:
                return "btn btn-sm btn-warning";
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const isOverdue = (task) => {
        if (!task.dueDate || task.status === "completed") return false;
        return new Date(task.dueDate) < new Date();
    };

    return (
        <div className="dashboard-layout">
            <Sidebar isOpen={false} onClose={() => {}} />
            <main className="dashboard-main">
                <Header
                    title="Tasks"
                    subtitle="Manage and organize your tasks"
                    onToggleSidebar={() => {}}
                />

                <div className="dashboard-content">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            {/* Add/Edit Task Form */}
                            <div className="card shadow-sm task-form-section">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">
                                        {editTaskId ? "Edit Task" : "Add New Task"}
                                    </h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Due Date</label>
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    value={dueDate}
                                                    onChange={(e) => setDueDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Assign to Person</label>
                                                <select
                                                    className="form-select"
                                                    value={person}
                                                    onChange={(e) => setPerson(e.target.value)}
                                                >
                                                    <option value="">-- Select Person (Optional) --</option>
                                                    <option value="1">Mehrdad Javan</option>
                                                    <option value="2">Simon Elbrink</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Attachments */}
                                        <div className="mb-3">
                                            <label className="form-label">Attachments</label>
                                            <div className="input-group mb-3">
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    className="form-control"
                                                    id="todoAttachments"
                                                    multiple
                                                    onChange={handleFileChange}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={handleClearPicker}
                                                >
                                                    <i className="bi bi-x-lg"></i> Clear
                                                </button>
                                            </div>
                                            {attachments.length > 0 && (
                                                <div className="file-list">
                                                    {attachments.map((file, index) => (
                                                        <div key={`${file.name}-${file.size}-${file.lastModified}`} className="d-flex align-items-center mb-1">
                                                            <small className="me-2">{file.name}</small>
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() => handleRemoveFile(index)}
                                                            >
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button type="submit" className="btn btn-primary">
                                                <i className="bi bi-plus-lg me-2"></i>
                                                {editTaskId ? "Update Task" : "Add Task"}
                                            </button>
                                            {editTaskId && (
                                                <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Task List */}
                            <div className="card shadow-sm tasks-list mt-4">
                                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                    <h5 className="card-title mb-0">Tasks</h5>
                                </div>
                                <div className="card-body">
                                    <div className="list-group">
                                        {tasks.length === 0 && <p>No tasks found.</p>}
                                        {tasks.map(task => (
                                            <div key={task.id} className="list-group-item list-group-item-action">
                                                <div className="d-flex w-100 justify-content-between align-items-start">
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-1">{task.title}</h6>
                                                        <p className="mb-1 text-muted small">{task.description}</p>

                                                        {/* Assigned person */}
                                                        {task.assignedTo && (
                                                            <div className="mb-1">
                                                                <span className="badge bg-info">
                                                                    <i className="bi bi-person"></i> {task.assignedTo}
                                                                </span>
                                                            </div>
                                                        )}

                                                        {/* Due date with overdue highlighting + badge */}
                                                        {task.dueDate && (
                                                            <div className="mb-1">
                                                                <small className={isOverdue(task) ? "text-danger fw-bold" : "text-muted"}>
                                                                    <i className="bi bi-calendar-event"></i> Due: {formatDateTime(task.dueDate)}
                                                                </small>
                                                                {isOverdue(task) && (
                                                                    <span className="badge bg-danger ms-2">Overdue</span>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Created date */}
                                                        <div className="mb-1">
                                                            <small className="text-muted">
                                                                <i className="bi bi-clock"></i> Created: {formatDateTime(task.createdAt)}
                                                            </small>
                                                        </div>
                                                    </div>

                                                    <div className="btn-group ms-3">
                                                        <button
                                                            className={getStatusButtonClass(task.status)}
                                                            title="Toggle Status"
                                                            onClick={() => handleToggleStatus(task)}
                                                        >
                                                            {task.status || "pending"}
                                                        </button>
                                                        <button className="btn btn-outline-primary btn-sm" title="Edit"
                                                            onClick={() => handleEdit(task)}>
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button className="btn btn-outline-danger btn-sm" title="Delete"
                                                            onClick={() => handleDelete(task.id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Task;
