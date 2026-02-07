import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '../uiStore';

describe('UIStore', () => {
  beforeEach(() => {
    useUIStore.setState({ notifications: [], theme: 'dark', sidebarOpen: false });
  });

  it('adds notification', () => {
    const { addNotification } = useUIStore.getState();
    
    addNotification('Test message', 'success');
    
    const { notifications } = useUIStore.getState();
    expect(notifications).toHaveLength(1);
    expect(notifications[0].message).toBe('Test message');
    expect(notifications[0].type).toBe('success');
  });

  it('removes notification', () => {
    const { addNotification, removeNotification } = useUIStore.getState();
    
    addNotification('Test message');
    const { notifications } = useUIStore.getState();
    const id = notifications[0].id;
    
    removeNotification(id);
    
    expect(useUIStore.getState().notifications).toHaveLength(0);
  });

  it('toggles theme', () => {
    const { toggleTheme } = useUIStore.getState();
    
    expect(useUIStore.getState().theme).toBe('dark');
    
    toggleTheme();
    expect(useUIStore.getState().theme).toBe('light');
    
    toggleTheme();
    expect(useUIStore.getState().theme).toBe('dark');
  });
});
