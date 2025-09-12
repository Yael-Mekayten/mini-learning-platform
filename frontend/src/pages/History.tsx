import { useEffect, useState } from 'react';
import { PromptsService } from '../api/prompts.service';
import * as Types from '../types/index';
type Prompt = Types.Prompt;

export default function History() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loadHistory = async () => {
    try {
      console.log('Loading history...');
      const response = await PromptsService.getHistory();
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      console.log('Prompts array:', response.data.data);
      setPrompts(response.data.data || []);
    } catch (e) {
      console.error('Error loading history:', e);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // רענון כשחוזרים לדף
  useEffect(() => {
    const handleFocus = () => {
      loadHistory();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-6">Learning History</h2>
      {prompts.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
          No lessons yet
        </div>
      ) : (
        <div className="grid gap-4">
          {prompts.map((p) => (
            <div key={p.id} className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(p.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(p.createdAt).toLocaleString('he-IL')}
                    </div>
                    <div className="font-medium text-gray-800 line-clamp-2">
                      {p.prompt.length > 100 ? p.prompt.substring(0, 100) + '...' : p.prompt}
                    </div>
                  </div>
                  <div className="mr-4 text-gray-400">
                    {expandedId === p.id ? '▲' : '▼'}
                  </div>
                </div>
              </div>
              
              {expandedId === p.id && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-700 mb-2">Full Question:</h4>
                    <p className="text-gray-800 bg-white p-3 rounded border">{p.prompt}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">AI Response:</h4>
                    <div className="text-gray-800 bg-white p-3 rounded border whitespace-pre-line">
                      {p.response}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
