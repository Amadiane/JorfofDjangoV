import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next";

const Navlinks = () => {
  const { t } = useTranslation(); // Hook pour traductions
  return (
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
    <NavLink to="/" className={({isActive})=>`mr-5 hover:text-gray-900 ${isActive ? "bg-white text-[#12138B] font-bold text-lg" : "text-black font-bold text-lg"}`}>{t("À LA UNE")}</NavLink>
    <NavLink to="/createpost" className={({isActive})=>`mr-5 hover:text-gray-900 ${isActive ? "bg-white text-[#12138B] font-bold text-lg" : "text-black font-bold text-lg"}`}>{t("Créer un post")}</NavLink>
    {/* <NavLink to="/" className="mr-5 hover:text-gray-900"></NavLink> */}
  </nav>
  )
}

export default Navlinks