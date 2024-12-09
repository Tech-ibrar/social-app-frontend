// import logo from './logo.svg';
// import './App.css';
import React from "react";
import Signup from "./Components/Signup";
import Login from "./Components/login"
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";
import API from "./Components/api"
import VerifyOtp from "./Components/userOtp";
import Timeline from "./Components/Timeline";
import PssForget from "./Components/forgetPassword";
import GetEmail from "./Components/getEmail-FP";
import VerifyOtpFP from "./Components/VerifyOtp-FP";
import Createpost from "./Components/createpost";
import Profile from "./Components/Profile";


function App() {
  return (
    <Router>

    <Routes>
    {/* <Route path="/" element={<h1>Welcome to Science</h1>}/> */}
    <Route path="/" element={<Signup/>}/>
    <Route path="/api" element={<API/>}/>
    <Route path="/login" element= {<Login/>} />
    <Route path="/userOtp" element= {<VerifyOtp/>} />
    <Route path = "/Timeline" element={<Timeline/>} />
    <Route path ="/forgetPassword" element= {<PssForget/>} />
    <Route path="/getEmail-FP" element = {<GetEmail/>} />
    <Route path="/VerifyOtp-FP" element={<VerifyOtpFP/>}/>
    <Route path ="/createpost" element={<Createpost/>}/>
    <Route path ="/profile" element={<Profile/>}/>


    </Routes>
    </Router>
  );
}

export default App;
