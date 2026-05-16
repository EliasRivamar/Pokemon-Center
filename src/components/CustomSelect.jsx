import { useState, useRef, useEffect } from "react"
import { DropDownIcon } from "../icons/DropDownIcon"


export function CustomSelect({ value, onChange, options, placeholder = "Gen..." }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const parsedOptions = options.map(opt =>
    typeof opt === "number" ? { label: opt, value: opt } : opt
  );

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-20 lg:w-full">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-3 py-2 text-base rounded-lg
        border border-bor-light dark:border-bor-dark
        bg-bg-primary-light dark:bg-bg-primary-dark
        text-text-primary-light dark:text-text-primary-dark
        hover:border-primary transition">
        <span>{parsedOptions.find(o => o.value === value)?.label ?? placeholder}</span>
        <DropDownIcon isActive={open}/>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-40 mt-1 w-full rounded-xl overflow-hidden shadow-lg border 
          border-bor-light dark:border-bor-dark
          bg-bg-light dark:bg-bg-dark">
          {parsedOptions.map(opt => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer text-text-primary-light dark:text-text-primary-dark
              hover:bg-bg-second-light dark:hover:bg-bg-second-dark hover:text-text-primary-dark transition">
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
