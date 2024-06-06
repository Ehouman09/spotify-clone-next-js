"use client";


import { AuthModal } from "@/components/AuthModal";
import { SubscribeModal } from "@/components/SubscribeModal";
import UploadModal from "@/components/uploadModal";
import { ProductsWithPrice } from "@/types";
import { FC, useEffect, useState } from "react";

interface ModalProviderProps {
    products: ProductsWithPrice[]
};

export const ModalProvider: FC<ModalProviderProps> = ({
    products
}) => {

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
           <SubscribeModal products={ products } />
        </>
    );
}
