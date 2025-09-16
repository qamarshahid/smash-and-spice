import { SiteConfig } from '../config/siteConfig';

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'qamarshahid'; // GitHub username
const REPO_NAME = 'smash-and-spice'; // Repository name
const CONFIG_FILE_PATH = 'src/config/site-config.json';
const BRANCH = 'main'; // or 'master' depending on your default branch

interface GitHubFileResponse {
  sha: string;
  content: string;
  encoding: string;
}

interface GitHubCommitResponse {
  commit: {
    sha: string;
  };
}

class GitHubApiService {
  private token: string | null = null;

  // Set GitHub token for authentication
  setToken(token: string) {
    this.token = token;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Get authentication headers
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    return headers;
  }

  // Get current config from GitHub repository
  async getConfig(): Promise<SiteConfig | null> {
    try {
      const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONFIG_FILE_PATH}?ref=${BRANCH}`;
      
      const response = await fetch(url, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.log('Config file not found in repository');
          return null;
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data: GitHubFileResponse = await response.json();
      const content = atob(data.content);
      return JSON.parse(content);
    } catch (error) {
      console.error('Error fetching config from GitHub:', error);
      return null;
    }
  }

  // Save config to GitHub repository
  async saveConfig(config: SiteConfig): Promise<boolean> {
    if (!this.token) {
      throw new Error('GitHub token required for saving config');
    }

    try {
      // First, get the current file to get its SHA
      const currentFile = await this.getConfigFileInfo();
      
      const content = JSON.stringify(config, null, 2);
      const encodedContent = btoa(content);

      const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONFIG_FILE_PATH}`;
      
      const body = {
        message: `Update site configuration - ${new Date().toISOString()}`,
        content: encodedContent,
        branch: BRANCH,
        ...(currentFile && { sha: currentFile.sha }),
      };

      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
      }

      const result: GitHubCommitResponse = await response.json();
      console.log('Config saved successfully:', result.commit.sha);
      return true;
    } catch (error) {
      console.error('Error saving config to GitHub:', error);
      throw error;
    }
  }

  // Get file information (including SHA) without content
  private async getConfigFileInfo(): Promise<{ sha: string } | null> {
    try {
      const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONFIG_FILE_PATH}?ref=${BRANCH}`;
      
      const response = await fetch(url, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data: GitHubFileResponse = await response.json();
      return { sha: data.sha };
    } catch (error) {
      console.error('Error getting file info from GitHub:', error);
      return null;
    }
  }

  // Create initial config file in repository
  async createInitialConfig(config: SiteConfig): Promise<boolean> {
    if (!this.token) {
      throw new Error('GitHub token required for creating config');
    }

    try {
      const content = JSON.stringify(config, null, 2);
      const encodedContent = btoa(content);

      const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONFIG_FILE_PATH}`;
      
      const body = {
        message: 'Initial site configuration setup',
        content: encodedContent,
        branch: BRANCH,
      };

      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
      }

      console.log('Initial config created successfully');
      return true;
    } catch (error) {
      console.error('Error creating initial config:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const githubApi = new GitHubApiService();

// Helper function to get GitHub token from localStorage
export const getStoredGitHubToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('github-token');
};

// Helper function to store GitHub token
export const storeGitHubToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('github-token', token);
};

// Helper function to remove GitHub token
export const removeGitHubToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('github-token');
};
