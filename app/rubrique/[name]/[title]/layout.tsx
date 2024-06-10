import prisma from "@/lib/prisma";
import Heading from "@/app/components/molecules/Heading";

type Props = {
    params: { name: string, title?: string }
}

export async function generateMetadata(
    {params}: Props,
): Promise<any> {
    // read route params
    const NOTE_IN_PATH = params.title

    const noteTitle = await prisma.note.findUnique({
        where: {
            slug: NOTE_IN_PATH
        },
        select: {
            title: true
        }
    })

    return {
        title: noteTitle?.title + " | JR Rocket",
        openGraph: {
            title: NOTE_IN_PATH,
            description: 'This is a note page',
        },
    }

}

export default function ThematicLayout({
                                           children,
                                           params
                                       }: Readonly<{
    children: React.ReactNode;
    params: { title: string }
}>) {

    return (
        <div>
            {children}
        </div>
    );
}
