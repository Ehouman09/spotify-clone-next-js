'use client';

import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Box from './Box';
import { SidebarItem } from './SidebarItem';


interface SidebarProps {
    children: React.ReactNode;
}




const Sidebar: React.FC<SidebarProps> = ({
    children
}) => {


    const pathname = usePathname();

    const routes = useMemo(() => [
            {
                label: 'Home',
                icon: HiHome,
                active: pathname !== '/search',
                href: '/'
            },
            {
                label: 'Search',
                icon: BiSearch,
                active: pathname === '/search',
                href: '/search'
            }
        ], [ pathname ]);

  return (
    <div className='flex h-full'>
      <div className="
        hidden 
        md:flex
        flex-col
        gap-y-2
        bg-black
        h-full
        w-[300px]
        p-2
      ">
        <Box>
            <div className="
                flex
                flex-col
                gap-y-4
                px-4
                py-4
            ">
                {
                    routes.map((item) => (
                        <SidebarItem 
                            key={item.label}
                            {...item}
                        />
                    ))
                }
            </div>
        </Box>
        <Box className='overflow-y-auto h-full'>
            Song Library
        </Box>
      </div>
    </div>
  )
}

export default Sidebar;
