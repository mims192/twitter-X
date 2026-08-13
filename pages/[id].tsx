import FeedCard from "@/components/FeedCard";
import { useRouter } from "next/router";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { CreateTweetData, GetUserByIdQuery } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import { graphqlClient } from "@/clients/api";
import { getUserByIDQuery } from "@/graphql/query/user";

interface ServerProps {
    userInfo?: GetUserByIdQuery["getUserByID"]
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    const { user } = useCurrentUser();
    const router = useRouter()

    console.log(props)
    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className="flex items-center gap-3 py-3 px-3">
                        <BsArrowLeftShort className="text-4xl" />
                        <div>
                            <span className="text-xl font-bold">{props.userInfo?.firstName}</span>
                            <span className="text-xl font-bold">{props.userInfo?.lastName}</span>
                            <h2 className="text-lg font-semibold text-slate-500">2301 Tweets</h2>
                        </div>
                    </nav>
                    <div className="p-4 border-b border-slate-800 ">
                        {user && props.userInfo?.profileImgUrl && <Image src={props.userInfo?.profileImgUrl} alt="userimg" width={100} height={100} className="rounded-full " />}
                        <h1 className="text-xl font-bold mt-5 ">{props.userInfo?.firstName} {user?.lastName}</h1>

                    </div>
                    <div>
                        {props.userInfo?.tweets?.map((tweet) =>
                            tweet ? (
                                <FeedCard data={tweet} key={tweet.id} />
                            ) : null
                        )}
                    </div>
                </div>
            </TwitterLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (context) => {
    const id = context.query.id as string | undefined
    if (!id) return { notFound: true, props: { userInfo: undefined } }
    const userInfo = await graphqlClient.request(getUserByIDQuery, { id })
    if (!userInfo?.getUserByID) return { notFound: true }

    return {
        props: {
            userInfo: userInfo.getUserByID
        }
    }
}

export default UserProfilePage