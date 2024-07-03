import React from 'react'
import image from '../../../../assets/astronaut.webp'

export default function TopBar() {
  return (
    <div className='border-b-primary-100 border-b px-[1vw] py-4'>
      <div className="flex justify-between items-center">
        <div className="">
          <span className="text-2xl space-x-1 tracking-wide font-semibold text-primary">Hello, Admin👋</span>
        </div>
        <div className="p-[3px] rounded-full border-[2px] border-primary">
          <img src={image} alt="" className="h-11 rounded-full" loading='lazy'/>
        </div>
      </div>
    </div>
  )
}
