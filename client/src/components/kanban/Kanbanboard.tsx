"use client";

import { useState, useEffect } from "react";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import Column from "../../components/kanban/Column";
import { BiSearch } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { FaApple} from "react-icons/fa";
import { useSections } from "@/hooks/useSection";
import { useTask } from "@/hooks/useTask";

export type Task = {
    _id: string;
    title: string;
    status: string;
    dueDate: string;
};

const KanbanBoard = () => {
    const { sections, isLoading }: { sections: { _id: string; name: string }[]; isLoading: boolean } = useSections();
    const { Tasks = [], Loading } = useTask();

    const [tasks, setTasks] = useState<Task[]>([]);

    
    useEffect(() => {
        setTasks(Tasks);
    }, [Tasks]);

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === active.id.toString() ? { ...task, status: over.id.toString() } : task
            )
        );
    };

    if (isLoading || Loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <>
            
            <div className="flex items-center justify-between p-4 bg-white mx-8">
                <div className="flex items-center space-x-4">
                    <button className="w-10 h-10 border-2 border-gray-200 text-gray-400 rounded-lg flex items-center justify-center mr-3">
                        <FaArrowLeft size={24} />
                    </button>

                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center mr-3">
                            <FaApple size={24} />
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg">Apple</h1>
                            <p className="text-xs text-gray-500">5 boards · 24 members</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-8 pr-3 py-2 border rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <BiSearch size={20} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <button className="w-10 h-10 border-2 border-gray-200 text-gray-400 rounded-lg flex items-center justify-center mr-3">
                        <FiExternalLink size={24} />
                    </button>

                    <button className="w-10 h-10 border-2 border-gray-200 text-gray-400 rounded-lg flex items-center justify-center mr-3">
                        <CiSettings size={24} />
                    </button>
                </div>
            </div>

            <DndContext onDragEnd={onDragEnd} collisionDetection={closestCorners}>

                <div className="grid grid-cols-4 gap-4 p-4">
                    
                    {sections && sections.length > 0 ? (
                        sections.map((section) => (
                            <Column key={section._id} id={section.name} tasks={tasks.filter(task => task.status === section.name)} />
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-gray-500">No sections available</div>
                    )}
                    <h1 className="pt-4 font-semibold text-lg text-gray-500 "> + add section</h1>
                </div>
            </DndContext>
        </>
    );
};

export default KanbanBoard;
