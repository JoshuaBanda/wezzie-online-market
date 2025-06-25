"use client";
import { useEffect, useState } from "react";
import { FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "../home/Spinning";
import { useUser } from "../userContext";
import styles from "./styles/loginPage.module.css";

const LoginPart = () => {
  const {person,setPerson}=useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Added error state for better user experience
  const [showClass, setShowClass] = useState(false);

  //actor person
  //console.log("person b4", person)
  const handleLoading = () => {
    setLoading((prev) => !prev);
  };
  
    setTimeout(()=>{
     // setShowClass(!showClass);
    },12000)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before submitting
    handleLoading();

    try {
      const response = await axios.post(
        "https://wonge-backend-k569.onrender.com/users/logi-n",
        { email, password },
        { timeout: 120000 }
      );

      handleLoading();
if (response.status === 201) {
  console.log("Authentication successful:", response.data);
  const result = response.data;

  setPerson({
    ...person,
    firstname: result.user.firstname,
    lastname: result.user.lastname,
    email: result.user.email,
    userid: result.user.userid,
    access_token: result.result.access_token, // adjust if it's result.user.accessTocken
    photourl:result.user.photoUrl,
  });
  router.push("/home");
}

    } catch (error) {
      handleLoading();
      setError("Login failed. Please check your credentials.");
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <>
      {/* Login content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderTopLeftRadius:"20px",
          borderBottomLeftRadius:"20px",
          height:"450px",
          zIndex:1000
        }}
      >
        

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "250px",
            gap: "15px",
          }}
        >
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputUnderline}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          
            className={styles.inputUnderline}
          />

          {/* Error message */}
          {error && (
            <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>
              {error}
            </p>
          )}

          {/* Submit Button */}
          <motion.button
            style={{
              all: 'unset', // resets most styles
              cursor: 'pointer', // optional: brings back pointer cursor
              display: 'inline-block', 
            }}
          >
            {loading ? (
                <Spinner/>
            ) : (
              <div id="thirdCustomizedBackGroundColor"
              style={{padding:"10px",
                borderRadius:'15px',
                width:'100px',
                display:'flex',
                justifyContent:"center",
                alignItems:'center'


              }}>
                Login
              </div>
            )}
          </motion.button>
        </form>
      </div>
    </>
  );
};

export default LoginPart;
