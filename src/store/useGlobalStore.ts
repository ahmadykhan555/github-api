import { create } from 'zustand';
import type { GitHubUser } from '../types';

interface AppState {
  userSearchResults: GitHubUser[];
  setUserSearchResults: (userSearchResults: GitHubUser[]) => void;
}

const useGlobalStore = create<AppState>((set) => ({
  userSearchResults: [],
  setUserSearchResults: (userSearchResults: GitHubUser[]) => set({ userSearchResults }),
}));

export default useGlobalStore;
