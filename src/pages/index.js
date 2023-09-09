// pages/index.js
import Head from "next/head";
import Nav from "../components/navigation";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import {Button } from "@material-tailwind/react";
export default function Home() {
  const [bgAnimationData, setBgAnimationData] = useState(null);

  useEffect(() => {
    fetch("/bganimation.json")
      .then((response) => response.json())
      .then((data) => setBgAnimationData(data));
  }, []);

  return (
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
            <h1 className="text-4xl font-nunito font-semibold mb-5 animate__animated animate__fadeIn">
              Automating Patient Scheduling Like Never Before
            </h1>
            <p className="mb-10 font-nunito animate__animated animate__fadeInUp">
              MedSched.ai uses advanced algorithms to schedule and sort patient
              appointments.
            </p>

            <div className="flex justify-center items-center mb-10 space-x-4 animate__animated animate__bounceIn">
              <Button variant="outlined" className="text-blue-500 border-2 border-blue-500 rounded-full px-6 py-2 flex items-center transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white">
                <i className="fas fa-calendar-alt mr-2"></i>
                <span font-nunito>Schedule Appointment</span>
              </Button>
              <Button variant="outlined" className="font-nunito text-green-500 border-2 border-green-500 rounded-full px-6 py-2 flex items-center transition-all duration-300 ease-in-out hover:bg-green-500 hover:text-white">
                <i className="fas fa-tachometer-alt mr-2"></i>
                <a href="/admindashboard">View Admin Dashboard</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
          <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 animate__animated animate__fadeInUp">
            {" "}
            {/* Increased height with h-80 */}
            <div className="font-nunito border rounded p-4 hover:shadow-lg transition duration-200">
              <h3 className="font-nunito text-xl font-semibold">
                Smart Sorting
              </h3>
              <p>
                Our AI categorizes appointments based on urgency and need,
                ensuring critical cases get immediate attention.
              </p>
            </div>
            <div className="font-nunito border rounded p-4 hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold  font-nunito">
                Seamless Integration
              </h3>
              <p>
                Easily integrate MedSched.ai with your existing EHR systems in a
                snap.
              </p>
            </div>
            <div className="font-nunito border rounded p-4 hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold">Real-Time Updates</h3>
              <p>
                Get real-time updates on your schedule, including cancellations
                and newly available slots.
              </p>
            </div>
          </div>{" "}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-800 text-center p-5 animate__animated animate__fadeInUp">
        <p>MedSched.ai &copy; 2023. All rights reserved.</p>
      </footer>
    </div>
  );
}
