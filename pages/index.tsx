import Image from "next/image";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { Geist, Geist_Mono } from "next/font/google";
import react from 'react'
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    title:"Profile",
    icon:<BiUser/>
  }
]

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-50">
        <div className="col-span-3 pt-8 px-4 ">
          <div className="text-4xl h-fit w-fit hover:bg-gray-800 rounded-full p-5 cursor-pointer transition-all ">
            <BsTwitter /> 
          </div>
           <div className="mt-2 text-xl  pr-4">
            <ul>
            {sidebarMenuItems.map(item=>
              <li className=" flex justify-start items-center gap-2 hover:bg-gray-800 rounded-full px-5 py-2 w-fit " key={item.title}>
                <span>{item.icon}</span>
                <span>{item.title} </span>
              </li>
            )}
            </ul>
            <div className="mt-4 px-3">
                          <button className="bg-[#1d9bf0] rounded-full text-lg px-5 py-2  font-semibold  w-full ">Tweet</button>

            </div>
           </div>
          
        </div>
        <div className="col-span-6 border-r-[0.5px] border-white border-l-[0.5px] border-white"></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
