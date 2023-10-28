import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseUrl:''})
console.log("This is baseQuery => " , baseQuery)
export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:(builder)=>({})
})