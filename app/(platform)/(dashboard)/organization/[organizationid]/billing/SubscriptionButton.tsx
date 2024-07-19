'use client'

import { stripeRedirect } from "@/actions/StripeRedirect/intex"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/useActions"
import useProModal from "@/hooks/useProModel"
import { toast } from "sonner"

interface SubscriptionButtonProps {
    isPro: boolean
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {

    const proModel = useProModal()
    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onClick = () => {
        if (isPro) {
            execute({})
        } else {
            proModel.onOpen()
        }
    }

    return (
        <Button
            variant='primary'
            disabled={isLoading}
            onClick={onClick}
        >
            {isPro ? "Manage Subscription" : "Upgrade Subscription"}
        </Button>
    )
}

export default SubscriptionButton