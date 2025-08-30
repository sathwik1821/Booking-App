import React from 'react'
import { FOOTER_SECTION } from '@/config/app.config';
import { SOCIAL_LINKS } from '@/config/app.config';
import ICON from '@/lib/icons';


const Footer = () => {
  return (
    <div className='bg-secondary mt-8 sm:mt-16 pt-2 sm:pt-4'>
        <footer className='container pl-16 pr-8 w-full '>
          <div className='flex gap-12 flex-nowrap overflow-x-auto scrollbar   mt-4'>
            {
              FOOTER_SECTION.map((item,sectionIndex)=>(
                <div key={sectionIndex}>
                  <h4 className="font-medium mb-3">{item.title}</h4>
                  <ul className='space-y-0.5 flex flex-col'>
                    {
                      item.links.map((link,index)=>
                      (
                        <a
                          key={link.text + index}
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


        <footer className="bg-brand flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 px-1 sm:px-4">
          <div className="flex justify-center sm:justify-start gap-4 w-full sm:w-auto mb-2 sm:mb-0">
            {SOCIAL_LINKS.map((application, applicationIndex) => {
              const SocialIcon = ICON[application.icon];
              return (
                <a
                  key={applicationIndex}
                  href={application.href}
                  className="flex-1 sm:flex-none flex justify-center"
                >
                  {SocialIcon && (
                    <SocialIcon className="text-white h-5 w-5 hover:opacity-80" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="text-white text-xs sm:text-sm text-center  sm:text-right whitespace-nowrap tracking-tighter sm:tracking-normal overflow-hidden">
            Copyright © 2025 Booking.com - All rights reserved
          </div>
      </footer>
    </div>
  )
}

export default Footer;