import React from "react";
import {
    Container,
    TextField,
    Box,
    Typography,
    Button,

} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const VerifyOtpFP = () => {

    const [formData, setFormData] = useState({
        otp:""
    });


  const navigate =  useNavigate();

const handleOtp = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    })
    
}


    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = localStorage.getItem('Email')
        
        try {
            
            const response = await fetch("http://localhost:3001/verifyotp", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData,email)

            });
           
            const result = await response.json();
          
            if(response.status===200){
                alert(result.msg)
                navigate("/forgetPassword")
            }
        } catch (error) {
           console.log(error+"Otp error")
        }

        
    }


    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    p: 8,
                    boxShadow: 3,
                    borderRadius: 4
                }}

            >
                <form onSubmit={handleSubmit}>
                    <Typography
                        align="justify"
                        variant="h6"
                        mb="8px"
                    >
                        Verify Your OTP
                    </Typography>
                    <TextField
                        label="Enter your OTP"
                        name="otp"
                        value={formData.otp}
                        fullWidth
                        onChange={handleOtp}

                    />

                    <Button
                        variant="contained"
                        fullWidth
                        margin="normal"
                        sx={{ mt: 2 }}
                        color="success"
                        type="submit"

                    >
                        VERIFY OTP
                    </Button>
                </form>

            </Box>
        </Container>
    )

}


export default VerifyOtpFP;