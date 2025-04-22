import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n.js';
import './index.css';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import Categories from './components/Categories/Categories.jsx';
import Createpost from './components/Createpost/Createpost.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Forgetpassword from './components/Forgotpassword/Forgotpassword.jsx';
import Blogdetail from './components/Blogdetail/Blogdetail.jsx';
import PrivateRoute from './components/Routes/PrivateRoute';

import Quisommesnous from './components/Footer/Quisommesnous.jsx';
import Contacternous from './components/Footer/Contacternous.jsx';
import NousRejoindre from './components/Footer/Nousrejoindre.jsx';
import MotPresi from './components/HeaderSection/MotPresi.jsx';
import Fondation from './components/HeaderSection/Fondation.jsx';
import NosValeurs from './components/HeaderSection/NosValeurs.jsx';
import NosMissions from './components/HeaderSection/NosMissions.jsx';
import NotreEquipe from './components/HeaderSection/NotreEquipe.jsx';
import Programs from './components/HeaderSection/Programs.jsx';
import Community from './components/HeaderSection/Community.jsx';
import Partner from './components/HeaderSection/Partner.jsx';
import Plateforms from './components/HeaderSection/Plateforms.jsx';
import MotPresidentpost from './components/Createpost/MotPresidentpost.jsx';
import TeamMessage from './components/Createpost/TeamPost.jsx';
import MissionPost from './components/Createpost/MissionPost.jsx';
import NousRejoindreHeader from './components/HeaderSection/NousRejoindreHeader.jsx';
import ListeRejoindre from './components/Admin/ListeRejoindre.jsx';
import ListeContacts from './components/Admin/ListeContacts.jsx';
import ListePostulantsCommunity from './components/Admin/ListeCommunity.jsx';
import ListPartners from './components/Admin/ListePartner.jsx';
import ListeAbonnement from './components/Admin/ListeAbonnement.jsx';
import PlatformPost from './components/Admin/PlatformPost.jsx';
import ValeurPost from './components/Admin/ValeurPost.jsx';
import ProgramPost from './components/Admin/ProgramPost.jsx';

// Configuration du routage
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route element={<PrivateRoute />}>
          <Route path="/createpost" element={<Createpost />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgetpassword />} />
        <Route path="/blogdetail/:blogid" element={<Blogdetail />} />
        <Route path="quisommesnous" element={<Quisommesnous />} />
        <Route path="contacternous" element={<Contacternous />} />
        <Route path="nousRejoindre" element={<NousRejoindre />} />
        <Route path="motpresi" element={<MotPresi />} />
        <Route path="fondation" element={<Fondation />} />
        <Route path="nosValeurs" element={<NosValeurs />} />
        <Route path="nosMissions" element={<NosMissions />} />
        <Route path="notreEquipe" element={<NotreEquipe />} />
        <Route path="programs" element={<Programs />} />
        <Route path="community" element={<Community />} />
        <Route path="partner" element={<Partner />} />
        <Route path="plateforms" element={<Plateforms />} />
        <Route path="motPresidentpost" element={<MotPresidentpost />} />
        <Route path="teamMessage" element={<TeamMessage />} />
        <Route path="missionPost" element={<MissionPost />} />
        <Route path="nousRejoindreHeader" element={<NousRejoindreHeader />} />
        <Route path="/listeRejoindre" element={<ListeRejoindre />} />
        <Route path="/listeContacts" element={<ListeContacts />} />
        <Route path="/listePostulantsCommunity" element={<ListePostulantsCommunity />} />
        <Route path="/listPartners" element={<ListPartners />} />
        <Route path="/listeAbonnement" element={<ListeAbonnement />} />
        <Route path="/platformPost" element={<PlatformPost />} />
        <Route path="/valeurPost" element={<ValeurPost />} />
        <Route path="/programPost" element={<ProgramPost />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </>
  )
);

// Rendu final
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18next={i18next}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </StrictMode>
);
