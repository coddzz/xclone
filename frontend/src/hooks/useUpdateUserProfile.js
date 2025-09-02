import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../constants/url";
import toast from "react-hot-toast";

const useUpdateUserProfile = () =>{

    const queryClient = useQueryClient();
    const {mutate : updateProfile, isPending : isUpdatingProfile } = useMutation({
		mutationFn: async (formData)=>{
			try{
				const res = await fetch(`${baseUrl}/api/users/update`,{
					method:"POST",
					credentials:"include",
					headers:{
						"Content-Type":"application/json"
					},
					body : JSON.stringify(formData)
				})
				const data = res.json();
				if(!res.ok){
					throw new Error(data.error || "Something went wrong!")
				}
				return data;
			} catch(error){
				throw error;
			}
		},
		onSuccess: ()=>{
			toast.success("profile Updated Succesfully!")
			Promise.all([
				queryClient.invalidateQueries({queryKey:["authUser"]}), //invalidate
				queryClient.invalidateQueries({queryKey:["userProfile"]}) 
			])
		},
		onError: (error)=>{
			toast.error(error.message)
		}
	})
    return { updateProfile, isUpdatingProfile }

}

export default useUpdateUserProfile;