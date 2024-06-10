import Link from "next/link";
import {NotesType} from "@/app/store/useSidebarStore";
import {Note} from "@/app/components/atoms/Note";

type NoteListProps = {
    params: { name: string }
    notes: NotesType[]
}

export const getSlug = (title: string) => {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export function NoteList({params, notes}: NoteListProps) {


    return (
        <ul role="list" className="divide-y divide-gray-100 bg-white px-4">
            {notes.map((note, index: number) => {

                const slug = params.name + "/" + note.slug

                return (
                    <Note key={index} note={note} slug={slug}/>
                )
            })}
        </ul>
    )
}