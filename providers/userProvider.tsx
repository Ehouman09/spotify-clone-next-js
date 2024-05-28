'use client';

import { MyUserContextProvider } from "@/hooks/useUser";
import { FC } from "react";
interface  UserProviderProps {
    children: React.ReactNode;
};

export const UserProvider: FC<UserProviderProps> = ({
    children
}) => {
    return (
        <MyUserContextProvider>
            { children }
        </MyUserContextProvider>
    );
}
