import {THEMATICS_SLUG_TO_NAME} from "@/utils/thematicSlugToName";



type Props = {
    params: { name: string }
}

export function generateMetadata(
    {params}: Props,
): any {
    // read route params
    const THEMATIC_IN_PATH = params.name


    const THEMATIC_NAME: string = THEMATICS_SLUG_TO_NAME[THEMATIC_IN_PATH]

    return {
        title: THEMATIC_NAME,
        openGraph: {
            title: THEMATIC_NAME,
            description: 'This is a thematic page',
        },
    }
}

export default function ThematicLayout({
                                           children,
                                           params
                                       }: Readonly<{
    children: React.ReactNode;
    params: { name: string }
}>) {

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
}
