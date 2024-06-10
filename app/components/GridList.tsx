"use client"
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid'
import {ThematicsType, useSidebarStore} from "@/app/store/useSidebarStore";
import {useEffect} from "react";
import {ChevronRightIcon} from "@heroicons/react/16/solid";
import Link from "next/link";

const getThreeFirstLetters = (name: string) => name.slice(0, 3)

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function GridList() {

    const thematics: ThematicsType[] = useSidebarStore((s) => s.thematics)

    useEffect(() => {
        useSidebarStore.getState().getThemes()
    }, []);

    return (
        <div>
            <h2 className="text-sm font-medium text-gray-500">Vos rubriques</h2>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {thematics.map((thematic: ThematicsType) => (
                    <li key={thematic.name} className="col-span-1 flex rounded-md shadow-sm">
                        <div
                            className={
                                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
                            }
                            style={{backgroundColor: thematic.color}}
                        >
                            {getThreeFirstLetters(thematic.name)}
                        </div>
                        <div
                            className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                            <div className="flex-1 truncate px-4 py-2 text-sm">
                                <Link href={thematic.href} className="font-medium text-gray-900 hover:text-gray-600">
                                    {thematic.name}
                                </Link>
                                <p className="text-gray-500">{thematic.Notes?.length ?? 0} notes</p>
                            </div>
                            <Link
                                href={thematic.href}
                                className="inline-flex h-8 w-8 mr-2 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="sr-only">Open options</span>
                                <ChevronRightIcon/>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
