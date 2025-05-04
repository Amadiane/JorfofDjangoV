import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n.js';
import './index.css';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// Layout principal
import App from './Layout.jsx';

// Pages principales
import Home from './components/Home/Home.jsx';
import Categories from './components/Categories/Categories.jsx';
import Createpost from './components/Createpost/Createpost.jsx';
import Login from './components/Login/Login.jsx';
import Forgetpassword from './components/Forgotpassword/Forgotpassword.jsx';
import Blogdetail from './components/Blogdetail/Blogdetail.jsx';

// Admin et routes protégées
import PrivateRoute from './components/Routes/PrivateRoute.jsx';
import DashboardAdmin from './components/Admin/DashboardAdmin.jsx';

// Sections / Footer / Header
import Quisommesnous from './components/Footer/Quisommesnous.jsx';
import Contacternous from './components/Footer/Contacternous.jsx';
import NousRejoindre from './components/Footer/Nousrejoindre.jsx';
import MotPresident from './components/HeaderSection/MotPresident.jsx';
import Fondation from './components/HeaderSection/Fondation.jsx';
import NosValeurs from './components/HeaderSection/NosValeurs.jsx';
import NosMissions from './components/HeaderSection/NosMissions.jsx';
import NotreEquipe from './components/HeaderSection/NotreEquipe.jsx';
import Programs from './components/HeaderSection/Programs.jsx';
import Community from './components/HeaderSection/Community.jsx';
import Partner from './components/HeaderSection/Partner.jsx';
import Plateforms from './components/HeaderSection/Plateforms.jsx';
import Videotheque from './components/HeaderSection/Videotheque.jsx';
import Phototheque from './components/HeaderSection/Phototheque.jsx';
import Document from './components/HeaderSection/Document.jsx';
import MediaPartenaire from './components/HeaderSection/MediaPartenaire.jsx';
import Actualites from './components/HeaderSection/Actualites.jsx';
import NousRejoindreHeader from './components/HeaderSection/NousRejoindreHeader.jsx';

// Admin Posts
import TeamMessage from './components/Admin/TeamPost.jsx';
import MissionPost from './components/Admin/MissionPost.jsx';
import ListeRejoindre from './components/Admin/ListeRejoindre.jsx';
import ListeContacts from './components/Admin/ListeContacts.jsx';
import ListePostulantsCommunity from './components/Admin/ListeCommunity.jsx';
import ListPartners from './components/Admin/ListePartner.jsx';
import ListeAbonnement from './components/Admin/ListeAbonnement.jsx';
import PlatformPost from './components/Admin/PlatformPost.jsx';
import ValeurPost from './components/Admin/ValeurPost.jsx';
import FondationPost from './components/Admin/FondationPost.jsx';
import MotPresidentPost from './components/Admin/MotPresidentPost.jsx';
import VideoPost from './components/Admin/VideoPost.jsx';
import PhotoPost from './components/Admin/PhotoPost.jsx';
import DocumentPost from './components/Admin/DocumentPost.jsx';
import MediaPartenairePost from './components/Admin/MediaPartenairePost.jsx';
import ProgramPost from './components/Admin/ProgramPost.jsx';

// Définir les routes avec `createBrowserRouter`
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="categories" element={<Categories />} />
      <Route path="createpost" element={<Createpost />} />
      <Route path="forgotpassword" element={<Forgetpassword />} />
      <Route path="blogdetail/:blogid" element={<Blogdetail />} />
      <Route path="qui-sommes-nous-" element={<Quisommesnous />} />
      <Route path="contacter-tamkine" element={<Contacternous />} />
      <Route path="nous-rejoindre" element={<NousRejoindre />} />
      <Route path="motPresident" element={<MotPresident />} />
      <Route path="fondation" element={<Fondation />} />
      <Route path="nosValeurs" element={<NosValeurs />} />
      <Route path="nosMissions" element={<NosMissions />} />
      <Route path="notreEquipe" element={<NotreEquipe />} />
      <Route path="programs" element={<Programs />} />
      <Route path="community" element={<Community />} />
      <Route path="partner" element={<Partner />} />
      <Route path="plateforms" element={<Plateforms />} />
      <Route path="videotheque" element={<Videotheque />} />
      <Route path="phototheque" element={<Phototheque />} />
      <Route path="document" element={<Document />} />
      <Route path="mediaPartenaire" element={<MediaPartenaire />} />
      <Route path="actualites" element={<Actualites />} />
      <Route path="nousRejoindreHeader" element={<NousRejoindreHeader />} />

      {/* Routes admin protégées */}
      <Route element={<PrivateRoute />}>
        <Route path="dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="teamMessage" element={<TeamMessage />} />
        <Route path="missionPost" element={<MissionPost />} />
        <Route path="listeRejoindre" element={<ListeRejoindre />} />
        <Route path="listeContacts" element={<ListeContacts />} />
        <Route path="listePostulantsCommunity" element={<ListePostulantsCommunity />} />
        <Route path="listPartners" element={<ListPartners />} />
        <Route path="listeAbonnement" element={<ListeAbonnement />} />
        <Route path="platformPost" element={<PlatformPost />} />
        <Route path="valeurPost" element={<ValeurPost />} />
        <Route path="fondationPost" element={<FondationPost />} />
        <Route path="motPresidentPost" element={<MotPresidentPost />} />
        <Route path="videoPost" element={<VideoPost />} />
        <Route path="photoPost" element={<PhotoPost />} />
        <Route path="documentPost" element={<DocumentPost />} />
        <Route path="mediaPartenairePost" element={<MediaPartenairePost />} />
        <Route path="programPost" element={<ProgramPost />} />
      </Route>

      <Route path="login" element={<Login />} />
    </Route>
  )
);

// Montée de l'application avec le routeur et le support de traduction
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </StrictMode>
);
