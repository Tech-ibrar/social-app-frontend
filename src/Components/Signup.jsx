import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,

} from "@mui/material";
import { Link } from "react-router-dom";
// import App from "./App";


const Signup =()=>{
    const [formData, setFormData]= useState({
        username:"",
        email:"",
        password:""
    });


const navigate = useNavigate();

    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, 
        });
    };

    const handleSubmmit= async (e)=>{
        e.preventDefault();
        

try{
    const response = await fetch("http://localhost:3001/signup",{

 method: "POST",
 headers:{
    "Content-Type": "application/json"
 },
 body: JSON.stringify(formData)

    })


    const result = await response.json();
if(response.status==200){
alert(result.msg)
navigate("/userOtp")
}
else{
    alert(result.msg);
}

}
catch(err){
    console.log("Error in sign up",err)
}




       
        setFormData({
            username:"",
            email:"",
            password:""
        });




    };

    
    return(
        <Container maxWidth="sm">
        <Box
       sx={{
        mt:10,
        p:8,
        boxShadow:3,
        borderRadius:5
       }}
        
        
        > 

            <Typography 
            fontSize={25}
            >
            Sign Up
        </Typography>
            <form onSubmit={handleSubmmit}>
                <TextField
                label = "Username"
                name="username"
                type="text"
                fullWidth
                margin="normal"
                value={formData.username}
                onChange={handleChange}
                required
                
                />
                <TextField
                label = "Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
                
                />
                <TextField
                label = "Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                required
                
                />
                <Button
               
                    variant="contained"
                    color="success"
                    type="submit"
                    fullWidth
                    sx={{mt:3,
                        mb:2
                    }}
              
               
                
                >
                    Sign Up
                </Button>

                Already have account? <Link to= "/login">Login</Link>

                
            </form>
        </Box>
    </Container>
)
}
 export default Signup;