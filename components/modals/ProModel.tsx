'use client'

import useProModal from "@/hooks/useProModel"
import { Dialog, DialogContent } from "../ui/dialog"
import Image from "next/image";
import { Button } from "../ui/button";
import { stripeRedirect } from "@/actions/StripeRedirect/intex";
import { useAction } from "@/hooks/useActions";
import { toast } from "sonner";

const ProModel = () => {

    const proModel = useProModal();

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data
        },
        onError: (error) => {
            toast.error(error)            
        }
    })

    const onClick = () => {
        execute({})
    }

    return (
        <Dialog
            open={proModel.isOpen}
            onOpenChange={proModel.onClose}
        >
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="aspect-video relative flex items-center justify-center">
                    <Image
                        src=''
                        alt=""
                        className="object-cover"
                        fill
                    />
                </div>
                <div className="text-neutral-700 mx-auto space-y-6 p-6">
                    <h2 className="font-semibold text-xl">
                        Upgrade to bordboard pro today
                    </h2>
                    <p className="text-xs font-semibold text-neutral-600">
                        explore the best of BirdBoard
                    </p>
                    <div className="pl-3">
                        <ul className="text-sm list-disc">
                            <li>Unlimted Boards</li>
                            <li>Advanced Checklist</li>
                            <li>Admin and secuirity features</li>
                            <li>And more!</li>
                        </ul>
                    </div>
                    <Button
                        onClick={onClick}
                        disabled={isLoading}
                        className="w-full"
                        variant='primary'
                    >
                        Upgrade
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProModel