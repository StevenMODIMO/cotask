import React from 'react'

export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className='py-4 px-2 sm:p-6 md:py-2 lg:px-0'>{children}</div>
    )
}
