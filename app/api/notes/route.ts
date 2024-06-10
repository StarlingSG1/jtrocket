import prisma from "@/lib/prisma";
import {NotesType} from "@/app/store/useSidebarStore";
import {getSlug} from "@/app/components/molecules/NoteList";


export async function GET(req: Request) {


    const rawParams = req.url.split('?')[1]
    const thematicName = rawParams.split('=')[1]

    const thematic = await prisma.thematic.findFirst({
        where: {
            slug: thematicName
        }
    })


    if (!thematic) {
        return Response.json({error: 'Thematic not found'}, {status: 404})
    }

    const notes: NotesType[] = await prisma.note.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            slug: true,
            createdAt: true
        },
        where: {
            thematicId: thematic.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return Response.json(notes)
}

export async function POST(req: Request) {
    const rawParams = req.url.split('?')[1]
    const thematicName = rawParams.split('=')[1]

    const thematic = await prisma.thematic.findFirst({
        where: {
            slug: thematicName
        }
    })


    if (!thematic) {
        return Response.json({error: 'Thematic not found'}, {status: 404})
    }

    const newNoteData = await req.json()

    // check youtube url and replace watch by embed and get v= value

    const content = newNoteData.content
    const title = newNoteData.title

    const newNote = await prisma.note.create({
        data: {
            title,
            content,
            slug: getSlug(title),
            thematicId: thematic.id
        }
    })

    if (!newNote) {
        return Response.json({error: 'Error creating note'}, {status: 500})
    }


    return Response.json(newNote)
}

export async function DELETE(req: Request){
    const rawParams = req.url.split('?')[1]
    const noteId = rawParams.split('=')[1]

    const note = await prisma.note.findFirst({
        where: {
            id: noteId
        }
    })

    if (!note) {
        return Response.json({error: 'Note not found'}, {status: 404})
    }

    await prisma.note.delete({
        where: {
            id: note.id
        }
    })

    return Response.json({message: 'Note deleted'})

}