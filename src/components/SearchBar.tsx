import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search users by name or email...',
  resultCount,
}: SearchBarProps) {
  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 bg-card pl-10 pr-10 text-sm transition-all focus:ring-2 focus:ring-primary/20"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
            onClick={() => onChange('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {resultCount !== undefined && value && (
        <p className="mt-2 text-sm text-muted-foreground">
          Found {resultCount} {resultCount === 1 ? 'user' : 'users'}
        </p>
      )}
    </div>
  );
}
