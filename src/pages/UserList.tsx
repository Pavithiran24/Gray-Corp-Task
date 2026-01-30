import { useState, useEffect, useCallback, useRef } from 'react';
import { useUsers, useUserSearch, useInfiniteScroll } from '@/hooks/useUsers';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { UserCard } from '@/components/UserCard';
import { UserCardSkeletonGrid } from '@/components/UserCardSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { LoadMoreButton } from '@/components/LoadMoreButton';

export default function UserList() {
  const { users, isLoading, isError, isFetching, refreshUsers } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const prevSearchTerm = useRef(searchTerm);

  const filteredUsers = useUserSearch(users, searchTerm);
  const {
    visibleItems,
    hasMore,
    loadMore,
    reset,
    totalCount,
    visibleCount,
  } = useInfiniteScroll(filteredUsers);

  // Reset pagination only when search term actually changes
  useEffect(() => {
    if (prevSearchTerm.current !== searchTerm) {
      prevSearchTerm.current = searchTerm;
      reset();
    }
  }, [searchTerm, reset]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refreshUsers();
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshUsers]);

  return (
    <div className="min-h-screen bg-background">
      <Header onRefresh={handleRefresh} isRefreshing={isRefreshing || isFetching} />

      <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 relative">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-4 sm:left-10 w-14 sm:w-20 h-14 sm:h-20 bg-primary/10 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-4 sm:right-20 w-10 sm:w-16 h-10 sm:h-16 bg-accent/10 rounded-full animate-float-slow opacity-40"></div>
          <div className="absolute bottom-40 left-1/4 w-8 sm:w-12 h-8 sm:h-12 bg-secondary/10 rounded-full animate-float-reverse opacity-50"></div>
          <div className="absolute bottom-20 right-4 sm:right-10 w-16 sm:w-24 h-16 sm:h-24 bg-primary/5 rounded-full animate-float opacity-30"></div>
        </div>

        <div className="page-transition relative z-10">
          {/* Page Title */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground sm:text-3xl animate-slide-up">
              All Users
            </h2>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Browse and search through user profiles
            </p>
          </div>

          {/* Search */}
          <div className="mb-6 sm:mb-8 w-full max-w-full sm:max-w-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              resultCount={searchTerm ? filteredUsers.length : undefined}
            />
          </div>

          {/* Content */}
          {isLoading ? (
            <UserCardSkeletonGrid count={6} />
          ) : isError ? (
            <ErrorState onRetry={handleRefresh} />
          ) : filteredUsers.length === 0 ? (
            <EmptyState
              type={searchTerm ? 'no-results' : 'no-users'}
              searchTerm={searchTerm}
            />
          ) : (
            <>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {visibleItems.map((user) => (
                  <UserCard key={user.login.uuid} user={user} />
                ))}
              </div>

              <LoadMoreButton
                onLoadMore={loadMore}
                hasMore={hasMore}
                visibleCount={visibleCount}
                totalCount={totalCount}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
