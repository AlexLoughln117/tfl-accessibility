'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-gray-600 dark:text-gray-300 text-center md:text-left">
              <p>© {currentYear} Free Flow Routes</p>
              <p className="text-sm mt-1">Data provided by Transport for London</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <Link 
              href="/accessibility" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              Accessibility Guide
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              Terms of Use
            </Link>
            <a 
              href="https://tfl.gov.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              TfL Website
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Free Flow Routes is not affiliated with Transport for London. 
            We provide this service to help make London's public transport more accessible for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
} 