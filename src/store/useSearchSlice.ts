import { create } from 'zustand';
import type { GitHubUser } from '../types';

type SearchSlice = {
  searchTerm: string;
  searchedTerm: string;
  searchResults: GitHubUser[];
  isSearching: boolean;
  error: string | null;
  resultsCount: number;
  setSearchTerm: (searchTerm: string) => void;
  setSearchedTerm: (searchTerm: string) => void;
  setSearchResults: (searchResults: GitHubUser[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  setError: (error: string | null) => void;
  setResultsCount: (resultsCount: number) => void;
};

const useSearchSlice = create<SearchSlice>((set) => ({
  // states
  searchTerm: '',
  searchedTerm: '',
  isSearching: false,
  error: null,
  resultsCount: 0,
  searchResults: [],

  // actions
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  setSearchResults: (searchResults: GitHubUser[]) => set({ searchResults }),
  setIsSearching: (isSearching: boolean) => set({ isSearching }),
  setError: (error: string | null) => set({ error }),
  setResultsCount: (resultsCount: number) => set({ resultsCount }),
  setSearchedTerm: (searchedTerm: string) => set({ searchedTerm }),
}));

export default useSearchSlice;
