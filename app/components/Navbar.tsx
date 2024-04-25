'use client'
import Link from "next/link"
import { LogoIcon, PersonCircleIcon } from "./icons"
import Menu from "./Menu"
import { usePathname } from 'next/navigation'
import { useAppContext } from "../context/appContext"

const Navbar = () => {
    const pathname = usePathname();
    const context = useAppContext();

    return (
        !pathname?.includes("dashboard") &&
        <nav className="sticky top-0 z-10">
            <div className="py-3 p-container flex items-center justify-between shadow-md bg-[#faffff]">
                <div >
                    <div className="hidden md:block spacex-2">
                        {
                            context?.user ?
                                <Link href={'/profile'} className="flex items-center gap-2">
                                    <PersonCircleIcon className="w-8 h-8" />
                                    <span>{context.user.name}</span>
                                </Link>
                                :
                                <>
                                    <Link href={'/sign-up'} className=" px-5 bg-primary rounded-md py-2 text-white">
                                        انضم الينا
                                    </Link>
                                    <Link href={'/sign-in'} className=" px-5 rounded-md text-black">
                                        سجل الان
                                    </Link>
                                </>
                        }
                    </div>
                    <Menu />
                </div>
                <div className="flex gap-5">
                    <ul className="flex items-center gap-3">
                        <li className="hidden md:block"><Link href={'/dashboard'}>لوحة التحكم</Link></li>
                        <li className="hidden md:block"><Link href={'/#previousWork'}> الاعمال السابقه</Link></li>
                        <li className="hidden md:block"><Link href={'/'}>الصفحة الرئيسية</Link></li>
                    </ul>
                    <Link className="block" href={'/'}>
                        <LogoIcon className="w-16 h-16 md:w-16 md:h-16" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar