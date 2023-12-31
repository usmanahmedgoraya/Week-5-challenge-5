/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import PinInput from 'react-pin-input';
import { useNavigate } from "react-router-dom"


const ActivateUser = () => {
  const [value, setValue] = useState("")
  const [data, setData] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const signupData = localStorage.getItem('signup').split(",");
    setData(signupData[1])
  }, [])
  

  const handleVerify = async () => {
    const signupData = localStorage.getItem('signup').split(",");
    const token = signupData[2]
    if (token) {
      const res = await fetch('https://week-5-challenge-5-backend.vercel.app/api/auth/activate-user', {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ activationToken: token, activationCode: value })
      })
      const result = await res.json();
      // console.log()
      
      localStorage.removeItem("signup")
      localStorage.setItem("token", token)
      if (localStorage.getItem("token")) {
        navigate("/")
      }
    }
    else {
      return console.log("Please login or signup")
    }
  }
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className='text-4xl bg-indigo-600 w-full text-white text-center'>Activate User</h1>
      <p className='text-xl font-bold my-7 tracking-wider'>{data}</p>
      <PinInput
        length={4}
        initialValue=""
        secret
        secretDelay={200}
        onChange={(value) => { setValue(value) }}
        type="numeric"
        inputMode="number"
        style={{ padding: '10px', borderRadius: "10px" }}
        inputStyle={{ borderColor: 'red' }}
        inputFocusStyle={{ borderColor: 'blue' }}
        onComplete={(value) => { setValue(value) }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <button onClick={handleVerify} className="rounded-xl px-5 py-3 text-base font-medium bg-slate-100 text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 my-4">Verify Code</button>

    </div>
  )
}

export default ActivateUser