import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-full flex-col items-center justify-center dark:bg-gray-400 dark:text-black bg-black text-white'>
            {children}
        </div>
    )
}
