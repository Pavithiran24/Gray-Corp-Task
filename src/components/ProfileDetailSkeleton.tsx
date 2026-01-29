export function ProfileDetailSkeleton() {
  return (
    <div className="page-transition container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 w-24 rounded skeleton-shimmer" />
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="gradient-border overflow-hidden rounded-2xl bg-card">
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-br from-primary/20 to-accent/20">
            <div className="absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full ring-4 ring-card skeleton-shimmer" />
          </div>

          {/* Content */}
          <div className="px-6 pb-8 pt-16 text-center">
            <div className="mx-auto mb-2 h-7 w-48 rounded skeleton-shimmer" />
            <div className="mx-auto h-5 w-36 rounded skeleton-shimmer" />
          </div>

          {/* Info Grid */}
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card p-6">
                <div className="mb-2 h-4 w-20 rounded skeleton-shimmer" />
                <div className="h-5 w-full rounded skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
