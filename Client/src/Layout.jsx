import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavAdmin from "./components/Header/NavAdmin";

const App = () => {
  // Récupérer la localisation actuelle
  const location = useLocation();

  // Définir les chemins d'accès pour les pages admin
  const adminPaths = [
    "/createpost",
    "/listeContacts",
    "/listeRejoindre",
    "/listePostulantsCommunity",
    "/listPartners",
    "/listeAbonnement",
    "/platformPost",
    "/valeurPost",
    "/fondationPost",
    "/motPresidentPost",
    "/videoPost",
    "/photoPost",
    "/documentPost",
    "/mediaPartenairePost",
    "/programPost",
    "/dashboardAdmin",
  ];

  // Vérifier si la page actuelle est une page admin
  const isAdminPage = adminPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Afficher le Header si ce n'est pas une page admin */}
      {!isAdminPage && <Header />}

      {/* Afficher le NavAdmin uniquement pour les pages admin */}
      {isAdminPage && (
        <div className="w-[250px] bg-white text-gray-900 p-5 fixed h-full">
          <NavAdmin />
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex flex-grow">
        {/* Le contenu principal du site avec un espace réservé si c'est une page admin */}
        <div
          className={`flex-1 p-5 ${isAdminPage ? "ml-[250px]" : ""} overflow-auto`}
        >
          <Outlet />
        </div>
      </div>

      {/* Afficher le Footer si ce n'est pas une page admin */}
      {!isAdminPage && <Footer />}
    </div>
  );
};

export default App;
