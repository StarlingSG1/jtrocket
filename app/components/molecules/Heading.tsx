import {PlusIcon} from "@heroicons/react/20/solid";

type HeadingPro = {
    isNewNote?: boolean
    openNoteCreationForm?: () => void
    closeNoteCreationForm?: () => void
    handleCreateNote?: () => void
    THEMATIC_NAME?: string
}

export function Head({
                         isNewNote,
                         openNoteCreationForm,
                         closeNoteCreationForm,
                         handleCreateNote,
                         THEMATIC_NAME
                     }: HeadingPro) {
    return (
        <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1 py-8">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {THEMATIC_NAME}
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 gap-4">
                {isNewNote ?
                    <>
                        <button
                            onClick={closeNoteCreationForm}
                            className="ml-auto flex items-center gap-x-1 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreateNote}
                            className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Validate
                        </button>
                    </>
                    :
                    <button
                        onClick={openNoteCreationForm}
                        className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <PlusIcon className="-ml-1.5 h-5 w-5" aria-hidden="true"/>
                        New note
                    </button>
                }
            </div>
        </div>
    )
}

import {Fragment} from 'react'
import {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
} from '@heroicons/react/20/solid'
import {Menu, Transition} from '@headlessui/react'
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

type HeadingType =
    "thematic" |
    "note" |
    "new-note"

type HeadingProps = {
    title: string
    thematic?: string
    type: HeadingType
    onValidate?: () => void
    isEditModeActive?: boolean
    setIsEditModeActive?: (value: boolean) => void
}

export default function Heading({title, thematic, type, onValidate, isEditModeActive, setIsEditModeActive}: HeadingProps) {

    const {name} = useParams()

    return (
        <div className="lg:flex lg:items-center lg:justify-between py-8">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {title}
                </h2>
                {thematic && <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        {thematic}
                    </div>
                </div>}
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className="sm:ml-3">
                  {thematic && title !== "Nouvelle note" && !isEditModeActive ?
                      <button
                          onClick={() => setIsEditModeActive && setIsEditModeActive(true)}
                          className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                         Modifier la note
                      </button>
                      : isEditModeActive ? <button
                              onClick={() => setIsEditModeActive && setIsEditModeActive(false)}
                              className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                              Sauvegarder
                          </button> :
                          type === "thematic" ?
                              <Link
                                  href={`/rubrique/${name}/new`}
                                  className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                  <PlusIcon className="-ml-1.5 h-5 w-5" aria-hidden="true"/>
                                  Nouvelle note
                              </Link>
                              : type === "new-note" ?
                                  <button
                                      onClick={onValidate}
                                      className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                      Créer la note
                                  </button>
                                  : ""
                  }
                </span>
            </div>
        </div>
    )
}
