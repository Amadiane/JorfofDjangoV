import React from 'react';
import Footersociallink from './Footersociallink';

const Footerlastpart = () => {
  return (
    <div className="bg-[#1C1C47] text-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6">
        {/* Réseaux sociaux bien centrés */}
        <div className="flex justify-center">
          <Footersociallink />
        </div>
        
        {/* Texte Copyright bien centré */}
        <p className="text-sm text-white text-center">
          © 2025 Copyright Tamkine - Tous droits réservés. Tamkine n'est pas responsable des contenus provenant de sites Internet externes.
        </p>
      </div>
    </div>
  );
};

export default Footerlastpart;
