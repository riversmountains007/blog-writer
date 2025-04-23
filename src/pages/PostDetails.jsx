import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/db&storage";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Button from "../components/Button";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth);

    const isAuthor = post && user ? post.userId === user.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post && ( 
        <div className="py-4">
                <div className="w-full  mb-4 relative border rounded-xl p-2">
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold block w-full">{post.title}</h1>
                    </div>
                    <img
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl block w-full h-[300px] object-fit relative"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-26">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3" innerTxt="Edit"/>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} innerTxt="Delete" />
                               
                        </div>
                    )}
                </div>
                
                <div className="browser-css">
                    {parse(post.content)}
                </div>
        </div>
    ) 
}