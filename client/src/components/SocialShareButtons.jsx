import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
const SocialShareButtons = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between">
      <a target="_blank" rel="noreferrer" href="/">
        <FaSquareFacebook className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href="/">
        <FaTwitter className="text-[#00acee] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href="/">
        <FaInstagram className="text-[#fa591e] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href="/">
        <FaWhatsapp className="text-[#25D366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareButtons;
