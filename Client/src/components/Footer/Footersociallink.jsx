import React from 'react'
import { Link } from 'react-router-dom'

const Footersociallink = () => {
  return (
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      {/* Icône Facebook */}
      <Link to="/" className="text-gray-500">
        <span className="flex items-center">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
          <span className="ml-2">Facebook</span>
        </span>
      </Link>
      
      {/* Icône Twitter */}
      <Link to="/" className="ml-3 text-gray-500">
        <span className="flex items-center">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
          <span className="ml-2">Twitter</span>
        </span>
      </Link>
      
      {/* Icône Instagram */}
      <Link to="/" className="ml-3 text-gray-500">
        <span className="flex items-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
          <span className="ml-2">Instagram</span>
        </span>
      </Link>
      
      {/* Icône LinkedIn */}
      <Link to="/" className="ml-3 text-gray-500">
        <span className="flex items-center">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" className="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
          <span className="ml-2">LinkedIn</span>
        </span>
      </Link>

      {/* Icône Telegram */}
      <Link to="/" className="ml-3 text-gray-500">
        <span className="flex items-center">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M4 12l2 2l5-5l5 5l2-2l-7-7z"></path>
          </svg>
          <span className="ml-2">Telegram</span>
        </span>
      </Link>

      {/* Icône YouTube */}
      <Link to="/" className="ml-3 text-gray-500">
        <span className="flex items-center">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M10 7L15 12L10 17V7Z"></path>
            <path d="M0 5C0 3.89543 0.89543 3 2 3H22C23.1046 3 24 3.89543 24 5V19C24 20.1046 23.1046 21 22 21H2C0.89543 21 0 20.1046 0 19V5ZM2 5V19H22V5H2Z"></path>
          </svg>
          <span className="ml-2">YouTube</span>
        </span>
      </Link>
    </span>
  )
}

export default Footersociallink
