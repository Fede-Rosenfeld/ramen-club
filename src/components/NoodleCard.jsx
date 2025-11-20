import React from 'react';
import { motion } from 'framer-motion';
import { Star, Edit2, Trash2, Calendar } from 'lucide-react';
import { Button } from './ui/button';

export default function NoodleCard({ noodle, onEdit, onDelete }) {
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (value) => {
    if (!value) return '';
    try {
      const d = new Date(value);
      return d.toLocaleDateString();
    } catch {
      return value;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
            {noodle.name}
          </h3>
          {noodle.brand && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              {noodle.brand}
            </p>
          )}
          {renderStars(noodle.rating)}
        </div>
        
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(noodle)}
            className="h-8 w-8 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/20 text-cyan-600"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(noodle)}
            className="h-8 w-8 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {noodle.description && (
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-3">
          {noodle.description}
        </p>
      )}
      
      {noodle.date_added && (
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(noodle.date_added)}</span>
        </div>
      )}
    </motion.div>
  );
}
