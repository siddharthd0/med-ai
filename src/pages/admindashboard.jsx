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

  useEffect(() => {
    const rememberMe = Cookies.get("rememberMe");
    const sessionLogin = localStorage.getItem("sessionLogin");
    if (rememberMe === "true" || sessionLogin === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    fetch("/bganimation.json")
      .then((response) => response.json())
      .then((data) => setBgAnimationData(data));

    fetch("/api/getUserData")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);
  return (
    <>
      {isLoggedIn ? (
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

          <main className=" relative">
            <div className="relative h-full flex flex-col ">
              <div>
                <h1 className="ml-10 mt-40 text-5xl font-bold animate__animated animate__fadeInUp animate__delay-1s">
                  {userData ? `Welcome, ${userData.name} :)` : "Loading..."}
                </h1>
              </div>
              <AppointmentTable />
              <div className="absolute bottom-0 left-0 w-full">
                <h2 className="text-3xl font-bold animate__animated animate__fadeInUp">
                  <span className="text-blue-500">MedSched.ai</span> is a
                  patient scheduling management system using AI to help doctors
                  and patients manage their appointments.
                </h2>
              </div>
            </div>
          </main>
          <footer className="bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-800 text-center p-5 animate__animated animate__fadeInUp">
            <p>MedSched.ai &copy; 2023. All rights reserved.</p>
          </footer>
        </div>
      ) : (
        <>
          <Nav />
          <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
              <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
              <p>You need to be logged in to view this page.</p>
              <button
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-green-400 text-white p-2 rounded hover:from-blue-600 hover:to-green-500"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            </div>
          </div>
          <footer className="bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-800 text-center p-5 animate__animated animate__fadeInUp">
            <p>MedSched.ai &copy; 2023. All rights reserved.</p>
          </footer>
        </>
      )}
    </>
  );
}
