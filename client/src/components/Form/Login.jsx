/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  let navigate = useNavigate();
  const [loading, setLoading] = useState()

  useEffect(() => {
    getUser()
  }, [])

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    }
    else if (e.target.name === "password") {
      setPassword(e.target.value)
    }
    // console.log(e.target.value)
  }
  // Get User Function
  const getUser = async () => {
    try {
      setLoading(true)
      let token = localStorage.getItem('token');
      if (!token) {
        return navigate("/login");
      } else {
        const res = await fetch('https://week-5-challenge-5-backend.vercel.app/api/auth/sign-in', {
          method: "post",
          headers: {
            "content-type": "application/json",
            "token": token
          }
        })
        if (!res) {
          return navigate("/login");
        }
        const result = await res.json()
        if (!result.user) {
          toast.error('Incorrect Credentials', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        else {
          navigate("/")
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('Somthing Went Wrong', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    finally {
      setLoading(false)
    }
  }
  // console.log(result);
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await fetch('https://week-5-challenge-5-backend.vercel.app/api/auth/login', {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      const result = await res.json();
      console.log(result)
      if (!result.success) {
        toast.error('Please Enter credential correctly', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return
      }
      localStorage.setItem("token", result.token);
      getUser()
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-700 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white dark:bg-cyan-950 dark:text-white shadow-lg sm:rounded-3xl sm:p-20">

          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative ">
                  <input autoComplete="off" id="email" name="email" type="text" className="peer pt-8 pb-3 placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 dark:text-white focus:outline-none focus:borer-rose-600 dark:bg-cyan-950" placeholder="Email address" onChange={handleInputChange} />
                  <label htmlFor="email" className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 dark:peer-placeholder-shown:text-white peer-placeholder-shown:top-1 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-white peer-focus:text-sm">Email Address</label>
                </div>
                <div className="relative">
                  <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 pt-8 pb-3 border-gray-300 text-gray-900 dark:text-white focus:outline-none focus:borer-rose-600 dark:bg-cyan-950" placeholder="Password" onChange={handleInputChange} />
                  <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm dark:peer-placeholder-shown:text-white"  >Password</label>
                </div>
                <div className="relative">
                  <button className="bg-cyan-500 text-white rounded-md px-2 py-1" onClick={handleSubmit}>Login {loading && <BeatLoader className="mx-3" color="#ffffff" size={6} />}</button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            Not Registered? <Link to={"/sign-up"} className="text-base tracking-wider font-bold ml-2 mr-1 hover:underline cursor-pointer dark:text-cyan-500">Signup</Link> Now!
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default Login