import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Navlinks from "./Navlinks";
import Loginbtn from "./Loginbtn";


const NavAdminHeader = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      setScrollWidth(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-white body-font fixed top-0 left-0 w-[250px] h-full z-10 shadow-md">
      {/* Sidebar with content aligned to the left */}
      <div className="flex flex-col p-5 items-start h-full justify-between">
        {/* Upper part of the sidebar */}
        <div className="mb-8"> {/* Adjust the margin here to control distance */}
          <Logo />
        </div>

        <div className="mb-9"> {/* Adjust the margin here to control distance between links */}
          <Navlinks /> {/* Add the specific Navlinks for Admin here */}
        </div>
        
        {/* Spacer to push items to the bottom */}
        <div className="mt-auto">
          {/* <LanguageSwitcher /> */}
          <Loginbtn />
        </div>
      </div>

      {/* Progress bar positioned at the bottom of the header */}
      <div
        className="absolute bottom-0 left-0 h-[10px] transition-all duration-150"
        style={{
          width: `${scrollWidth}%`,
          backgroundColor: "#142B57", // Blue color from footer of Tamkine
        }}
      ></div>
    </header>
  );
};

export default NavAdminHeader;


// import React, { useEffect, useState } from "react";
// import Logo from "./Logo";
// import Navlinks from "./Navlinks";
// import Loginbtn from "./Loginbtn";
// import { Shield, Zap } from "lucide-react";

// const NavAdminHeader = () => {
//   const [scrollWidth, setScrollWidth] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//       const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//       const scrollPercentage = (scrollTop / scrollHeight) * 100;
//       setScrollWidth(scrollPercentage);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header className="bg-[#0a0e27] body-font fixed top-0 left-0 w-[280px] h-full z-50 shadow-2xl border-r-2 border-orange-500/30 overflow-hidden">
//       {/* Effets de fond lumineux */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-20 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/3 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-20 left-1/2 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
//       </div>

//       {/* Grille de fond */}
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

//       {/* Sidebar with content aligned to the left */}
//       <div className="relative flex flex-col p-6 items-start h-full justify-between">
//         {/* Upper part of the sidebar - Logo avec effet e-sport */}
//         <div className="mb-10 w-full">
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl"></div>
//             <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border-2 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 group">
//               <div className="flex items-center space-x-3">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-orange-500/30 blur-xl rounded-full animate-pulse"></div>
//                   <div className="relative w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-2xl shadow-2xl shadow-orange-500/50">
//                     🏀
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-white transition-all">
//                     JORFOF ADMIN
//                   </h3>
//                   <div className="flex items-center gap-1">
//                     <Zap className="w-3 h-3 text-orange-400" />
//                     <p className="text-xs text-orange-400 font-semibold">Dashboard</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation links avec style e-sport */}
//         <div className="mb-auto w-full flex-1 overflow-y-auto custom-scrollbar pr-2">
//           <div className="relative">
//             <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-blue-500 to-purple-500 rounded-full opacity-30"></div>
//             <Navlinks />
//           </div>
//         </div>
        
//         {/* Bottom section avec Loginbtn stylisé */}
//         <div className="mt-6 w-full space-y-4">
//           {/* Admin info card */}
//           <div className="relative group/admin">
//             <div className="absolute inset-0 bg-orange-500/20 blur-lg opacity-0 group-hover/admin:opacity-100 transition-opacity rounded-xl"></div>
//             <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border-2 border-orange-500/30 group-hover/admin:border-orange-500/50 transition-all">
//               <div className="flex items-center space-x-3">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-orange-500/30 blur-lg rounded-full"></div>
//                   <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-lg">
//                     <span className="font-black text-xl">A</span>
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-bold text-white">Admin</p>
//                   <p className="text-xs text-gray-400 font-semibold">admin@jorfof.org</p>
//                 </div>
//                 <Shield className="w-5 h-5 text-orange-400" />
//               </div>
//             </div>
//           </div>

//           {/* Login button */}
//           <div className="relative">
//             <Loginbtn />
//           </div>
//         </div>
//       </div>

//       {/* Progress bar avec effet néon - positionnée en bas */}
//       <div className="absolute bottom-0 left-0 w-full h-2 bg-black/40">
//         <div className="relative h-full overflow-hidden">
//           {/* Effet glow derrière la barre */}
//           <div
//             className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 blur-sm opacity-75 transition-all duration-300"
//             style={{ width: `${scrollWidth}%` }}
//           ></div>
//           {/* Barre principale */}
//           <div
//             className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/50 transition-all duration-300"
//             style={{ width: `${scrollWidth}%` }}
//           >
//             {/* Effet shine animé */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
//           </div>
//           {/* Points de progression */}
//           <div className="absolute top-1/2 left-0 w-full flex justify-between px-1 -translate-y-1/2 pointer-events-none">
//             {[0, 25, 50, 75, 100].map((point) => (
//               <div
//                 key={point}
//                 className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                   scrollWidth >= point
//                     ? 'bg-white shadow-lg shadow-orange-500/50 scale-125'
//                     : 'bg-gray-600 scale-100'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Particules décoratives */}
//       <div className="absolute top-24 left-6 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
//       <div className="absolute top-48 right-6 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
//       <div className="absolute bottom-32 left-6 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: linear-gradient(180deg, #f97316 0%, #ea580c 100%);
//           border-radius: 10px;
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(180deg, #ea580c 0%, #c2410c 100%);
//         }
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #f97316 rgba(255, 255, 255, 0.05);
//         }

//         @keyframes shine {
//           0% {
//             transform: translateX(-100%);
//           }
//           100% {
//             transform: translateX(400%);
//           }
//         }

//         .animate-shine {
//           animation: shine 3s ease-in-out infinite;
//         }
//       `}</style>
//     </header>
//   );
// };

// export default NavAdminHeader;