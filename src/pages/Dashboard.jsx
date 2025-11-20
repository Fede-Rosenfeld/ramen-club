// DASHBOARD — CON SUPABASE ACTIVO
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Soup, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import NoodleCard from '../components/NoodleCard';
import NoodleForm from '../components/NoodleForm';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNoodle, setEditingNoodle] = useState(null);
  const [noodles, setNoodles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const raters = ['Fede', 'Mechi', 'Meli'];
  const raterColors = {
    Fede: 'from-cyan-500 to-blue-600',
    Mechi: 'from-purple-500 to-pink-600',
    Meli: 'from-pink-500 to-rose-600',
  };

  // Seguridad
  useEffect(() => {
    const hasAccess = localStorage.getItem('ramen_access');
    if (!hasAccess) {
      navigate(createPageUrl('Home'));
    }
  }, []);

  // 🔥 Cargar noodles desde Supabase
  useEffect(() => {
  async function loadNoodles() {
    const { data, error } = await supabase
      .from('noodles')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Supabase SELECT error:', error);
      alert('Error al cargar los noodles: ' + error.message);
      setNoodles([]);
    } else {
      setNoodles(data);
    }
    setLoading(false);
  }

  loadNoodles();
  }, []);

  // 🔥 Crear / Actualizar noodle
  const handleSubmit = async (data) => {
  setIsSubmitting(true);

    try {
      if (editingNoodle) {
        // UPDATE
        const { error } = await supabase
          .from('noodles')
          .update(data)
          .eq('id', editingNoodle.id);

        if (error) {
          console.error('Supabase UPDATE error:', error);
          alert('Error al actualizar: ' + error.message);
          return;
        }

        setNoodles((prev) =>
          prev.map((n) => (n.id === editingNoodle.id ? { ...n, ...data } : n))
        );
      } else {
        // INSERT
        const { data: newNoodle, error } = await supabase
          .from('noodles')
          .insert([
            {
              ...data,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error('Supabase INSERT error:', error);
          alert('Error al crear: ' + error.message);
          return;
        }

        setNoodles((prev) => [newNoodle, ...prev]);
      }

      setShowForm(false);
      setEditingNoodle(null);
    } finally {
      setIsSubmitting(false);
    }
  };


  // 🔥 Borrar noodle
  const handleDelete = async (noodle) => {
    if (!window.confirm(`Delete "${noodle.name}"?`)) return;

    await supabase.from('noodles').delete().eq('id', noodle.id);

    setNoodles((prev) => prev.filter((n) => n.id !== noodle.id));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('ramen_access');
    navigate(createPageUrl('Home'));
  };

  const filteredNoodles = noodles.filter((n) => {
    const q = searchQuery.toLowerCase();
    return (
      n.name.toLowerCase().includes(q) ||
      (n.brand && n.brand.toLowerCase().includes(q)) ||
      (n.description && n.description.toLowerCase().includes(q))
    );
  });

  const getNoodlesByRater = (name) =>
    filteredNoodles.filter((n) => n.rater_name === name);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              <Soup className="w-12 h-12 text-cyan-500" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ramen para 3
              </h1>
              <p className="text-sm text-slate-500">
                {noodles.length} ramenes rankeados
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => {
                setEditingNoodle(null);
                setShowForm(true);
              }}
              className="h-12 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Agregar Ramen
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="h-12 px-4 rounded-xl"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ramen..."
              className="h-14 pl-12 rounded-2xl text-lg border-2"
            />
          </div>
        </div>

        {/* Columns */}
        {loading ? (
          <p className="text-center text-slate-400">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {raters.map((rater) => {
              const list = getNoodlesByRater(rater);
              const avg =
                list.length > 0
                  ? (
                      list.reduce((s, n) => s + n.rating, 0) / list.length
                    ).toFixed(1)
                  : 0;

              return (
                <motion.div
                  key={rater}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border-2"
                >
                  <div className="mb-6">
                    <div
                      className={`inline-block px-6 py-3 rounded-2xl bg-gradient-to-r ${raterColors[rater]} text-white shadow-lg mb-3`}
                    >
                      <h2 className="text-2xl font-bold">{rater}</h2>
                    </div>
                    <div className="text-sm text-slate-500 flex gap-4">
                      <span>{list.length} Ramens</span>
                      {list.length > 0 && <span>⭐ {avg} avg</span>}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence>
                      {list.length === 0 ? (
                        <p className="text-center text-slate-400 py-12">
                          Sin ramenes rankeados por ahora!
                        </p>
                      ) : (
                        list.map((n) => (
                          <NoodleCard
                            key={n.id}
                            noodle={n}
                            onEdit={() => {
                              setEditingNoodle(n);
                              setShowForm(true);
                            }}
                            onDelete={() => handleDelete(n)}
                          />
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <NoodleForm
            noodle={editingNoodle}
            raters={raters}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingNoodle(null);
            }}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
