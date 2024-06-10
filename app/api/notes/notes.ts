import axios from "axios";

export async function getNotes(name: string) {
    return await axios.get(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/notes?name=${name}`);
}

export async function createNote(name: string, title: string, content: string) {
    return await axios.post(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/notes?name=${name}`, {
        title,
        content
    });
}

export async function deleteOneNote(id: string) {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/notes?id=${id}`);
    return response.data;
}