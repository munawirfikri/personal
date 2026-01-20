import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';

// Components for the specialized editors
const InputGroup = ({ label, value, onChange, type = "text", as = "input" }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-secondary mb-1">{label}</label>
    {as === "textarea" ? (
      <textarea 
        className="w-full bg-background border border-border rounded p-2 text-primary focus:border-primary outline-none h-32"
        value={value} onChange={e => onChange(e.target.value)}
      />
    ) : (
      <input 
        type={type}
        className="w-full bg-background border border-border rounded p-2 text-primary focus:border-primary outline-none"
        value={value} onChange={e => onChange(e.target.value)}
      />
    )}
  </div>
);

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'education' | 'projects'>('profile');
  
  const { 
    profile, updateProfile, 
    experiences, updateExperiences,
    education, updateEducation,
    projects, updateProjects,
    resetData
  } = useData();

  useEffect(() => {
    const auth = sessionStorage.getItem('cms_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    // Robust check for environment variables with common prefixes
    // This handles cases where the bundler filters variables not starting with VITE_ or REACT_APP_
    const envPassword = 
      process.env.CMS_PASSWORD || 
      process.env.VITE_CMS_PASSWORD || 
      process.env.REACT_APP_CMS_PASSWORD;

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
        <h2 className="text-3xl font-bold mb-8 capitalize">{activeTab} Manager</h2>
        
        {/* Profile Editor */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-2xl bg-surface p-6 rounded-xl border border-border">
             <InputGroup label="Full Name" value={profile.name} onChange={(v: string) => updateProfile({...profile, name: v})} />
             <InputGroup label="Job Title" value={profile.title} onChange={(v: string) => updateProfile({...profile, title: v})} />
             <InputGroup label="Tagline" value={profile.tagline} onChange={(v: string) => updateProfile({...profile, tagline: v})} />
             <InputGroup label="Location" value={profile.location} onChange={(v: string) => updateProfile({...profile, location: v})} />
             <InputGroup label="About Me" value={profile.about} onChange={(v: string) => updateProfile({...profile, about: v})} as="textarea" />
          </div>
        )}

        {/* Experience Editor */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="bg-surface p-6 rounded-xl border border-border relative group">
                <button 
                  onClick={() => {
                    const newExps = experiences.filter((_, i) => i !== idx);
                    updateExperiences(newExps);
                  }}
                  className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Role" value={exp.role} onChange={(v: string) => {
                    const newExp = [...experiences]; newExp[idx].role = v; updateExperiences(newExp);
                  }} />
                  <InputGroup label="Company" value={exp.company} onChange={(v: string) => {
                    const newExp = [...experiences]; newExp[idx].company = v; updateExperiences(newExp);
                  }} />
                  <InputGroup label="Period" value={exp.period} onChange={(v: string) => {
                    const newExp = [...experiences]; newExp[idx].period = v; updateExperiences(newExp);
                  }} />
                </div>
                <InputGroup label="Description" value={exp.description} onChange={(v: string) => {
                   const newExp = [...experiences]; newExp[idx].description = v; updateExperiences(newExp);
                }} as="textarea" />
              </div>
            ))}
            <button 
              onClick={() => updateExperiences([{ id: Date.now().toString(), role: 'New Role', company: 'New Company', period: '2024', description: 'Description', technologies: [] }, ...experiences])}
              className="w-full py-4 border-2 border-dashed border-border rounded-xl text-secondary hover:border-primary hover:text-primary transition-all"
            >
              + Add New Experience
            </button>
          </div>
        )}

        {/* Education Editor */}
        {activeTab === 'education' && (
           <div className="space-y-8">
           {education.map((edu, idx) => (
             <div key={edu.id} className="bg-surface p-6 rounded-xl border border-border relative group">
               <button 
                 onClick={() => {
                   const newEdu = education.filter((_, i) => i !== idx);
                   updateEducation(newEdu);
                 }}
                 className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 Delete
               </button>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <InputGroup label="School" value={edu.school} onChange={(v: string) => {
                   const n = [...education]; n[idx].school = v; updateEducation(n);
                 }} />
                 <InputGroup label="Degree" value={edu.degree} onChange={(v: string) => {
                   const n = [...education]; n[idx].degree = v; updateEducation(n);
                 }} />
                 <InputGroup label="Year" value={edu.year} onChange={(v: string) => {
                   const n = [...education]; n[idx].year = v; updateEducation(n);
                 }} />
                 <InputGroup label="GPA" value={edu.gpa || ''} onChange={(v: string) => {
                   const n = [...education]; n[idx].gpa = v; updateEducation(n);
                 }} />
               </div>
               <InputGroup label="Description" value={edu.description || ''} onChange={(v: string) => {
                  const n = [...education]; n[idx].description = v; updateEducation(n);
               }} as="textarea" />
             </div>
           ))}
           <button 
             onClick={() => updateEducation([{ id: Date.now().toString(), school: 'New University', degree: 'Bachelor', field: 'CS', year: '2024' }, ...education])}
             className="w-full py-4 border-2 border-dashed border-border rounded-xl text-secondary hover:border-primary hover:text-primary transition-all"
           >
             + Add New Education
           </button>
         </div>
        )}

        {/* Projects Editor */}
        {activeTab === 'projects' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {projects.map((proj, idx) => (
             <div key={proj.id} className="bg-surface p-6 rounded-xl border border-border relative group">
               <button 
                 onClick={() => {
                   const n = projects.filter((_, i) => i !== idx);
                   updateProjects(n);
                 }}
                 className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 Delete
               </button>
               
               <InputGroup label="Title" value={proj.title} onChange={(v: string) => {
                 const n = [...projects]; n[idx].title = v; updateProjects(n);
               }} />
               <InputGroup label="Image URL" value={proj.imageUrl} onChange={(v: string) => {
                 const n = [...projects]; n[idx].imageUrl = v; updateProjects(n);
               }} />
               <InputGroup label="Description" value={proj.description} onChange={(v: string) => {
                  const n = [...projects]; n[idx].description = v; updateProjects(n);
               }} as="textarea" />
             </div>
           ))}
           <button 
             onClick={() => updateProjects([{ id: Date.now().toString(), title: 'New Project', description: 'Description', imageUrl: 'https://via.placeholder.com/600', tags: [] }, ...projects])}
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