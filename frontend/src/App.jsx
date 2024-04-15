import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

import '../src/App.css'
import SignUp from "./components/SignUp";
import Course from "./components/Course";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


const App = () => {
  return (
    <div>
         <RecoilRoot>
      <Router>
      <Header/>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courses" element={<Course />} />

        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/editCourse/:id" element={<EditCourse />} />
      
        
        </Routes>
      </Router>
      </RecoilRoot>
    </div>
  );
};

export default App;




