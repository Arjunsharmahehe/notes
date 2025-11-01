import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { Neon } from '../ui/svgs/neon'
import { DrizzleOrmLight } from '../ui/svgs/drizzleOrmLight'
import { DrizzleOrmDark } from '../ui/svgs/drizzleOrmDark'
import { ResendIconBlack } from '../ui/svgs/resendIconBlack'
import { NextjsLogoLight } from '../ui/svgs/nextjsLogoLight'
import { Tailwindcss } from '../ui/svgs/tailwindcss'
import { BetterAuthDark } from '../ui/svgs/betterAuthDark'
import { ShadcnUi } from '../ui/svgs/shadcnUi'
import { ShadcnUiDark } from '../ui/svgs/shadcnUiDark'
import { Typescript } from '../ui/svgs/typescript'
import { Vercel } from '../ui/svgs/vercel'

export default function LogoCloud() {
    return (
        <section className="bg-background overflow-hidden py-16">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">Built using</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            <div className="flex h-fit">
                                <Neon className='size-7 mx-auto' />
                            </div>

                            <div className="flex relative">
                                <DrizzleOrmLight className='size-10 mx-auto dark:scale-0' />
                                <DrizzleOrmDark className='size-10 mx-auto scale-0 dark:scale-100 absolute inset-0' />
                            </div>
                            <div className="flex">
                                <ResendIconBlack className='size-10 mx-auto dark:invert' />
                            </div>
                            <div className="flex">
                                <NextjsLogoLight className='size-10 mx-auto dark:invert mb-4' />
                            </div>
                            <div className="flex">
                                <Tailwindcss className='size-9 mx-auto' />
                            </div>
                            <div className="flex">
                                <BetterAuthDark className='size-10 mx-auto dark:invert' />
                            </div>
                            <div className="flex relative">
                                <ShadcnUi className='size-9 mx-auto scale-100 dark:scale-0' />
                                <ShadcnUiDark className='size-9 mx-auto scale-0 dark:scale-100 absolute inset-0' />
                            </div>

                            <div className="flex">
                                <Typescript className='size-8 mx-auto' />
                            </div>

                            <div className='flex'>
                                <Vercel className='size-8 mx-auto dark:invert' />
                            </div>
                        </InfiniteSlider>

                        <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
