// pages/index.js
import Head from "next/head";
import Nav from "../components/navigation";
export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-800 min-h-screen">
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

      <main className="text-center p-5 space-y-20">
        <div className="h-screen flex flex-col justify-center items-center">
          <div>
            <h1 className="text-4xl font-nunito font-semibold mb-5 animate__animated animate__fadeIn">
              Automating Patient Scheduling Like Never Before
            </h1>
            <p className="mb-10 font-nunito animate__animated animate__fadeInUp">
              MedSched.ai uses advanced algorithms to schedule and sort patient
              appointments.
            </p>

            <div className="flex justify-center items-center mb-10 space-x-4 animate__animated animate__bounceIn">
              <button className="text-blue-500 border-2 border-blue-500 rounded-full px-6 py-2 flex items-center transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white">
                <i className="fas fa-calendar-alt mr-2"></i>
                <span font-nunito >Schedule Appointment</span>
              </button>
              <button className="font-nunito text-green-500 border-2 border-green-500 rounded-full px-6 py-2 flex items-center transition-all duration-300 ease-in-out hover:bg-green-500 hover:text-white">
                <i className="fas fa-tachometer-alt mr-2"></i>
                <span>View Admin Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 animate__animated animate__fadeInUp h-screen">
          {" "}
          {/* Increased height with h-80 */}
          <div className="font-nunito border rounded p-4 hover:shadow-lg transition duration-200">
            <h3 className="font-nunito text-xl font-semibold">Smart Sorting</h3>
            <p>
              Our AI categorizes appointments based on urgency and need,
              ensuring critical cases get immediate attention.
            </p>
          </div>
          <div className="font-nunito border rounded p-4 hover:shadow-lg transition duration-200">
            <h3 className="text-xl font-semibold  font-nunito">Seamless Integration</h3>
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
        </div>

        <section className="font-nunito bg-white p-10 rounded-lg shadow-lg h-96 mx-5 text-left animate__animated animate__zoomIn">
          {" "}
          {/* Increased height with h-96 */}
          <h2 className="text-2xl font-semibold mb-5 text-center">
            How MedSched.ai Helps Doctors
          </h2>
          <p>
            By automating the scheduling process, we reduce administrative
            overhead, leaving you more time for patient care. Whether you're a
            solo practitioner or part of a large clinic, MedSched.ai adapts to
            your workflow.
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Reduce no-shows with automated reminders</li>
            <li>Optimize your schedule for fewer gaps</li>
            <li>Quickly adapt to last-minute changes</li>
          </ul>
        </section>
      </main>

      <footer className="font-nunito bg-white text-gray-800 text-center p-5 animate__animated animate__fadeInUp">
        <p>MedSched.ai &copy; 2023. All rights reserved.</p>
      </footer>
    </div>
  );
}
