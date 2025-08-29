import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import {baseUrl} from "../../constants/url.js";

const Posts = ({feedType}) => {
	const isLoading = false;

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
	console.log(POST_ENDPOINT);

	return (
		<>
			{isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && POSTS && (
				<div>
					{POSTS.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;