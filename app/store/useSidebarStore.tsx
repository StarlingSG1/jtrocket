import {create} from 'zustand'
import {getThematics} from "@/app/api/thematics/thematics";
import {createNote, deleteOneNote, getNotes} from "@/app/api/notes/notes";

type SidebarStoreType = {
    isSidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    thematics: ThematicsType[]
    setThematics: (thematics: ThematicsType[]) => void
    getThemes: () => Promise<void>
    notes: NotesType[]
    setNotes: (notes: NotesType[]) => void
    getThematicNotes: (thematicName: string) => Promise<void>
    addNote: (name: string, title: string, content: string) => Promise<void>
    deleteNote: (id: string) => Promise<void>
}

export type ThematicsType = {
    id: number;
    name: string;
    slug: string;
    href: string;
    color: string;
    Notes: NotesType[];
}

export type NotesType = {
    id: string;
    title: string;
    content: string,
    slug: string,
    createdAt: Date;
}

export type CreateNoteType = {
    content: string;
    thematicId: number;
}

export const useSidebarStore = create<SidebarStoreType>((set) => ({
    isSidebarOpen: false,
    thematics: [],
    setSidebarOpen: () => set((state: { isSidebarOpen: boolean }) => ({isSidebarOpen: !state.isSidebarOpen})),
    setThematics: (thematics: ThematicsType[]) => set({thematics}),
    getThemes: async () => {
        try {
            const response = await getThematics();
            set({thematics: response.data});
        } catch (error) {
            console.error('Error fetching thematics data:', error);
        }
    },
    notes: [],
    setNotes: (notes: NotesType[]) => set({notes}),
    getThematicNotes: async (thematicName: string) => {
        try {
            const response = await getNotes(thematicName);
            set({notes: response.data});
        } catch (error) {
            console.error('Error fetching thematic notes data:', error);
        }
    },
    addNote: async (name: string, title: string, content: string): Promise<any> => {
        try {
            const response = await createNote(name, title, content);
            set((state) => ({notes: [response.data, ...state.notes]}));
            return response;
        } catch (error) {
            console.error('Error creating note:', error);
        }
    },
    deleteNote: async (id: string): Promise<any> => {
        try {
            await deleteOneNote(id);
            set((state) => ({notes: state.notes.filter((note) => note.id !== id)}));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }
}));