import React from "react";
import Nav from "../components/navigation";
import Head from "next/head";
import Lottie from "lottie-react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AppointmentTable } from "@/components/appointmentTable";
import { useRouter } from "next/router";

export default function admindashboard() {
  const [bgAnimationData, setBgAnimationData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Extract email and name from query params
  const { email, name } = router.query;

  useEffect(() => {
    // Log router.query to the console for debugging
    console.log("router.query: ", router.query);

    // Destructure email and name from router.query
    const { email, name } = router.query;

    // Use email and name as needed
    console.log(`Email: ${email}, Name: ${name}`);
  }, [router.query]);
  console.log(router.query);

  return (
    <>
      <div className="text-gray-800 min-h-screen bg-white">
        <Head>
          <title>MedSched.ai</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            rel="stylesheet"
          />
        </Head>

        {/* Navbar */}
        <Nav />

        <main className="color-black relative">
          <div className="relative h-full flex flex-col ">
            <div className="ml-12 mt-28">
              <h1 className="text-3xl"> Welcome, {name ? name : "Guest"}</h1>
              <p>Your email: {email ? email : "Not provided"}</p>
              {/* Display email and name */}
            </div>
  
            <AppointmentTable />
            <div className="absolute bottom-0 left-0 w-full">
              <h2 className="text-3xl font-bold animate__animated animate__fadeInUp">
                <span className="text-blue-500">MedSched.ai</span> is a patient
                scheduling management system using AI to help doctors and
                patients manage their appointments.
              </h2>
            </div>
          </div>
        </main>
        <footer className="bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-800 text-center p-5 animate__animated animate__fadeInUp">
          <p>MedSched.ai &copy; 2023. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
