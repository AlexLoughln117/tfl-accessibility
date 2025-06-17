'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has seen the welcome overlay
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
      setIsVisible(true);
    }
  }, []);
  
  const dismissOverlay = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-blue-900 bg-opacity-95 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={dismissOverlay}
        >
          <div className="text-center text-white p-6 max-w-lg mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-4">Welcome to Free Flow Routes</h2>
              <p className="text-xl mb-8">Plan accessible journeys across London's transport network</p>
              
              <div className="loading-animation w-48 h-2 bg-blue-700 mx-auto mb-8 overflow-hidden rounded-full">
                <motion.div 
                  className="h-full bg-blue-400"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "linear"
                  }}
                />
              </div>
              
              <p className="text-blue-200 text-sm">Click anywhere to continue</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 