'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { LayoutDashboardIcon, Menu, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion, useScroll } from 'motion/react'
import { ModeToggle } from '../theme-toggle-button'
import { authClient } from '@/lib/auth-client'
import { set } from 'zod'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logout } from '../logout'
import { ThemeToggle } from '../tiptap-templates/simple/theme-toggle'

const menuItems = [
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Features', href: '#features' },
    
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [isUser, setIsUser] = React.useState(false)
    const [user, setUser] = React.useState<{ name: string } | null>(null)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const checkUser = async () => {
            const user = (await authClient.getSession()).data?.user
            setIsUser(!!user)
            setUser(user || null)
        }
        checkUser()
    }, [])

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn('fixed z-20 w-full border-b transition-colors duration-150', scrolled && 'bg-background/50 backdrop-blur-3xl')}>
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                Notes
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col items-center space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <ThemeToggle />
                                <AnimatePresence mode="wait">
                                    {isUser ? (
                                        <motion.div
                                            key="user"
                                            initial={{ opacity: 0}}
                                            animate={{ opacity: 1}}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            <UserProfileMenu name={user?.name || "User"} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="auth"
                                            className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit"
                                            initial={{ opacity: 0}}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            <Button asChild variant="outline" size="sm">
                                                <Link href="/login">
                                                <span>Login</span>
                                                </Link>
                                            </Button>
                                            <Button asChild size="sm">
                                                <Link href="/signup">
                                                <span>Sign Up</span>
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    )}
                                    </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const UserProfileMenu = ({ name }: { name: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant='ghost' className='px-3 py-1.5'>
                    <div className='flex items-center gap-2'>
                        <User className='size-5' />
                        <span className='hidden sm:inline-block'>{name}</span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={"/dashboard"} className='flex gap-3 items-center'>
                        <LayoutDashboardIcon />
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='p-0'>
                    <Logout className='w-full m-0' variant='ghost'/>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
