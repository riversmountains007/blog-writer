import React, { useCallback,useEffect } from "react";
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/db&storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "./Input";
import Button from "./Button";
import RTE from "./RTE";
import { useGetPostsQuery } from "../RTK-Store/postsApiSlice";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const { data: posts,refetch ,isLoading} = useGetPostsQuery();
    

    console.log(user);
    console.log(user.name);
    

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
              refetch(); // Refetch posts to update the list
                navigate(`/allposts/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: user.$id,
                  userName: user.name });

                if (dbPost) {
                    refetch(); // Refetch posts to update the list
                    navigate(`/allposts/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    if (isLoading) {
      return <h2>Loading...</h2>
    }

    return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
       <div className="flex flex-wrap md:flex-nowrap gap-6 px-2 w-full">
  {/* Left Column (Form Fields) */}
  <div className="w-full md:w-2/3 space-y-6">
    <div className="space-y-4">
      <Input
        label="Title :"
        placeholder="Title"
        className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg transition-all"
        {...register("title", { required: true })}
      />
      
      <Input
        label="Slug :"
        placeholder="Slug"
        className="w-full mb-4 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg transition-all"
        {...register("slug", { required: true })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          });
        }}
      />
    </div>

    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <RTE
        label="Content :"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />
    </div>
  </div>

  {/* Right Column (Sidebar) */}
  <div className="w-full md:w-1/3 space-y-6">
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <Input
        label="Featured Image :"
        type="file"
        className="w-full mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", { required: !post })}
      />
      
      {post && (
        <div className="w-full mb-6">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-lg border max-w-full h-auto"
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="w-full border-gray-300 rounded-l py-2 px-3 text-stone-700"
            {...register("status", { required: true })}
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <Button
          type="submit"
          bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
          className="w-full py-2.5 text-sm font-medium text-white rounded-lg transition-colors"
          innerTxt={post ? "Update" : "Submit"}
        />
      </div>
    </div>
  </div>
</div>
      </form>
    );
}