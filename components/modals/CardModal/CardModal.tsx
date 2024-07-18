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
import Description from "./Description";
import Actions from "./Actions";


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
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {cardData ?
                                <Description data={cardData} />
                                :
                                <Description.Skeleton />
                            }
                        </div>
                    </div>
                    <div>
                        {!cardData ?
                            <Actions.Skeleton />
                            :
                            <Actions data={cardData} />
                        }
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CardModal;
