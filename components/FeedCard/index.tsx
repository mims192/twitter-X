import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaHeart, FaRetweet } from "react-icons/fa";
const FeedCard:React.FC=()=>{
    return<div className="border border-b-0 border-l-0 border-r-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer ">
        <div className="grid grid-cols-12 gap-3 ">
            <div className="col-span-1">
                <Image src="https://media.licdn.com/dms/image/v2/D5603AQH_5kIV-0JzTg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715940830277?e=1787184000&v=beta&t=qAkV11wBfu7qgqEaXWMviTnkxPOf5OsAfMwBElYt7Qc" alt="Profile" className="rounded-full " width={50} height={50} />
            </div>
            <div className="col-span-11">
                <h5>Mimansa Sahay</h5>
                <p>The Amazing Spider-Man is a prominent Marvel franchise most widely recognized as the comic book series that debuted in 1963 and the live-action movie duology starring Andrew Garfield as Peter Parker.</p>
            <div className="flex justify-between mt-5 text-xl items-center text-gray-600 p-2 w-[90%]">
                 <div><BiMessageRounded/></div>
                 <div><FaRetweet/></div>
                 <div><FaHeart/></div>
                 <div><BiUpload/></div>
              
            </div>
        </div>
       
        </div>
         
        
    </div>
}
export default FeedCard