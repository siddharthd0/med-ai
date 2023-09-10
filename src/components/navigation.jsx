import Link from "next/link";
import Image from "next/image";
import { Button } from "@material-tailwind/react";

const Navbar = () => {
  return (
    <nav className="z-50 backdrop-blur-md bg-opacity-40 bg-white text-gray-800 p-4 shadow-lg fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/medsched.png"
            alt="MedSched.ai"
            width={50}
            height={50}
            className="cursor-pointer"
          />
          <Link legacyBehavior href="/">
            <a className="text-2xl">
              MedSched.ai
            </a>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <div>
            <ul className="flex space-x-6">
              <li className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500">
                <Link legacyBehavior href="/#problem">
                  <a>The Problem</a>
                </Link>
              </li>
              <li className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500">
                <Link legacyBehavior href="/#solution">
                  <a>Our Solution</a>
                </Link>
              </li>
              <li className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500">
                <Link legacyBehavior href="/team">
                  <a>Mission & Team</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex space-x-4">
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
    </nav>
  );
};

export default Navbar;
