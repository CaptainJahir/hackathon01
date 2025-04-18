"use client"
import React, { useState } from 'react' 
import Link from 'next/link'

const Navbar = ({ logBtnTxt, logBtnFunction }) => {
  return (
    <nav className='bg-gray-800 flex justify-between items-center px-4 h-14'>
      <Link href="/">
      <div className='text-2xl font-semibold flex justify-center items-baseline'>
        <span className='text-red-500 text-[2rem]'>
          V
        </span>
        <span className='font-semibold text-blue-400'>
          C
        </span>
        <span className='text-blue-400'>
          onnect
        </span>
      </div>
      </Link>


      
      <div className='flex justify-center items-center gap-1'>

      <Link href="/lost-found-items">
          <div className='hover:bg-slate-600 px-2 py-1 rounded-md cursor-pointer'>
            Lost and Found Items
          </div>
        </Link>
        
        <Link href="/report-lost-items">
          <div className='hover:bg-slate-600 px-2 py-1 rounded-md cursor-pointer'>
            Report Lost Items
          </div>
        </Link>

        <Link href="/report-found-items">
          <div className='hover:bg-slate-600 px-2 py-1 rounded-md cursor-pointer'>
            Report Found Items
          </div>
        </Link>
        <div className='px-3 py-1 rounded-lg hover:bg-gray-700 cursor-pointer' onClick={() => logBtnFunction()}>{logBtnTxt}</div>
      </div>
    </nav>
  )
}

export default Navbar
