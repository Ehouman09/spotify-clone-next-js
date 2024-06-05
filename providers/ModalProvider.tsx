"use client";


import { AuthModal } from "@/components/AuthModal";
import { SubscribeModal } from "@/components/SubscribeModal";
import UploadModal from "@/components/uploadModal";
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
           <AuthModal />
           <UploadModal />
           <SubscribeModal />
        </>
    );
}
