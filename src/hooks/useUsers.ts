import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api/userApi';
import { User } from '@/types/user';
import { useMemo, useState, useCallback } from 'react';

const USERS_QUERY_KEY = ['users'];

export function useUsers() {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: () => userApi.fetchAllUsers(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const refreshUsers = async () => {
    const newSeed = Date.now().toString();
    queryClient.setQueryData(USERS_QUERY_KEY, undefined);
    return queryClient.fetchQuery({
      queryKey: USERS_QUERY_KEY,
      queryFn: () => userApi.fetchAllUsers(newSeed),
    });
  };

  const getUserById = (uuid: string): User | undefined => {
    return users.find((user) => user.login.uuid === uuid);
  };

  return {
    users,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    refreshUsers,
    getUserById,
  };
}

export function useUserSearch(users: User[], searchTerm: string) {
  return useMemo(() => {
    if (!searchTerm.trim()) return users;

    const term = searchTerm.toLowerCase();
    return users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      return fullName.includes(term) || email.includes(term);
    });
  }, [users, searchTerm]);
}

export function useInfiniteScroll(items: User[], itemsPerPage: number = 10) {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  const hasMore = visibleCount < items.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + itemsPerPage, items.length));
  }, [itemsPerPage, items.length]);

  const reset = useCallback(() => {
    setVisibleCount(itemsPerPage);
  }, [itemsPerPage]);

  return {
    visibleItems,
    hasMore,
    loadMore,
    reset,
    totalCount: items.length,
    visibleCount: Math.min(visibleCount, items.length),
  };
}
