'use client'

import { Button } from "@/components/ui/button";
import UseMobileSidebar from "@/hooks/usemobilesidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const MobileSidebar = () => {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const onOpen = UseMobileSidebar((state) => state.onOpen);
    const onClose = UseMobileSidebar((state) => state.onClose);
    const isOpen = UseMobileSidebar((state) => state.isOpen);

    useEffect(() => {
        setIsMounted(true);
        if (isMounted) onClose();
    }, [pathname, isMounted]);

    if (!isMounted) return null;

    return (
        <>
            <Button className="block md:hidden mr-2" onClick={onOpen} variant='ghost' size='sm'>
                <Menu className="h-4 w-4" />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="p-2 pt-10">
                    <Sidebar storageKey="-t-sidebar-mobile-state" />
                </SheetContent>
            </Sheet>
        </>
    );
};

export default MobileSidebar;