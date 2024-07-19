import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { FaPuzzlePiece } from "react-icons/fa6";
import { TbExchange } from "react-icons/tb";

const Solutions = () => {
    return (
        <div className='w-full min-h-[600px] flex justify-between gap-5 p-[18px] md:p-[32px] flex-col bg-neutral-100'>
            <div className="px-5 py-2 rounded-full bg-black text-white uppercase font-bold max-w-max text-sm">Advantage</div>
            <div className='flex flex-col gap-5 md:flex-row items-center justify-between'>
                <h1 className="w-full lg:w-[50%] text-center md:text-start text-3xl md:text-[40px] xl:text-[60px] leading-none">
                    The ultimate solution for any need
                </h1>
                <Button className='bg-black text-white px-5'>Explore</Button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div className='w-full rounded-[15px] max-h-max p-5 md:p-10 space-y-5 bg-black text-white hover:shadow-xl transition duration-300 cursor-pointer'>
                    <div className='w-10 h-10 md:w-20 md:h-20 flex items-center justify-center bg-white/10 rounded-full'>
                        <TbExchange size={20} className='text-violet-600' />
                    </div>
                    <h2 className='font-bold text-xl'>Seame less setup</h2>
                    <p className='text-sm text-neutral-400 font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam facilis nemo officiis et distinctio vel!</p>
                </div>
                <div className='w-full rounded-[15px] max-h-max p-5 md:p-10 space-y-5 bg-black text-white hover:shadow-xl transition duration-300 cursor-pointer'>
                    <div className='w-10 h-10 md:w-20 md:h-20 flex items-center justify-center bg-white/10 rounded-full'>
                        <Clock className='w-6 h-6 text-rose-500' />
                    </div>
                    <h2 className='font-bold text-xl'>Seame less setup</h2>
                    <p className='text-sm text-neutral-400 font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam facilis nemo officiis et distinctio vel!</p>
                </div>
                <div className='w-full rounded-[15px] max-h-max p-5 md:p-10 space-y-5 bg-black text-white hover:shadow-xl transition duration-300 cursor-pointer'>
                    <div className='w-10 h-10 md:w-20 md:h-20 flex items-center justify-center bg-white/10 rounded-full'>
                        <FaPuzzlePiece size={20} className='text-orange-500' />
                    </div>
                    <h2 className='font-bold text-xl'>Seame less setup</h2>
                    <p className='text-sm text-neutral-400 font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam facilis nemo officiis et distinctio vel!</p>
                </div>
            </div>
        </div>
    )
}

export default Solutions