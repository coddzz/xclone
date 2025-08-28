# Tanstack Query()
TanStack Query (formerly known as React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your web applications a breeze.
https://tanstack.com/query/latest/docs/framework/react/overview

> npm i @tanstack/react-query
> npm i @tanstack/react-query-devtools

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
```
<QueryClientProvider client={queryClient}>
    <App />
<ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

# /src/constant/url.js
export const baseUrl = "http://localhost:5000"

# react-hot-toast
> npm i react-hot-toast

# useMutation()

```
const { mutate: loginMutation , isPending, isError, error } = useMutation({
		mutationFn: async ({ username, password }) =>{

			const res = await fetch(`${ baseUrl }/api/auth/login`,{
				method : "POST",
				credentials : "include",
				headers : {
					"Content-Type" : "application/json"
				},
				body : JSON.stringify({username, password})
			})

			const data = await res.json();

			if(!res.ok){
				throw new Error (data.error || "Something went wrong!")
			}

			return data;
		},
		onSuccess : () =>{
			toast.success("Login Success!")
			// refetch the authUser
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError:(error) =>{
			console.log("Login failed:", error.message);
		},
	});
```

