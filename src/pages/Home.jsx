import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Soup, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Home() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (code.toUpperCase() === 'MARTES3') {
      localStorage.setItem('ramen_access', 'true');
      alert('Bienvenido a Ramen para 3! 🍜'); // si querés, luego metemos sonner
      navigate(createPageUrl('Dashboard'));
    } else {
      alert('Invalid access code. Try again!');
      setCode('');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto px-4"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-6"
          >
            <Soup className="w-24 h-24 text-cyan-500" />
          </motion.div>
          
          <h1 className="text-5xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            RAMEN PARA 3
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
            Ramen Rating Tracker
          </p>
          
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Para Fede, Mechi & Meli
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4 text-slate-700 dark:text-slate-300">
              <Lock className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Poner contraseña</h2>
            </div>
            
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Clave de acceso..."
              className="h-14 text-center text-2xl font-bold tracking-wider rounded-xl mb-6"
              autoFocus
            />
            
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              Entrar
            </Button>
          </div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Espacio privado para rankear nuestros ramens que probamos los martes 🍜
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
