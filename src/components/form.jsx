import React, { useState } from 'react';
import Head from 'next/head';
import Nav from '../components/navigation';
import axios from 'axios';


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
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Patient Scheduling Submission Form</h1>
        </div>

        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">Patient Name</label>
              <input type="text" className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input type="email" className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">Preferred Date of Appointment</label>
              <input type="date" className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">Preferred Time of Appointment</label>
              <input type="time" className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">Type of Consultation</label>
              <select className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option>General Consultation</option>
                <option>Specialist Consultation</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">Doctor or Nurse Preference</label>
              <input type="text" className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">Reason for Visit</label>
              <textarea rows="4" className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-400 transition duration-200">
              Schedule Appointment
            </button>
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
