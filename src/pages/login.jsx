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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const res = await axios.post("/api/login", formData);
      if (res.status === 200 && res.data.success === true) {
        setShowSuccessMessage(true);
        setFormSubmitting(false);
        setFormData({ email: "", name: "" });
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 500000); // Hide the message after 5 seconds
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
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <title>Login</title>
      </Head>

      <Nav />

      {showSuccessMessage && (
        <div
          class="font-regular relative block w-full max-w-screen-md mx-auto mt-28 rounded-lg bg-green-500 px-4 py-4 text-base text-white"
        >
          <div class="flex">
            <div class="py-1">
              <h1 class="text-2xl font-semibold">Success!</h1>
              <p class="text-sm">
                We have sent you an email with a link to login.
              </p>
              <p class="text-sm">
                Please check your spam folder if you don't see it in your inbox.
              </p>
              </div>
              </div>
        </div>
      )}

      <div className="flex-grow flex justify-center items-center">
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
      </div>

      <footer className="bg-white text-gray-800 text-center p-5">
        <p>MedSched.ai &copy; 2023. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FormPage;
