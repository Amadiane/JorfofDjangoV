
// import { Outlet, useLocation, Navigate } from "react-router-dom";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
// import NavAdmin from "./components/Header/NavAdmin";
// import { I18nextProvider } from "react-i18next";
// import i18n from "./i18n";
// import React from "react";

// const App = () => {
//   const location = useLocation();

//   // 🔹 Liste des chemins admin
//   const adminPaths = [
//     "/createpost",
//     "/listeContacts",
//     "/listeRejoindre",
//     "/listePostulantsCommunity",
//     "/listPartners",
//     "/listeAbonnement",
//     "/platformPost",
//     "/valeurPost",
//     "/fondationPost",
//     "/motPresidentPost",
//     "/videoPost",
//     "/photoPost",
//     "/documentPost",
//     "/mediaPartenairePost",
//     "/programPost",
//     "/dashboardAdmin",
//     "/teamMessage",
//     "/missionPost",
//     "/activitiesPost",
//   ];

//   const isAdminPage = adminPaths.includes(location.pathname);

//   // 🔹 Vérifier si on est sur la page de login
//   const isLoginPage = location.pathname === "/login";

//   // 🔹 Vérifier si l'utilisateur est connecté
//   const token = localStorage.getItem("access");

//   // 🔹 Rediriger vers /login si on tente d’accéder à une page admin sans être connecté
//   if (isAdminPage && !token) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <I18nextProvider i18n={i18n}>
//       <div className="flex flex-col min-h-screen">
//         {/* ✅ Masquer Header sur /login et pages admin */}
//         {!isAdminPage && !isLoginPage && <Header />}

//         {/* ✅ Menu latéral admin */}
//         {isAdminPage && (
//           <div className="w-[250px] bg-white text-gray-900 p-5 fixed h-full">
//             <NavAdmin />
//           </div>
//         )}

//         {/* ✅ Contenu principal */}
//         <div className="flex flex-grow">
//           <div
//             className={`flex-1 p-5 ${
//               isAdminPage ? "ml-[250px]" : ""
//             } overflow-auto`}
//           >
//             <Outlet />
//           </div>
//         </div>

//         {/* ✅ Masquer Footer sur /login et pages admin */}
//         {!isAdminPage && !isLoginPage && <Footer />}
//       </div>
//     </I18nextProvider>
//   );
// };

// export default App;


import { Outlet, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavAdmin from "./components/Header/NavAdmin";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import React from "react";

const App = () => {
  const location = useLocation();

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
    "/teamMessage",
    "/missionPost",
    "/activitiesPost",
    "/homePost",
  ];

  const isAdminPage = adminPaths.includes(location.pathname);
  const isLoginPage = location.pathname === "/login";
  const token = localStorage.getItem("access");

  if (isAdminPage && !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      {/* 🌌 Fond global avec dégradé sombre type NBA */}
      <div
        className={`flex flex-col min-h-screen w-full text-white overflow-x-hidden ${
          isAdminPage
            ? "bg-white text-gray-900"
            : "bg-gradient-to-b from-[#0a0e27] via-[#0b123a] to-[#050817]"
        }`}
      >
        {/* Header visible uniquement sur les pages publiques */}
        {!isAdminPage && !isLoginPage && <Header />}

        {/* Sidebar admin */}
        {isAdminPage && (
          <div className="w-[250px] bg-white text-gray-900 p-5 fixed h-full shadow-lg">
            <NavAdmin />
          </div>
        )}

        {/* Contenu principal */}
        <main
          className={`flex-1 w-full ${
            isAdminPage ? "ml-[250px] bg-gray-50 text-gray-900" : ""
          } overflow-auto`}
        >
          <Outlet />
        </main>

        {/* Footer visible uniquement sur les pages publiques */}
        {!isAdminPage && !isLoginPage && <Footer />}
      </div>
    </I18nextProvider>
  );
};

export default App;
