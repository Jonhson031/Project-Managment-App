import { useState, useRef } from "react";
import Input from "./Input.jsx";
import ModalError from "./ModalError.jsx";

export default function AddNewProject({ closeAddNewProject, saveProject }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  function handleSaveClick() {
    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const date = dateRef.current.value.trim();

    if (!title || !description || !date) {
      setIsOpen(true);
      return;
    }

    saveProject({ title, description, date });
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && <ModalError onClose={closeModal} />}
      <div className="flex w-[25%] mt-20 flex-col ml-12">
        <div className="flex justify-end mb-6">
          <button onClick={closeAddNewProject} className="px-6 py-2">
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            Save
          </button>
        </div>
        <Input label="Title" type="text" placeholder="Project title" inputRef={titleRef} />
        <Input
          textArea={true}
          label="Description"
          type="text"
          placeholder="Project description"
          inputRef={descriptionRef}
        />
        <Input label="Due date" type="date" placeholder="Project due date" inputRef={dateRef} />
      </div>
    </>
  );
}
