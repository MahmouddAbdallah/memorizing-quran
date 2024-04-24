import React from 'react'
import { AwardIcon, ComptitionIcon, FollowUpIcon, GroupIcon, PlansIcon, TestIcon } from './icons'

const Advantage = () => {
    const advantageItems = [
        {
            id: 1,
            title: 'متابعة مستمرة',
            desc: 'نلتزم بتوفير تجربة فريدة تتيح للمستخدمين الاستمرارية في رحلتهم لتحفيظ القرآن الكريم.',
            icon: <FollowUpIcon className='fill-white w-16 h-16' />
        },
        {
            id: 2,
            title: 'خطط للحفظ بإتقان',
            desc: 'نقدم للمستخدمين الأدوات والموارد اللازمة لوضع خطط فعّالة ومنظمة لتحفيظ القرآن بإتقان.',
            icon: <PlansIcon className='fill-white w-16 h-16' />
        },
        {
            id: 3,
            title: 'حصص فردية أو جماعية',
            desc: 'نوفر للمستخدمين خيارات متعددة للتعلم والتحفيظ، سواء كانوا يفضلون الحصص الفردية أو الحصص الجماعية.',
            icon: <GroupIcon className='fill-white w-16 h-16' />
        },
        {
            id: 4,
            title: 'جوائز للمتميزين',
            desc: 'لتحفيز المستخدمين وتشجيعهم على تحقيق أهدافهم في تحفيظ القرآن الكريم من خلال تقديم جوائز ومكافآت للأداء المتميز.',
            icon: <AwardIcon className='fill-white w-16 h-16' />
        },
        {
            id: 5,
            title: 'مسابقات',
            desc: 'ننظم مجموعة متنوعة من المسابقات التي تهدف إلى تحفيز وتشجيع المستخدمين على تحسين مهاراتهم في تحفيظ القرآن الكريم.',
            icon: <ComptitionIcon className='fill-white w-16 h-16' />
        },
        {
            id: 6,
            title: 'اختبارات مستمرة',
            desc: 'نقدم سلسلة من الاختبارات المستمرة التي تهدف إلى تقييم تقدم المستخدمين في تحفيظ القرآن الكريم وفهمه.',
            icon: <TestIcon className='fill-white w-16 h-16' />
        },
    ]
    return (
        <section className='py-10 lg:py-20 p-container'>
            <div className='pb-10 lg:pb-20'>
                <div className="text-center space-y-2">
                    <h2 className='text-blue-500 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-medium'>مزايا الاشتراك</h2>
                    <h2 className='text-xl font-medium sm:text-xl md:text-2xl lg:text-3xl'> في دورة حفظ القرآن الكريم بالتجويد</h2>
                </div>
            </div>
            <div className='grid grid-cols-12 sm:gap-5 lg:gap-7'>
                {
                    advantageItems.map(item => {
                        return (
                            <div key={item.id} className="col-span-12 sm:col-span-6 lg:col-span-4 mt-5 sm:mt-0">
                                <div className="rounded-lg bg-primary py-5 px-5 flex flex-col items-end gap-3 h-56">
                                    <div className='border-2 border-white py-2 px-[6px] rounded-lg '>
                                        {item.icon}
                                    </div>
                                    <div className='text-white space-y-1'>
                                        <h6 className='text-xl'>{item.title}</h6>
                                        <p className='text-sm'>{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Advantage