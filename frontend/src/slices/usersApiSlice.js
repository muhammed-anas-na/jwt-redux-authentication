import { apiSlice } from "./apiSlice";

const USERS_URL = 'http://localhost:5000/api/users';

export const usersApiSLice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/auth`,
                method:'POST',
                body:data
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}`,
                method:'POST',
                body:data
            })
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:'PUT',
                body:data
            })
        }),
        logout:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
            })
        })
    })
})

export const {useLoginMutation , useLogoutMutation , useRegisterMutation , useUpdateUserMutation} = usersApiSLice;