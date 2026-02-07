import React, { useState, useEffect, useCallback } from 'react';
import { useData } from '../../contexts/DataContext';

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

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'education' | 'projects'>('profile');
  const [saveMode, setSaveMode] = useState<'auto' | 'manual'>('manual');
  
  const { 
    profile, updateProfile, 
    experiences, addExperience, updateExperience, deleteExperience,
    education, addEducation, updateEducation, deleteEducation,
    projects, addProject, updateProject, deleteProject,
    resetData, loading
  } = useData();

  useEffect(() => {
    const auth = sessionStorage.getItem('cms_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    const envPassword = import.meta.env.VITE_CMS_PASSWORD;

    // Debugging aid for the developer
    console.log("CMS Login Debug:");
    console.log("- Env Password Detected:", envPassword ? "Yes (Masked)" : "No");
    
    if (!envPassword) {
        const msg = "CMS_PASSWORD not set in environment variables. Login disabled.";
        console.error(msg);
        setErrorMsg("Configuration Error: Password not configured.");
        return;
    }
    
    if (password === envPassword) { 
      setIsAuthenticated(true);
      sessionStorage.setItem('cms_auth', 'true');
    } else {
      setErrorMsg("Invalid Password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cms_auth');
    window.location.hash = '';
    window.location.reload();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-surfaceHighlight p-8 rounded-xl border border-border shadow-2xl max-w-md w-full animate-fade-in relative overflow-hidden">
          {/* Decorative background element */}
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
               onSave={(v: string) => updateProfile({...profile, name: v})}
               autoSave={saveMode === 'auto'}
             />
             <InputGroup 
               label="Job Title" 
               value={profile.title} 
               onSave={(v: string) => updateProfile({...profile, title: v})}
               autoSave={saveMode === 'auto'}
             />
             <InputGroup 
               label="Tagline" 
               value={profile.tagline} 
               onSave={(v: string) => updateProfile({...profile, tagline: v})}
               autoSave={saveMode === 'auto'}
             />
             <InputGroup 
               label="Location" 
               value={profile.location} 
               onSave={(v: string) => updateProfile({...profile, location: v})}
               autoSave={saveMode === 'auto'}
             />
             <InputGroup 
               label="About Me" 
               value={profile.about} 
               onSave={(v: string) => updateProfile({...profile, about: v})}
               autoSave={saveMode === 'auto'}
               as="textarea" 
             />
          </div>
        )}

        {/* Experience Editor */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              experiences.map((exp) => (
                <div key={exp.id} className="bg-surface p-6 rounded-xl border border-border relative group">
                  <button 
                    onClick={() => deleteExperience(exp.id)}
                    className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup 
                      label="Role" 
                      value={exp.role} 
                      onSave={(v: string) => updateExperience(exp.id, { role: v })}
                      autoSave={saveMode === 'auto'}
                    />
                    <InputGroup 
                      label="Company" 
                      value={exp.company} 
                      onSave={(v: string) => updateExperience(exp.id, { company: v })}
                      autoSave={saveMode === 'auto'}
                    />
                    <InputGroup 
                      label="Period" 
                      value={exp.period} 
                      onSave={(v: string) => updateExperience(exp.id, { period: v })}
                      autoSave={saveMode === 'auto'}
                    />
                  </div>
                  <InputGroup 
                    label="Description" 
                    value={exp.description} 
                    onSave={(v: string) => updateExperience(exp.id, { description: v })}
                    autoSave={saveMode === 'auto'}
                    as="textarea" 
                  />
                </div>
              ))
            )}
            <button 
              onClick={() => addExperience({ 
                role: 'New Role', 
                company: 'New Company', 
                period: '2024', 
                description: 'Description', 
                technologies: [] 
              })}
              className="w-full py-4 border-2 border-dashed border-border rounded-xl text-secondary hover:border-primary hover:text-primary transition-all"
            >
              + Add New Experience
            </button>
          </div>
        )}

        {/* Education Editor */}
        {activeTab === 'education' && (
           <div className="space-y-8">
           {loading ? (
             <div className="text-center py-8">Loading...</div>
           ) : (
             education.map((edu) => (
               <div key={edu.id} className="bg-surface p-6 rounded-xl border border-border relative group">
                 <button 
                   onClick={() => deleteEducation(edu.id)}
                   className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                   Delete
                 </button>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <InputGroup 
                     label="School" 
                     value={edu.school} 
                     onSave={(v: string) => updateEducation(edu.id, { school: v })}
                   />
                   <InputGroup 
                     label="Degree" 
                     value={edu.degree} 
                     onSave={(v: string) => updateEducation(edu.id, { degree: v })}
                   />
                   <InputGroup 
                     label="Year" 
                     value={edu.year} 
                     onSave={(v: string) => updateEducation(edu.id, { year: v })}
                   />
                   <InputGroup 
                     label="GPA" 
                     value={edu.gpa || ''} 
                     onSave={(v: string) => updateEducation(edu.id, { gpa: v })}
                   />
                 </div>
                 <InputGroup 
                   label="Description" 
                   value={edu.description || ''} 
                   onSave={(v: string) => updateEducation(edu.id, { description: v })}
                   as="textarea" 
                 />
               </div>
             ))
           )}
           <button 
             onClick={() => addEducation({ 
               school: 'New University', 
               degree: 'Bachelor', 
               field: 'CS', 
               year: '2024' 
             })}
             className="w-full py-4 border-2 border-dashed border-border rounded-xl text-secondary hover:border-primary hover:text-primary transition-all"
           >
             + Add New Education
           </button>
         </div>
        )}

        {/* Projects Editor */}
        {activeTab === 'projects' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {loading ? (
             <div className="col-span-full text-center py-8">Loading...</div>
           ) : (
             projects.map((proj) => (
               <div key={proj.id} className="bg-surface p-6 rounded-xl border border-border relative group">
                 <button 
                   onClick={() => deleteProject(proj.id)}
                   className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                   Delete
                 </button>
                 
                 <InputGroup 
                   label="Title" 
                   value={proj.title} 
                   onSave={(v: string) => updateProject(proj.id, { title: v })}
                 />
                 <InputGroup 
                   label="Image URL" 
                   value={proj.imageUrl} 
                   onSave={(v: string) => updateProject(proj.id, { image_url: v })}
                 />
                 <InputGroup 
                   label="Description" 
                   value={proj.description} 
                   onSave={(v: string) => updateProject(proj.id, { description: v })}
                   as="textarea" 
                 />
               </div>
             ))
           )}
           <button 
             onClick={() => addProject({ 
               title: 'New Project', 
               description: 'Description', 
               imageUrl: 'https://via.placeholder.com/600', 
               tags: [] 
             })}
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