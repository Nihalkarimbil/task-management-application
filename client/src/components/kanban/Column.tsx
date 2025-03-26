"use client";

import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../../components/kanban/Taskcard";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import { Task } from "./Kanbanboard";
import { useState } from "react";

import TaskModal from "@/ui/taskCreateModal";

const Column = ({
  id,
  tasks,
  onDeleteColumn,
}: {
  id: string;
  tasks: Task[];
  onDeleteColumn: (id: string) => void;
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-4 rounded h-screen w-80 relative">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">{id}</h2>
        <div className="flex gap-3 cursor-pointer relative">
          <button onClick={() => setIsPopupOpen(true)} className="mb-4">
            <FaPlus size={16} />
          </button>

          <HiOutlineDotsHorizontal
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative"
          />

          {isMenuOpen && (
            <div className="absolute top-6 right-0 bg-white shadow-md rounded-md py-2 w-32 z-10">
              <button
                onClick={() => {
                  onDeleteColumn(id);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-sm text-left hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-200 h-[600px] p-4 rounded-2xl w-80">
        {tasks
          .filter((task) => task.status == id)
          .map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={(id: string) =>
                console.log(`Delete task with id: ${id}`)
              }
            />
          ))}
        <h1
          className="text-center font-semibold text-gray-600 mt-2 cursor-pointer"
          onClick={() => setIsPopupOpen(true)}
        >
          + Add Task
        </h1>
      </div>

      {isPopupOpen && <TaskModal onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Column;
