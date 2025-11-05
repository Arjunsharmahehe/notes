import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Code, NotebookIcon, ShieldCheck } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section id='features' className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Crafted for productivity gurus</h2>
                    <p className="mt-4">Smart, flexible, powerful - could be your second brain</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    <Card className="group shadow-zinc-950/5 bg-background">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <NotebookIcon
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Quick Notes</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Capture your thoughts instantly with quick notes, designed for speed and efficiency.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 bg-background">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Code
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Developer Friendly</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm">Markdown, codeblocks, and other developer-friendly features make it easy to integrate into your workflow.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-zinc-950/5 bg-background">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <ShieldCheck
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Secure by design</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm">Your notes are local first, with optional end-to-end encryption for enhanced security.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
