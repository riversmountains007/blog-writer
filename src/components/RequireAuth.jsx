import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom'



function RequireAuth() {
   

    const location = useLocation()

    console.log('Location Object in reqAuth(Wrapper-Component):', location);

    const { isLoggedIn } = useSelector((st)=>st.auth)

    if (!isLoggedIn) {
        return <Navigate to='/login' state={{from:location}} replace/>
    }

  
  return <Outlet/>
}

export default RequireAuth