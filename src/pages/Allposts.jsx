import React, { useEffect, useState } from 'react'
import appWriteService from '../appwrite/db&storage'
import { Link } from 'react-router-dom'
import ProfileSVG from '../components/svg'
import { useGetPostsQuery } from '../RTK-Store/postsApiSlice'



function Allposts() {

  const { data: posts, isLoading, isError, error } = useGetPostsQuery();

  console.log("Posts from RTK Query:", posts);

  if (isLoading) {
    return <div>
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#fccb06">
      <rect x="50" y="50" width="32" height="32">
        <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.8s" repeatCount="indefinite" />
      </rect>
    </svg>
    <p>Loading...</p>
  </div>
  }

  if (isError) {
    return <div>Error loading posts: {error?.message || 'Something went wrong'}</div>;
  }


  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center">All Posts</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4">
        {posts.map((post) => (
          <Link 
            to={`/allposts/${post.$id}`} 
            key={post.$id} 
            className="hover:no-underline transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="border border-gray-200 p-4 rounded-xl h-full flex flex-col hover:shadow-md">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-video">
                <img
                  src={appWriteService.getFileView(post.featuredImage)}
                  className="w-full h-full object-cover"
                  alt={post.title}
                />
              </div>
      
              {/* Content */}
              <div className="flex flex-col flex-grow ">
                {/* Title */}
                <h2 className="text-lg md:text-xl font-bold text-blue-800 mb-3 line-clamp-2">
                  {post.title}
                </h2>
      
                {/* Author */}
                <div className="flex items-center gap-2 mt-auto">
                  <ProfileSVG />
                  <h4 className="text-sm text-blue-600 font-medium truncate">
                    {post.userName}
                  </h4>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default Allposts