"use client";

import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../../components/kanban/Taskcard";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import { Task } from "./Kanbanboard";



const Column = ({ id, tasks }: { id: string; tasks: Task[] }) => {
    console.log(tasks);
    console.log(id);
    
  const { setNodeRef } = useDroppable({ id});

  return (
    <div ref={setNodeRef} className="p-4 rounded h-screen">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">{id}</h2>
        <div className="flex gap-3">
          <FaPlus />
          <HiOutlineDotsHorizontal />
        </div>
      </div>

      <div className="bg-gray-200 h-[600px] p-4 rounded-2xl">
        {tasks
          .filter((task) => task.status == id)
          .map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>
    </div>
  );
};

export default Column;
