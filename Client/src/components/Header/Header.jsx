import React from 'react';
import Logo from './Logo';
import Navlinks from './Navlinks';
import Loginbtn from './Loginbtn';
import LanguageSwitcher from '../LanguageSwitcher';

const Header = () => {
  return (
    <header className="bg-white body-font fixed top-0 left-0 w-full z-10 shadow-md"> {/* header figé en haut */}
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Logo />
        <Navlinks />
        <LanguageSwitcher />
        <Loginbtn />
      </div>
    </header>
  );
};

export default Header;
