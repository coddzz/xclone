import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/auth/signup/SignupPage";
import LoginPage from "./pages/auth/signup/LoginPage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/notifications/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "./constants/url.js";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";

const App = () => {
  const { data : authUser, isLoading } = useQuery({
    queryKey : ["authUser"],
    queryFn : async () =>{
      const res = await fetch(`${baseUrl}/api/auth/me`,{
        method : "GET",
        credentials : "include",
        headers : {
          "Content-Types" : "application/json"
        }
      })
      const data = await res.json();
      if(data.error){
        return null //its not a proper way. but it works.
      }
      if(!res.ok){
        throw new Error(data.error || "Something went wrong!")
      }
      console.log("Auth user", data)
      return data;
    },
    retry : false,
    onSuccess : (data) =>{
			console.log(data)
		},
		onError : (error) =>{
			console.log(error.message);
		}
  })

  if(isLoading){
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size = 'lg' />
      </div>
    )
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar/> 
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login"/>} />
        <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>
      {authUser && <RightPanel/>}
      <Toaster/>
    </div>
  );
};

export default App;