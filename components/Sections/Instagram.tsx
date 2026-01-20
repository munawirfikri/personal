
import React, { useEffect, useState } from 'react';
import { SectionId, InstagramMedia } from '../../types';
import { useData } from '../../contexts/DataContext';

// NOTE: To make this work with real data, you need to generate an Instagram Basic Display Access Token
// and add it to your environment variables as REACT_APP_INSTAGRAM_TOKEN or process.env.INSTAGRAM_TOKEN
// Tutorial: https://developers.facebook.com/docs/instagram-basic-display-api/

const MOCK_INSTAGRAM_FEED: InstagramMedia[] = [
  {
    id: '1',
    caption: 'Building scalable systems 💻 #coding #backend #softwareengineer',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop',
    permalink: 'https://www.instagram.com/munawirfikri/',
  },
  {
    id: '2',
    caption: 'Code review session. Quality matters. 🔍',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop',
    permalink: 'https://www.instagram.com/munawirfikri/',
  },
  {
    id: '3',
    caption: 'Exploring new tech stack 🚀',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
    permalink: 'https://www.instagram.com/munawirfikri/',
  },
  {
    id: '4',
    caption: 'Coffee and code ☕️',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
    permalink: 'https://www.instagram.com/munawirfikri/',
  },
];

const Instagram: React.FC = () => {
  const [posts, setPosts] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useData();
  
  // Replace with your specific Instagram ID or Username for display purposes
  const INSTAGRAM_USERNAME = "munawirfikri";
  const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

  useEffect(() => {
    const fetchInstagramPhotos = async () => {
      // In a real scenario, use process.env.INSTAGRAM_TOKEN
      const accessToken = process.env.INSTAGRAM_TOKEN; 
      
      if (!accessToken) {
        // Fallback to mock data if no token is provided
        setPosts(MOCK_INSTAGRAM_FEED);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}&limit=4`
        );
        
        if (!response.ok) throw new Error('Failed to fetch instagram feed');
        
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Instagram fetch error, using fallback:", error);
        setPosts(MOCK_INSTAGRAM_FEED);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPhotos();
  }, []);

  return (
    <section id={SectionId.INSTAGRAM} className="py-24 bg-surfaceHighlight relative overflow-hidden scroll-mt-28">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
            style={{
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            color: 'rgba(var(--color-primary), 1)'
            }}
        ></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div className="mb-6 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-background/50 rounded-lg border border-border">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider text-secondary">{t('insta_title')}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">@munawirfikri</h2>
           </div>
           
           <a 
             href={INSTAGRAM_URL}
             target="_blank" 
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors pb-1 border-b border-primary hover:border-secondary"
           >
             {t('insta_link')}
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
           </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loading ? (
                // Skeleton Loader
                [...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-surface border border-border rounded-lg animate-pulse"></div>
                ))
            ) : (
                posts.map((post) => (
                    <a 
                        key={post.id} 
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block aspect-square bg-surface border border-border rounded-lg overflow-hidden cursor-pointer"
                    >
                        <img 
                            src={post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url} 
                            alt={post.caption || 'Instagram Post'} 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                            loading="lazy"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                                </svg>
                                <p className="text-white text-xs line-clamp-3 font-medium">
                                    {post.caption ? post.caption : 'View on Instagram'}
                                </p>
                            </div>
                        </div>
                    </a>
                ))
            )}
        </div>
      </div>
    </section>
  );
};

export default Instagram;
