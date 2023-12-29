import React from 'react'
import OrgControl from './_components/OrgControl'

const OrganixationIdLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <OrgControl/>
            {children}
        </>
    )
}

export default OrganixationIdLayout