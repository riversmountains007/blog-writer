import React from 'react'
import Header from './Header'
import Footer from './Footer'
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

