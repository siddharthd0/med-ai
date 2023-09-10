import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="z-50 backdrop-blur-md bg-opacity-40 bg-white text-gray-800 p-4 shadow-lg fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link legacyBehavior href="/">
          <a className="text-2xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500">
            MedSched.ai
          </a>
        </Link>
        <div>
          <ul className="flex space-x-6">
            <li className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500">
              <Link legacyBehavior href="#problem">
                <a>The Problem</a>
              </Link>
            </li>
            <li className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500">
              <Link legacyBehavior href="#solution">
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
      </div>
    </nav>
  );
};

export default Navbar;
