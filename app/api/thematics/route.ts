import prisma from "@/lib/prisma";

export async function GET() {

    const thematics = await prisma.thematic.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            color: true,
            href: true,
            Notes: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })

    return Response.json(thematics)
}