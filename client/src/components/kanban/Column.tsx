"use client";

import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../../components/kanban/Taskcard";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import { Task } from "./Kanbanboard";
import { useState } from "react";
import SectionPopup from "@/ui/sectionModal";

const Column = ({ id, tasks }: { id: string; tasks: Task[] }) => {
  console.log(tasks);
  console.log(id);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-4 rounded h-screen w-80">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">{id}</h2>
        <div className="flex gap-3">
          <button onClick={() => setIsPopupOpen(true)}>
            <FaPlus />
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
      </div>
      {isPopupOpen && <SectionPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Column;
