import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import {baseUrl} from "../../constants/url.js";
import { useQuery } from "@tanstack/react-query";

const Posts = ({feedType}) => {

	const getPostEndPoint = ()=>{
		switch(feedType){
			
			case "forYou" : 
			return `${baseUrl}/api/posts/all`;
			
			case "following":
				return `${baseUrl}/api/posts/following`;

			default :
				return `${baseUrl}/api/posts/all`;
		}
	}

	const POST_ENDPOINT = getPostEndPoint()
	
	const { data: posts, isLoading} = useQuery({

		queryKey : ["posts"],
		queryFn : async () =>{
			const res = await fetch(POST_ENDPOINT,{
				method : "GET",
				credentials : "include",
				headers : {
					"Content-Type" : "application/json"
				}
			})
			const data = await res.json();
			if(!res.ok){
				throw new Error(data.error || "Something went wrong!")
			}
			return data;			
		},
		onError:(error) =>{
			console.log("Posts faliure",error.message);
		},
	});

	return (
		<>
			{isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;