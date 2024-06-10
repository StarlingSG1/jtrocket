"use client"
import {navigation} from "@/assets/data/navigation";
import {classNames} from "@/utils/classNames";
import {ThematicsType, useSidebarStore} from "@/app/store/useSidebarStore";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

export function StaticDesktopSidebar() {

    const path = usePathname()

    const thematics: ThematicsType[] = useSidebarStore((s) => s.thematics)


    useEffect(() => {
        useSidebarStore.getState().getThemes()
    }, []);

    const [currentThematic, setCurrentThematic] = useState<string | null>(null)
    // function that returns the first letter of a string
    const getInitial = (name: string) => name.charAt(0)


    useEffect(() => {
        if (path.includes('/podcasts')) {
            setCurrentThematic('Podcasts')
        } else if (path.includes('/videos')) {
            setCurrentThematic('Vidéos')
        } else if (path.includes('/critiques')) {
            setCurrentThematic('Critiques')
        } else {
            setCurrentThematic(null)
        }
    }, [path]);


    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                <div className="flex h-16 shrink-0 items-center">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`
                                                ${path === item.href
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'},
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'`}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    path === item.href ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                    'h-6 w-6 shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">Vos rubriques</div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {thematics.map((thematic: ThematicsType) => (
                                    <li key={thematic.name}>
                                        <Link
                                            href={thematic.href}
                                            className={`
                                                ${currentThematic === thematic.name
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'},
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                           `}
                                        >
                          <span
                              className={classNames(
                                  currentThematic === thematic.name
                                      ? 'text-indigo-600 border-indigo-600'
                                      : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                              )}
                          >
                            {getInitial(thematic.name)}
                          </span>
                                            <span className="truncate">{thematic.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                            <a
                                href="#"
                                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                            >
                                <img
                                    className="h-8 w-8 rounded-full bg-gray-50"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <span className="sr-only">Your profile</span>
                                <span aria-hidden="true">Tom Cook</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    )
}