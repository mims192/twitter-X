import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaHeart, FaRetweet } from "react-icons/fa";
import { GetAllTweetsQuery } from "@/gql/graphql";

interface FeedCardProps{
    data:GetAllTweetsQuery["getTweets"][number];

}

const FeedCard:React.FC<FeedCardProps>=(props)=>{
    const {data}=props;
    return(
        
    <div className="border border-b-0 border-l-0 border-r-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer ">
        <div className="grid grid-cols-12 gap-3 ">
            <div className="col-span-1">
               {data.author?.profileImgUrl &&  <Image src={data.author?.profileImgUrl} alt="Profile" className="rounded-full " width={50} height={50} />}
            </div>
            <div className="col-span-11">
                <h5>{data.author?.firstName} {data.author?.lastName}</h5>
                <p>{data.content}</p>
            <div className="flex justify-between mt-5 text-xl items-center text-gray-600 p-2 w-[90%]">
                 <div><BiMessageRounded/></div>
                 <div><FaRetweet/></div>
                 <div><FaHeart/></div>
                 <div><BiUpload/></div>
              
            </div>
        </div>
       
        </div>
         
        
    </div>)
}
export default FeedCard