import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavAdmin from "./components/Header/NavAdmin"; // Assurez-vous que NavAdmin est importé

const App = () => {
  const location = useLocation();

  const hideFooter = location.pathname === "/createpost";
  const hideHeader = location.pathname === "/createpost";
  const showNavAdmin = location.pathname === "/createpost";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {!hideHeader && <Header />}

      {/* Contenu principal avec flex-grow pour occuper tout l'espace */}
      <div className="flex flex-grow">
        {/* Barre latérale (NavAdmin) */}
        {showNavAdmin && (
          <div className="w-[250px] bg-white text-gray-900 p-5 fixed h-full">
            <NavAdmin />
          </div>
        )}

        {/* Contenu principal avec marge si la sidebar est présente */}
        <div className={`flex-1 p-5 ${showNavAdmin ? "ml-[250px]" : ""} overflow-auto`}>
          <Outlet />
        </div>
      </div>

      {/* Footer toujours en bas */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
