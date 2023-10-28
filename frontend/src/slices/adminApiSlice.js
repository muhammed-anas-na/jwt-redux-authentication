import { apiSlice } from "./apiSlice";

const USERS_URL = 'http://localhost:5000/api/users';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        adminLogin:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/admin`,
                method:'POST',
                body:data
            })
        }),
        getUsers:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/admin-dash`,
                method:'GET',
            })
        }),
        adminlogout:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/adminLogout`,
                method:'POST',
            })
        })
    })
})

export const {useAdminLoginMutation ,
     useGetUsersMutation,
    useAdminlogoutMutation,
    } = adminApiSlice;