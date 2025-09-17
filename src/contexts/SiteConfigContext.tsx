import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSiteConfig, setSiteConfig, SiteConfig } from '../config/siteConfig';
import { githubApi, getStoredGitHubToken } from '../services/githubApi';

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => void;
  refreshConfig: () => void;
  isGitHubConnected: boolean;
  lastSaveStatus: 'idle' | 'saving' | 'success' | 'error';
  lastSaveError: string | null;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};

interface SiteConfigProviderProps {
  children: ReactNode;
}

export const SiteConfigProvider: React.FC<SiteConfigProviderProps> = ({ children }) => {
  // Clear localStorage if config is outdated (force refresh for deployment)
  const clearOutdatedConfig = () => {
    const lastUpdate = localStorage.getItem('smashandspice-config-version');
    const currentVersion = '1.1.0'; // Increment this to force refresh
    if (lastUpdate !== currentVersion) {
      localStorage.removeItem('smashandspice-config');
      localStorage.setItem('smashandspice-config-version', currentVersion);
    }
  };

  clearOutdatedConfig();

  const [config, setConfig] = useState<SiteConfig>(getSiteConfig());
  const [isGitHubConnected, setIsGitHubConnected] = useState(false);
  const [lastSaveStatus, setLastSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [lastSaveError, setLastSaveError] = useState<string | null>(null);

  // Initialize GitHub connection on mount
  useEffect(() => {
    const token = getStoredGitHubToken();
    if (token) {
      githubApi.setToken(token);
      setIsGitHubConnected(true);
      // Try to load config from GitHub
      loadConfigFromGitHub();
    }
  }, []);

  const loadConfigFromGitHub = async () => {
    try {
      const githubConfig = await githubApi.getConfig();
      if (githubConfig) {
        setConfig(githubConfig);
        setSiteConfig(githubConfig); // Also update localStorage
      }
    } catch (error) {
      console.log('Could not load config from GitHub, using localStorage:', error);
    }
  };

  const updateConfig = async (newConfig: SiteConfig) => {
    // Always update localStorage first for immediate UI updates
    setSiteConfig(newConfig);
    setConfig(newConfig);

    // If GitHub is connected, try to save to repository
    if (isGitHubConnected) {
      setLastSaveStatus('saving');
      setLastSaveError(null);

      try {
        await githubApi.saveConfig(newConfig);
        setLastSaveStatus('success');
        // Clear success status after 3 seconds
        setTimeout(() => setLastSaveStatus('idle'), 3000);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to save to GitHub';
        setLastSaveStatus('error');
        setLastSaveError(errorMessage);
        console.error('Failed to save to GitHub:', error);
      }
    }
  };

  const refreshConfig = () => {
    if (isGitHubConnected) {
      loadConfigFromGitHub();
    } else {
      setConfig(getSiteConfig());
    }
  };

  // Listen for storage changes (when config is updated in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'smashandspice-config') {
        setConfig(getSiteConfig());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <SiteConfigContext.Provider value={{ 
      config, 
      updateConfig, 
      refreshConfig, 
      isGitHubConnected,
      lastSaveStatus,
      lastSaveError
    }}>
      {children}
    </SiteConfigContext.Provider>
  );
};
