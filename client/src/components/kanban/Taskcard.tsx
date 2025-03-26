"use client";

import { useState, useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "./Kanbanboard";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import TaskModal from "@/ui/taskViewModal";

const TaskCard = ({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ id: task._id });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                className="relative p-2 mt-2 bg-white rounded shadow cursor-pointer"
                onClick={() => {
                    console.log("Opening modal..."); 
                    setIsModalOpen(true);
                }}
            >
                <div className="flex justify-between items-center">
                    <p className="font-semibold">{task.title}</p>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); 
                                setDropdownOpen((prev) => !prev);
                            }}
                            className="p-1 rounded hover:bg-gray-200 focus:outline-none"
                        >
                            <HiOutlineDotsHorizontal />
                        </button>

                        {dropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropdownOpen(false);
                                        onDelete(task._id);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <MdDelete size={18} />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between mt-5">
                    <Image
                        src={task.assignee.profileImage}
                        alt={task.title}
                        width={24}
                        height={24}
                        className="rounded-full w-6 h-6"
                    />
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>
            </div>

            {isModalOpen && (
                <TaskModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        console.log("Closing modal..."); 
                        setIsModalOpen(false);
                    }}
                    task={task}
                />
            )}
        </>
    );
};

export default TaskCard;
