import React from "react";

interface Task {
    _id: string;
    title: string;
    description?: string;
    status?: string;
    dueDate: string;
}

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task }) => {
    if (!isOpen) return null;
    console.log("nnnnnnnnnnnnnnn",task);
    

    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Task Details</h2>
                
                {task ? (
                    <div>
                        <p><strong>ID:</strong> {task._id}</p>
                        <p><strong>Title:</strong> {task.title}</p>
                        <p><strong>Description:</strong> {task.description || "No description"}</p>
                        <p><strong>Status:</strong> {task.status || "Pending"}</p>
                        <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <p>No task details available.</p>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default TaskModal;
