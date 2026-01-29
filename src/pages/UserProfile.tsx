import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { User } from '@/types/user';
import { useUsers } from '@/hooks/useUsers';
import {
  formatFullName,
  formatFullAddress,
  formatLocation,
  getInitials,
} from '@/utils/formatters';
import { ArrowLeft, Mail, MapPin, Phone, Globe, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileDetailSkeleton } from '@/components/ProfileDetailSkeleton';
import { ErrorState } from '@/components/ErrorState';

export default function UserProfile() {
  const { uuid } = useParams<{ uuid: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { getUserById, isLoading } = useUsers();

  // Try to get user from navigation state first (no API call needed)
  const stateUser = location.state?.user as User | undefined;
  const cachedUser = uuid ? getUserById(uuid) : undefined;
  const user = stateUser || cachedUser;

  if (isLoading && !user) {
    return <ProfileDetailSkeleton />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </Button>
          </Link>
          <ErrorState
            title="User not found"
            message="The user you're looking for doesn't exist or has been removed."
            onRetry={() => navigate('/')}
          />
        </div>
      </div>
    );
  }

  const infoItems = [
    {
      icon: Mail,
      label: 'Email',
      value: user.email,
      href: `mailto:${user.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: user.phone,
      href: `tel:${user.phone}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: formatLocation(user.location),
    },
    {
      icon: Globe,
      label: 'Country',
      value: user.location.country,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="page-transition container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Button>
        </Link>

        {/* Profile Card */}
        <div className="mx-auto max-w-2xl">
          <div className="gradient-border overflow-hidden rounded-2xl bg-card shadow-xl">
            {/* Header with gradient background */}
            <div className="relative h-32 bg-gradient-to-br from-primary/30 to-accent/30">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                {user.picture.large ? (
                  <img
                    src={user.picture.large}
                    alt={formatFullName(user.name)}
                    className="h-24 w-24 rounded-full object-cover ring-4 ring-card shadow-lg"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground ring-4 ring-card shadow-lg">
                    {getInitials(user.name)}
                  </div>
                )}
              </div>
            </div>

            {/* Name & Username */}
            <div className="px-6 pb-6 pt-16 text-center">
              <h1 className="text-2xl font-bold text-foreground">
                {formatFullName(user.name)}
              </h1>
              <p className="mt-1 flex items-center justify-center gap-1 text-muted-foreground">
                <UserIcon className="h-4 w-4" />@{user.login.username}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid gap-px bg-border sm:grid-cols-2">
              {infoItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-card p-6 transition-colors hover:bg-muted/50"
                >
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-foreground transition-colors hover:text-primary"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Full Address */}
            <div className="border-t border-border bg-muted/30 p-6">
              <div className="mb-2 text-sm text-muted-foreground">
                Full Address
              </div>
              <p className="text-foreground">
                {formatFullAddress(user.location)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
