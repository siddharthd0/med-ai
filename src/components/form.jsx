import React, { useState } from "react";
import Head from "next/head";
import Nav from "../components/navigation";
import axios from "axios";
import {
  Input,
  Button,
  Textarea,
  Select,
  Option,
  PopoverHandler,
  PopoverContent,
  IconButton,
  Popover,
} from "@material-tailwind/react";

const FormPage = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    preferredTime: "",
    nature: "",
    reason: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("formData before sending:", formData);

    try {
      console.log("Sending form data:", formData);
      // Updated API route to newForm
      const res = await axios.post("/api/form", formData);

      if (res.status === 201 && res.data.success === true) {
        alert("Appointment scheduled successfully!");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response?.status, error.response?.data);
      alert("An error occurred while scheduling the appointment.");
    }
  };

  const handleChange = (e) => {
    console.log(e); // log the entire event object
    if (!e.target) return;
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />

        <title>Patient Scheduling Form</title>
      </Head>

      <Nav />

      <main className="p-10 space-y-10">
        <div className="text-center mt-16">
          <h1 className="text-4xl font-semibold">
            Patient Scheduling Submission Form
          </h1>
        </div>

        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                label="Patient Name"
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

            <div className="mb-6">
              <Input
                type="text"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                label="Preferred Time of Appointment"
              />
            </div>
            <div className="flex items-center">
              <Input
                type="text"
                name="nature"
                value={formData.nature}
                onChange={handleChange}
                label="Nature of Appointment"
              />
              <Popover placement="top" trigger="hover">
                <PopoverHandler>
                  <IconButton
                    className="ml-2"
                    color="lightBlue"
                    buttonType="filled"
                    iconOnly={true}
                    rounded={true}
                    ripple="dark"
                  >
                    <i className="fas fa-info-circle"></i>
                  </IconButton>
                </PopoverHandler>
                <PopoverContent color="white" style={{ padding: "1rem" }}>
                  <ul>
                    <li>- Routine Check-up</li>
                    <li>- Follow-up</li>
                    <li>- Specialist Consultation</li>
                    <li>- Diagnostic Test</li>
                    <li>- Postoperative</li>
                    <li>- Emergency</li>
                    <li>- Vaccination</li>
                    <li>- Mental Health</li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-6 mb-6">
              <Textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                label="Reason for Visit"
                rows={4}
              />
            </div>

            <Button fullWidth color="black" type="submit" ripple={true}>
              Schedule Appointment
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
