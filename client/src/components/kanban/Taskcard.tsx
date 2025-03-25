"use client";

import { useDraggable } from "@dnd-kit/core";
import { Task } from "./Kanbanboard";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const TaskCard = ({ task }: { task: Task }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ id: task._id });

    const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="p-2 mt-2 bg-white rounded shadow cursor-pointer"
        >
            <div className="flex justify-between">
                <p className="font-semibold">{task.title}</p>
                <HiOutlineDotsHorizontal />
            </div>

            <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
    );
};

export default TaskCard;
