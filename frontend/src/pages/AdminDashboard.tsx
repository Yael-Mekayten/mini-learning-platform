import { useEffect, useState } from 'react';
import { AdminService } from '../api/admin.service';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const [expandedPromptId, setExpandedPromptId] = useState<number | null>(null);

  const loadAdminData = async () => {
    try {
      console.log('Loading admin data...');
      const { data } = await AdminService.getAllUsersWithPrompts();
      console.log('Admin data received:', data);
      setUsers(data.data || []);
    } catch (e) {
      console.error('Error loading admin data:', e);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // רענון כשחוזרים לדף
  useEffect(() => {
    const handleFocus = () => {
      loadAdminData();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const toggleUserExpand = (userId: number) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
    setExpandedPromptId(null);
  };

  const togglePromptExpand = (promptId: number) => {
    setExpandedPromptId(expandedPromptId === promptId ? null : promptId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-6">ניהול מערכת - כל המשתמשים</h2>
      
      {users.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          טוען נתונים...
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((u) => (
            <div key={u.id} className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleUserExpand(u.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">{u.name}</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{u.email}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{u.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">שיעורים: {u.prompts?.length || 0}</span>
                    <div className="text-gray-400">
                      {expandedUserId === u.id ? '▲' : '▼'}
                    </div>
                  </div>
                </div>
              </div>
              
              {expandedUserId === u.id && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  {u.prompts?.length === 0 ? (
                    <p className="text-gray-500 italic text-center py-4">אין עדיין שיעורים</p>
                  ) : (
                    <div className="space-y-3">
                      {u.prompts?.map((p: any) => (
                        <div key={p.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div 
                            className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => togglePromptExpand(p.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="text-sm text-gray-500">
                                    {new Date(p.createdAt).toLocaleString('he-IL')}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {p.category?.name} &gt; {p.subCategory?.name}
                                  </div>
                                </div>
                                <div className="font-medium text-gray-800">
                                  {p.prompt.length > 80 ? p.prompt.substring(0, 80) + '...' : p.prompt}
                                </div>
                              </div>
                              <div className="mr-2 text-gray-400">
                                {expandedPromptId === p.id ? '▲' : '▼'}
                              </div>
                            </div>
                          </div>
                          
                          {expandedPromptId === p.id && (
                            <div className="border-t border-gray-200 p-4 bg-gray-50">
                              <div className="mb-3">
                                <h5 className="font-semibold text-gray-700 mb-2">שאלה מלאה:</h5>
                                <p className="text-gray-800 bg-white p-3 rounded border">{p.prompt}</p>
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-700 mb-2">תשובת AI:</h5>
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
