import { User } from '@/types/user';
import { formatFullName, formatLocation } from '@/utils/formatters';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Link
      to={`/user/${user.login.uuid}`}
      state={{ user }}
      className="group block"
    >
      <article className="gradient-border hover-lift rounded-xl bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={user.picture.medium}
              alt={formatFullName(user.name)}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-border transition-all duration-300 group-hover:ring-primary/50 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-card animate-pulse" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary group-hover:scale-105 transform origin-left">
              {formatFullName(user.name)}
            </h3>

            <div className="mt-2 space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200 group-hover:translate-x-1">
                <Mail className="h-3.5 w-3.5 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="truncate">{user.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200 group-hover:translate-x-1" style={{ transitionDelay: '0.05s' }}>
                <Phone className="h-3.5 w-3.5 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="truncate">{user.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-200 group-hover:translate-x-1" style={{ transitionDelay: '0.1s' }}>
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="truncate">{formatLocation(user.location)}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
