import React, { useState, useEffect, useCallback } from 'react';
import { useData } from '../../contexts/DataContext';
import { authApi } from '../../services/portfolioApi';
import { useNotification } from '../../hooks/useNotification';

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
const InputGroup = ({ label, value, onChange, onSave, type = "text", as = "input", autoSave = false }: any) => {
  const [localValue, setLocalValue] = useState(value);
  const [hasChanges, setHasChanges] = useState(false);
  const debouncedValue = useDebounce(localValue, 1000);

  useEffect(() => {
    setLocalValue(value);
    setHasChanges(false);
  }, [value]);

  useEffect(() => {
    if (autoSave && debouncedValue !== value && hasChanges) {
      onSave?.(debouncedValue);
      setHasChanges(false);
    }
  }, [debouncedValue, value, hasChanges, onSave, autoSave]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    setHasChanges(true);
    onChange?.(newValue);
  };

  const handleSave = () => {
    if (hasChanges) {
      onSave?.(localValue);
      setHasChanges(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-secondary">
          {label} {autoSave && hasChanges && <span className="text-yellow-500 text-xs">(saving...)</span>}
        </label>
        {!autoSave && hasChanges && (
          <button 
            onClick={handleSave}
            className="text-xs bg-primary text-background px-2 py-1 rounded hover:opacity-80"
          >
            Save
          </button>
        )}
      </div>
      {as === "textarea" ? (
        <textarea 
          className="w-full bg-background border border-border rounded p-2 text-primary focus:border-primary outline-none h-32"
          value={localValue} 
          onChange={e => handleChange(e.target.value)}
        />
      ) : (
        <input 
          type={type}
          className="w-full bg-background border border-border rounded p-2 text-primary focus:border-primary outline-none"
          value={localValue} 
          onChange={e => handleChange(e.target.value)}
        />
      )}
    </div>
  );
};

const TagsInput = ({ label, value = [], onSave }: { label: string; value: string[]; onSave: (tags: string[]) => void }) => {
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

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'education' | 'projects'>('profile');
  const [saveMode, setSaveMode] = useState<'auto' | 'manual'>('manual');
  const { notifications, show } = useNotification();
  
  const { 
    profile, updateProfile, 
    experiences, addExperience, updateExperience, deleteExperience,
    education, addEducation, updateEducation, deleteEducation,
    projects, addProject, updateProject, deleteProject,
    resetData, loading: dataLoading
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
    try {
      await fn();
      show(successMsg, 'success');
    } catch (error: any) {
      show(error.response?.data?.message || 'Operation failed', 'error');
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
           <button onClick={resetData} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded">
             Reset to Defaults
           </button>
           <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-secondary hover:text-primary rounded">
             Logout & View Site
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold capitalize">{activeTab} Manager</h2>
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
             />
             <InputGroup 
               label="Job Title" 
               value={profile.title} 
               onSave={(v: string) => handleSave(
                 () => Promise.resolve(updateProfile({...profile, title: v})),
                 'Profile updated'
               )}
               autoSave={saveMode === 'auto'}
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
          <div className="space-y-8">
            {dataLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              experiences.map((exp) => (
                <div key={exp.id} className="bg-surface p-6 rounded-xl border border-border relative group">
                  <button 
                    onClick={() => {
                      if (confirm(`Delete "${exp.role}" at ${exp.company}?`)) {
                        handleSave(
                          () => deleteExperience(exp.id),
                          'Experience deleted'
                        );
                      }
                    }}
                    className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup 
                      label="Role" 
                      value={exp.role} 
                      onSave={(v: string) => handleSave(
                        () => updateExperience(exp.id, { role: v }),
                        'Experience updated'
                      )}
                      autoSave={saveMode === 'auto'}
                    />
                    <InputGroup 
                      label="Company" 
                      value={exp.company} 
                      onSave={(v: string) => handleSave(
                        () => updateExperience(exp.id, { company: v }),
                        'Experience updated'
                      )}
                      autoSave={saveMode === 'auto'}
                    />
                    <InputGroup 
                      label="Period" 
                      value={exp.period} 
                      onSave={(v: string) => handleSave(
                        () => updateExperience(exp.id, { period: v }),
                        'Experience updated'
                      )}
                      autoSave={saveMode === 'auto'}
                    />
                  </div>
                  <InputGroup 
                    label="Description" 
                    value={exp.description} 
                    onSave={(v: string) => handleSave(
                      () => updateExperience(exp.id, { description: v }),
                      'Experience updated'
                    )}
                    autoSave={saveMode === 'auto'}
                    as="textarea" 
                  />
                  <TagsInput 
                    label="Technologies"
                    value={exp.technologies}
                    onSave={(tags: string[]) => handleSave(
                      () => updateExperience(exp.id, { technologies: tags }),
                      'Technologies updated'
                    )}
                  />
                </div>
              ))
            )}
            <button 
              onClick={() => handleSave(
                () => addExperience({ 
                  role: 'New Role', 
                  company: 'New Company', 
                  period: '2024', 
                  description: 'Description', 
                  technologies: [] 
                }),
                'Experience added'
              )}
              className="w-full py-4 border-2 border-dashed border-border rounded-xl text-secondary hover:border-primary hover:text-primary transition-all"
            >
              + Add New Experience
            </button>
          </div>
        )}

        {/* Education Editor */}
        {activeTab === 'education' && (
           <div className="space-y-8">
           {dataLoading ? (
             <div className="text-center py-8">Loading...</div>
           ) : (
             education.map((edu) => (
               <div key={edu.id} className="bg-surface p-6 rounded-xl border border-border relative group">
                 <button 
                   onClick={() => {
                     if (confirm(`Delete "${edu.degree}" from ${edu.school}?`)) {
                       handleSave(
                         () => deleteEducation(edu.id),
                         'Education deleted'
                       );
                     }
                   }}
                   className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                   Delete
                 </button>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <InputGroup 
                     label="School" 
                     value={edu.school} 
                     onSave={(v: string) => handleSave(
                       () => updateEducation(edu.id, { school: v }),
                       'Education updated'
                     )}
                   />
                   <InputGroup 
                     label="Degree" 
                     value={edu.degree} 
                     onSave={(v: string) => handleSave(
                       () => updateEducation(edu.id, { degree: v }),
                       'Education updated'
                     )}
                   />
                   <InputGroup 
                     label="Year" 
                     value={edu.year} 
                     onSave={(v: string) => handleSave(
                       () => updateEducation(edu.id, { year: v }),
                       'Education updated'
                     )}
                   />
                   <InputGroup 
                     label="GPA" 
                     value={edu.gpa || ''} 
                     onSave={(v: string) => handleSave(
                       () => updateEducation(edu.id, { gpa: v }),
                       'Education updated'
                     )}
                   />
                 </div>
                 <InputGroup 
                   label="Description" 
                   value={edu.description || ''} 
                   onSave={(v: string) => handleSave(
                     () => updateEducation(edu.id, { description: v }),
                     'Education updated'
                   )}
                   as="textarea" 
                 />
               </div>
             ))
           )}
           <button 
             onClick={() => handleSave(
               () => addEducation({ 
                 school: 'New University', 
                 degree: 'Bachelor', 
                 field: 'CS', 
                 year: '2024' 
               }),
               'Education added'
             )}
             className="w-full py-4 border-2 border-dashed border-border rounded-xl text-secondary hover:border-primary hover:text-primary transition-all"
           >
             + Add New Education
           </button>
         </div>
        )}

        {/* Projects Editor */}
        {activeTab === 'projects' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {dataLoading ? (
             <div className="col-span-full text-center py-8">Loading...</div>
           ) : (
             projects.map((proj) => (
               <div key={proj.id} className="bg-surface p-6 rounded-xl border border-border relative group">
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
                 />
                 <InputGroup 
                   label="Image URL" 
                   value={proj.imageUrl} 
                   onSave={(v: string) => handleSave(
                     () => updateProject(proj.id, { image_url: v }),
                     'Project updated'
                   )}
                 />
                 <InputGroup 
                   label="Description" 
                   value={proj.description} 
                   onSave={(v: string) => handleSave(
                     () => updateProject(proj.id, { description: v }),
                     'Project updated'
                   )}
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
                 tags: [] 
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
