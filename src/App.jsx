import { Routes,Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Allposts from './pages/Allposts'
import Addpost from './pages/Addpost'
import Register from './pages/Register'
import RequireAuth from './components/RequireAuth'
import EditPost from './pages/EditPost'
import PostDetails from './pages/PostDetails'


function App() {
  
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route element= {<RequireAuth />}>
          <Route path='allposts' element={<Allposts />} />           
          <Route path='allposts/:slug' element={<PostDetails />} />           
          <Route path='addpost' element={<Addpost />} />
          <Route path='edit-post/:slug' element={<EditPost />} />
        </Route>

        <Route path='*' element = {<NotFound/>} />
        
      </Route>
    </Routes>
  )
}

export default App