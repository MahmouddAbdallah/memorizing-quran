import axios from "axios";
import { cookies } from "next/headers"
import quranImg from '../assets/quran.svg'
import Image from "next/image";
import { CheckIcon } from "./icons";
import LoadingCard from "./LoadingCard";

const SubscribePlan = async () => {
    try {

        const fetchPlans = async () => {
            try {
                const { data } = await axios.get(`/api/plan`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                return data
            } catch (error: any) {
                console.error(error);
            }
        }
        const data = await fetchPlans();
        return (
            <section id='subs' className='py-10 lg:py-20 p-container'>
                <div className='pb-10'>
                    <div className="text-center space-y-2">
                        <h2 className='text-blue-500 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-medium'>خطط الاشتراك الشهرية</h2>
                        <h2 className='text-xl font-medium sm:text-xl md:text-2xl lg:text-3xl'>اطلع علي الخطط الشهرية لاجاد ما يناسبك</h2>
                    </div>
                </div>
                {data?.plans ?
                    <div className="py-10 grid grid-cols-12 sm:gap-5  first:mt-0">
                        {
                            data?.plans?.map((plan: any) => {
                                return (
                                    <div key={plan.id} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                                        <div className="flex flex-col items-center w-full border shadow-md shadow-primary/10 rounded-md mt-5 sm:mt-0">
                                            <div>
                                                <div className=''>
                                                    <Image
                                                        src={quranImg}
                                                        alt=''
                                                        className='w-60'
                                                        height={500}
                                                        width={500}
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-[25px] font-sans font-bold">{plan.price} .EG</h3>
                                                </div>
                                            </div>
                                            <div className="w-full px-5 space-y-5 py-5">
                                                <ul className="w-full space-y-3">
                                                    <li className="flex justify-between items-center ">
                                                        <CheckIcon className="w-4 h-4 stroke-primary" />
                                                        <div className="flex items-center gap-2">
                                                            <span>{plan.duration} للمحاضرة</span>
                                                            <div className="w-2 h-2 bg-primary rounded-full " />
                                                        </div>
                                                    </li>
                                                    <li className="flex justify-between items-center ">
                                                        <CheckIcon className="w-4 h-4 stroke-primary" />
                                                        <div className="flex items-center gap-2">
                                                            <span>{plan.session} للمحاضرة</span>
                                                            <div className="w-2 h-2 bg-primary rounded-full " />
                                                        </div>
                                                    </li>
                                                    <li className="flex justify-between items-center ">
                                                        <CheckIcon className="w-4 h-4 stroke-primary" />
                                                        <div className="flex items-center gap-2">
                                                            <span>{plan.children} </span>
                                                            <div className="w-2 h-2 bg-primary rounded-full " />
                                                        </div>
                                                    </li>
                                                    <li className="flex justify-between items-center ">
                                                        <CheckIcon className="w-4 h-4 stroke-primary" />
                                                        <div className="flex items-center gap-2">
                                                            <span>{plan.student} </span>
                                                            <div className="w-2 h-2 bg-primary rounded-full " />
                                                        </div>
                                                    </li>
                                                </ul>
                                                <button
                                                    className='bg-primary text-sm text-white font-medium py-3 rounded-md w-full flex justify-center items-center'
                                                >
                                                    الاشتراك في هذه الدورة
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })


                        }
                    </div>
                    :
                    <div className="py-20 grid grid-cols-12 sm:gap-5 first:mt-0">
                        {[1, 2, 3, 4].map((item) => {
                            return <LoadingCard key={item} />
                        })
                        }
                    </div>
                }
            </section>
        )
    } catch (error: any) {
        console.error({ error: error?.message });
    }
}

export default SubscribePlan