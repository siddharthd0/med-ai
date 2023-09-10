import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Nav from "../components/navigation";
import Head from "next/head";
import { useRouter } from "next/router";
import { AppointmentTable } from "@/components/appointmentTable";

export default function admindashboard() {
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();
  const { email, name } = router.query;
  const [doctors, setDoctors] = useState(3);
  const [nurses, setNurses] = useState(9);
  const appointmentHours = (appointments.length * 40) / 60;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/get-appointments");
      const data = await response.json();
      setAppointments(data);
    }
    fetchData();
  }, [setAppointments]);

  const pieData = [
    { name: "Doctors", value: 5 },
    { name: "Nurses", value: 3 },
  ];

  const barData = [{ name: "Appointment Hours", value: appointmentHours }];
  if (!name || !email) {
    return (
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
    );
  }

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

        <Nav />

        <main className="color-black relative">
          <div className="relative h-full flex flex-col ">
            <div className="ml-12 mt-28">
              <main>
                <h1>Welcome, {name ? name : "Guest"}</h1>
                <p>Your email: {email ? email : "Not provided"}</p>
                <h2>Total Appointments: {appointments.length}</h2>

                <h3>Personnel Available</h3>
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={pieData}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>

                <h3>Appointment Hours</h3>
                <BarChart width={300} height={300} data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </main>
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
