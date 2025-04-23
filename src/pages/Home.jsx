import React, { useEffect, useState } from 'react'
import authService from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../RTK-Store/authSlice'
import Allposts from './Allposts'

function Home() {

    const [isloading,setIsLoading] = useState(false)
    const dispatch = useDispatch()

  const { isLoggedIn } = useSelector((st)=>st.auth)

    useEffect(()=>{
        authService.getCurrentUser()
        .then((userData)=>{
            if(userData){
                dispatch(login(userData))
            }else{
                dispatch(logout())
            }
        })
        .catch(err =>console.error(err))

        .finally(()=>setIsLoading(false))
    },[])

    if(isloading){
        return <h2>Loading....</h2>
    }

    if(!isLoggedIn){
        return <h2>PLease login to see Posts</h2>
    }
  return (
    <>
    <div>Home</div>
    <Allposts/>
    </>
  )
}

export default Home