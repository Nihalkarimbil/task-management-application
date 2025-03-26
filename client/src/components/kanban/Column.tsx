"use client";

import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../../components/kanban/Taskcard";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import { Task } from "./Kanbanboard";
import { useState } from "react";

import TaskModal from "@/ui/taskModal";

const Column = ({ id, tasks }: { id: string; tasks: Task[] }) => {
  console.log(tasks);
  console.log(id);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-4 rounded h-screen w-80">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">{id}</h2>
        <div className="flex gap-3 cursor-pointer">
          <button onClick={() => setIsPopupOpen(true)} className="mb-4">
            <FaPlus size={16}/>
          </button>

          <HiOutlineDotsHorizontal />
        </div>
      </div>

      <div className="bg-gray-200 h-[600px] p-4 rounded-2xl w-80">
        {tasks
          .filter((task) => task.status == id)
          .map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
          <h1 className="text-center font-semibold text-gray-600 mt-2 cursor-pointer"  onClick={() => setIsPopupOpen(true)}>+add Task</h1>
          
      </div>
      {isPopupOpen && <TaskModal onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Column;
