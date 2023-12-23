import { FaSearch } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <header className="bg-slate-200 shadow-md dark:bg-[#1b1f23] showBox transition duration-500 ease-in-out">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to={"/"}>
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500 dark:text-slate-300">GOKUL-</span>
              <span className="text-slate-700 dark:text-slate-200">
                ESTATES
              </span>
            </h1>
          </Link>

          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-3 rounded-lg flex items-center transition duration-500 ease-in-out"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>
          <div className="flex justify-around">
            <ul className="p-3 flex gap-4">
              <Link to="/">
                <li className="hidden transition duration-500 ease-in-out underline-offset-8 sm:inline text-slate-700 hover:underline dark:text-white">
                  Home
                </li>
              </Link>
              <Link to="/about">
                <li className="hidden transition duration-500 ease-in-out underline-offset-8 sm:inline text-slate-700 hover:underline dark:text-white">
                  About
                </li>
              </Link>
              <Link to="/profile">
                {currentUser ? (
                  <img
                    className="rounded-full h-8 w-8 -mt-1 object-cover"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                ) : (
                  <li className=" text-slate-700 hover:underline underline-offset-8 dark:text-white">
                    {" "}
                    Sign in
                  </li>
                )}
              </Link>
            </ul>
            <button
              onClick={toggleTheme}
              className="lg:px-2 md:mx-1 text-gray-600 text-center transform hover:scale-110 transition duration-500 ease-in-out hover:text-black dark:text-white"
            >
              <MdSunny className="w-6 h-6 ml-4 -mb-1" />
              <span className="text-xs">Dark mode</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
