// pages/Team.js
import Head from 'next/head';
import Nav from '../components/navigation';
import { Card, CardBody } from '@material-tailwind/react';

export default function Team() {
  const teamMembers = [
    {
      name: 'Siddharth Duggal',
      role: 'Creator',
      image: '/sid.png',
      github: 'https://github.com/siddharthd0',
      linkedin: 'https://www.linkedin.com/in/siddharth-duggal',
    },
    {
      name: 'Aditya Sahasranam',
      role: 'Creator',
      image: '/adi.jpg',
      github: 'https://github.com/adityasahas',
      linkedin: 'https://www.linkedin.com/in/adityasahas2025/',
    },
    {
      name: 'Pranith Molakallapalli',
      role: 'Creator',
      image: '/pran.JPG',
      github: 'https://github.com/PranTanTheMan',
      linkedin: 'https://www.linkedin.com/in/pranith-molakalapalli/',
    },
  ];

  return (
    <div className="text-gray-800 min-h-screen bg-white">
      <Head>
        <title>Our Team and Mission - MedSched.ai</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      <Nav className="mt-0" />

      <main className="text-center relative animate__animated animate__fadeIn pt-28">
      <h1 className="text-4xl font-bold mt-10 animate__animated animate__fadeIn">Our Mission</h1>
        <p className="max-w-2xl mx-auto text-lg p-8 animate__animated animate__fadeInUp">
          MedSched.ai is committed to automating patient scheduling using advanced algorithms
          to provide optimal appointment times, minimize resource wastage, and improve the overall
          healthcare experience for both patients and providers.
        </p>
        <h1 className="text-4xl font-bold animate__animated animate__fadeIn pt-6">Our Team</h1>
        <div className="flex flex-wrap justify-center items-center p-8 animate__animated animate__fadeInUp">
          {teamMembers.map((member, index) => (
            <div key={index} className="m-4 w-full sm:w-1/3 animate__animated animate__fadeInUp">
              <Card>
                <CardBody>
                  <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">{member.name}</h2>
                  <p className="text-lg mb-4">{member.role}</p>
                  <a href={member.github} target="_blank" rel="noreferrer">
                    <i className="fab fa-github text-lg mr-4"></i>
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin text-lg"></i>
                  </a>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>

      
      </main>

      <footer className="bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-800 text-center p-5 animate__animated animate__fadeInUp">
        <p>MedSched.ai &copy; 2023. All rights reserved.</p>
      </footer>
    </div>
  );
}
