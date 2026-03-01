export default function Input({ label, type, placeholder, inputRef, textArea = false }) {
  return (
    <div className="flex flex-col gap-3 mb-5">
      <label
        className="text-[1.1rem] tracking-wide font-bold uppercase text-stone-500"
        htmlFor={label}
      >
        {label}
      </label>
      {!textArea && (
        <input
          ref={inputRef}
          type={type}
          id={label}
          name={label}
          placeholder={placeholder}
          className="p-3 bg-stone-200 rounded-md placeholder:text-stone-500"
        />
      )}
      {textArea && (
        <textarea
          ref={inputRef}
          type={type}
          id={label}
          name={label}
          placeholder={placeholder}
          className="p-3 h-48 bg-stone-200 rounded-md placeholder:text-stone-500"
        ></textarea>
      )}
    </div>
  );
}
