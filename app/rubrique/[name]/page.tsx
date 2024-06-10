"use client"
import {useEffect, useState} from "react";
import {NotesType, ThematicsType, useSidebarStore} from "@/app/store/useSidebarStore";
import {NoteList} from "@/app/components/molecules/NoteList";
import Heading from "@/app/components/molecules/Heading";
import {EmptyNoteList} from "@/app/components/molecules/EmptyNoteList";
import {THEMATICS_SLUG_TO_NAME} from "@/utils/thematicSlugToName";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const statuses = {
    Complete: 'text-green-700 bg-green-50 ring-green-600/20',
    'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
const notesData = [
    {
        id: 1,
        name: 'GraphQL API',
        href: '#',
        status: 'Complete',
        createdBy: 'Leslie Alexander',
        dueDate: 'March 17, 2023',
        dueDateTime: '2023-03-17T00:00Z',
    },
    {
        id: 2,
        name: 'New benefits plan',
        href: '#',
        status: 'In progress',
        createdBy: 'Leslie Alexander',
        dueDate: 'May 5, 2023',
        dueDateTime: '2023-05-05T00:00Z',
    },
    {
        id: 3,
        name: 'Onboarding emails',
        href: '#',
        status: 'In progress',
        createdBy: 'Courtney Henry',
        dueDate: 'May 25, 2023',
        dueDateTime: '2023-05-25T00:00Z',
    },
    {
        id: 4,
        name: 'iOS app',
        href: '#',
        status: 'In progress',
        createdBy: 'Leonard Krasner',
        dueDate: 'June 7, 2023',
        dueDateTime: '2023-06-07T00:00Z',
    },
    {
        id: 5,
        name: 'Marketing site redesign',
        href: '#',
        status: 'Archived',
        createdBy: 'Courtney Henry',
        dueDate: 'June 10, 2023',
        dueDateTime: '2023-06-10T00:00Z',
    },
]

type Props = {
    params: { name: string, title?:string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Thematic({params, searchParams}: Props) {

    const closeNoteCreationForm = () => {
        setData([])
        setTitle("")
    }

    const THEMATIC_IN_PATH: string = params?.name



    const THEMATIC_NAME: string = THEMATICS_SLUG_TO_NAME[THEMATIC_IN_PATH]

    const notes: NotesType[] = useSidebarStore((s) => s.notes)

    const [data, setData] = useState<string[]>([])
    const [title, setTitle] = useState<string>("")

    useEffect(() => {
        useSidebarStore.getState().getThematicNotes(THEMATIC_IN_PATH)
    }, [params]);

    return (
        <>
            <Heading title={THEMATIC_NAME} type={"thematic"} />
            {notes?.length > 0 ?
                <NoteList params={params} notes={notes}/>
                :
                <EmptyNoteList thematic={THEMATIC_IN_PATH} />
            }
        </>
    )
}
