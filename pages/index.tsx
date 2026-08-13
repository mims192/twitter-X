import TwitterLayout from "@/components/Layout/TwitterLayout";

import Image from "next/image";

import { useCallback, useState } from 'react'
import { BiImageAlt } from "react-icons/bi";
import FeedCard from "@/components/FeedCard";


import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { CreateTweetData, GetAllTweetsQuery } from "@/gql/graphql";
import { GetServerSideProps } from "next";

interface HomeProps{
  tweets?:GetAllTweetsQuery['getTweets']
}

export default function Home(props:HomeProps) {
  const [content, setContent] = useState("")
  const { user } = useCurrentUser();
  

  const handleSelectImage = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click();
  }
  const { mutate } = useCreateTweet()

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    })
  }, [content, mutate])


  return (

    <div>
      <TwitterLayout>

      <div>
        <div className="border border-b-0 border-l-0 border-r-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer ">
          <div className="grid grid-cols-12 gap-3 ">
            <div className="col-span-1">
              {user && user?.profileImgUrl && <Image src={user?.profileImgUrl} alt="Profile" className="rounded-full shrink-0" width={50} height={50} />}
            </div>
            <div className="col-span-11">
              <textarea className=" w-full bg-transparent text-xl px-3 border-b border-slate-700"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="what's happening?"></textarea>
              <div className="mt-2 flex justify-between items-center">
                <BiImageAlt onClick={handleSelectImage} className="text-xl" />
                <button onClick={handleCreateTweet} className="bg-[#1d9bf0] rounded-full text-sm px-4 py-2  font-semibold  ">Tweet</button>
              </div>


            </div>
          </div>
        </div>
        {props.tweets?.map(tweet => tweet ? <FeedCard key={tweet?.id} data={tweet} /> : null)}

      </div>
</TwitterLayout>
    </div>
  );
}


export const getServerSideProps:GetServerSideProps<HomeProps>=async(context)=>{
  const allTweets=await graphqlClient.request(getAllTweetsQuery)
  return {
    props:{
      tweets:allTweets.getTweets
    }
  }
}