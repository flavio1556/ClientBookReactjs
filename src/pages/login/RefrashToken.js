import React from "react";
import API from "../../Services/API";

export default async function RefrashToken(){
    const refreshToken = localStorage.getItem('refreshToken')
    const accessToken = localStorage.getItem('accessToken')
        try{
            const data = {
                RefreshToken: refreshToken,
                accessToken: accessToken
            };
            const response = await API.post(`api/Auth/v1/refresh`,data)
            localStorage.setItem('refreshToken',response.data.refreshToken)
            localStorage.setItem('accessToken',response.data.accessToken)
            return true;
        }catch(err){
            return false;
        }    
}