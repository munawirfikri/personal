import { usePWAInstall } from '../hooks/usePWAInstall';

const PWAInstallBanner = () => {
  const { isInstallable, installPWA } = usePWAInstall();

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-surface border border-border rounded-lg shadow-lg p-4 z-50 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary text-background rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-primary mb-1">Install App</h3>
          <p className="text-sm text-secondary mb-3">Install untuk akses offline</p>
          <button
            onClick={installPWA}
            className="w-full px-4 py-2 bg-primary text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;
