import Image from "next/image";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { Geist, Geist_Mono } from "next/font/google";
import react, { useCallback } from 'react'
import { BiHash, BiHomeCircle, BiImageAlt, BiMoney, BiUser } from "react-icons/bi";
import FeedCard from "@/components/FeedCard";
import { SiOpenjsfoundation } from "react-icons/si";
import { SlOptions } from "react-icons/sl";
import {CredentialResponse, GoogleLogin} from '@react-oauth/google'
import { log } from "console";
import toast from "react-hot-toast";
import { graphql } from "@/gql";
import { graphqlClient } from "@/clients/api";
import { verify } from "crypto";
import { verifyGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";


interface TwitterSidebarButton{
  title:string
  icon: React.ReactNode //an icon is a reactnode
}
const sidebarMenuItems:TwitterSidebarButton[]=[
  {
    title:"Home",
    icon:<BiHomeCircle/>
  },
  {
    title:"Explore",
    icon:<BiHash/>
  },
  {
    title:"Notifications",
    icon:<BsBell/>
  },
  {
    title:"Messages",
    icon:<BsEnvelope/>
  },
  {
    title:"Bookmarks",
    icon:<BsBookmark/>
  },
  {
    title:"Twitter Blue",
    icon:<BiMoney/>
  },
  {
    title:"Profile",
    icon:<BiUser/>
  },
  {
    title:"More Options",
    icon:<SlOptions />
  }
]

export default function Home() {
   const {user}=useCurrentUser();
   const queryClient=useQueryClient()

const handleSelectImage=()=>{
  const input=document.createElement('input')
  input.setAttribute('type','file')
  input.setAttribute('accept','image/*')
  input.click();
}



  const handleLoginwithgoogle=useCallback(async(cred:CredentialResponse)=>{
     const googleToken=cred.credential
     if(!googleToken) return toast.error("Google token not found");
     const {verifyGoogleToken:verifiedUser}=await graphqlClient.request(verifyGoogleTokenQuery,{token:googleToken})
     toast.success("Login successful")
     console.log("Verified user token:",verifiedUser)
     if(verifiedUser) {
      window.localStorage.setItem("userToken",verifiedUser)
     }
     //await queryClient.invalidateQueries(["currentUser"])
},[queryClient])
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-50">
        <div className="col-span-3 pt-1 px-4 ml-2 relative">
          <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-5 cursor-pointer transition-all ">
            <BsTwitter /> 
          </div>
           <div className="mt-1 text-xl  pr-4">
            <ul>
            {sidebarMenuItems.map(item=>
              <li className=" flex justify-start items-center gap-2 hover:bg-gray-800 rounded-full px-5 py-2 w-fit " key={item.title}>
                <span>{item.icon}</span>
                <span>{item.title} </span>
              </li>
            )}
            </ul>
            <div className="mt-4 px-3">
                          <button className="bg-[#1d9bf0] rounded-full text-lg px-4 py-1  font-semibold  w-full ">Tweet</button>

            </div>
           </div>
          {user && <div className="bottom-5 absolute flex gap-2 items-center bg-slate-800 px-1 py-2 rounded-full">
            {user && user.profileImgUrl && <Image src={user?.profileImgUrl} alt="user" height={40} width={40} className="rounded-full"/>}
            <div><h3 className="text-xl">{user.firstName}</h3>
           <h3 className="text-xl">{user.lastName}</h3></div> 

          </div>}
        </div>
        <div className="col-span-6 border-r-[0.5px] h-screen overflow-scroll border-gray-600 border-l-[0.5px] border border-gray-600">
          <div className="border border-b-0 border-l-0 border-r-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer ">
             <div className="grid grid-cols-12 gap-3 ">
                <div className="col-span-1">
                             {user &&  <Image src={user?.profileImgUrl} alt="Profile" className="rounded-full " width={50} height={50} />}
                  </div>
               <div className="col-span-11">
                      <textarea className=" w-full bg-transparent text-xl px-3 border-b border-slate-700" rows={3} placeholder="what's happening?"></textarea>
                      <div className="mt-2 flex justify-between items-center">
                        <BiImageAlt onClick={handleSelectImage} className="text-xl"/>
                        <button className="bg-[#1d9bf0] rounded-full text-sm px-4 py-2  font-semibold  ">Tweet</button>
                      </div>
                      

               </div>
             </div>
          </div>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
        </div>
        {!user && <div className="col-span-3 p-3">
          <div className="border p-5 bg-slate-600 rounded-lg">
            <h1 className="text-xl my-2">New to Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginwithgoogle}/>
          </div>
          
        </div>}
      </div>
    </div>
  );
}
