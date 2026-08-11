import { graphqlClient } from "@/clients/api";
import { graphql } from "@/gql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTweetMutation } from "../mutations/tweet";
import { CreateTweetData } from "@/gql/graphql";


export const getAllTweetsQuery=graphql(`#graphql
     query GetAllTweets{
       getTweets{
          id
          content
          imgUrl
          author{
             firstName
             lastName
             profileImgUrl
          }
       }
     }


    `)