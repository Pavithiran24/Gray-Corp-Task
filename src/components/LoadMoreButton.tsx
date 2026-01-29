import { Button } from '@/components/ui/button';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useEffect, useRef, useCallback } from 'react';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
  visibleCount: number;
  totalCount: number;
}

export function LoadMoreButton({
  onLoadMore,
  hasMore,
  isLoading = false,
  visibleCount,
  totalCount,
}: LoadMoreButtonProps) {
  const observerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef(onLoadMore);

  // Keep ref updated to avoid stale closure
  useEffect(() => {
    loadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  // Infinite scroll using Intersection Observer
  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreRef.current();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    observer.observe(currentRef);

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  const handleLoadMore = useCallback(() => {
    onLoadMore();
  }, [onLoadMore]);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <p className="text-sm text-muted-foreground">
        Showing {visibleCount} of {totalCount} users
      </p>

      {hasMore && (
        <>
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            Load More
          </Button>
          {/* Invisible element for intersection observer */}
          <div ref={observerRef} className="h-4 w-full" />
        </>
      )}

      {!hasMore && totalCount > 0 && (
        <p className="text-sm font-medium text-muted-foreground">
          You've reached the end
        </p>
      )}
    </div>
  );
}
