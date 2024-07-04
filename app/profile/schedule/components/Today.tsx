// import { LiveIcon } from '@/app/components/icons'
// import Link from 'next/link'
// import React from 'react'

// const Today = ({ nextDay, today, timeSlot }: { nextDay: string, today: string, timeSlot: string }) => {

//     function parseTimeString(timeString: string) {
//         let [hours, minutes] = timeString.split(':');
//         let date = new Date();
//         date.setHours(parseInt(hours, 10));
//         date.setMinutes(parseInt(minutes, 10));
//         date.setSeconds(0);
//         date.setMilliseconds(0);
//         return date;
//     }

//     function compareTimes(givenTimeString: string): boolean {
//         let now = new Date();
//         let givenDate = parseTimeString(givenTimeString);

//         if (givenDate > now) {
//             return false;
//         }
//         const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
//         console.log(tenMinutesAgo);

//         if (givenDate >= tenMinutesAgo) {
//             return true;
//         } else {
//             return false;
//         }
//     }


//     console.log(today, nextDay, nextDay != today);

//     const comparisonResult = compareTimes(timeSlot);
//     console.log(comparisonResult);


//     return (
//         <div className='flex items-center justify-center h-96'>
//             <div className='flex flex-col items-center gap-5'>
//                 <div>
//                     <LiveIcon className='w-32 h-32' />
//                 </div>
//                 <div>
//                     {(nextDay != today && !comparisonResult) ?
//                         <div className='px-6 py-2 bg-black/50 text-white rounded-md'>
//                             zoom انضم الي
//                         </div>
//                         :
//                         <Link
//                             href={'https://us05web.zoom.us/j/89275426271?pwd=krCZSGoZbGFEMe3h4P6ztqluenh813.1'}
//                             target='blank'
//                             className='px-6 py-2 bg-blue-500 text-white rounded-md'
//                         >
//                             zoom انضم الي
//                         </Link>
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Today

import { LiveIcon } from '@/app/components/icons'
import { isWithin10Minutes } from '@/app/utils/After10Mintue'
import Link from 'next/link'
import React from 'react'

const Today = ({ nextDay, today, timeSlot }: { nextDay: string, today: string, timeSlot: string }) => {
    const comparisonResult = isWithin10Minutes(timeSlot)
    return (
        <div className='flex items-center justify-center h-96'>
            <div className='flex flex-col items-center gap-5'>
                <div>
                    <LiveIcon className='w-32 h-32' />
                </div>
                <div>
                    {(nextDay == today && comparisonResult) ?
                        <Link
                            href={'https://us05web.zoom.us/j/89275426271?pwd=krCZSGoZbGFEMe3h4P6ztqluenh813.1'}
                            target='blank'
                            className='px-6 py-2 bg-blue-500 text-white rounded-md'
                        >
                            zoom انضم الي
                        </Link>
                        :
                        <div className='px-6 py-2 bg-black/30 text-white rounded-md select-none'>
                            zoom انضم الي
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Today