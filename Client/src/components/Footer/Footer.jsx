import React from 'react';
import Footerlinks from './Footerlinks';
import Footersubscibe from './Footersubscibe';
import Footerlastpart from './Footerlastpart';

const Footer = () => {
  return (
    <footer className="bg-[#1C1C47] text-white">
      <div className="container px-40 py-12 mx-auto">
         {/* Ajout de gap-10 pour espacer les composants */}
         <div className="flex flex-wrap md:text-left text-center order-first gap-0">
         <Footerlinks header="Dans l'actualité" links={["home", "categories", "createpost"]} />
          <Footerlinks header="À propos de Tamkine" links={["Qui sommes-nous ?", "Contacter Tamkine", "Nous rejoindre"]} />
          <Footerlinks header="Nos services" links={["popular", "Recent", "old"]} />
          <Footersubscibe />
        </div>
      </div>
      <Footerlastpart />
    </footer>
  );
};

export default Footer;
