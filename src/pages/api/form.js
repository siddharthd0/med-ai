import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

const FormPage = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: '',
    doctorPreference: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  return (
    <div className="bg-white text-black min-h-screen">
      <Head>
        <title>Patient Scheduling Form</title>
      </Head>

      <main className="p-10 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Patient Scheduling Submission Form</h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Patient Name</label>
            <input 
              type="text" 
              name="patientName"
              onChange={handleChange}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input 
              type="email" 
              name="email"
              onChange={handleChange}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Preferred Date</label>
            <input 
              type="date" 
              name="preferredDate"
              onChange={handleChange}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Preferred Time</label>
            <input 
              type="time" 
              name="preferredTime"
              onChange={handleChange}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Consultation Type</label>
            <select 
              name="consultationType"
              onChange={handleChange}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="General Consultation">General Consultation</option>
              <option value="Specialist Consultation">Specialist Consultation</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Doctor Preference</label>
            <input 
              type="text" 
              name="doctorPreference"
              onChange={handleChange}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Reason for Visit</label>
            <textarea 
              rows="4" 
              name="reason"
              onChange={handleChange}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-400 transition duration-200">
            Schedule Appointment
          </button>
        </form>
      </main>

      <footer className="bg-white text-gray-800 text-center p-5">
        <p>MedSched.ai &copy; 2023. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FormPage;
