/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { MdFlashOn } from "react-icons/md";
import { Link } from 'react-router-dom';


function Nothing({msg1, msg2}) {
  return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-full backdrop-blur-lg bg-black/5 rounded-md min-h-[200px] flex flex-col justify-center items-center'>
                <div className="h-20 w-20 bg-orange-100 rounded-full flex justify-center items-center">
                    <MdFlashOn size={32} className='text-[#04af7c]' />
                </div>
                <div className='text-xl font-bold tracking-wider text-center mt-2 capitalize text-white w-full'>{msg1}</div>
                {msg2&&<div className='text-md font-semibold tracking-wider text-center capitalize text-[#04af7c] underline w-full '><Link>{msg2}</Link></div>}
            </div>




        </div>
  )
}

export default Nothing