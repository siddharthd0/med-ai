import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="z-1000 bg-white text-gray-800 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link legacyBehavior href="/">
          <a className="text-2xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500">
            MedSched.ai
          </a>
        </Link>
        <div>
          <ul className="flex space-x-6">
            <li className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500">
              <Link legacyBehavior href="/features">
                <a>Features</a>
              </Link>
            </li>
            <li className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500">
              <Link legacyBehavior href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-500">
              <Link legacyBehavior href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
