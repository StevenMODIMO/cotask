import React from 'react'

export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className='py-4 px-2 sm:p-6'>{children}</div>
    )
}
