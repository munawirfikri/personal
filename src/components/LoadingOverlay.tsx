import Spinner from './Spinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay = ({ isLoading, message = 'Loading...' }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-surface border border-border rounded-xl p-8 shadow-2xl flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-primary font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
