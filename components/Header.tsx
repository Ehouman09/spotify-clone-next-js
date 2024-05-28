'use client';

import { useRouter } from "next/navigation";
import { FC } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import  Button  from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
};

export const Header: FC<HeaderProps> = ({
    children,
    className
}) => {

    const router = useRouter();
    const authModal = useAuthModal();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        //TODO: Reset any playing songs 
        router.refresh();

        if (error) {
           toast.error(error.message);
        }else{
            toast.success('Logged out !');
        }
    }


    return (
        <div className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-6
        `,
        className
        )}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button onClick={() => router.back()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretLeft className="text-white" size={25}/>
                    </button>
                    <button onClick={() => router.forward()} className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretRight className="text-white" size={25}/>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white justify-center items-center hover:opacity-75 transition">
                        <HiHome size={20} className="text-black"/>
                    </button>

                    <button className="rounded-full p-2 bg-white justify-center items-center hover:opacity-75 transition">
                        <BiSearch size={20} className="text-black"/>
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {
                        user ? (
                            <div className="flex gap-x-4 items-center">
                                <Button
                                    className="bg-white px-6 py-2"
                                    onClick={ handleLogout }
                                > 
                                    Logout 
                                </Button>
                                <Button
                                className="bg-white"
                                >
                                    <FaUserAlt
                                        onClick={ ()=> router.push('/account')}
                                        className="bg-white"
                                     />
                                </Button>
                            </div>
                        )
                        : (
                        <>
                            <div className="">
                                <Button
                                    className="bg-transparent text-neutral-300 font-medium"
                                    onClick={ authModal.onOpen }
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div className="">
                                <Button
                                    className="bg-white px-6 py-2"
                                    onClick={ authModal.onOpen }
                                >
                                    Login
                                </Button>
                            </div>
                        </>
                        )}
                </div>
            </div>
            { children }
        </div>
    );
}
