import React from 'react';
import ThemeToggle from './components/ThemeToggle.jsx';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <style>{`
        :root {
          --color-primary: 6 182 212;
          --color-danger: 239 68 68;
          --color-impostor: 168 85 247;
        }
        
        .dark {
          --color-primary: 34 211 238;
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        }
      `}</style>
      
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </div>
    </div>
  );
}
