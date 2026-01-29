import { Users, SearchX } from 'lucide-react';

interface EmptyStateProps {
  type?: 'no-users' | 'no-results';
  searchTerm?: string;
}

export function EmptyState({ type = 'no-users', searchTerm }: EmptyStateProps) {
  const isNoResults = type === 'no-results';

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        {isNoResults ? (
          <SearchX className="h-8 w-8 text-muted-foreground" />
        ) : (
          <Users className="h-8 w-8 text-muted-foreground" />
        )}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {isNoResults ? 'No users found' : 'No users yet'}
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        {isNoResults
          ? `We couldn't find any users matching "${searchTerm}". Try a different search term.`
          : 'There are no users to display at the moment.'}
      </p>
    </div>
  );
}
