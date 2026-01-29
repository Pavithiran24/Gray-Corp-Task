import { RandomUserApiResponse, User } from '@/types/user';

const API_BASE_URL = 'https://randomuser.me/api';
const RESULTS_PER_PAGE = 10;
const TOTAL_USERS = 50;

export const userApi = {
  /**
   * Fetch users from the Random User API
   * @param page - Page number for pagination
   * @param seed - Seed for consistent results
   */
  async fetchUsers(page: number = 1, seed: string = 'userdir'): Promise<{
    users: User[];
    hasMore: boolean;
    totalPages: number;
  }> {
    const response = await fetch(
      `${API_BASE_URL}/?results=${RESULTS_PER_PAGE}&page=${page}&seed=${seed}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data: RandomUserApiResponse = await response.json();
    
    return {
      users: data.results,
      hasMore: page * RESULTS_PER_PAGE < TOTAL_USERS,
      totalPages: Math.ceil(TOTAL_USERS / RESULTS_PER_PAGE),
    };
  },

  /**
   * Fetch all users at once (for initial load)
   */
  async fetchAllUsers(seed: string = 'userdir'): Promise<User[]> {
    const response = await fetch(
      `${API_BASE_URL}/?results=${TOTAL_USERS}&seed=${seed}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data: RandomUserApiResponse = await response.json();
    return data.results;
  },
};
