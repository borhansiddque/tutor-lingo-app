import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <aside>
        <img src={logo} alt="" />
        <h3 className="text-3xl">
          TutorLingo<span className="text-rose-600">.</span>
        </h3>
        <p>Trusted by language learners since { new Date().getFullYear()}</p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <Link
          to={"/find-tutors"}
          className="border-b border-transparent hover:border-rose-700 cursor-pointer"
        >
          Find Tutors
        </Link>
        <Link
          to={"/add-tutorials"}
          className="border-b border-transparent hover:border-rose-700 cursor-pointer"
        >
          Become A Tutor
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="border-b border-transparent hover:border-rose-700 cursor-pointer">
          About us
        </a>
        <Link to={'contact-us'} className="border-b border-transparent hover:border-rose-700 cursor-pointer">
          Contact
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Social Media</h6>
        <a
          href="https://www.facebook.com/borhan.siddque.19/"
          target="_blank"
          className="border-b border-transparent hover:border-rose-700 cursor-pointer"
        >
          Facebook
        </a>
        <a
          href="https://www.instagram.com/borhan_siddque/"
          target="_blank"
          className="border-b border-transparent hover:border-rose-700 cursor-pointer"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/in/borhan-siddque/"
          target="_blank"
          className="border-b border-transparent hover:border-rose-700 cursor-pointer"
        >
          LinkedIn
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
