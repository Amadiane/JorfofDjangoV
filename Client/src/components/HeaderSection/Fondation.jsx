import React from 'react';
import CADREPHOTO from '../../assets/CADREPHOTO.jpg';

const Fondation = () => {
  return (
    <div className="container mx-auto px-4 py-48"> {/* Marge top ajustée pour un meilleur espacement */}
      {/* Conteneur image et texte */}
      <div className="flex flex-col md:flex-row items-center mb-12 space-y-8 md:space-y-0 md:space-x-10">
        {/* Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={CADREPHOTO}
            alt="CADREPHOTO"
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Titre et extrait */}
        <div className="md:w-1/2 w-full">
          <h1 className="text-5xl font-bold text-[#12138B] mb-6 text-center">
          LA FONDATION TAMKINE POUR L’EXCELLENCE ET LA CRÉATIVITÉ
          </h1>
          <p className="text-2xl text-gray-700 mb-6 leading-relaxed">
          Notre raison d’être : Un choix citoyen, réfléchi, délibéré, volontaire, humaniste et responsable :
          TAMKINE – EMPOWER, c’est l’expression de notre raison d’être à la Fondation ; c’est également la transcription 
          littérale de notre volonté, de notre engagement et de notre détermination de tout entreprendre pour contribuer à 
          l’encadrement, à l’orientation, à l’accompagnement, au soutien scolaire de l’apprenant et à son accès via les Technologies de 
          l’Information et de la Communication aux moyens et outils lui permettant un parcours et des résultats scolaires de qualité.
          
          </p>
          <p className="text-2xl text-gray-700 leading-relaxed mb-6">
            
          </p>
        </div>
      </div>

      {/* Texte principal sans conteneur */}
      <div className="text-2xl text-gray-700 mb-4 leading-relaxed">
        <p className="mb-4">
        De ce fait la Fondation TAMKINE pour l’Excellence et la Créativité, Une Organisation Non Gouvernementale à but non lucratif,
           communauté grandissante de compétences et d’expertises diverses, passionnée, motivée et consciente de la problématique de
            l’éducation au Maroc, et soucieuse de répondre à la déclaration de Sa Majesté le Roi Mohammed VI faisant du besoin vital
             d’une éducation de qualité la deuxième priorité nationale après l’intégrité territoriale.
        </p>

        <p className="mb-4">
        C’est également une dynamique inclusive qui fait, avec conscience, détermination et responsabilité citoyenne, 
        appel à toutes et à tous, parents, enseignants, administrations de l’éducation, citoyennes et citoyens de tous bords,
         à s’engager de manière volontaire, active et agissante, dans la transformation et l’amélioration qualitatives continues du 
         système éducatif de notre pays.
        </p>

        <p className="mb-4">
        Convaincus de notre mission, et assurés de la pertinence de notre approche, nous sommes, à la FONDATION TAMKINE pour 
        l’EXCELLENCE et la CRÉATIVITÉ, persuadés que tout élève ou étudiant dispose d’un potentiel d’excellence et de créativité ; 
        toutes et tous méritent d’être orientés, encadrés, accompagnés ; toutes et tous méritent également de disposer des moyens pour 
        continuer et réussir leur scolarité dans les conditions requises, puis accéder au monde du travail afin de contribuer au développement économique
         et social du pays.
        </p>

        <p className="mb-4">
        Nous portons la conviction toute particulière que tout élève ou étudiant, quel que soit son origine sociale,
         son ethnie, sa langue, la situation financière de sa famille, doit être accompagné, encadré et orienté ; 
         et ne doit, sous aucune condition, ou faute de ces moyens, être obligé d’abandonner ses études ou d’opter
          pour une voie qui ne lui permettra pas de se réaliser pleinement et de contribuer de manière effective et
           agissante au développement économique et social du Pays.
        </p>

      </div>

    </div>
  );
};

export default Fondation;
