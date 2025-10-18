import { create } from 'zustand';
import type { GitHubUser, GitHubRepository } from '../types';

type UserSlice = {
  selectedUser: GitHubUser | null;
  userRepositories: GitHubRepository[];
  isLoadingUserRepositories: boolean;
  userRepositoriesError: string | null;
  setSelectedUser: (selectedUser: GitHubUser | null) => void;
  setUserRepositories: (userRepositories: GitHubRepository[]) => void;
  setIsLoadingUserRepositories: (isLoadingUserRepositories: boolean) => void;
  setUserRepositoriesError: (userRepositoriesError: string | null) => void;
};

const useUserSlice = create<UserSlice>((set) => ({
  // states
  selectedUser: null,
  userRepositories: [],
  isLoadingUserRepositories: false,
  userRepositoriesError: null,

  //   actions
  setSelectedUser: (selectedUser: GitHubUser | null) => set({ selectedUser }),
  setUserRepositories: (userRepositories: GitHubRepository[]) => set({ userRepositories }),
  setIsLoadingUserRepositories: (isLoadingUserRepositories: boolean) =>
    set({ isLoadingUserRepositories }),
  setUserRepositoriesError: (userRepositoriesError: string | null) =>
    set({ userRepositoriesError }),
}));

export default useUserSlice;
