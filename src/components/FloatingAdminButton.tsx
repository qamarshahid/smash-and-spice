import React, { useState, useEffect } from 'react';
import { Settings, Edit3, X } from 'lucide-react';
import AdminPanel from './AdminPanel';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const FloatingAdminButton = () => {
  const { refreshConfig } = useSiteConfig();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Secret password - change this to whatever you want
  const ADMIN_PASSWORD = 'smash2024';

  useEffect(() => {
    const handleKeyCombo = (event: KeyboardEvent) => {
      // Secret key combination: Ctrl + Shift + Q
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyQ') {
        event.preventDefault();
        setShowPasswordModal(true);
      }
    };

    document.addEventListener('keydown', handleKeyCombo);

    return () => {
      document.removeEventListener('keydown', handleKeyCombo);
    };
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
      
      // Auto-hide after 30 minutes of inactivity
      setTimeout(() => setIsAdminMode(false), 30 * 60 * 1000);
    } else {
      setPasswordError('Incorrect password');
      setPassword('');
    }
  };

  const handleConfigUpdate = () => {
    refreshConfig();
  };

  const handleAdminExit = () => {
    setIsAdminMode(false);
    setIsAdminOpen(false);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
  };

  return (
    <>
      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Access</h3>
              <p className="text-gray-600 text-sm">Enter password to access admin panel</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-center font-mono"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2 text-center">{passwordError}</p>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePasswordModalClose}
                  className="flex-1 px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  Access Admin
                </button>
              </div>
            </form>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Tip: Press Ctrl + Shift + Q to open this dialog
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Button (only visible in admin mode) */}
      {isAdminMode && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group border-2 border-white/20 animate-pulse"
            title="Open Admin Panel"
          >
            <div className="relative">
              <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              <Edit3 className="w-3 h-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Edit Website
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </button>
          
          <button
            onClick={handleAdminExit}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
            title="Exit Admin Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSave={handleConfigUpdate}
      />
    </>
  );
};

export default FloatingAdminButton;