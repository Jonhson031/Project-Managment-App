import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SideBar from "./components/Sidebar.jsx";
import AddNewProject from "./components/AddNewProject.jsx";
import Task from "./components/Task.jsx";

function App() {
  const [content, setContent] = useState("noProject");
  const [projects, setProjects] = useState([]);
  const [curProject, setCurProject] = useState();

  function handleAddNewProject() {
    setContent("addNewProject");
  }

  function handleCloseAddNewProject() {
    setContent("noProject");
  }

  function handleSetCurProject(id) {
    const findCurProject = projects.find((project) => project.id === id);
    if (findCurProject) {
      setCurProject(findCurProject);
      setContent("curProject");
    }
  }

  function handleSaveProject({ title, description, date }) {
    const newProject = {
      id: Date.now(),
      title,
      description,
      date,
      tasks: [],
    };

    setProjects((prevProject) => [...prevProject, newProject]);
    setCurProject(newProject);
    setContent("curProject");
  }

  function handleDeleteProject(id) {
    setProjects((prevProject) => prevProject.filter((project) => project.id !== id));
    handleCloseAddNewProject();
  }

  function handleAddTask(newTask) {
    if (!newTask.current.value.trim()) return;
    const task = {
      id: Date.now(),
      task: newTask.current.value.trim(),
    };

    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.id === curProject.id ? { ...proj, tasks: [...proj.tasks, task] } : proj,
      ),
    );

    setCurProject((prevProject) => ({
      ...prevProject,
      tasks: [...prevProject.tasks, task],
    }));

    newTask.current.value = "";
  }

  function handleRemoveTask(id) {
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.id === curProject.id
          ? { ...proj, tasks: proj.tasks.filter((task) => task.id !== id) }
          : proj,
      ),
    );

    setCurProject((prevProject) => ({
      ...prevProject,
      tasks: prevProject.tasks.filter((task) => task.id !== id),
    }));
  }

  return (
    <>
      <main className="h-screen flex">
        <SideBar
          projects={projects}
          addNewProject={handleAddNewProject}
          setCurProject={handleSetCurProject}
        ></SideBar>
        {content === "noProject" && (
          <NoProjectSelected addNewProject={handleAddNewProject}></NoProjectSelected>
        )}
        {content === "addNewProject" && (
          <AddNewProject
            closeAddNewProject={handleCloseAddNewProject}
            saveProject={handleSaveProject}
          />
        )}
        {content === "curProject" && curProject && (
          <Task
            project={curProject}
            deleteProject={handleDeleteProject}
            addTask={handleAddTask}
            removeTask={handleRemoveTask}
          />
        )}
      </main>
    </>
  );
}

export default App;
