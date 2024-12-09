import React from "react";
import { useState } from "react";
import {
    Container,
    TextField,
    Box,
    Typography,
    Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const  navigate = useNavigate();
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value

        })
    }
    const handleSubmmit = async (e) => {
        e.preventDefault();

try {
    const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify(formData)
    })

    let result = await response.json();
    if(response.status===200){
        alert(result.msg)
        localStorage.setItem("token",result.token)
        navigate("/Timeline");
    }
    else{
        alert(result.msg)
    }
} catch (error) {
    console.log("Message: " , error)
}


            setFormData({
                email: "",
                password: ""
            })
    }



    return (
        <Container maxWidth="sm">
            <Box
            sx={{
                mt:8,
                p:8,
                boxShadow:3,
                borderRadius:5

            }}
            >

                <Typography>
                    LOGIN FORM
                </Typography>

                <form onSubmit={handleSubmmit}>
                    <TextField
                        label="Email"
                        name="email"
                        margin="normal"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        margin="normal"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />


                    <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    
                    sx={{mt:2,
                        mb:2
                    }}
                    
                    >
                        Login
                    </Button>
                    Forget Password? <Link to= "/getEmail-FP">forgetpassword</Link><br></br><br></br>
                    Don't have an account? <Link to= "/">Signup</Link>
                </form>





            </Box>
        </Container>
    );





}

export default Login;