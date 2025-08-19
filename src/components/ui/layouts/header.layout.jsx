import React from 'react'
import { Button } from '../button';
import { SERVICE_LIST } from '@/config/app.config';
import ICONS from "@/lib/icons";


const Header = () => {
  return (
    <header className="bg-brand pt-0.5 pb-2" >
        <div className='container mx-auto px-4 flex flex-col sm:flex-row sm:items-center mb-4'>
            <div className='logo-wrapper'>
                <a href="#">
                    <img src="./assets/booking.com.svg" alt="logo" style={{height:"4rem", width:"8rem"}} />
                </a>
            </div>
            <div className="oauth flex flex-col sm:flex-row ml-0 sm:ml-auto items-center gap-2 sm:gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
                <button className="text-blue-500 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer transition w-full sm:w-auto">
                    Register
                </button>
                <button className="text-blue-500 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer transition w-full sm:w-auto">
                    Login
                </button>
            </div>



        </div>

        <div className="container mx-auto px-4 flex gap-4 overflow-x-auto scrollbar">
            
            {SERVICE_LIST.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
                <Button key={index} className={`bg-transparent hover:bg-white/10 cursor-pointer ${item.active ? "border border-white bg-white/10" : ""}`}>
                    {Icon && <Icon size={18} />}
                    {item.title}
                </Button>
            );
            })}
            
        </div>
    </header>
  )
}

export default Header;