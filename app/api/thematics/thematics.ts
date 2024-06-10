import axios from "axios";

export async function getThematics() {
    return await axios.get(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/thematics`);
}