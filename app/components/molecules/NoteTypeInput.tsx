import {useEffect, useRef} from "react";

type NoteTypeInputProps = {
    label: string;
    description: string;
    placeholder: string;
    type?: string;
    name: string;
    id: string;
    onSubmit: any;
    className?: string;
    value?: string;
    onChange?: any;
}

export function NoteTypeInput({label, description, placeholder, type = "text", name, id, onSubmit, className = "", value, onChange}: NoteTypeInputProps) {

    const textareaRef = useRef(null);

    useEffect(() => {
        if (id === "text") {
            const textarea = textareaRef.current;
            // @ts-ignore
            textarea.style.height = "36px";
            // @ts-ignore
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, []);

    const handleInput = (e: any) => {
        e.target.style.height = "36px";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className={`bg-white shadow sm:rounded-lg ${className}`}>
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">{label}</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>{description}</p>
                </div>
                <form onSubmit={(e:any) => onSubmit(e, id)} className="mt-5 sm:flex sm:items-center">
                    <div className="w-full sm:max-w-xs">
                        <label htmlFor="email" className="sr-only">
                            {label}
                        </label>
                        {id !== "text" ? <input
                                type={type}
                                name={name}
                                id={id}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                placeholder={placeholder}
                                value={value}
                                onChange={onChange}
                            />
                            :
                            <textarea
                                ref={textareaRef}
                                onInput={handleInput}
                                name={name}
                                id={id}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 h-9"
                                placeholder={placeholder}
                            />
                        }
                    </div>
                    <button
                        type="submit"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}