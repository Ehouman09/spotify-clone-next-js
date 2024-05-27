"use client";


import { AuthModal } from "@/components/AuthModal";
import { FC, useEffect, useState } from "react";
interface ModalProviderProps {

};

export const ModalProvider: FC<ModalProviderProps> = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {

        setIsMounted(true);
        
    }, []);

    if (!isMounted) {
        return null;
    }
    
    return (
        <>
           <AuthModal/>
        </>
    );
}
