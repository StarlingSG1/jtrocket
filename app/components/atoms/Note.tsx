"use client"
import Link from "next/link";
import {NotesType, useSidebarStore} from "@/app/store/useSidebarStore";
import {Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";
import {Fragment, useState} from "react";
import {classNames} from "@/utils/classNames";
import {toast} from "react-toastify";
import Modal from "@/app/components/molecules/Modal";

type NoteListProps = {
    note: NotesType
    slug: string
}

export function Note({note, slug}: NoteListProps) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    function formatDate(createdAt: Date) {
        const date = new Date(createdAt);
        return date.toLocaleDateString('fr-FR', {day: '2-digit', month: 'long', year: 'numeric'});
    }

    const handleDeleteNote = async (id: string) => {
        setIsDeleteModalOpen(true)
    }

    const deleteTheNote = async (id: string) => {
        await useSidebarStore.getState().deleteNote(id)
        setIsDeleteModalOpen(false)
        toast.success('Note supprimée')
    }

    return (
        <>
        <li key={note.id} className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{note.title}</p>
                    {/*<p*/}
                    {/*    className={classNames(*/}
                    {/*        // @ts-ignore*/}
                    {/*        statuses[notesData[index].status],*/}
                    {/*        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'*/}
                    {/*    )}*/}
                    {/*>*/}
                    {/*     /!*@ts-ignore*!/*/}
                    {/*    {notesData[index].status}*/}
                    {/*</p>*/}
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap">
                        Créée le {formatDate(note.createdAt)}
                    </p>
                </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
                <Link
                    href={slug}
                    className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                    Voir la note<span className="sr-only">, {note.title}</span>
                </Link>
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true"/>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                                    <a
                                        href="#"
                                        className={classNames(
                                            'block px-3 py-1 w-full text-left text-sm leading-6 text-gray-900 hover:bg-gray-100'
                                        )}
                                    >
                                        Modifier
                                    </a>
                            </Menu.Item>
                            <Menu.Item>
                                    <button
                                        onClick={() => handleDeleteNote(note.id)}
                                        className={classNames(
                                            'block px-3 py-1 w-full text-left text-sm leading-6 text-gray-900 hover:bg-gray-100'
                                        )}
                                    >
                                        Supprimer
                                    </button>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
            <Modal
                open={isDeleteModalOpen}
                setOpen={setIsDeleteModalOpen}
                onValidate={() => deleteTheNote(note.id)}
            />
        </>
    )
}