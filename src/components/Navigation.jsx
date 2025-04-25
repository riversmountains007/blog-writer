import { useState } from 'react';
import CustomNavlink from './CustomNavlink';

const Navigation = ({ isLoggedIn, handleLogout, navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative">
      {/* Hamburger Menu (Mobile Only) */}
      <button
        className="md:hidden p-2 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Desktop Navigation (Hidden on Mobile) */}
      <div className="hidden md:flex md:items-center md:space-x-4">
        <DesktopNavContent 
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          navigate={navigate}
        />
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Mobile menu content */}
        <div className="p-4 space-y-4">
          {/* Mobile links */}
          <MobileNavContent
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          navigate={navigate}
          closeMenu={() => setIsMenuOpen(false)}
        />
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

// Reusable navigation content components
const DesktopNavContent = ({ isLoggedIn, handleLogout, navigate }) => (
  <>
    <CustomNavlink to="/" end={true}>
      Home
    </CustomNavlink>
    {isLoggedIn ? (
      <>
        <CustomNavlink to="/allposts">All Posts</CustomNavlink>
        <CustomNavlink to="/addpost">Add Post</CustomNavlink>
        <button
          className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <button
          className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </>
    )}
  </>
);

const MobileNavContent = ({ isLoggedIn, handleLogout, navigate, closeMenu }) => (
  <div className="flex flex-col p-4 space-y-3">
    <div className="flex justify-end p-4">
      <button
        onClick={() => closeMenu()}
        className="text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    </div>
    <CustomNavlink to="/" end={true}  className="text-left px-4 py-2 border-2 border-blue-500 rounded">
      Home
    </CustomNavlink>
    {isLoggedIn ? (
      <>
        <CustomNavlink to="/allposts" className="text-left px-4 py-2 border-2 border-blue-500 rounded" >
          All Posts
        </CustomNavlink>
        <CustomNavlink to="/addpost" className="text-left px-4 py-2 border-2 border-blue-500 rounded" >
          Add Post
        </CustomNavlink>
        <button
          className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded border-2 border-blue-500 "
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <button
          className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded border-blue-500 border-2"
          onClick={() => {
            closeMenu();
            navigate("/login");
          }}
        >
          Login
        </button>
        <button
          className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded border-2 border-blue-500 "
          onClick={() => {
            closeMenu();
            navigate("/register");
          }}
        >
          Register
        </button>
      </>
    )}
  </div>
);

export default Navigation;