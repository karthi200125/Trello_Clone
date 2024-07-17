'use client';

import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import useCardModal from "@/hooks/useCardModel";
import { Fetcher } from "@/lib/Fetcher";
import { CardsWithLists } from "@/types";

import { useQuery } from "@tanstack/react-query";
import Header from "./Header";


const CardModal = () => {
    const id = useCardModal((state) => state.id);
    const isOpen = useCardModal((state) => state.isOpen);
    const onClose = useCardModal((state) => state.onClose);

    const { data: cardData } = useQuery<CardsWithLists>({
        queryKey: ['card', id],
        queryFn: () => Fetcher(`/api/cards/${id}`)
    })

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                {!cardData
                    ? <Header.Skeleton />
                    :
                    <Header data={cardData} />
                }
            </DialogContent>
        </Dialog>
    );
};

export default CardModal;
