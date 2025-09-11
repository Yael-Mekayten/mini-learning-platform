import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CategoriesService } from '../api/categories.service';
import { PromptsService } from '../api/prompts.service';
import * as Types from '../types/index';
type Category = Types.Category;
type SubCategory = Types.SubCategory;

export default function Dashboard() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await CategoriesService.getCategories();
      console.log('Categories loaded:', data);
      setCategories(data.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCategorySelect = async (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
    try {
      const { data } = await CategoriesService.getSubCategories(categoryId);
      setSubCategories(data.data);
    } catch (error) {
      console.error('Error loading subcategories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory || !prompt.trim()) {
      alert('אנא בחר קטגוריה, תת-קטגוריה וכתוב שאלה');
      return;
    }

    setLoading(true);
    try {
      const { data } = await PromptsService.create(selectedCategory, selectedSubCategory, prompt);
      setResponse(data.data.response || 'אין תשובה');
      
      // מנקה את הטופס אחרי שליחה מוצלחת
      setPrompt('');
      
      // הודעה למשתמש
      setTimeout(() => {
        alert('השיעור נשמר בהיסטוריה! אתה יכול לראות אותו בדף ההיסטוריה.');
      }, 1000);
      
    } catch (error) {
      console.error('Error sending prompt:', error);
      alert('שגיאה בשליחת השאלה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">שלום {user?.name}, בחר קטגוריית לימוד</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">בחר קטגוריה:</label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => handleCategorySelect(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">בחר קטגוריה...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {subCategories.length > 0 && (
          <div>
            <label className="block font-medium mb-2">בחר תת-קטגוריה:</label>
            <select 
              value={selectedSubCategory || ''}
              onChange={(e) => setSelectedSubCategory(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">בחר תת-קטגוריה...</option>
              {subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedSubCategory && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-2">שאל את השאלה שלך:</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="כתוב כאן את השאלה שלך..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {loading ? 'שולח...' : 'שלח שאלה'}
            </button>
          </form>
        )}

        {response && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-medium mb-2">תשובת AI:</h3>
            <div className="whitespace-pre-line text-gray-700">{response}</div>
          </div>
        )}
      </div>
    </div>
  );
}
