import React from 'react'

const LoadingCard = () => {
    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-slate-100 h-[420px] animate-pulse mt-10 sm:mt-0">
            <div className="flex flex-col gap-5 py-5 items-center">
                <div className="w-40 h-40 bg-slate-200 rounded-full" />
                <div className="w-40 h-5 bg-slate-200 rounded" />
                <div className="w-52 h-5 bg-slate-200 rounded" />
                <div className="w-44 h-5 bg-slate-200 rounded" />
                <div className="w-60 h-5 bg-slate-200 rounded" />
            </div>
        </div>
    )
}

export default LoadingCard