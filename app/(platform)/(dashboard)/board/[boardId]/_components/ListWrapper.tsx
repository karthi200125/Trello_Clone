import React from 'react'

interface ListWrapperProps {
    children: React.ReactNode
}

const ListWrapper = ({ children }: ListWrapperProps) => {
    return (
        <div className='shrink-0 h-full w-[272px] select-none'>
            {children}
        </div>
    )
}

export default ListWrapper