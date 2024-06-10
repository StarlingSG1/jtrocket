import axios from "axios";

export async function getOneNote(slug: string) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/notes/${slug}`);
    return response.data;
}

