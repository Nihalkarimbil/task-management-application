"use client";

import { useDraggable } from "@dnd-kit/core";
import { Task } from "./Kanbanboard";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";

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
            
            <div className="flex justify-between mt-5">
            <Image src={task.assignee.profileImage} alt="s" width={200} height={200} className="rounded-full w-6 h-6"/>
            <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
           
        </div>
    );
};

export default TaskCard;
