export default function SideBar({ addNewProject, projects, setCurProject }) {
  return (
    <aside className="flex flex-col w-[15%] h-screen bg-[#1c1917] p-12">
      <h2 className="text-white font-medium text-2xl uppercase tracking-wide mb-8">
        Your projects
      </h2>
      <button
        onClick={addNewProject}
        className="px-4 mb-6 max-w-[50%] box-border py-2 rounded-lg text-[#a8a29e] hover:text-white duration-100 font-medium bg-[#44403c]"
      >
        + Add Project
      </button>
      {projects.map((project) => (
        <button
          className="text-left my-4 text-[#a8a29e] hover:text-white duration-100 font-medium text-[1.1rem]"
          key={project.id}
          onClick={() => setCurProject(project.id)}
        >
          {project.title}
        </button>
      ))}
    </aside>
  );
}
