import React from "react";
import {Container,
    TextField,
    Typography,
    Box,
    Button
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


const GetEmailFP = ()=>{
const [formData, setFormData]=useState({
    email:""
})
const nevigate= useNavigate();
 
const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    })
}
const handleSubmit = async(e)=>{
    e.preventDefault();
    localStorage.setItem('Email',formData.email);
    try {
        const response = await fetch ("http://localhost:3001/getemailfp",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if(response.status===200){
            alert(result.msg)
            nevigate("/VerifyOtp-FP")
        }
        else{
            alert(result.msg)
        }
    }
    catch(error){
        console.log(error)
    }
}
    return (

        <Container maxWidth="xs">
            <Box 
            sx={{
                mt: 8,
                p:8,
                boxShadow:3,
                borderRadius:4
            }}
        
            >

                <form onSubmit={handleSubmit}>

                <TextField
                label="Enter email"
                name ="email"
                value={formData.email}
                fullWidth
                margin="normal"
                onChange={handleChange}

                />
              
                <Button
                variant="contained"
                type="submit"
                fullWidth
                color="success"
                sx={{mt:2}}
                
                >
                    Get OTP
                </Button>

                </form>
            </Box>
        </Container>
    )
}

export default GetEmailFP;