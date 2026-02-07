import { useEffect } from 'react';
import { useUIStore } from '../stores/uiStore';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useUIStore();

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
      return () => clearTimeout(timer);
    });
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg border animate-slide-up flex items-start gap-3 ${
            notification.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-500' :
            notification.type === 'error' ? 'bg-red-500/10 border-red-500 text-red-500' :
            'bg-blue-500/10 border-blue-500 text-blue-500'
          }`}
        >
          <div className="flex-1">{notification.message}</div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-current hover:opacity-70"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
