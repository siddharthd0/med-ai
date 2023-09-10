// pages/index.js
import Head from "next/head";
import Nav from "../components/navigation";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Button, Card, CardBody } from "@material-tailwind/react";
import Link from "next/link";

export default function Home() {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const problems = [
    {
      title: "Inefficient Scheduling",
      description: "Traditional methods often lead to overlaps and delays.",
      icon: "fas fa-calendar-times",
    },
    {
      title: "Resource Wastage",
      description:
        "Incorrect scheduling can result in wasted healthcare resources.",
      icon: "fas fa-recycle",
    },
    {
      title: "Patient Dissatisfaction",
      description: "Complex scheduling processes can lead to unhappy patients.",
      icon: "fas fa-frown",
    },
  ];
  const solutions = [
    {
      title: "AI-Driven Scheduling",
      description:
        "Leverage advanced AI algorithms for optimal appointment scheduling.",
      icon: "fas fa-brain",
    },
    {
      title: "Priority-Based Allocation",
      description:
        "Ensure critical cases receive immediate attention with our priority-based system.",
      icon: "fas fa-exclamation-triangle",
    },
    {
      title: "Streamlined Experience",
      description:
        "Enhanced patient-doctor experience by reducing wait times and improving satisfaction.",
      icon: "fas fa-smile",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProblemIndex((prevIndex) => (prevIndex + 1) % problems.length);
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(timer); // Cleanup timer
  }, []);

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
        {/*{bgAnimationData && (
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
        )}*/}
        <div className="relative h-screen flex flex-col justify-center items-center bg-white">
          <div>
            <h1 className="text-4xl font-nunito font-semibold mb-5 animate__animated animate__fadeIn">
              Automating Patient Scheduling Like Never Before
            </h1>
            <p className="mb-10 font-nunito animate__animated animate__fadeInUp">
              MedSched.ai uses advanced algorithms to schedule and sort patient
              appointments.
            </p>

            <div className="flex justify-center items-center mb-10 space-x-4 animate__animated animate__bounceIn">
              <Link href="/patient-scheduling">
                <Button
                  variant="outlined"
                  className="text-blue-500 border-2 border-blue-500 rounded-full px-6 py-2 flex items-center transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
                >
                  <i className="fas fa-calendar-alt mr-2"></i>
                  <span font-nunito>Schedule Appointment</span>
                </Button>
              </Link>
              <Button
                variant="outlined"
                className="font-nunito text-green-500 border-2 border-green-500 rounded-full px-6 py-2 flex items-center transition-all duration-300 ease-in-out hover:bg-green-500 hover:text-white"
              >
                <i className="fas fa-tachometer-alt mr-2"></i>
                <a href="/login">View Admin Dashboard</a>
              </Button>
            </div>
          </div>
        </div>
        <div
          id="problem"
          className="relative min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100"
        >
          <h1 className="text-4xl font-semibold text-center pt-10 animate__animated animate__fadeInUp">
            The Problem
          </h1>
          <div className="flex justify-center flex-wrap items-center bg-gradient-to-r from-gray-100 via-white to-gray-100 p-8 animate__animated animate__fadeInUp">
            {problems.map((problem, index) => (
              <div key={index} className="m-4 w-full sm:w-1/3">
                <Card>
                  <CardBody>
                    <i className={`${problem.icon} text-4xl mb-4`}></i>
                    <h2 className="text-2xl font-bold mb-4">{problem.title}</h2>
                    <p className="text-lg">{problem.description}</p>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
          <h2
            id="solution"
            className="text-4xl font-semibold mb-5 animate__animated animate__fadeIn"
          >
            The Solution
          </h2>

          <div className="flex justify-center flex-wrap items-center p-8 animate__animated animate__fadeInUp">
            {solutions.map((solution, index) => (
              <div key={index} className="m-4 w-full sm:w-1/3">
                <Card>
                  <CardBody>
                    <i className={`${solution.icon} text-4xl mb-4`}></i>
                    <h2 className="text-2xl font-bold mb-4">
                      {solution.title}
                    </h2>
                    <p className="text-lg">{solution.description}</p>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-800 text-center p-5 animate__animated animate__fadeInUp">
        <p>MedSched.ai &copy; 2023. All rights reserved.</p>
      </footer>
    </div>
  );
}
