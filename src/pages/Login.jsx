import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as storeLogin } from '../RTK-Store/authSlice'
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import Input from '../components/Input'
import Button from '../components/Button'
import logo from "../../public/blog-writer-logo.jpg"


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(storeLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img
              src={logo}
              alt="Website Logo"
              width="150"
              height="50"
            />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
                      value
                    ) ||
                    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
                },
              })}
            />

            <Button type="submit" className="w-full" innerTxt="Sign in" />
            <h2>or</h2>
          </div>
        </form>

        <button
          onClick={() => authService.loginWithGoogle()}
          className="w-full bg-gray-200 flex items-center justify-center gap-2 px-4 py-2 rounded">
          <img
            src="https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png"
            alt="Google Icon"
            width="20"
            height="20"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Login