import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Copy, Trash2, Plus, Eye, EyeOff, Palette, Download, Upload as UploadIcon, BarChart3, Settings, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { resetSiteConfig, defaultSiteConfig, SiteConfig, MenuItem } from '../config/siteConfig';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import GitHubAuth from './GitHubAuth';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onSave }) => {
  const { config, updateConfig, isGitHubConnected, lastSaveStatus, lastSaveError } = useSiteConfig();
  const [localConfig, setLocalConfig] = useState<SiteConfig>(config);
  const [activeTab, setActiveTab] = useState('hero');
  const [previewMode, setPreviewMode] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<MenuItem>({
    id: 0,
    name: '',
    price: '',
    calories: '',
    description: '',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    combo: false,
    category: 'highlights',
    available: true,
    soldOut: false,
    featured: false
  });

  useEffect(() => {
    if (isOpen) {
      setLocalConfig(config);
    }
  }, [isOpen, config]);

  const handleSave = () => {
    updateConfig(localConfig);
    onSave();
    onClose();
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
      resetSiteConfig();
      setLocalConfig(defaultSiteConfig);
      updateConfig(defaultSiteConfig);
      onSave();
    }
  };

  const handleImageUpload = (section: string, field: string, subField?: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (section === 'hero') {
            if (subField) {
              setLocalConfig(prev => ({
                ...prev,
                hero: {
                  ...prev.hero,
                  images: {
                    ...prev.hero.images,
                    [field]: {
                      ...(prev.hero.images[field as keyof typeof prev.hero.images] as any),
                      [subField]: result
                    }
                  }
                }
              }));
            } else {
              setLocalConfig(prev => ({
                ...prev,
                hero: {
                  ...prev.hero,
                  images: {
                    ...prev.hero.images,
                    [field]: result
                  }
                }
              }));
            }
          } else if (section === 'story') {
            setLocalConfig(prev => ({
              ...prev,
              story: {
                ...prev.story,
                images: {
                  ...prev.story.images,
                  [field]: result
                }
              }
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleMenuImageUpload = (itemId: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setLocalConfig(prev => ({
            ...prev,
            menu: {
              ...prev.menu,
              items: prev.menu.items.map(item => 
                item.id === itemId ? { ...item, image: result } : item
              )
            }
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const openAddItemModal = () => {
    setNewItem({
      id: 0,
      name: '',
      price: '',
      calories: '',
      description: '',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
      combo: false,
      category: 'highlights',
      available: true,
      soldOut: false,
      featured: false
    });
    setIsAddItemModalOpen(true);
  };

  const closeAddItemModal = () => {
    setIsAddItemModalOpen(false);
  };

  const handleAddItemSubmit = () => {
    if (!newItem.name.trim() || !newItem.description.trim()) {
      alert('Please fill in the name and description fields.');
      return;
    }

    const itemToAdd: MenuItem = {
      ...newItem,
      id: Date.now()
    };

    setLocalConfig(prev => ({
      ...prev,
      menu: {
        ...prev.menu,
        items: [...(prev.menu.items || []), itemToAdd]
      }
    }));

    closeAddItemModal();
  };

  const duplicateMenuItem = (item: MenuItem) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now(),
      name: `${item.name} (Copy)`
    };

    setLocalConfig(prev => ({
      ...prev,
      menu: {
        ...prev.menu,
        items: [...prev.menu.items, newItem]
      }
    }));
  };

  const deleteMenuItem = (itemId: number) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      setLocalConfig(prev => ({
        ...prev,
        menu: {
          ...prev.menu,
          items: prev.menu.items.filter(item => item.id !== itemId)
        }
      }));
    }
  };

  const updateMenuItem = (itemId: number, field: keyof MenuItem, value: any) => {
    setLocalConfig(prev => ({
      ...prev,
      menu: {
        ...prev.menu,
        items: prev.menu.items.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'smashnspice-config.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importConfig = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedConfig = JSON.parse(e.target?.result as string);
            setLocalConfig(importedConfig);
            alert('Configuration imported successfully!');
          } catch (error) {
            alert('Error importing configuration. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {previewMode ? 'Edit Mode' : 'Preview'}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* GitHub Authentication */}
        <div className="px-6 py-4 border-b border-gray-200">
          <GitHubAuth 
            onAuthSuccess={() => {
              // Refresh config from GitHub when authenticated
              window.location.reload();
            }}
            onAuthError={(error) => {
              console.error('GitHub authentication error:', error);
            }}
          />
        </div>

        {/* Save Status */}
        {lastSaveStatus !== 'idle' && (
          <div className="px-6 py-4 border-b border-gray-200">
            {lastSaveStatus === 'saving' && (
              <div className="flex items-center gap-2 p-3 bg-blue-100 border border-blue-200 rounded-lg">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-sm text-blue-700">Saving to GitHub...</span>
              </div>
            )}
            {lastSaveStatus === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-200 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Successfully saved to GitHub!</span>
              </div>
            )}
            {lastSaveStatus === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <div>
                  <span className="text-sm text-red-700">Failed to save to GitHub</span>
                  {lastSaveError && (
                    <p className="text-xs text-red-600 mt-1">{lastSaveError}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
            <nav className="space-y-2">
              {[
                { id: 'hero', label: 'Hero Section', icon: ImageIcon },
                { id: 'menu', label: 'Menu Items', icon: Plus },
                { id: 'business', label: 'Business Info', icon: Settings },
                { id: 'story', label: 'Our Story', icon: BarChart3 },
                { id: 'contact', label: 'Contact & Links', icon: Settings },
                { id: 'footer', label: 'Footer & Hours', icon: Settings },
                { id: 'seo', label: 'SEO & Meta', icon: Settings },
                { id: 'appearance', label: 'Appearance', icon: Palette },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'backup', label: 'Backup & Restore', icon: Download }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'hero' && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900">Hero Section</h3>
                
                {/* Main Headlines */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Main Headlines</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {config.hero.mainHeadline.map((line, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Headline Line {index + 1}
                        </label>
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => {
                            const newHeadlines = [...config.hero.mainHeadline];
                            newHeadlines[index] = e.target.value;
                            setLocalConfig(prev => ({
                              ...prev,
                              hero: {
                                ...prev.hero,
                                mainHeadline: newHeadlines
                              }
                            }));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subheadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subheadline
                  </label>
                  <input
                    type="text"
                    value={localConfig.hero.subHeadline}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        subHeadline: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={localConfig.hero.ctaButtons.primary}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          ctaButtons: {
                            ...prev.hero.ctaButtons,
                            primary: e.target.value
                          }
                        }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      value={localConfig.hero.ctaButtons.secondary}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          ctaButtons: {
                            ...prev.hero.ctaButtons,
                            secondary: e.target.value
                          }
                        }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Hero Images */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-800">Hero Images</h4>
                  
                  {/* Logo */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Logo</label>
                    <div className="flex items-center gap-4">
                      <img src={localConfig.hero.images.logo} alt="Logo" className="w-16 h-16 object-cover rounded-lg border" />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleImageUpload('hero', 'logo')}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          Upload
                        </button>
                      </div>
                    </div>
                    <input
                      type="url"
                      value={localConfig.hero.images.logo}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          images: {
                            ...prev.hero.images,
                            logo: e.target.value
                          }
                        }
                      }))}
                      placeholder="Or enter image URL"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Left Image */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Left Image (Chapli Kebab)</label>
                    <div className="flex items-center gap-4">
                      <img src={localConfig.hero.images.leftImage} alt="Left" className="w-16 h-16 object-cover rounded-lg border" />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleImageUpload('hero', 'leftImage')}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          Upload
                        </button>
                      </div>
                    </div>
                    <input
                      type="url"
                      value={localConfig.hero.images.leftImage}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          images: {
                            ...prev.hero.images,
                            leftImage: e.target.value
                          }
                        }
                      }))}
                      placeholder="Or enter image URL"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Right Images */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">Right Images</label>
                    
                    {/* Top Right */}
                    <div className="space-y-3">
                      <label className="block text-xs text-gray-600">Top Right (Chicken Over Rice)</label>
                      <div className="flex items-center gap-4">
                        <img src={localConfig.hero.images.rightImages.top} alt="Top Right" className="w-16 h-16 object-cover rounded-lg border" />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleImageUpload('hero', 'rightImages', 'top')}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            Upload
                          </button>
                        </div>
                      </div>
                      <input
                        type="url"
                        value={localConfig.hero.images.rightImages.top}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            images: {
                              ...prev.hero.images,
                              rightImages: {
                                ...prev.hero.images.rightImages,
                                top: e.target.value
                              }
                            }
                          }
                        }))}
                        placeholder="Or enter image URL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    {/* Bottom Right */}
                    <div className="space-y-3">
                      <label className="block text-xs text-gray-600">Bottom Right (Lamb Over Rice)</label>
                      <div className="flex items-center gap-4">
                        <img src={localConfig.hero.images.rightImages.bottom} alt="Bottom Right" className="w-16 h-16 object-cover rounded-lg border" />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleImageUpload('hero', 'rightImages', 'bottom')}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            Upload
                          </button>
                        </div>
                      </div>
                      <input
                        type="url"
                        value={localConfig.hero.images.rightImages.bottom}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            images: {
                              ...prev.hero.images,
                              rightImages: {
                                ...prev.hero.images.rightImages,
                                bottom: e.target.value
                              }
                            }
                          }
                        }))}
                        placeholder="Or enter image URL"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Food Labels */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-800">Food Labels</h4>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Left Image Label (Chapli Kebab)
                      </label>
                      <input
                        type="text"
                        value={localConfig.hero.images.leftImageLabel}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            images: {
                              ...prev.hero.images,
                              leftImageLabel: e.target.value
                            }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Right Top Label (Chicken Over Rice)
                      </label>
                      <input
                        type="text"
                        value={localConfig.hero.images.rightImages.topLabel}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            images: {
                              ...prev.hero.images,
                              rightImages: {
                                ...prev.hero.images.rightImages,
                                topLabel: e.target.value
                              }
                            }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Right Bottom Label (Lamb Over Rice)
                      </label>
                      <input
                        type="text"
                        value={localConfig.hero.images.rightImages.bottomLabel}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            images: {
                              ...prev.hero.images,
                              rightImages: {
                                ...prev.hero.images.rightImages,
                                bottomLabel: e.target.value
                              }
                            }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero Slides */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-800">Hero Slides Content</h4>
                  
                  {/* Left Slide */}
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h5 className="text-md font-semibold text-gray-700">Left Slide (Main)</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.left.title}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                left: { ...prev.hero.slides.left, title: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.left.badge}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                left: { ...prev.hero.slides.left, badge: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.left.price}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                left: { ...prev.hero.slides.left, price: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <input
                          type="number"
                          step="0.1"
                          value={localConfig.hero.slides.left.rating}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                left: { ...prev.hero.slides.left, rating: parseFloat(e.target.value) }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.left.deliveryTime}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                left: { ...prev.hero.slides.left, deliveryTime: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Badge Color</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.left.badgeColor}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                left: { ...prev.hero.slides.left, badgeColor: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={localConfig.hero.slides.left.description}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            slides: {
                              ...prev.hero.slides,
                              left: { ...prev.hero.slides.left, description: e.target.value }
                            }
                          }
                        }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                      <textarea
                        value={localConfig.hero.slides.left.features.join('\n')}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            slides: {
                              ...prev.hero.slides,
                              left: { ...prev.hero.slides.left, features: e.target.value.split('\n').filter(f => f.trim()) }
                            }
                          }
                        }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                      />
                    </div>
                  </div>

                  {/* Right Top Slide */}
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h5 className="text-md font-semibold text-gray-700">Right Top Slide</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.rightTop.title}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightTop: { ...prev.hero.slides.rightTop, title: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.rightTop.badge}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightTop: { ...prev.hero.slides.rightTop, badge: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.rightTop.price}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightTop: { ...prev.hero.slides.rightTop, price: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <input
                          type="number"
                          step="0.1"
                          value={localConfig.hero.slides.rightTop.rating}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightTop: { ...prev.hero.slides.rightTop, rating: parseFloat(e.target.value) }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.rightTop.deliveryTime}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightTop: { ...prev.hero.slides.rightTop, deliveryTime: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Badge Color</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.rightTop.badgeColor}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightTop: { ...prev.hero.slides.rightTop, badgeColor: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={localConfig.hero.slides.rightTop.description}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            slides: {
                              ...prev.hero.slides,
                              rightTop: { ...prev.hero.slides.rightTop, description: e.target.value }
                            }
                          }
                        }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                      <textarea
                        value={localConfig.hero.slides.rightTop.features.join('\n')}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            slides: {
                              ...prev.hero.slides,
                              rightTop: { ...prev.hero.slides.rightTop, features: e.target.value.split('\n').filter(f => f.trim()) }
                            }
                          }
                        }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                      />
                    </div>
                  </div>

                  {/* Right Bottom Slide */}
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h5 className="text-md font-semibold text-gray-700">Right Bottom Slide</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.rightBottom.title}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightBottom: { ...prev.hero.slides.rightBottom, title: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.rightBottom.badge}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightBottom: { ...prev.hero.slides.rightBottom, badge: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.rightBottom.price}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightBottom: { ...prev.hero.slides.rightBottom, price: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <input
                          type="number"
                          step="0.1"
                          value={localConfig.hero.slides.rightBottom.rating}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightBottom: { ...prev.hero.slides.rightBottom, rating: parseFloat(e.target.value) }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.rightBottom.deliveryTime}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightBottom: { ...prev.hero.slides.rightBottom, deliveryTime: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Badge Color</label>
                        <input
                          type="text"
                          value={localConfig.hero.slides.rightBottom.badgeColor}
                          onChange={(e) => setLocalConfig(prev => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              slides: {
                                ...prev.hero.slides,
                                rightBottom: { ...prev.hero.slides.rightBottom, badgeColor: e.target.value }
                              }
                            }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={localConfig.hero.slides.rightBottom.description}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            slides: {
                              ...prev.hero.slides,
                              rightBottom: { ...prev.hero.slides.rightBottom, description: e.target.value }
                            }
                          }
                        }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                      <textarea
                        value={localConfig.hero.slides.rightBottom.features.join('\n')}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            slides: {
                              ...prev.hero.slides,
                              rightBottom: { ...prev.hero.slides.rightBottom, features: e.target.value.split('\n').filter(f => f.trim()) }
                            }
                          }
                        }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Menu Items</h3>
                    <p className="text-sm text-gray-600 mt-1">Click "Add Item" to open a dialog for creating new menu items with all the necessary details.</p>
                  </div>
                  <button
                    onClick={openAddItemModal}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    type="button"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {localConfig.menu.items.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">
                          {item.name || 'New Menu Item'} #{item.id}
                          {(!item.name || !item.description) && (
                            <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                              Needs Details
                            </span>
                          )}
                        </h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => duplicateMenuItem(item)}
                            className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteMenuItem(item.id)}
                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateMenuItem(item.id, 'name', e.target.value)}
                            placeholder="Enter item name (e.g., Chicken Kebab)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                          <input
                            type="text"
                            value={item.price || ''}
                            onChange={(e) => updateMenuItem(item.id, 'price', e.target.value)}
                            placeholder="Enter price (e.g., $12.99)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                        <textarea
                          value={item.description}
                          onChange={(e) => updateMenuItem(item.id, 'description', e.target.value)}
                          placeholder="Enter item description (e.g., Tender chicken marinated in spices and grilled to perfection)"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                          <input
                            type="text"
                            value={item.calories}
                            onChange={(e) => updateMenuItem(item.id, 'calories', e.target.value)}
                            placeholder="Enter calories (e.g., 450 Cal)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select
                            value={item.category}
                            onChange={(e) => updateMenuItem(item.id, 'category', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          >
                            <option value="highlights">Highlights</option>
                            <option value="kebabs">Kebabs</option>
                            <option value="rice-platters">Rice Platters</option>
                            <option value="burgers">Burgers</option>
                            <option value="sides">Sides</option>
                            <option value="drinks">Drinks</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMenuImageUpload(item.id)}
                              className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                            >
                              <Upload className="w-4 h-4" />
                              Upload
                            </button>
                          </div>
                        </div>
                        <input
                          type="url"
                          value={item.image}
                          onChange={(e) => updateMenuItem(item.id, 'image', e.target.value)}
                          placeholder="Or enter image URL"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="flex items-center gap-4 flex-wrap">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.combo || false}
                            onChange={(e) => updateMenuItem(item.id, 'combo', e.target.checked)}
                            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-sm text-gray-700">Combo Item</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.available !== false}
                            onChange={(e) => updateMenuItem(item.id, 'available', e.target.checked)}
                            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-sm text-gray-700">Available</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.soldOut || false}
                            onChange={(e) => updateMenuItem(item.id, 'soldOut', e.target.checked)}
                            className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                          />
                          <span className="text-sm text-gray-700">Sold Out</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.featured || false}
                            onChange={(e) => updateMenuItem(item.id, 'featured', e.target.checked)}
                            className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="text-sm text-gray-700">Featured</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'business' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Business Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                    <input
                      type="text"
                      value={localConfig.business.name}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        business: { ...prev.business, name: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                    <input
                      type="text"
                      value={localConfig.business.tagline}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        business: { ...prev.business, tagline: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={localConfig.business.description}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      business: { ...prev.business, description: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={localConfig.business.phone}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        business: { ...prev.business, phone: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={localConfig.business.email}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        business: { ...prev.business, email: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                      <input
                        type="text"
                        value={localConfig.business.address.street}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          business: {
                            ...prev.business,
                            address: { ...prev.business.address, street: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={localConfig.business.address.city}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          business: {
                            ...prev.business,
                            address: { ...prev.business.address, city: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={localConfig.business.address.state}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          business: {
                            ...prev.business,
                            address: { ...prev.business.address, state: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Our Story</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Story Title</label>
                  <input
                    type="text"
                    value={localConfig.story.title}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      story: { ...prev.story, title: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <textarea
                    value={localConfig.story.subtitle}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      story: { ...prev.story, subtitle: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Story Content</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Introduction</label>
                    <textarea
                      value={localConfig.story.content.intro}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        story: {
                          ...prev.story,
                          content: { ...prev.story.content, intro: e.target.value }
                        }
                      }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tradition</label>
                    <textarea
                      value={localConfig.story.content.tradition}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        story: {
                          ...prev.story,
                          content: { ...prev.story.content, tradition: e.target.value }
                        }
                      }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Halal Information</label>
                    <textarea
                      value={localConfig.story.content.halal}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        story: {
                          ...prev.story,
                          content: { ...prev.story.content, halal: e.target.value }
                        }
                      }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                    />
                  </div>
                </div>

                {/* Story Image */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Story Main Image</label>
                  <div className="flex items-center gap-4">
                    <img src={localConfig.story.images.main} alt="Story" className="w-16 h-16 object-cover rounded-lg border" />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleImageUpload('story', 'main')}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                    </div>
                  </div>
                  <input
                    type="url"
                    value={localConfig.story.images.main}
                    onChange={(e) => setLocalConfig(prev => ({
                      ...prev,
                      story: {
                        ...prev.story,
                        images: { ...prev.story.images, main: e.target.value }
                      }
                    }))}
                    placeholder="Or enter image URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Values Section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Company Values</h4>
                  {localConfig.story.values.map((value, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-gray-900">Value #{index + 1}</h5>
                        <button
                          onClick={() => {
                            const newValues = localConfig.story.values.filter((_, i) => i !== index);
                            setLocalConfig(prev => ({
                              ...prev,
                              story: { ...prev.story, values: newValues }
                            }));
                          }}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          title="Delete Value"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={value.title}
                            onChange={(e) => {
                              const newValues = [...localConfig.story.values];
                              newValues[index] = { ...value, title: e.target.value };
                              setLocalConfig(prev => ({
                                ...prev,
                                story: { ...prev.story, values: newValues }
                              }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                          <select
                            value={value.icon}
                            onChange={(e) => {
                              const newValues = [...localConfig.story.values];
                              newValues[index] = { ...value, icon: e.target.value };
                              setLocalConfig(prev => ({
                                ...prev,
                                story: { ...prev.story, values: newValues }
                              }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                          >
                            <option value="Award">Award</option>
                            <option value="Flame">Flame</option>
                            <option value="Users">Users</option>
                            <option value="Heart">Heart</option>
                            <option value="Shield">Shield</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={value.description}
                          onChange={(e) => {
                            const newValues = [...localConfig.story.values];
                            newValues[index] = { ...value, description: e.target.value };
                            setLocalConfig(prev => ({
                              ...prev,
                              story: { ...prev.story, values: newValues }
                            }));
                          }}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newValue = {
                        title: 'New Value',
                        description: 'Description for new value',
                        icon: 'Award'
                      };
                      setLocalConfig(prev => ({
                        ...prev,
                        story: { ...prev.story, values: [...prev.story.values, newValue] }
                      }));
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Value
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Contact & Links</h3>
                
                {/* Social Media Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Social Media Links</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                      <input
                        type="url"
                        value={localConfig.links.social.instagram}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          links: {
                            ...prev.links,
                            social: { ...prev.links.social, instagram: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="https://instagram.com/yourhandle"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                      <input
                        type="url"
                        value={localConfig.links.social.facebook}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          links: {
                            ...prev.links,
                            social: { ...prev.links.social, facebook: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                      <input
                        type="url"
                        value={localConfig.links.social.twitter}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          links: {
                            ...prev.links,
                            social: { ...prev.links.social, twitter: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Delivery Platform Links</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Uber Eats</label>
                      <input
                        type="url"
                        value={localConfig.links.delivery.ubereats}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          links: {
                            ...prev.links,
                            delivery: { ...prev.links.delivery, ubereats: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="https://ubereats.com/store/your-restaurant"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">DoorDash</label>
                      <input
                        type="url"
                        value={localConfig.links.delivery.doordash}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          links: {
                            ...prev.links,
                            delivery: { ...prev.links.delivery, doordash: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="https://doordash.com/store/your-restaurant"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grubhub</label>
                      <input
                        type="url"
                        value={localConfig.links.delivery.grubhub}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          links: {
                            ...prev.links,
                            delivery: { ...prev.links.delivery, grubhub: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="https://grubhub.com/restaurant/your-restaurant"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Section Text */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Contact Section Text</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={localConfig.contact.title}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          contact: { ...prev.contact, title: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
                      <textarea
                        value={localConfig.contact.subtitle}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          contact: { ...prev.contact, subtitle: e.target.value }
                        }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Form Title</label>
                      <input
                        type="text"
                        value={localConfig.contact.formTitle}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          contact: { ...prev.contact, formTitle: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order Online Title</label>
                      <input
                        type="text"
                        value={localConfig.contact.orderOnlineTitle}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          contact: { ...prev.contact, orderOnlineTitle: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order Online Description</label>
                      <textarea
                        value={localConfig.contact.orderOnlineDescription}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          contact: { ...prev.contact, orderOnlineDescription: e.target.value }
                        }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quick Contact Title</label>
                      <input
                        type="text"
                        value={localConfig.contact.quickContactTitle}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          contact: { ...prev.contact, quickContactTitle: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'footer' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Footer & Business Hours</h3>
                
                {/* Business Hours */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Business Hours</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monday - Thursday</label>
                      <input
                        type="text"
                        value={localConfig.business.hours.monday}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          business: {
                            ...prev.business,
                            hours: { ...prev.business.hours, monday: e.target.value, tuesday: e.target.value, wednesday: e.target.value, thursday: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="11AM - 10PM"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Friday - Saturday</label>
                      <input
                        type="text"
                        value={localConfig.business.hours.friday}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          business: {
                            ...prev.business,
                            hours: { ...prev.business.hours, friday: e.target.value, saturday: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="11AM - 11PM"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sunday</label>
                      <input
                        type="text"
                        value={localConfig.business.hours.sunday}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          business: {
                            ...prev.business,
                            hours: { ...prev.business.hours, sunday: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="12PM - 10PM"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currently Open</label>
                      <select
                        value={localConfig.business.isOpen ? 'open' : 'closed'}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          business: { ...prev.business, isOpen: e.target.value === 'open' }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Certifications</h4>
                  {localConfig.business.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={cert}
                        onChange={(e) => {
                          const newCerts = [...localConfig.business.certifications];
                          newCerts[index] = e.target.value;
                          setLocalConfig(prev => ({
                            ...prev,
                            business: { ...prev.business, certifications: newCerts }
                          }));
                        }}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      />
                      <button
                        onClick={() => {
                          const newCerts = localConfig.business.certifications.filter((_, i) => i !== index);
                          setLocalConfig(prev => ({
                            ...prev,
                            business: { ...prev.business, certifications: newCerts }
                          }));
                        }}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setLocalConfig(prev => ({
                        ...prev,
                        business: { ...prev.business, certifications: [...prev.business.certifications, 'New Certification'] }
                      }));
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Certification
                  </button>
                </div>

                {/* Footer Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Footer Links</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Catering Link</label>
                      <input
                        type="text"
                        value={localConfig.footer.quickLinks.catering}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            quickLinks: { ...prev.footer.quickLinks, catering: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="#catering or https://example.com/catering"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rewards Link</label>
                      <input
                        type="text"
                        value={localConfig.footer.quickLinks.rewards}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            quickLinks: { ...prev.footer.quickLinks, rewards: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="#rewards or https://example.com/rewards"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Policy Link</label>
                      <input
                        type="text"
                        value={localConfig.footer.legalLinks.privacyPolicy}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            legalLinks: { ...prev.footer.legalLinks, privacyPolicy: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="#privacy or https://example.com/privacy"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Terms of Service Link</label>
                      <input
                        type="text"
                        value={localConfig.footer.legalLinks.termsOfService}
                        onChange={(e) => setLocalConfig(prev => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            legalLinks: { ...prev.footer.legalLinks, termsOfService: e.target.value }
                          }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="#terms or https://example.com/terms"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">SEO & Meta Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                    <input
                      type="text"
                      value={localConfig.seo.title}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        seo: { ...prev.seo, title: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="Your Restaurant - Best Food in Town"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea
                      value={localConfig.seo.description}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        seo: { ...prev.seo, description: e.target.value }
                      }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                      placeholder="Brief description of your restaurant for search engines"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                    <input
                      type="text"
                      value={localConfig.seo.keywords}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        seo: { ...prev.seo, keywords: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="restaurant, food, delivery, local cuisine"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Image URL</label>
                    <input
                      type="url"
                      value={localConfig.seo.ogImage}
                      onChange={(e) => setLocalConfig(prev => ({
                        ...prev,
                        seo: { ...prev.seo, ogImage: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="https://yoursite.com/og-image.jpg"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Appearance Settings</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600">Appearance customization features coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">This will include color themes, fonts, and layout options.</p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Analytics Dashboard</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600">Analytics dashboard coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">Track visitor stats, popular menu items, and customer feedback.</p>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Backup & Restore</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Export Configuration</h4>
                    <p className="text-gray-600 mb-4">Download your current website configuration as a backup file.</p>
                    <button
                      onClick={exportConfig}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export Config
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Import Configuration</h4>
                    <p className="text-gray-600 mb-4">Restore your website from a previously exported configuration file.</p>
                    <button
                      onClick={importConfig}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <UploadIcon className="w-4 h-4" />
                      Import Config
                    </button>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-red-800 mb-4">Reset to Default</h4>
                  <p className="text-red-600 mb-4">This will reset all settings to their default values. This action cannot be undone.</p>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reset All Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Last saved: {new Date().toLocaleString()}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Menu Item</h3>
              <button
                onClick={closeAddItemModal}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter item name (e.g., Chicken Kebab)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="text"
                    value={newItem.price}
                    onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Enter price (e.g., $12.99)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter item description (e.g., Tender chicken marinated in spices and grilled to perfection)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-y"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                  <input
                    type="text"
                    value={newItem.calories}
                    onChange={(e) => setNewItem(prev => ({ ...prev, calories: e.target.value }))}
                    placeholder="Enter calories (e.g., 450 Cal)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  >
                    <option value="highlights">Highlights</option>
                    <option value="kebabs">Kebabs</option>
                    <option value="wraps">Wraps</option>
                    <option value="sides">Sides</option>
                    <option value="beverages">Beverages</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
                <div className="flex items-center gap-4">
                  <img
                    src={newItem.image}
                    alt="Item preview"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setNewItem(prev => ({ ...prev, image: e.target?.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }
                      };
                      input.click();
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Change Image
                  </button>
                </div>
              </div>

              {/* Status Options */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Status Options</h4>
                <div className="flex items-center gap-6 flex-wrap">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newItem.combo || false}
                      onChange={(e) => setNewItem(prev => ({ ...prev, combo: e.target.checked }))}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Combo Item</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newItem.available !== false}
                      onChange={(e) => setNewItem(prev => ({ ...prev, available: e.target.checked }))}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Available</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newItem.soldOut || false}
                      onChange={(e) => setNewItem(prev => ({ ...prev, soldOut: e.target.checked }))}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">Sold Out</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newItem.featured || false}
                      onChange={(e) => setNewItem(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    <span className="text-sm text-gray-700">Featured</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={closeAddItemModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItemSubmit}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;