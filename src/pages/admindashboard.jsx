import React from "react";
import Nav from "../components/navigation";
import Head from "next/head";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function admindashboard() {
  const [bgAnimationData, setBgAnimationData] = useState(null);

  useEffect(() => {
    fetch("/bganimation.json")
      .then((response) => response.json())
      .then((data) => setBgAnimationData(data));
  }, []);
  return (
    <>
      <div className="text-gray-800 min-h-screen">
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

        <main className="text-center  relative">
          {bgAnimationData && (
            <div className="absolute inset-0 overflow-hidden h-screen w-screen">
              <Lottie
                animationData={bgAnimationData}
                loop={true}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                  height: "100%",
                  minWidth: "100%",
                  height: "auto",
                  width: "auto",
                }}
              />
            </div>
          )}
          <div className="relative h-screen flex flex-col justify-center items-center">
            <div>
              <h1 className="text-5xl font-bold animate__animated animate__fadeInUp">
                Welcome, Admin!
              </h1>
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
