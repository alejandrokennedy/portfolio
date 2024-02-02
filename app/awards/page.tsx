import awards from '../../data/awards.json';

import AppShellMobile from '@/components/AppShellMobile/AppShellMobile'
import React from 'react'

const Awards = () => {
  return (
    <AppShellMobile>
      <div>
        {awards.map(award => (
          <div key={award.title}>{award.title}</div>
        ))}
      </div>
    </AppShellMobile>
  )
}

export default Awards