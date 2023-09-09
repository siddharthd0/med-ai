import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '../components/navigation';  
import axios from 'axios';
import { Input, Button, Textarea, Select, Option } from '@material-tailwind/react';

const FormPage = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: '',
    doctorPreference: '',
    reason: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/form', formData);
      if (res.status === 201) {
        alert('Appointment scheduled successfully!');
      }
    } catch (error) {
      alert('An error occurred while scheduling the appointment.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Head>
        <title>Patient Scheduling Form</title>
      </Head>

      {/* Navbar */}
      <Nav />

      <main className="p-10 space-y-10">
        <div className="text-center mt-16">
          <h1 className="text-4xl font-semibold">Patient Scheduling Submission Form</h1>
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
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                label="Preferred Date of Appointment"
              />
            </div>

            <div className="mb-6">
              <Input 
                type="time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                label="Preferred Time of Appointment"
              />
            </div>

            <div className="mb-6">
              <Select 
                name="consultationType"
                value={formData.consultationType}
                onChange={handleChange}
                label="Type of Consultation"
              >
                <Option value="General Consultation">General Consultation</Option>
                <Option value="Specialist Consultation">Specialist Consultation</Option>
                <Option value="Follow-up Consultation">Follow-up Consultation</Option>
                <Option color="red" value="Emergency">Emergency</Option>
              </Select>
            </div>

            <div className="mb-6">
              <Input 
                type="text"
                name="doctorPreference"
                value={formData.doctorPreference}
                onChange={handleChange}
                label="Doctor or Nurse Preference"
              />
            </div>

            <div className="mb-6">
              <Textarea 
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                label="Reason for Visit"
                rows={4}
              />
            </div>

            <Button fullWidth color="black" type="submit" ripple="light">
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
