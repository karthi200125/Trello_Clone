import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {

    const FAQs = [
        {
            id: 1,
            question: "Does Taskify offer premium or free plans?",
            answer: "Taskify offers both free and premium plans. The free plan includes basic FAQ, while the premium plan offers advanced functionalities and additional storage.",
        },
        {
            id: 2,
            question: "How can I create a new task board in Taskify?",
            answer: "To create a new task board, click on the 'New Board' button on the dashboard, enter the board name, and customize your board by adding lists and tasks.",
        },
        {
            id: 3,
            question: "Can I collaborate with my team members on Taskify?",
            answer: "Yes, Taskify allows team collaboration. You can invite team members to your boards, assign tasks, and work together in real-time.",
        },
        {
            id: 4,
            question: "Is my data secure on Taskify?",
            answer: "Taskify takes data security seriously. We use encryption and other security measures to ensure that your data is safe and protected.",
        },
        {
            id: 5,
            question: "Does Taskify integrate with other tools?",
            answer: "Yes, Taskify integrates with various third-party tools like Slack, Google Drive, and Calendar to enhance your productivity and streamline your workflow.",
        },
        {
            id: 6,
            question: "How do I upgrade to a premium plan on Taskify?",
            answer: "To upgrade to a premium plan, go to your account settings, select 'Upgrade Plan,' and choose the premium plan that best suits your needs. Follow the prompts to complete the payment process.",
        },
    ];


    return (
        <div className="w-full min-h-[600px] p-[18px] md:p-[32px] flex items-start justify-between flex-col lg:flex-row gap-10">
            <div className='w-full lg:flex-1 space-y-10 flex items-center justify-center md:items-start flex-col'>
                <div className="px-5 text-sm py-2 rounded-full bg-black text-white font-bold max-w-max">FAQs</div>
                <h1 className="text-center md:text-start text-3xl md:text-[40px] xl:text-[60px] leading-none">
                    Frequently asked questions
                </h1>
                <p className="text-sm">More questions? <b className="text-blue-500 underline">  Contact us</b></p>
            </div>

            <div className='w-full lg:flex-1 flex flex-col gap-2'>
                {FAQs?.map((faq) => (
                    <Accordion type="single" collapsible className="w-full border-[1px] border-solid border-neutral-200 rounded-xl px-4" key={faq.id}>
                        <AccordionItem value="item-1" >
                            <AccordionTrigger className="underline-none">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-neutral-400 text-sm">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>
    )
}

export default FAQ