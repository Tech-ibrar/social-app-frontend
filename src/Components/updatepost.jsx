import React from "react";
import {
    Container,
    TextareaAutosize,
    Typography,
    Box,
    Button,
    Input,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Createpost = () => {
    const [formData, setFormData] = useState({
        post: "",
        image: ""
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
if(e.target.name==="image"){
    setFormData({
        ...formData,
    image: e.target.files[0]
    })
}else{

    
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}
    }





    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
const DatatoSend = new FormData();
DatatoSend.append("post",formData.post)
if(formData.image){

    DatatoSend.append("image",formData.image)
}




        
        try {
            const response = await fetch("http://localhost:3001/createpost", {
                method: "POST",
                headers: {
                   
                    "token": token
                },
                body: DatatoSend
            })

            const result = await response.json();
            if (response.status === 200) {
                alert(result.msg);
                navigate("/timeline")


            }
            else {
                alert(result.msg);
            }
        }
        catch (error) {
            console.log(error)
        }

        setFormData({
            post:"",
            image:""
        })
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    p: 5,
                    boxShadow: 3,
                    borderRadius: 2
                }}

            >

                <form onSubmit={handleSubmit}>
                    <Typography
                        variant="h6"
                    >
                        Post content
                    </Typography>
                    <TextareaAutosize
                        placeholder="Write somthing....."
                        minRows={4}
                        name="post"
                        value={formData.post}
                        onChange={handleChange}
                        style={{ width: "95%", padding: "10px", border: "none", backgroundColor: "#f0f2f4 ", borderRadius: "10px", fontSize: "15px" }}
                        



                    />
                    <Button
                        variant="contained"
                        component="label"

                    >
                        Upload image

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                           hidden
                            onChange={handleChange}


                        />
                    </Button>


                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        sx={{ mt: 2 }}

                    >
                        POST
                    </Button>

                </form>
            </Box>
        </Container>
    )

}

export default Createpost;