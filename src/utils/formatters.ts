import { UserLocation, UserName } from '@/types/user';

export const formatFullName = (name: UserName): string => {
  return `${name.first} ${name.last}`;
};

export const formatTitleName = (name: UserName): string => {
  return `${name.title} ${name.first} ${name.last}`;
};

export const formatLocation = (location: UserLocation): string => {
  return `${location.city}, ${location.state}, ${location.country}`;
};

export const formatFullAddress = (location: UserLocation): string => {
  return `${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}, ${location.country}`;
};

export const getInitials = (name: UserName): string => {
  return `${name.first.charAt(0)}${name.last.charAt(0)}`.toUpperCase();
};
