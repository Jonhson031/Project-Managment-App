import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SideBar from "./components/Sidebar.jsx";
import AddNewProject from "./components/AddNewProject.jsx";
import Task from "./components/Task.jsx";

function App() {
  const [projects, setProjects] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const curProject = projects.find((p) => p.id === selectedProjectId);

  function handleStartAddProject() {
    setIsAddingProject(true);
  }

  function handleCloseAddNewProject() {
    setIsAddingProject(false);
    setSelectedProjectId(null);
  }

  function handleSetCurProjectId(id) {
    if (!id) return;
    setSelectedProjectId(id);
    setIsAddingProject(false);
  }

  function handleSaveProject({ title, description, date }) {
    const newProject = {
      id: Date.now(),
      title,
      description,
      date,
      tasks: [],
    };

    setProjects((prevProjects) => [...prevProjects, newProject]);
    setSelectedProjectId(newProject.id);
    setIsAddingProject(false);
  }

  function handleDeleteProject(id) {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    setSelectedProjectId(null);
  }

  function handleAddTask(taskText) {
    console.log(taskText)
    if (!taskText.trim()) return;
    const task = {
      id: Date.now(),
      task: taskText.trim(),
    };

    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.id === curProject.id ? { ...proj, tasks: [...proj.tasks, task] } : proj,
      ),
    );
  }

  function handleRemoveTask(id) {
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.id === curProject.id
          ? { ...proj, tasks: proj.tasks.filter((task) => task.id !== id) }
          : proj,
      ),
    );
  }

  return (
    <main className="h-screen flex">
      <SideBar
        projects={projects}
        addNewProject={handleStartAddProject}
        setCurProject={handleSetCurProjectId}
      />
      {!curProject && !isAddingProject && (
        <NoProjectSelected addNewProject={handleStartAddProject} />
      )}
      {isAddingProject && (
        <AddNewProject
          closeAddNewProject={handleCloseAddNewProject}
          saveProject={handleSaveProject}
        />
      )}
      {curProject && !isAddingProject && (
        <Task
          project={curProject}
          deleteProject={handleDeleteProject}
          addTask={handleAddTask}
          removeTask={handleRemoveTask}
        />
      )}
    </main>
  );
}

export default App;
