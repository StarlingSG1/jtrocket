import prisma from "@/lib/prisma";

export async function GET(req: Request, {params}: {params: {slug: string}}){
    const note = await prisma.note.findFirst({
        where: {
            slug: params.slug
        }
    })
    return Response.json(note)
}

