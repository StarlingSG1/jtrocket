"use client"
import {NoteContent} from "@/app/components/organisms/NoteContent";
import Heading from "@/app/components/molecules/Heading";
import {useEffect, useState} from "react";
import {useSidebarStore} from "@/app/store/useSidebarStore";
import {getOneNote} from "@/app/api/notes/[slug]/note";
import {THEMATICS_SLUG_TO_NAME} from "@/utils/thematicSlugToName";
import {NoteForm} from "@/app/components/molecules/NoteForm";

type Props = {
    params: { name: string, title: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function NotePage({params, searchParams}: Props) {

    const THEMATIC_SLUG: string = params.name
    const THEMATIC_NAME: string = THEMATICS_SLUG_TO_NAME[THEMATIC_SLUG]

    const [note, setNote] = useState(useSidebarStore((s) => s.notes).find(note => note.slug === params.title))
    const [isEditModeActive, setIsEditModeActive] = useState(false)


    async function getNote() {
        const response = await getOneNote(params.title)
        setNote(response)
    }

    useEffect(() => {
        if (!note) {
            getNote()
        }
    }, [params]);

    const deleteItem = () => {

    }


    return (
        <div>
            {note && <Heading title={note.title} thematic={THEMATIC_NAME} isEditModeActive={isEditModeActive} setIsEditModeActive={setIsEditModeActive} type={"note"}/>}
            {note && isEditModeActive && <NoteForm/>}
            {note &&  <NoteContent edit={isEditModeActive} content={note?.content} deleteItem={deleteItem}/>}
        </div>
    )
}