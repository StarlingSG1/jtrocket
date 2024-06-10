"use client"
import Heading from "@/app/components/molecules/Heading";
import {NoteTypeInput} from "@/app/components/molecules/NoteTypeInput";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useSidebarStore} from "@/app/store/useSidebarStore";
import {THEMATICS_SLUG_TO_NAME} from "@/utils/thematicSlugToName";
import {NoteContent} from "@/app/components/organisms/NoteContent";


type NoteType = {
    label: string;
    description: string;
    placeholder: string;
    name: string;
    id: string;
}

const NoteTypeData: NoteType[] = [
    {
        label: "URL de vidéo",
        description: "An url of a video",
        placeholder: "url de la vidéo",
        name: "video-url",
        id: "video-url"
    },
    {
        label: "Lien de site web",
        description: "An url of a website",
        placeholder: "url du site web",
        name: "website-url",
        id: "website-url",
    },
    {
        label: "Texte",
        description: "A text",
        placeholder: "votre texte",
        name: "text",
        id: "text"
    },
]

export default function NewNote() {

    const { name} = useParams()
    const router = useRouter();

    const THEMATIC_IN_PATH: string = name as string

    const addData = (e: any, id: string) => {
        e.preventDefault();
        let value = e.target[id].value;
        if(id === "video-url") {
            const url = new URL(value);
            const params = new URLSearchParams(url.search);
            const videoId = params.get("v");
            value = `http://www.youtube.com/embed/${videoId}`;
            console.log("id",videoId)
            console.log("value",value)
        }
        const newData: string = id + ":" + value;
        e.target[id].value = "";
        setData((prevData: any) => [...prevData, newData]);
    }



    const closeNoteCreationForm = () => {
        router.push(`/rubrique/${THEMATIC_IN_PATH}`)
        setData([])
        setTitle("")
    }

    const [data, setData] = useState<string[]>([])
    const [title, setTitle] = useState<string>("")


    const handleCreateNote = async () => {
        console.log(THEMATIC_IN_PATH)
        await useSidebarStore.getState().addNote(THEMATIC_IN_PATH, title, data.join(";"))
        closeNoteCreationForm()
    }

    const handleTitleChange = (e: any) => {
        setTitle(e.target.value);
    }

    const deleteItem = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    }

    return (
        <>
            <Heading title={"Nouvelle note"} thematic={THEMATICS_SLUG_TO_NAME[THEMATIC_IN_PATH]} type={"new-note"}
                     onValidate={handleCreateNote}/>
            <div className={"grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4 items-start"}>
                <div className={`bg-white shadow sm:rounded-lg`}>
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Titre de la note</h3>
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="email" className="sr-only">
                                Titre de la note
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 mt-4"
                                placeholder="Titer de la note"
                            />
                        </div>
                    </div>
                </div>
                {NoteTypeData.map((noteType: NoteType, index: number) => {
                    const {label, description, placeholder, name, id} = noteType;

                    return (
                        <NoteTypeInput
                            key={index}
                            label={label}
                            description={description}
                            placeholder={placeholder}
                            name={name}
                            id={id}
                            onSubmit={addData}
                        />
                    )
                })}
                <NoteContent content={data.join(";")} edit={true} deleteItem={deleteItem}/>
            </div>
        </>
    )
}