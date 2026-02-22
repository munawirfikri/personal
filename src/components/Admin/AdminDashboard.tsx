import React, { useState, useEffect, useCallback } from 'react';
import { useData } from '../../contexts/DataContext';
import { authApi } from '../../services/portfolioApi';
import { useNotification } from '../../hooks/useNotification';
import { EditorCard } from './EditorCard';
import { InputGroupProps, TagsInputProps, ImagePreviewProps, SaveMode, TabType } from './types';
import { ImageUpload } from './ImageUpload';

// Debounce hook
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// Components for the specialized editors
const InputGroup: React.FC<InputGroupProps> = ({ label, value, onChange, onSave, type = "text", as = "input", autoSave = false, required = false }) => {
  const [localValue, setLocalValue] = useState(value);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState('');
  const debouncedValue = useDebounce(localValue, 1000);

  useEffect(() => {
    setLocalValue(value);
    setHasChanges(false);
    setError('');
  }, [value]);

  useEffect(() => {
    if (autoSave && debouncedValue !== value && hasChanges && !error) {
      onSave?.(debouncedValue);
      setHasChanges(false);
    }
  }, [debouncedValue, value, hasChanges, onSave, autoSave, error]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    setHasChanges(true);
    
    if (required && !newValue.trim()) {
      setError('This field is required');
    } else {
      setError('');
    }
    
    onChange?.(newValue);
  };

  const handleSave = () => {
    if (required && !localValue.trim()) {
      setError('This field is required');
      return;
    }
    
    if (hasChanges && !error) {
      onSave?.(localValue);
      setHasChanges(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-secondary">
          {label} {required && <span className="text-red-500">*</span>} {autoSave && hasChanges && <span className="text-yellow-500 text-xs">(saving...)</span>}
        </label>
        {!autoSave && hasChanges && (
          <button 
            onClick={handleSave}
            disabled={!!error}
            className="text-xs bg-primary text-background px-2 py-1 rounded hover:opacity-80 disabled:opacity-50"
          >
            Save
          </button>
        )}
      </div>
      {as === "textarea" ? (
        <textarea 
          className={`w-full bg-background border rounded p-2 text-primary focus:border-primary outline-none h-32 ${
            error ? 'border-red-500' : 'border-border'
          }`}
          value={localValue} 
          onChange={e => handleChange(e.target.value)}
        />
      ) : (
        <input 
          type={type}
          className={`w-full bg-background border rounded p-2 text-primary focus:border-primary outline-none ${
            error ? 'border-red-500' : 'border-border'
          }`}
          value={localValue} 
          onChange={e => handleChange(e.target.value)}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const TagsInput: React.FC<TagsInputProps> = ({ label, value = [], onSave }) => {
  const [tags, setTags] = useState<string[]>(value);
  const [input, setInput] = useState('');

  useEffect(() => {
    setTags(value);
  }, [value]);

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      const newTags = [...tags, input.trim()];
      setTags(newTags);
      onSave(newTags);
      setInput('');
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter(t => t !== tag);
    setTags(newTags);
    onSave(newTags);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-secondary mb-1">{label}</label>
      <div className="flex gap-2 mb-2">
        <input 
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
          className="flex-1 bg-background border border-border rounded p-2 text-primary focus:border-primary outline-none"
          placeholder="Type and press Enter"
        />
        <button 
          onClick={addTag}
          className="bg-primary text-background px-4 py-2 rounded hover:opacity-80"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="bg-surface px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {tag}
            <button onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700">×</button>
          </span>
        ))}
      </div>
    </div>
  );
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ url }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!url) return null;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-secondary mb-1">Preview</label>
      <div className="relative w-full h-48 bg-surface rounded-lg overflow-hidden border border-border">
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-secondary text-sm">
            Failed to load image
          </div>
        ) : (
          <img 
            src={url} 
            alt="Preview"
            className="w-full h-full object-cover"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [saveMode, setSaveMode] = useState<SaveMode>('manual');
  const { notifications, show } = useNotification();
  
  const { 
    profile, updateProfile, 
    experiences, addExperience, updateExperience, deleteExperience,
    education, addEducation, updateEducation, deleteEducation,
    projects, addProject, updateProject, deleteProject,
    resetData, loading: dataLoading, language, setLanguage
  } = useData();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      authApi.verify()
        .then(() => setIsAuthenticated(true))
        .catch(() => localStorage.removeItem('admin_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    
    try {
      const { token } = await authApi.login(password);
      localStorage.setItem('admin_token', token);
      setIsAuthenticated(true);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    window.location.hash = '';
  };

  const handleSave = async (fn: () => Promise<any>, successMsg: string) => {
    setSaving(true);
    try {
      await fn();
      show(successMsg, 'success');
    } catch (error: any) {
      show(error.response?.data?.message || 'Operation failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-surfaceHighlight p-8 rounded-xl border border-border shadow-2xl max-w-md w-full animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-primary mb-2 text-center">CMS Access</h1>
            <p className="text-secondary text-sm text-center mb-8">Enter your credentials to manage content</p>
            
            <InputGroup label="Password" type="password" value={password} onChange={setPassword} />
            
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm text-center animate-pulse">
                {errorMsg}
              </div>
            )}

            <button type="submit" className="w-full bg-primary text-background py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Login
            </button>
            
            <a href="#" className="block text-center mt-6 text-xs text-secondary hover:text-primary transition-colors">
              ← Return to Website
            </a>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col md:flex-row">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notif => (
          <div
            key={notif.id}
            className={`px-4 py-3 rounded-lg shadow-lg animate-fade-in ${
              notif.type === 'success' ? 'bg-green-500 text-white' :
              notif.type === 'error' ? 'bg-red-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            {notif.message}
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surfaceHighlight border-r border-border p-6 flex flex-col h-auto md:h-screen sticky top-0">
        <h1 className="text-xl font-bold font-mono mb-8">mun.cms <span className="text-xs bg-primary text-background px-1 rounded">v1.0</span></h1>
        
        <nav className="flex-1 space-y-2">
          {['profile', 'experience', 'education', 'projects'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`w-full text-left px-4 py-2 rounded capitalize transition-colors ${activeTab === tab ? 'bg-primary text-background' : 'text-secondary hover:bg-surface'}`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-border space-y-2">
           <div className="px-4 py-2">
             <label className="block text-xs text-secondary mb-2">Language</label>
             <select 
               value={language}
               onChange={(e) => setLanguage(e.target.value as 'en' | 'id' | 'ms')}
               className="w-full bg-background border border-border rounded p-2 text-sm text-primary focus:border-primary outline-none"
             >
               <option value="en">English</option>
               <option value="id">Bahasa Indonesia</option>
               <option value="ms">Bahasa Melayu</option>
             </select>
           </div>
           <button onClick={resetData} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded">
             Reset to Defaults
           </button>
           <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-secondary hover:text-primary rounded">
             Logout & View Site
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto relative">
        {saving && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-40">
            <div className="bg-surface px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-primary font-medium">Saving...</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold capitalize">{activeTab} Manager</h2>
            <p className="text-sm text-secondary mt-1">
              Editing: <span className="font-medium text-primary">{language === 'en' ? 'English' : language === 'id' ? 'Bahasa Indonesia' : 'Bahasa Melayu'}</span>
              {' • '}
              <span className="text-xs">Switch language in sidebar to manage different versions</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                checked={saveMode === 'auto'}
                onChange={(e) => setSaveMode(e.target.checked ? 'auto' : 'manual')}
                className="rounded"
              />
              Auto-save
            </label>
            <div className="text-xs text-secondary">
              Tip: Use Ctrl+Z to undo, Ctrl+Shift+Z to redo
            </div>
          </div>
        </div>
        
        {/* Profile Editor */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-2xl bg-surface p-6 rounded-xl border border-border">
             <InputGroup 
               label="Full Name" 
               value={profile.name} 
               onSave={(v: string) => handleSave(
                 () => Promise.resolve(updateProfile({...profile, name: v})),
                 'Profile updated'
               )}
               autoSave={saveMode === 'auto'}
               required
             />
             <InputGroup 
               label="Job Title" 
               value={profile.title} 
               onSave={(v: string) => handleSave(
                 () => Promise.resolve(updateProfile({...profile, title: v})),
                 'Profile updated'
               )}
               autoSave={saveMode === 'auto'}
               required
             />
             <InputGroup 
               label="Tagline" 
               value={profile.tagline} 
               onSave={(v: string) => handleSave(
                 () => Promise.resolve(updateProfile({...profile, tagline: v})),
                 'Profile updated'
               )}
               autoSave={saveMode === 'auto'}
             />
             <InputGroup 
               label="Location" 
               value={profile.location} 
               onSave={(v: string) => handleSave(
                 () => Promise.resolve(updateProfile({...profile, location: v})),
                 'Profile updated'
               )}
               autoSave={saveMode === 'auto'}
             />
             <InputGroup 
               label="About Me" 
               value={profile.about} 
               onSave={(v: string) => handleSave(
                 () => Promise.resolve(updateProfile({...profile, about: v})),
                 'Profile updated'
               )}
               autoSave={saveMode === 'auto'}
               as="textarea" 
             />
          </div>
        )}

        {/* Experience Editor */}
        {activeTab === 'experience' && (
          <EditorCard
            items={experiences}
            loading={dataLoading}
            onDelete={(id) => handleSave(() => deleteExperience(id), 'Experience deleted')}
            onAdd={() => handleSave(
              () => addExperience({ role: 'New Role', company: 'New Company', period: '2024', description: 'Description', technologies: [], language }),
              'Experience added'
            )}
            addButtonText="+ Add New Experience"
            getItemName={(exp) => `${exp.role} at ${exp.company}`}
            renderFields={(exp) => (
              <>
                <div className="mb-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded inline-block">
                  {exp.language || language}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Role" value={exp.role} onSave={(v: string) => handleSave(() => updateExperience(exp.id, { role: v }), 'Experience updated')} autoSave={saveMode === 'auto'} required />
                  <InputGroup label="Company" value={exp.company} onSave={(v: string) => handleSave(() => updateExperience(exp.id, { company: v }), 'Experience updated')} autoSave={saveMode === 'auto'} required />
                  <InputGroup label="Period" value={exp.period} onSave={(v: string) => handleSave(() => updateExperience(exp.id, { period: v }), 'Experience updated')} autoSave={saveMode === 'auto'} required />
                </div>
                <InputGroup label="Description" value={exp.description} onSave={(v: string) => handleSave(() => updateExperience(exp.id, { description: v }), 'Experience updated')} autoSave={saveMode === 'auto'} as="textarea" />
                <TagsInput label="Technologies" value={exp.technologies} onSave={(tags: string[]) => handleSave(() => updateExperience(exp.id, { technologies: tags }), 'Technologies updated')} />
              </>
            )}
          />
        )}

        {/* Education Editor */}
        {activeTab === 'education' && (
          <EditorCard
            items={education}
            loading={dataLoading}
            onDelete={(id) => handleSave(() => deleteEducation(id), 'Education deleted')}
            onAdd={() => handleSave(
              () => addEducation({ school: 'New University', degree: 'Bachelor', field: 'CS', year: '2024', language }),
              'Education added'
            )}
            addButtonText="+ Add New Education"
            getItemName={(edu) => `${edu.degree} from ${edu.school}`}
            renderFields={(edu) => (
              <>
                <div className="mb-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded inline-block">
                  {edu.language || language}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="School" value={edu.school} onSave={(v: string) => handleSave(() => updateEducation(edu.id, { school: v }), 'Education updated')} autoSave={saveMode === 'auto'} required />
                  <InputGroup label="Degree" value={edu.degree} onSave={(v: string) => handleSave(() => updateEducation(edu.id, { degree: v }), 'Education updated')} autoSave={saveMode === 'auto'} required />
                  <InputGroup label="Year" value={edu.year} onSave={(v: string) => handleSave(() => updateEducation(edu.id, { year: v }), 'Education updated')} autoSave={saveMode === 'auto'} required />
                  <InputGroup label="GPA" value={edu.gpa || ''} onSave={(v: string) => handleSave(() => updateEducation(edu.id, { gpa: v }), 'Education updated')} autoSave={saveMode === 'auto'} />
                </div>
                <InputGroup label="Description" value={edu.description || ''} onSave={(v: string) => handleSave(() => updateEducation(edu.id, { description: v }), 'Education updated')} autoSave={saveMode === 'auto'} as="textarea" />
              </>
            )}
          />
        )}

        {/* Projects Editor */}
        {activeTab === 'projects' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {dataLoading ? (
             <div className="col-span-full text-center py-8">Loading...</div>
           ) : (
             projects.map((proj) => (
               <div key={proj.id} className="bg-surface p-6 rounded-xl border border-border relative group">
                 <div className="absolute top-4 left-4 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                   {proj.language || language}
                 </div>
                 <button 
                   onClick={() => {
                     if (confirm(`Delete project "${proj.title}"?`)) {
                       handleSave(
                         () => deleteProject(proj.id),
                         'Project deleted'
                       );
                     }
                   }}
                   className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                   Delete
                 </button>
                 
                 <InputGroup 
                   label="Title" 
                   value={proj.title} 
                   onSave={(v: string) => handleSave(
                     () => updateProject(proj.id, { title: v }),
                     'Project updated'
                   )}
                   autoSave={saveMode === 'auto'}
                   required
                 />
                 
                 <ImageUpload
                   currentUrl={proj.imageUrl}
                   onUploadSuccess={(url) => handleSave(
                     () => updateProject(proj.id, { image_url: url }),
                     'Image uploaded'
                   )}
                 />
                 
                 <InputGroup 
                   label="Image URL (or upload above)" 
                   value={proj.imageUrl || ''} 
                   onSave={(v: string) => handleSave(
                     () => updateProject(proj.id, { image_url: v }),
                     'Project updated'
                   )}
                   autoSave={saveMode === 'auto'}
                 />
                 <ImagePreview url={proj.imageUrl} />
                 <InputGroup 
                   label="Description" 
                   value={proj.description} 
                   onSave={(v: string) => handleSave(
                     () => updateProject(proj.id, { description: v }),
                     'Project updated'
                   )}
                   autoSave={saveMode === 'auto'}
                   as="textarea" 
                 />
                 <TagsInput 
                   label="Tags"
                   value={proj.tags}
                   onSave={(tags: string[]) => handleSave(
                     () => updateProject(proj.id, { tags }),
                     'Tags updated'
                   )}
                 />
               </div>
             ))
           )}
           <button 
             onClick={() => handleSave(
               () => addProject({ 
                 title: 'New Project', 
                 description: 'Description', 
                 imageUrl: 'https://via.placeholder.com/600', 
                 tags: [],
                 language
               }),
               'Project added'
             )}
             className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-border rounded-xl text-secondary hover:border-primary hover:text-primary transition-all"
           >
             <span className="text-2xl mb-2">+</span>
             Add New Project
           </button>
         </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
