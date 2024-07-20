"use client"
import Link from 'next/link'
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { usePathname } from 'next/navigation'

interface Props{

}

interface Link{
    label: string,
    href: string,
}

export default function MainNav({}: Props): JSX.Element{

    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const pathname = usePathname();

    const mobileMenuOpenTransition = useTransition(mobileMenuOpen, {
        from: {transform: 'translate(0%, -100%)'},
        enter: {transform: 'translate(0%, 0%)'},
        leave: {transform: 'translate(0%, -100%)'}
    });

    const links: Link[] = [
        {
            label: '🛒\xa0\xa0Shop',
            href: '/'
        },
        {
            label: 'Recipes',
            href: '/recipes'
        },
        {
            label: 'Ingredients',
            href: '/ingredients'
        },
    ];


    return(
    <>
        <div className={`w-full flex items-center justify-start relative h-[70px] border-grey border-b-[2px]`}>
            
            {/* Desktop: */}
            <div className={`items-center justify-center gap-8 h-full hidden md:flex relative pl-10`}>
                {links.map((link, index) : JSX.Element =>{
                    return(
                        <Link key={index} href={link.href} className={`flex h-full p-4 items-center justify-center cursor-pointer relative text-green-dark ${pathname.toLowerCase() === link.href.toLowerCase() ? 'font-bold' : ''}`}>
                            <div className={`absolute w-full h-full left-0 top-[2px] border-green ${pathname.toLowerCase() === link.href.toLowerCase() ? 'border-b-[5px]' : ''}`} />
                            {link.label}
                        </Link>
                    );
                })}
            </div>
            <div className={`absolute top-0 left-0 w-full h-full hidden md:flex items-center pr-10 pointer-events-none justify-end`}>
                <h1 className={`text-yellow font-bold`}>The Shop Drop</h1>
            </div>


            {/* Mobile: */}
            <div className={`h-full w-full flex md:hidden items-center px-4 relative`}>
                <div onClick={()=>{setMobileMenuOpen((prev)=>{return !prev;});}} className={`cursor-pointer`}>
                    <IoMenu 
                        size={30} 
                        className='text-grey'
                    />
                </div>
                <div className={`absolute w-full h-full flex justify-center items-center left-0 top-0 pointer-events-none`}>
                    <h1 className={`text-yellow font-bold`}>The Shop Drop</h1>
                </div>

                <div 
                    className={`absolute overflow-hidden z-50 left-0 top-[70px]`}
                    style={{
                        width:'100vw',
                        height: 'calc(100dvh - 70px)',
                        pointerEvents: mobileMenuOpen ? 'auto' : 'none'
                    }} 
                >
                {
                    mobileMenuOpenTransition((style, item)=>{
                        return(
                            item && <animated.div 
                                className={`w-full h-full bg-[#f6f6f6] flex flex-col p-10 gap-8`}
                                style={{
                                    ...style,
                                }} 
                                
                            >
                                {links.map((link, index) : JSX.Element =>{
                                    return(
                                        <Link onClick={()=>{setMobileMenuOpen(false);}} key={index} href={link.href} className={`pl-2 cursor-pointer text-green-dark ${pathname.toLowerCase() === link.href.toLowerCase() ? 'font-bold border-l-4 border-green' : ''}`}>
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </animated.div>
                        );
                    })
                }
                </div>


            </div>
        </div>
    </>
    );
}