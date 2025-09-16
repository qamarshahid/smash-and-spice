import React, { useState, useEffect } from 'react';
import { Github, Key, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { githubApi, getStoredGitHubToken, storeGitHubToken, removeGitHubToken } from '../services/githubApi';

interface GitHubAuthProps {
  onAuthSuccess: () => void;
  onAuthError: (error: string) => void;
}

const GitHubAuth: React.FC<GitHubAuthProps> = ({ onAuthSuccess, onAuthError }) => {
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already authenticated
    const storedToken = getStoredGitHubToken();
    if (storedToken) {
      githubApi.setToken(storedToken);
      setIsAuthenticated(true);
      onAuthSuccess();
    }
  }, [onAuthSuccess]);

  const handleAuthenticate = async () => {
    if (!token.trim()) {
      setError('Please enter a GitHub token');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Test the token by trying to fetch config
      githubApi.setToken(token);
      const config = await githubApi.getConfig();
      
      // If successful, store the token
      storeGitHubToken(token);
      setIsAuthenticated(true);
      onAuthSuccess();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      setError(errorMessage);
      onAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    removeGitHubToken();
    githubApi.setToken('');
    setToken('');
    setIsAuthenticated(false);
    setError('');
  };

  if (isAuthenticated) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">GitHub Connected</h4>
              <p className="text-sm text-green-600">Changes will be saved to your repository</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Github className="w-6 h-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold text-blue-800">GitHub Authentication Required</h3>
          <p className="text-sm text-blue-600">
            To save changes permanently, you need to authenticate with GitHub.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Personal Access Token
          </label>
          <div className="relative">
            <input
              type={showToken ? 'text' : 'password'}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
            >
              {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-200 rounded-lg">
            <XCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">How to get a GitHub Token:</h4>
          <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
            <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline">GitHub Settings → Personal Access Tokens</a></li>
            <li>Click "Generate new token (classic)"</li>
            <li>Give it a name like "Website Admin"</li>
            <li>Select scopes: <code className="bg-yellow-100 px-1 rounded">repo</code> (full control of private repositories)</li>
            <li>Click "Generate token" and copy it</li>
          </ol>
        </div>

        <button
          onClick={handleAuthenticate}
          disabled={isLoading || !token.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              <Key className="w-4 h-4" />
              Connect to GitHub
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GitHubAuth;
