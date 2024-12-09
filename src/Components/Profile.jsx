import { useState, useEffect } from "react";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Connect to Socket.io server

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                let userId = null;
                if (token) {
                    const decodedToken = jwtDecode(token);
                    userId = decodedToken.userId;
                }

                const response = await fetch("http://localhost:3001/fetchallpostprofile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        userid: String(userId),
                        "token": token
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setPosts(result.Allposts);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to fetch posts. Please try again later.");
            }
        };

        fetchPosts();

        // Listen for real-time post updates
        socket.on("postLiked", ({ postId, likes, userId, liked }) => {
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? {
                            ...post,
                            likes,
                            likedByUser: liked ? userId : null, // Update the like status
                        }
                        : post
                )
            );
        });

        return () => {
            socket.off("postLiked"); // Cleanup listener on component unmount
        };
    }, []);

    const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem("token");
            const post = posts.find((post) => post._id === postId);
            const isLiked = post.likedByUser;

            const response = await fetch(`http://localhost:3001/${isLiked ? "unlikepost" : "likepost"}/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                },
            });

            const result = await response.json();

            if (response.status === 200) {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === postId
                            ? {
                                ...post,
                                likes: isLiked ? post.likes - 1 : post.likes + 1,
                                likedByUser: !isLiked,
                            }
                            : post
                    )
                );
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const deletePost = async (postId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:3001/deletepost/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
            });

            const result = await response.json();

            if (response.status === 200) {
                alert(result.msg);
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
            } else {
                alert(result.msg);
            }
        } catch (error) {
            console.log("Error Delete Post", error);
        }
    };

    const updatePost = (postId) => {
        localStorage.setItem("postId", postId);
    };

    const navigateTo = () => {
        navigate("/timeline");
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 5, boxShadow: 4, borderRadius: 3 }}>
                <Typography variant="h6">Profile</Typography>
                <Button variant="contained" sx={{ mr: 3 }} onClick={navigateTo}>
                    Timeline
                </Button>

                {error && <Typography color="error">{error}</Typography>}

                {!error && posts.length === 0 && (
                    <Typography sx={{ mt: 3 }}>
                        No posts found. Create a post to get started!
                    </Typography>
                )}


                {posts.map((post, index) => (
                    <Box
                        sx={{
                            border: "1px solid grey",
                            mt: 4,
                            borderRadius: 3,
                            boxShadow: 3
                        }}
                        key={index}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "right",
                                padding: "3px",
                            }}
                        >
                            <button
                                onClick={() => updatePost(post._id)}
                                style={{
                                    border: "none",
                                    cursor: "pointer",
                                    backgroundColor: "transparent",
                                    margin: "3px",
                                }}
                            >
                                <EditSharpIcon fontSize="small" />
                            </button>
                            <button
                                onClick={() =>
                                    deletePost(post._id)
                                }
                                style={{
                                    border: "none",
                                    cursor: "pointer",
                                    backgroundColor: "transparent",
                                    margin: "3px",
                                }}
                            >
                                <DeleteSharpIcon fontSize="small" style={{ color: "red" }} />
                            </button>
                        </div>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                p: 2
                            }}
                        >{post.post}</Typography>

                        {post.image ? (
                            <Box
                                sx={{
                                    mt: 2,
                                    borderRadius: 3,
                                    boxShadow: 4
                                }}
                            >
                                <img
                                    src={`http://localhost:3001/${post.image}`}
                                    alt="Post Image"
                                    style={{ width: '100%', height: '250px', marginTop: '10px', objectFit: "contain" }}
                                />
                            </Box>
                        ) : (
                            ""
                        )}

                        {/* Heart Icon for Likes */}
                        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
                            <button
                                onClick={() => handleLike(post._id)}
                                style={{
                                    border: "none",
                                    cursor: "pointer",
                                    backgroundColor: "transparent",
                                    margin: "3px",
                                }}
                            >
                                {post.likedByUser ? (
                                    <FavoriteSharpIcon style={{ color: "red" }} />
                                ) : (
                                    <FavoriteBorderSharpIcon style={{ color: "grey" }} />
                                )}
                            </button>
                            <Typography variant="subtitle2" sx={{ ml: 1 }}>
                                {post.likes} Likes
                            </Typography>
                        </div>
                    </Box>
                ))}

            </Box>
        </Container>
    );
};

export default Profile;
