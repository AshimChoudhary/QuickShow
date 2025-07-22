import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
const Navbar = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 w-full flex items-cente r justify-between px-6 md:px-16 lg:px-36 py-5">
        <Link to="/" className="max-md:flex-1">
          <img src={assets.logo} className="w-36 h-auto" alt="" />
        </Link>

        <div>
          <XIcon className="md:hidden absolute top-6 right-6 size-6 cursor-pointer" />

          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/">Theaters</Link>
          <Link to="/">Releases</Link>
          <Link to="/favourite">Favourites</Link>
        </div>

        <div className="flex items-center gap-8">
          <SearchIcon className="max-md:hidden size-6 cursor-pointer" />
          <button className="px-4 py-1 rounded-full font-medium cursor-pointer sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition">
            Login
          </button>
        </div>
        <MenuIcon className="max-md:ml-4 md:hidden size-8 cursor-pointer" />
      </div>
    </div>
  );
};
export default Navbar;
