import React from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
      <>
          <Header />
          <main>
              
            <Outlet />  {/* childern component render here */}
              
           </main>
          <Footer />
      </>
  )
}

export default Layout

