"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "../userContext";
import styles from "../login/styles/loginPage.module.css";

const SignUpPage = () => {
  const { person, setPerson } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("female");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [verifyOtpOption, setVerifyOtpOption] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const steps = [
    { label: "Email", value: email, setValue: setEmail, type: "email", placeholder: "Email" },
    { label: "Password", value: password, setValue: setPassword, type: "password", placeholder: "Password" },
    { label: "First Name", value: firstName, setValue: setFirstName, type: "text", placeholder: "First Name" },
    { label: "Last Name", value: lastName, setValue: setLastName, type: "text", placeholder: "Last Name" },
    { label: "Phone Number", value: phone, setValue: setPhone, type: "tel", placeholder: "Phone Number" },
    { label: "Sex", value: sex, setValue: setSex, type: "select", placeholder: "Sex" },
    { label: "Date of Birth", value: dateOfBirth, setValue: setDateOfBirth, type: "date", placeholder: "Date of Birth" },
    { label: "Profile Picture", value: profilePicture, setValue: setProfilePicture, type: "file", placeholder: "Profile Picture" },
  ];

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "email":
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) error = "Invalid email address";
        break;
      case "password":
        if (value.length < 8) error = "Password must be at least 8 characters";
        break;
      case "phone":
        if (!value.match(/^\d{10}$/)) error = "Invalid phone number";
        break;
      default:
        if (!value) error = "This field is required";
        break;
    }
    return error;
  };

  const sendOtpVerification = async () => {
    if (!firstName || !lastName || !phone || !dateOfBirth || !profilePicture) {
      setFormError("Please fill out all fields and select a profile picture.");
      return;
    }

    try {
      const response = await axios.post(
        "https://wonge-backend-k569.onrender.com/users/otp/send",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200 || response.status === 201) {
        setVerifyOtpOption(false);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (!otp) {
      setFormError("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "https://wonge-backend-k569.onrender.com/users/otp/verify",
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setIsEmailVerified(true);
        handleSubmitAfterOtp();
      }
    } catch (error) {
      setFormError("Invalid or expired OTP.");
    }
  };

  const handleSubmitAfterOtp = async (e) => {
    if (e) e.preventDefault();

    const newErrors = {};
    steps.forEach(({ label, value }) => {
      const field = label.toLowerCase().replace(" ", "");
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("phonenumber", phone);
      formData.append("sex", sex);
      formData.append("dateofbirth", dateOfBirth);
      formData.append("file", profilePicture);

      const response = await axios.post(
        "https://wonge-backend-k569.onrender.com/users/create-user",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const result = response.data.user;
      const token = response.data.access_token.access_token;

      setPerson({
        ...person,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        userid: result.userid,
        access_token: token,
      });

      router.push("/home");
    } catch (error) {
      setFormError("Error creating account. Try again.");
    }
  };

  return (
    < div style={{position:'absolute',top:'5vh',display:'flex',justifyContent:'center',
      width:'100%'
    }}>
    
      {verifyOtpOption ? (
        <div style={{ maxWidth: "350px", margin: "0 auto", padding: "20px" }}>
          <h1  id="thirdCustomizedColor" style={{marginBottom:'10px'}}>Create Account

          </h1>
          <form onSubmit={handleSubmitAfterOtp}>
            {/* Email and Password */}
            {["Email", "Password"].map((label) => {
              const step = steps.find((s) => s.label === label);
              return (
                <div key={step.label} style={{ marginBottom: "5px" }}>
                  <div style={{ position: "relative" }}>
                    <input
                      type={step.type === "password" && !showPassword ? "password" : step.type}
                      value={step.value}
                      onChange={(e) => step.setValue(e.target.value)}
                      placeholder={step.placeholder}
                      className={styles.inputUnderline}
                    />
                    {step.type === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "gray",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    )}
                  </div>
                  {errors[step.label.toLowerCase().replace(" ", "")] && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {errors[step.label.toLowerCase().replace(" ", "")]}
                    </p>
                  )}
                </div>
              );
            })}

            {/* First + Last Name in same row */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
              {["First Name", "Last Name"].map((label) => {
                const step = steps.find((s) => s.label === label);
                return (
                  <div key={label} style={{ flex: 1 }}>
                    <input
                      type="text"
                      value={step.value}
                      onChange={(e) => step.setValue(e.target.value)}
                      placeholder={step.placeholder}
                      className={styles.inputUnderline}
                    />
                    {errors[label.toLowerCase().replace(" ", "")] && (
                      <p style={{ color: "red", fontSize: "13px" }}>
                        {errors[label.toLowerCase().replace(" ", "")]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Remaining Fields */}
            {["Phone Number", "Sex", "Date of Birth", "Profile Picture"].map((label) => {
              const step = steps.find((s) => s.label === label);
              return (
                <div key={step.label} style={{ marginBottom: "5px" }}>
                  {step.type === "select" ? (
                    <select
                      value={step.value}
                      onChange={(e) => step.setValue(e.target.value)}
                      className={styles.inputUnderline}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  ) : step.type === "file" ? (
                    < div style={{color:'black',margin:' 2px 0px'}}>
                    <p style={{margin:'2px'}}>
                      Select profile Picture
                    </p>
                    <input type="file" onChange={(e) => step.setValue(e.target.files[0])} />
                    </div>
                  ) : (
                    <input
                      type={step.type}
                      value={step.value}
                      onChange={(e) => step.setValue(e.target.value)}
                      placeholder={step.placeholder}
                      className={styles.inputUnderline}
                    />
                  )}
                  {errors[step.label.toLowerCase().replace(" ", "")] && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {errors[step.label.toLowerCase().replace(" ", "")]}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Error Message */}
            {formError && <p style={{ color: "red", textAlign: "center" }}>{formError}</p>}

            {/* Submit or Verify Email */}
            {isEmailVerified ? (
              <button
                type="submit"
                style={{ padding: "10px 20px", borderRadius: "8px", background: "#2bb", color: "white" }}
              >
                Submit
              </button>
            ) : (
              <motion.button
                type="button"
                onClick={sendOtpVerification}
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
                id="customizedbackground"
              >
                Verify Email
              </motion.button>
            )}
          </form>
        </div>
      ) : (
        <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center", padding: "20px" }}>
          <h3>Email Verification</h3>
          <p>We’ve sent an OTP to <strong>{email}</strong></p>
          <p>It expires in 10 minutes.</p>
          <form onSubmit={handleOtpVerification}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={styles.inputUnderline}
              style={{ margin: "10px 0", width: "100%", padding: "10px" }}
            />
            {formError && <p style={{ color: "red" }}>{formError}</p>}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: "#28a745",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Verify OTP
            </motion.button>
          </form>
          <button
            onClick={() => {
              setOtp("");
              setFormError("");
              setVerifyOtpOption(true);
            }}
            style={{
              marginTop: "20px",
              background: "transparent",
              color: "#007bff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Resend OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
