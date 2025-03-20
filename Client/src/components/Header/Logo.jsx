import { Link } from "react-router-dom";
import logo from "../../assets/TAMTECH LOGO-04.png"; // Importation de l'image du logo

const Logo = () => {
  return (
    <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <img src={logo} alt="Tamkine Logo" className="w-18 h-14 mr-3" /> {/* Image du logo agrandie */}
    </Link>
  );
};

export default Logo;
