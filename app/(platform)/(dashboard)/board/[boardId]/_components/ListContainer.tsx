'use client'

import { ListWithCards } from '@/types';
import ListForm from './ListForm';
import { useEffect, useState } from 'react';
import ListItem from './ListItem';

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {

    const [orderedData, setorderedData] = useState(data)

    useEffect(() => {
        setorderedData(data)
    }, [data])

    return (
        <ol className='flex gap-x-3 h-full'>
            {orderedData?.map((list, i) => {
                return (
                    <ListItem
                        key={list?.id}
                        index={i}
                        data={list}
                    />
                )
            })}
            <ListForm />
            <div className='flex-shrink-0 w-1'>

            </div>
        </ol>
    )
}

export default ListContainer