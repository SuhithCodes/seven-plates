
'use client';

import React, { useState } from 'react';
import LogMealModal from '@/components/logging/log-meal-modal';
import SevenPIcon from '../icons/seven-p-logo';
import ScanLineIcon from '../icons/scan-line-icon';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const NavItems = ({ onLogClick }: { onLogClick: () => void }) => {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState('home');

    const navItems = [
      { id: 'home', name: 'Home', iconClass: 'fi fi-rr-house-chimney', action: () => router.push('/') },
      { id: 'recipes', name: 'Recipes', iconClass: 'fi fi-rr-salad', action: () => {} },
      { id: 'log-meal', name: 'Log Meal', customIcon: true, action: onLogClick },
      { id: 'analysis', name: 'Analysis', iconClass: 'fi fi-rr-stats', action: () => {} },
      { id: 'settings', name: 'Settings', iconClass: 'fi fi-rr-settings', action: () => {} },
    ];

    const handleItemClick = (id: string, action: () => void) => {
        setActiveItem(id);
        action();
    };

    return (
        <>
            {navItems.map((item) => {
                const isActive = activeItem === item.id;
                return (
                <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id, item.action)}
                    className={`
                    relative flex items-center justify-center
                    transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary
                    group 

                    ${isActive 
                        ? 'bg-primary px-4 py-2 rounded-full md:rounded-full md:px-4 md:py-2' 
                        : 'bg-secondary hover:bg-secondary/80 w-14 h-14 rounded-full'
                    }
                    `}
                    aria-label={item.name}
                >
                    {item.customIcon ? (
                        <ScanLineIcon 
                            className={`
                                ${isActive ? 'w-5 h-5' : 'w-6 h-6'}
                                transition-colors duration-300
                                ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                            `}
                        />
                    ) : (
                        <i 
                        className={`
                            ${item.iconClass}
                            ${isActive ? 'text-lg' : 'text-xl'}
                            transition-colors duration-300
                            ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}
                        `} 
                        ></i>
                    )}
                    
                    {/* Active item text - shows on both mobile and desktop */}
                    {isActive && (
                        <span className="
                        ml-2 text-sm font-medium text-primary-foreground whitespace-nowrap
                        md:ml-2
                        ">
                        {item.name}
                        </span>
                    )}
                    
                    {/* Desktop hover tooltip - only shows on inactive items */}
                    {!isActive && (
                        <span className="
                        hidden md:block 
                        absolute left-full ml-4 px-3 py-1.5 
                        text-sm font-medium text-foreground bg-popover rounded-md shadow-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap
                        pointer-events-none 
                        ">
                        {item.name}
                        </span>
                    )}
                </button>
                );
            })}
        </>
    )
}

const ResponsiveNav = () => {
    const { user, loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    if (loading || !user) {
        return null;
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <nav className={`
                fixed bottom-5 left-1/2 -translate-x-1/2 
                flex flex-row items-center justify-center gap-3 p-2 
                bg-black/70 backdrop-blur-lg rounded-full shadow-2xl shadow-primary/10
                z-50

                md:fixed md:left-0 md:top-0 md:bottom-auto md:translate-x-0
                md:flex-col md:h-screen md:w-24
                md:justify-start md:gap-6 md:p-4
                md:bg-card md:border-r md:border-border
                md:shadow-none md:backdrop-blur-none
            `}>

            <div className="hidden md:flex md:items-center md:justify-center md:pt-2 md:pb-8">
              <SevenPIcon className="h-8 w-8 text-primary" />
            </div>
            
            <div className="flex flex-row md:flex-col items-center justify-center gap-3 md:gap-6">
                <NavItems onLogClick={openModal} />
            </div>

            </nav>
            <LogMealModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default ResponsiveNav;
