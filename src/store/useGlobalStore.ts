import { create } from 'zustand';
import type { GitHubUser, GitHubRepository } from '../types';

interface AppState {
  userSearchResults: GitHubUser[];
  selectedUser: GitHubUser | null;
  userRepositories: GitHubRepository[];
  searchTerm: string;
  isLoadingUsers: boolean;
  isLoadingRepositories: boolean;
  setIsLoadingUsers: (isLoadingUsers: boolean) => void;
  setUserSearchResults: (userSearchResults: GitHubUser[]) => void;
  setSelectedUser: (selectedUser: GitHubUser | null) => void;
  setUserRepositories: (userRepositories: GitHubRepository[]) => void;
  setSearchTerm: (searchTerm: string) => void;
  setIsLoadingRepositories: (isLoadingRepositories: boolean) => void;
}

const useGlobalStore = create<AppState>((set) => ({
  userSearchResults: [],
  selectedUser: null,
  userRepositories: [],
  searchTerm: '',
  isLoadingUsers: false,
  isLoadingRepositories: false,
  setUserSearchResults: (userSearchResults: GitHubUser[]) => set({ userSearchResults }),
  setSelectedUser: (selectedUser: GitHubUser | null) => set({ selectedUser }),
  setUserRepositories: (userRepositories: GitHubRepository[]) => set({ userRepositories }),
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  setIsLoadingUsers: (isLoadingUsers: boolean) => set({ isLoadingUsers }),
  setIsLoadingRepositories: (isLoadingRepositories: boolean) => set({ isLoadingRepositories }),
}));

export default useGlobalStore;
