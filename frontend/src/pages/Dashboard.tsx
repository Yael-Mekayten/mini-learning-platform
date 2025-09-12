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
      alert('Please select category, subcategory and write a question');
      return;
    }

    setLoading(true);
    try {
      const { data } = await PromptsService.create(selectedCategory, selectedSubCategory, prompt);
      setResponse(data.data.response || 'No response');
      
      // מנקה את הטופס אחרי שליחה מוצלחת
      setPrompt('');
      
      // הודעה למשתמש
      setTimeout(() => {
        alert('Lesson saved to history! You can view it in the history page.');
      }, 1000);
      
    } catch (error) {
      console.error('Error sending prompt:', error);
      alert('Error sending question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Hello {user?.name}, choose a learning category</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Select Category:</label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => handleCategorySelect(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose category...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {subCategories.length > 0 && (
          <div>
            <label className="block font-medium mb-2">Select Subcategory:</label>
            <select 
              value={selectedSubCategory || ''}
              onChange={(e) => setSelectedSubCategory(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose subcategory...</option>
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
              <label className="block font-medium mb-2">Ask your question:</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write your question here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {loading ? 'Sending...' : 'Send Question'}
            </button>
          </form>
        )}

        {response && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-medium mb-2">AI Response:</h3>
            <div className="whitespace-pre-line text-gray-700">{response}</div>
          </div>
        )}
      </div>
    </div>
  );
}
