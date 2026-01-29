export function UserCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 flex-shrink-0 rounded-full skeleton-shimmer" />

        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-5 w-32 rounded skeleton-shimmer" />

          <div className="space-y-2">
            <div className="h-4 w-48 rounded skeleton-shimmer" />
            <div className="h-4 w-36 rounded skeleton-shimmer" />
            <div className="h-4 w-40 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function UserCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </div>
  );
}
