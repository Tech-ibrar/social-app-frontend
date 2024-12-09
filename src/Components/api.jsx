// import { useState, useEffect } from "react";

// import {
//     Container,
//     TextField,
//     Box,
//     Typography,
//     Button,
// } from "@mui/material";

// const Api = () => {

//    const [search, setSearch] =useState('');


//   useEffect(()=>{
//     fetch(https://jsonplaceholder.typicode.com/users)
//     })



//    return(
//     <form>
//     <TextField
//     label="Search"
//     name="search"
//     onChange={(e)=> setSearch(e.target.value)}
    
    
    
//     />
//    </form>
//    )

// }

// export default Api;

import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Box,
  Typography,
  Button,
} from "@mui/material";

const Api = () => {
  const [search, setSearch] = useState(""); // To store search input
  const [users, setUsers] = useState([]); // To store fetched user data
  const [filteredUser, setFilteredUser] = useState(null); // To store the specific user's data

  // Fetch data when the component loads
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle input change and filter user
  const handleSearch = (e) => {
    const id = e.target.value; // Input value (ID to search)
    setSearch(id); // Update search state

    // Filter the user based on the input ID
    const user = users.find((user) => user.id.toString() === id);
    setFilteredUser(user || null); // Update the filtered user (null if not found)
  };

  return (
    <Container>
      <Box
        sx={{
          mt: 4,
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          maxWidth: 400,
          mx: "auto",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          User Search
        </Typography>
        <TextField
          label="Search by ID"
          name="search"
          fullWidth
          variant="outlined"
          value={search}
          onChange={handleSearch}
          sx={{ mb: 3 }}
        />
        {filteredUser ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6">User Details:</Typography>
            <Typography><b>Name:</b> {filteredUser.name}</Typography>
            <Typography><b>Email:</b> {filteredUser.email}</Typography>
            <Typography><b>Phone:</b> {filteredUser.phone}</Typography>
            <Typography><b>Website:</b> {filteredUser.website}</Typography>
          </Box>
        ) : (
          search && (
            <Typography variant="body1" color="error" align="center">
              No user found with this ID.
            </Typography>
          )
        )}
      </Box>
    </Container>
  );
};

export default Api;
