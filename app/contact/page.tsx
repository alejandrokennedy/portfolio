import AppShellMobile from '@/components/AppShellMobile/AppShellMobile'
import { ContactUs } from '@/components/ContactUs/ContactUs'
import React from 'react'


export const metadata = { title: 'Contact' };

const Contact = () => {
  return (
    <AppShellMobile>
      <ContactUs />
    </AppShellMobile>
  )
}

export default Contact