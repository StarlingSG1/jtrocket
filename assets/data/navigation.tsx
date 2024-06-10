import {HomeIcon} from "@heroicons/react/24/outline";

interface Navigation {
    name: string;
    href: string;
    icon: any;
}

export const navigation: Navigation[] = [
    {name: 'Accueil', href: '/', icon: HomeIcon},
]