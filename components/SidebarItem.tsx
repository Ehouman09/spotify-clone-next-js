import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface  SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
};

export const SidebarItem: FC<SidebarItemProps> = ({
    label, 
    icon,
    active, 
    href
}) => {
    return (
        <Link 
            href={href}
            className={twMerge()}
        >
            SidebarItem
        </Link>
    );
}
