interface Thematics {
    id: number;
    name: string;
    href: string;
    initial: string;
    current: boolean;
}

export const thematics: Thematics[] = [
    {id: 1, name: 'Podcasts', href: '#', initial: 'J', current: false},
    {id: 2, name: 'Vidéos', href: '#', initial: 'T', current: false},
    {id: 3, name: 'Critiques', href: '#', initial: 'R', current: false},
]