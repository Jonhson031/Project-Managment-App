import img from "../assets/no-projects.png";

export default function NoProjectSelected({addNewProject}) {
  return (
    <div className="flex max-w-sm mt-20 flex-col items-center  mx-auto">
      <img src={img} alt="No project selected" className="w-16 h-16" />
      <h1 className="my-4 text-xl font-bold text-[#78716C]">No Project Selected</h1>
      <p className="mb-6 text-gray-500">Select a project or get started with a new one</p>
      <button onClick={addNewProject} className="px-5 box-border py-3 rounded-lg text-[#a8a29e] hover:text-white duration-100 font-medium bg-[#44403c]">
        Create a new project
      </button>
    </div>
  );
}
