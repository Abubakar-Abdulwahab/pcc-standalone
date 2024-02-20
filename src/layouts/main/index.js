import React from 'react'
import MainNavbar from './MainNavbar';

export default function MainLayout({children}) {


  return (
    <>
      <MainNavbar />
      <div>
        {children}
      </div>
    </>
  );
}
