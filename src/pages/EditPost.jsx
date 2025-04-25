import React, { useEffect, useState } from 'react'
import { useNavigate ,useParams} from 'react-router-dom'
import appwriteService from '../appwrite/db&storage'
import PostForm from '../components/PostForm'


function EditPost() {
 const [post, setPost] = useState(null)
 const {slug} = useParams()
 const navigate = useNavigate()

 useEffect(() => {
    if (slug) {
        appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post)
        else navigate('/')
        })
    } else navigate('/')
    },[slug, navigate]
)

  return (
    <div className='px-4 py-8'>
      <h1 className='text-center'>EditPost</h1>
      {post && (
        <PostForm post={post}/>
      )}
    </div>
  );
}

export default EditPost