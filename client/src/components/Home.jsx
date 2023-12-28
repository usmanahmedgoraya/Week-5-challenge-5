/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Todo from "./Todo/Todo";

const Home = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem('token');

  useEffect(() => {
    const getUser = async() =>{
      if(!token){
        return navigate("/login");
      } else {
        const res = await fetch('https://week-5-challenge-5-backend.vercel.app/api/auth/sign-in',{
          method:"post",
          headers:{
            "content-type":"application/json",
            "token":token
          }
        })
        if(!res){
          return navigate("/login");
        }
        const result= await res.json()
        console.log(result);
      }
    }
    getUser()
  }, [token])
  
  return (
    <div className="dark:bg-gray-800  ">
      <Header/>
      <Todo/>
    </div>
  )
}

export default Home