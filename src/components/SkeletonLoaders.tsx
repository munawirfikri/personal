import Skeleton from './Skeleton';

export const ExperienceSkeleton = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-6">
      <Skeleton width="200px" height="40px" className="mb-12 mx-auto" />
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-6">
            <Skeleton width="60%" height="24px" className="mb-3" />
            <Skeleton width="40%" height="16px" className="mb-4" />
            <Skeleton width="100%" height="16px" className="mb-2" />
            <Skeleton width="80%" height="16px" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ProjectsSkeleton = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-6">
      <Skeleton width="200px" height="40px" className="mb-12 mx-auto" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden">
            <Skeleton width="100%" height="200px" className="rounded-none" />
            <div className="p-6">
              <Skeleton width="70%" height="24px" className="mb-3" />
              <Skeleton width="100%" height="16px" className="mb-2" />
              <Skeleton width="90%" height="16px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GenericSkeleton = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);
