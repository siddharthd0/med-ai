import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/navigation";
import axios from "axios";
import { Input, Button } from "@material-tailwind/react";

const FormPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const res = await axios.post("/api/login", formData);
      if (res.status === 200 && res.data.success === true) {
        setShowToast(true);
        setFormSubmitting(false);
        setFormData({ email: "" });
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response?.status, error.response?.data);
      alert("An error occurred while sending the email.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <title>Login</title>
      </Head> 

      <Nav />
      <div className={`toast ${showToast ? "show-toast" : ""}`}>
        Check your email to login
      </div>

      <main
        className={`p-10 space-y-10 ${formSubmitting ? "form-disabled" : ""}`}
      >
        <div className="text-center mt-16">
          <h1 className="text-4xl font-semibold">
            Login to MedSched
          </h1>
          <p className="text-lg mt-4">
          Please enter your email & name and we will send you an email to login.
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input

                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                label="Name"
              />
            </div>
            
            <div className="mb-6">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
              />
            </div>
            
            <Button
              onClick={() => setShowToast(true)}
              fullWidth
              color="black"
              type="submit"
              ripple={true}
            >
             Login
            </Button>
          </form>
        </div>
      </main>

      <footer className="bg-white text-gray-800 text-center p-5">
        <p>MedSched.ai &copy; 2023. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FormPage;
