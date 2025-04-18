"use client"
import React, { useState } from 'react'  // ✅ Correct
import Link from 'next/link'

const Navbar = ({ logBtnTxt, logBtnFunction }) => {
  return (
    <nav className='bg-gray-800 flex justify-between items-center px-4 h-14'>
      <Link href="/">
          V-Connect
      </Link>

      {/* features */}
      <div className='flex justify-between items-center gap-3'>
        <Link href="/lost-items">
          <div className='px-3 py-1 rounded-lg hover:bg-gray-700 cursor-pointer'>Lost Items</div>
        </Link>

        <Link href="/clg-events">
          <div className='px-3 py-1 rounded-lg hover:bg-gray-700 cursor-pointer'>Events</div>
        </Link>
        
        <Link href="/notes">
          <div className='px-3 py-1 rounded-lg hover:bg-gray-700 cursor-pointer'>Notes</div>
        </Link>
        
        <Link href="/social">
          <div className='px-3 py-1 rounded-lg hover:bg-gray-700 cursor-pointer'>Social</div>
        </Link>

        <div className='px-3 py-1 rounded-lg hover:bg-gray-700 cursor-pointer' onClick={() => logBtnFunction()}>{logBtnTxt}</div>
      </div>
    </nav>
  )
}

export default Navbar
