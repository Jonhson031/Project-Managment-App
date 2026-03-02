import { useState, useRef } from "react";

export default function Task({ project, deleteProject, addTask, removeTask }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(project.date));

  const [taskText, setTaskText] = useState("");

  function handleAddClick() {
    addTask(taskText);
    setTaskText("");
  }

  return (
    <div className="flex w-[25%]  flex-col ml-12 mt-16 bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h2>
        <button
          onClick={() => deleteProject(project.id)}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition"
        >
          Delete
        </button>
      </div>
      <div className="mb-4 text-stone-400">{formattedDate}</div>
      <p className="pb-4 text-stone-500 border-b border-black break-words whitespace-normal">
        {project.description}
      </p>
      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-stone-800 mb-4">Tasks</h2>
        <div className="flex items-center gap-3 mb-4">
          <input
            className="flex-1 px-3 py-2 rounded-lg bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 transition"
            type="text"
            placeholder="Add a new task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition"
          >
            Add
          </button>
        </div>
        {project.tasks.length === 0 ? (
          <p className="text-stone-500 text-m">This project does not have any tasks yet.</p>
        ) : (
          <ul className="mt-8 space-y-3">
            {project.tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg bg-stone-100 hover:bg-stone-200 transition"
              >
                <span className="text-stone-700 font-medium">{task.task}</span>
                <button
                  onClick={() => removeTask(task.id)}
                  className="text-sm px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
