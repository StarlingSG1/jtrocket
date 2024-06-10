import {PlusIcon} from "@heroicons/react/20/solid";
import Heading from "@/app/components/molecules/Heading";

type thematicsEquivalent = {
    [key: string]: string
}

type Props = {
    params: { name: string }
}

export function generateMetadata(
    {params}: Props,
): any {
    // read route params

    return {
        title: "Nouvelle note | JT Rocket",
        openGraph: {
            title: "Nouvelle note | JT Rocket",
            description: 'This is a thematic page',
        },
    }
}

export default function NewNoteLayout({
                                           children,
                                           params
                                       }: Readonly<{
    children: React.ReactNode;
    params: { name: string }
}>) {

    return (
        <div>
            {children}
        </div>
    );
}
