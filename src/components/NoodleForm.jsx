import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Star, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function NoodleForm({ noodle, raters, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    rating: 3,
    description: '',
    rater_name: 'Fede',
  });

  // Load existing noodle into the form when editing
  useEffect(() => {
    if (noodle) {
      setFormData({
        name: noodle.name || '',
        brand: noodle.brand || '',
        rating: noodle.rating || 3,
        description: noodle.description || '',
        rater_name: noodle.rater_name || 'Fede',
      });
    } else {
      // reset when adding a new one
      setFormData({
        name: '',
        brand: '',
        rating: 3,
        description: '',
        rater_name: 'Fede',
      });
    }
  }, [noodle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date_added: noodle?.date_added || new Date().toISOString().split('T')[0],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {noodle ? 'Edit Noodle' : 'Agregar nuevo Ramen'}
          </h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={onCancel}
            className="rounded-xl"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="rater" className="text-slate-700 dark:text-slate-300">
              Quien esta rankeando?
            </Label>
            <Select
              value={formData.rater_name}
              onValueChange={(value) => setFormData({ ...formData, rater_name: value })}
            >
              <SelectTrigger className="mt-2 h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {raters.map((rater) => (
                  <SelectItem key={rater} value={rater}>
                    {rater}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
              Nombre del Ramen *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Shin Ramyun, Maruchan..."
              className="mt-2 h-12 rounded-xl"
              required
            />
          </div>

          <div>
            <Label htmlFor="brand" className="text-slate-700 dark:text-slate-300">
              Marca
            </Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="e.g., Nongshim, Nissin..."
              className="mt-2 h-12 rounded-xl"
            />
          </div>

          <div>
            <Label className="text-slate-700 dark:text-slate-300 mb-3 block">
              Rating *
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= formData.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-slate-700 dark:text-slate-300">
              Descripcion / Sabores y picantes
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Taste, spice level, texture, overall thoughts..."
              className="mt-2 min-h-24 rounded-xl"
              maxLength={200}
            />
            <p className="text-xs text-slate-400 mt-1">
              {formData.description.length}/200
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 h-12 rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                noodle ? 'Update' : 'Agregar Ramen'
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
