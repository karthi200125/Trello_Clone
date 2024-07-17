'use client';

import { ListWithCards } from '@/types';
import ListForm from './ListForm';
import { useEffect, useState } from 'react';
import ListItem from './ListItem';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useAction } from '@/hooks/useActions';
import { updateListOrder } from '@/actions/UpdateListOrder/intex';
import { toast } from 'sonner';
import { updateCardOrder } from '@/actions/UpdateCardOrder/intex';

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data);

    const { execute: executeUpdateOrder } = useAction(updateListOrder, {
        onSuccess: (data) => {
            toast.success("List Reordered")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: (data) => {
            toast.success("card Reordered")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        // Drop in the same position
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // User moves a list
        if (type === 'list') {
            const items = reorder(
                orderedData,
                source.index,
                destination.index
            ).map((item, index) => ({
                ...item,
                order: index
            }));

            setOrderedData(items);
            // TODO: Add any additional logic, such as saving the new order to the server
            executeUpdateOrder({ items, boardId })
        }

        // user moves card
        if (type === 'card') {
            let newOrdedData = [...orderedData]

            // source and destination list
            const sourceList = newOrdedData.find(list => list.id === source.droppableId)
            const destList = newOrdedData.find(list => list.id === destination.droppableId)

            if (!sourceList || !destList) {
                return;
            }

            // check if cards is exist on this source lust
            if (!sourceList.cards) {
                sourceList.cards = []
            }

            // check if cards is exist on this destlist
            if (!destList.cards) {
                destList.cards = []
            }

            // moving the card to the same list
            if (source.droppableId === destination.droppableId) {
                const reorderCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                )

                reorderCards.forEach((card, index) => {
                    card.order = index
                })

                sourceList.cards = reorderCards

                setOrderedData(newOrdedData)
                executeUpdateCardOrder({
                    boardId: boardId,
                    items: reorderCards
                })
                // user moves th card to another list
            } else {
                // remove card from the source list
                const [movedcard] = sourceList.cards.splice(source.index, 1)

                // assign the new listid yo the moved card
                movedcard.listId = destination.droppableId

                // add card to the destination list
                destList.cards.splice(destination.index, 0, movedcard)

                sourceList.cards.forEach((card, index) => {
                    card.order = index
                })


                // update the order for each card n the desination list
                destList.cards.forEach((card, index) => {
                    card.order = index
                })

                setOrderedData(newOrdedData)
                executeUpdateCardOrder({
                    boardId: boardId,
                    items: destList.cards
                })
                // todo trogger server action
            }

        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-x-3 h-full"
                    >
                        {orderedData?.map((list, i) => (
                            <ListItem key={list.id} index={i} data={list} />
                        ))}
                        {provided.placeholder}
                        <ListForm />
                        <div className="flex-shrink-0 w-1"></div>
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ListContainer;
