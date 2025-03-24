import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next'; // Importer le provider
import i18next from './i18n.js'; // Importer la configuration i18next
import './i18n.js'; // Importer la configuration i18next

import App from './Layout.jsx';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Categories from './components/Categories/Categories.jsx';
import Createpost from './components/Createpost/Createpost.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Forgetpassword from './components/Forgotpassword/Forgotpassword.jsx';
import Blogdetail from './components/Blogdetail/Blogdetail.jsx';
import NavAdmin from "./components/Header/NavAdmin"; 

// Configuration du routage
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Définir App comme Layout pour toutes les routes sauf /login */}
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/createpost" element={<Createpost />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgetpassword />} />
        <Route path="/blogdetail/:blogid" element={<Blogdetail />} />
      </Route>

      {/* Page de connexion sans le Layout App */}
      <Route path="/login" element={<Login />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18next={i18next}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </StrictMode>
);
