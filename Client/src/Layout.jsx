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
    <>
      {!hideHeader && <Header />}

      <div className="flex h-screen">
        {/* Barre latérale (NavAdmin) */}
        {showNavAdmin && (
          <div className="w-[250px] bg-white text-white p-5 fixed h-full">
            <NavAdmin />
          </div>
        )}

        {/* Contenu principal */}
        <div className={`flex-1 p-5 ${showNavAdmin ? "ml-[250px]" : ""}`}>
          <Outlet />
        </div>
      </div>

      {!hideFooter && <Footer />}
    </>
  );
};

export default App;
