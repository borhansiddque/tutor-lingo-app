// ThemeToggle.jsx
import { useTheme } from "../provider/ThemeProvider";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { toggleTheme, isLight } = useTheme();

  return (
    <>
      <button
        onClick={toggleTheme}
        className="relative inline-flex h-8 w-16 items-center rounded-full bg-base-300 transition-all duration-300 hover:bg-base-content/10 focus:outline-none focus:ring-2 focus:ring-rose-500 text-crimson focus:ring-offset-2 focus:ring-offset-base-100 shadow-md cursor-pointer"
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      >
        {/* Background track with gradient */}
        <div className="absolute inset-0.5 rounded-full bg-gradient-to-r from-rose-400 to-rose-600"></div>

        {/* Sliding circle with icon */}
        <div
          className={`relative z-10 flex h-7 w-7 transform items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isLight ? "translate-x-0.5" : "translate-x-8"
          }`}
        >
          {/* Sun and Moon icons with smooth transition */}
          <div className="relative h-4 w-4">
            {/* Sun icon */}
            <MdSunny
              className={`absolute inset-0 h-4 w-4 text-rose-500 transition-all duration-300 ${
                isLight
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-180 scale-0"
              }`}
            />

            {/* Moon icon */}
            <FaMoon
              className={`absolute inset-0 h-4 w-4 text-slate-600 transition-all duration-300 ${
                !isLight
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-180 scale-0"
              }`}
            />
          </div>
        </div>

        {/* Background icons for visual context */}
        <div className="absolute inset-0 flex items-center justify-between px-2 text-white/70">
          <MdSunny className="h-3 w-3" />
          <FaMoon className="h-3 w-3" />
        </div>
      </button>
    </>
  );
};

export default ThemeToggle;
