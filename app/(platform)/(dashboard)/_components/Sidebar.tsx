'use client';

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import NavItem, { organization } from "./NavItem";

interface SidebarProps {
    storageKey?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ storageKey = 't-sidebar-state' }) => {

    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});
    const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization();
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({ userMemberships: { infinite: true } });
    const defaultAccordionValue: string[] = Object.keys(expanded)
        .reduce((acc: string[], key: string) => {
            if (expanded[key]) acc.push(key);
            return acc;
        }, []);

    const onExpanded = (id: string) => {
        setExpanded((curr) => ({ ...curr, [id]: !expanded[id] }));
    };

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
            <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-10 w-[50%]" />
                <Skeleton className="h-10 w-10" />
            </div>        
            <div className="space-y-2">
                <NavItem.Skeleton/>
                <NavItem.Skeleton/>
                <NavItem.Skeleton/>
            </div>
            </>
        );
    }

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="pl-4">Workspaces</span>
                <Button asChild type="button" size='sm' variant='ghost' className="ml-auto">
                    <Link href='/selectorg'><Plus className="h-4 w-4" /></Link>
                </Button>
            </div>
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
                {userMemberships.data.map(({ organization }) => (
                    <NavItem key={organization.id} isActive={organization?.id === activeOrganization?.id} isExpanded={expanded[organization.id]} organization={organization as organization} onExpand={onExpanded} />
                ))}
            </Accordion>
        </>
    );
};

export default Sidebar;
