/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  let navigate = useNavigate();

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
      // console.log(result);
    }
  }
  const handleSubmit = async () => {
    const res = await fetch('https://week-5-challenge-5-backend.vercel.app/api/auth/login', {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    const result = await res.json();
    // console.log(result.token)
    localStorage.setItem("token", result.token);
    getUser()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input autocomplete="off" id="email" name="email" type="text" className="peer pt-8 pb-3 placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" onChange={handleInputChange} />
                  <label for="email" className="absolute left-0 -top-9 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                </div>
                <div className="relative">
                  <input autocomplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 pt-8 pb-3 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" onChange={handleInputChange} />
                  <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"  >Password</label>
                </div>
                <div className="relative">
                  <button className="bg-cyan-500 text-white rounded-md px-2 py-1" onClick={handleSubmit}>Login</button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            Not Registered? <Link to={"/sign-up"} className="text-base tracking-wider font-bold ml-2 mr-1 hover:underline cursor-pointer">Signup</Link> Now!
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