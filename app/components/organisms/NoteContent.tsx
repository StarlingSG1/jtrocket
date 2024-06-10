import {TrashIcon} from "@heroicons/react/20/solid";

type NoteContentProps = {
    content: string
    edit?: boolean
    deleteItem?: (index: number) => void
}

type FormattedContent = {
    [key: string]: string
}

export function NoteContent({content, edit = false, deleteItem}: NoteContentProps) {

    function parseContent(content: string): Array<{ [key: string]: string }> {
        const formattedContent: Array<{ [key: string]: string }> = [];

        const pairs: string[] = content.split(';');
        pairs.forEach(pair => {
            const index = pair.indexOf(':');
            const key = pair.substring(0, index);
            const value = pair.substring(index + 1);
            formattedContent.push({[key]: value});
        });

        return formattedContent;
    }

    const formattedContent: FormattedContent[] = parseContent(content);

    return (
        <div className={"pb-20"}>
            {formattedContent.map((content, index) => {
                const key = Object.keys(content)[0];
                const value = content[key];

                if (key === "text") {
                    return (
                        <div key={index} className="px-4 py-5 sm:px-6 flex gap-3">
                            {edit && deleteItem &&  <TrashIcon className={"min-h-5 min-w-5 w-5 h-5 cursor-pointer mt-1.5"} onClick={() => deleteItem(index)}/>}
                            <p className="mt-1 max-w-2xl text-black">{value}</p>
                        </div>
                    )
                } else if (key === "image-url") {
                    return (
                        <div key={index} className="px-4 py-5 sm:px-6 flex gap-3">
                            {edit && deleteItem &&  <TrashIcon className={"min-h-5 min-w-5 w-5 h-5 cursor-pointer mt-1.5"} onClick={() => deleteItem(index)}/>}
                            <img src={value} alt="image" className="w-80 h-auto"/>
                        </div>
                    )
                } else if (key === "video-url") {
                    return (
                        <div key={index} className="px-4 py-5 sm:px-6 flex gap-3">
                            {edit && deleteItem &&  <TrashIcon className={"min-h-5 min-w-5 w-5 h-5 cursor-pointer mt-1.5"} onClick={() => deleteItem(index)}/>}
                            <iframe className={"aspect-video max-w-7xl w-full"}
                                    src={value}>
                            </iframe>
                        </div>
                    )
                } else if(key === "website-url"){
                    return (
                        <div key={index} className="px-4 py-5 sm:px-6 flex gap-3">
                            {edit && deleteItem &&  <TrashIcon className={"min-h-5 min-w-5 w-5 h-5 cursor-pointer mt-1.5"} onClick={() => deleteItem(index)}/>}
                            <a href={value} target="_blank" rel="noreferrer" className={"underline text-blue-900"}>{value}</a>
                        </div>
                    )
                }
            })}
        </div>
    )
}