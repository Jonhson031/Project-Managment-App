import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function ModalError({ onClose }) {
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/70" />
      <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md" open="">
            <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
            <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
            <p className="text-stone-600 mb-4">
              Please make sure you provide a valid value for every input field.
            </p>
            <button onClick={onClose} className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
              Okay
            </button>
          </div>
      </div>
    </>,
    document.getElementById("modal-root"),
  );
}
