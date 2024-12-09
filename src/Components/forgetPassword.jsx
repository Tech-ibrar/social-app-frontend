
import React from "react";
import {Container,
    TextField,
    Typography,
    Box,
    Button
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forgetpassword = ()=>{

    const [formData, setFormData]= useState({
        newpassword:""
    });

    const navigate = useNavigate();


    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const email = localStorage.getItem('Email');
        console.log(email+" hello ")

        const datatoSend ={
            ...formData,
            email:email

        }

        try{
            const response = await fetch ("http://localhost:3001/forgetpasword",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datatoSend)
            });

            const result = await response.json();
            if(response.status===200){
                alert(result.msg);
                navigate("/login")
            }
            else{
                alert(result.msg);
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


                <Typography variant="h6">
                    Change Password
                </Typography>

                <TextField
                label="New Password"
                name ="newpassword"
                value={formData.newpassword}
                fullWidth
                margin="normal"
                onChange={handleChange}

                />
              
               <Button
               variant="contained"
               type="submit"
               fullWidth
               
               >
                SAVE
               </Button>


            
                
                </form>
            </Box>
        </Container>
    )
}

export default Forgetpassword;