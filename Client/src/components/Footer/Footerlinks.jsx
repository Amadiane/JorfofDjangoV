import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Footerlinks = ({ links, header }) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
      <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3 uppercase">{header}</h2>
      {/* Ajout de space-y-3 pour espacer les éléments */}
      <nav className="list-none mb-0 space-y-3">
        {links && links.map((link) => {
          return (
            <li key={link}>
              <NavLink
                to={`/${link === "home" ? "" : link}`}
                className={({ isActive }) => `hover:text-white ${isActive ? "text-orange-500" : "text-white"}`}
              >
                {link}
              </NavLink>
            </li>
          );
        })}
      </nav>
    </div>
  );
};

export default Footerlinks;
