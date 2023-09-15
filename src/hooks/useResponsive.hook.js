import { BREAKPOINTS } from '@utils/responsive';
import { useEffect, useState } from 'react';

export const useResponsive = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isDesktopLarge, setIsDesktopLarge] = useState(false);

    const handleResize = () => {
        const windowWidth = window.innerWidth;

        setIsMobile(windowWidth < BREAKPOINTS.TABLET_MIN);
        setIsTablet(windowWidth >= BREAKPOINTS.TABLET_MIN);
        setIsDesktop(windowWidth >= BREAKPOINTS.DESKTOP_MIN);
        setIsDesktopLarge(windowWidth >= BREAKPOINTS.DESKTOP_LARGE_MIN);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        isMobile,
        isTablet,
        isDesktop,
        isDesktopLarge,
    };
};
