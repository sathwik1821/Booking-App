import React from 'react'
import { FOOTER_SECTION } from '@/config/app.config';
import { SOCIAL_LINKS } from '@/config/app.config';
import ICON from '@/lib/icons';


const Footer = () => {
  return (
    <div className='bg-secondary mt-16 pt-4'>
        <footer className='container pl-16 pr-8 w-full '>
          <div className='flex gap-12 flex-nowrap overflow-x-auto   mt-4'>
            {
              FOOTER_SECTION.map((item,sectionIndex)=>(
                <div key={sectionIndex}>
                  <h4 className="font-medium mb-3">{item.title}</h4>
                  <ul className='space-y-0.5 flex flex-col'>
                    {
                      item.links.map((link,index)=>
                      (
                        <a
                          href={link.href || '#'}
                          className="hover:underline text-gray-500"
                          >
                          {link.text}
                        </a>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </div>
        </footer>


        <footer className="bg-brand  flex flex-nowrap py-2">
          <div className="container flex items-center  gap-3 ml-10">
            {SOCIAL_LINKS.map((application, applicationIndex) => {
              const SocialIcon = ICON[application.icon];
              return (
                <a
                  key={applicationIndex}
                  href={application.href}
                >
                  {SocialIcon && (
                    <SocialIcon className="text-white h-4 w-4 hover:opacity-80" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="text-white text-sm whitespace-nowrap mr-10">
            Copyright © 2025 Booking.com - All rights reserved
          </div>
      </footer>
    </div>
  )
}

export default Footer;