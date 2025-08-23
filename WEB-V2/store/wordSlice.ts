import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Translation {
  word: string;
  definitions: string[];
  partOfSpeech: string[];
  examples: string[];
  synonyms: any[];
  relatedWords: string[];
  media: {
    url: string;
    type: string;
  }[];
  dialect: string | null;
}

export interface Meaning {
  word: string;
  definitions: string[];
  partOfSpeech: string[];
  examples: string[];
  synonyms: any[];
  relatedWords: string[];
  media: {
    url: string;
    type: string;
  }[];
  dialect: string;
}

export interface WordRecord {
  id: number;
  word: string;
  language: string;
  matchType: string;
  similarityScore: number;
  meanings: Meaning[];
  translations: {
    en?: Translation[];
    urh?: Translation[];
  };
  pairedExamples: any[];
  isFavorite: boolean;
}

interface ApiResponse {
  metadata: {
    totalRecords: number;
    languageMap: Record<string, string>;
    query: string;
    language: string;
    count: number;
    page: number;
    generatedAt: string;
    source: string;
    searchOptions: {
      language: string;
      fuzzy: string;
      searchMode: string;
      reverseSearch: boolean;
    };
  };
  records: WordRecord[];
}

interface WordState {
  wordOfDay: Word | null;
  searchResults: SearchResult[];
  searchQuery: string;
  detailedWord: ApiResponse | null;
  isLoading: boolean;
  error: string | null;
}

interface Word {
  word: string;
  meaning: string;
  image?: any;
}

interface SearchResult {
  id: number;
  word: string;
  eyuo?: string;
  definitions?: {
    partOfSpeech: string;
    definition: string;
    exampleInNative: string;
    exampleEnglish: string;
    exampleNative: string;
  }[];
  suggestedWords?: string[];
  moreExamples?: {
    english: string;
    native: string;
  }[];
}

const initialState: WordState = {
  wordOfDay: null,
  searchResults: [],
  searchQuery: "",
  detailedWord: null,
  isLoading: false,
  error: null,
};

const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    setWordOfDay: (state, action: PayloadAction<Word>) => {
      state.wordOfDay = action.payload;
      state.error = null;
    },
    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      // Remove duplicates based on word property
      const uniqueResults = action.payload.filter(
        (word, index, self) =>
          index === self.findIndex((w) => w.word === word.word),
      );
      state.searchResults = uniqueResults;
      state.error = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
      state.error = null;
    },
    setDetailedWord: (state, action: PayloadAction<ApiResponse | null>) => {
      state.detailedWord = action.payload;
    },
  },
});

export const {
  setWordOfDay,
  setSearchResults,
  setSearchQuery,
  setLoading,
  setError,
  clearSearch,
  setDetailedWord,
} = wordSlice.actions;

export default wordSlice.reducer;
