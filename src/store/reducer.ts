import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { Movie } from '../types/Movie';
import { paginate } from '../utils/paginate';

// Type for the UI state
interface UIState {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  loading: boolean;
  isSearching: boolean;
}

// Type for the movies slice state
interface MoviesState {
  data: Movie[];
}

// Type for the search slice state
interface SearchState {
  data: Movie[];
}

// Overall state type
interface RootState {
  movies: MoviesState;
  search: SearchState;
  ui: UIState;
}

const initialState: RootState = {
  movies: { data: [] },
  search: { data: [] },
  ui: {
    totalCount: 0,
    pageSize: 4,
    currentPage: 1,
    loading: false,
    isSearching: false,
  },
};

const slice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    apiCallBegin: (state) => {
      state.ui.loading = true;
    },
    moviesLoaded: (state, action: PayloadAction<Movie[]>) => {
      const movies = action.payload;
      console.log({ movies });

      state.movies.data = movies;
      state.ui = {
        ...state.ui,
        currentPage: 1,
        totalCount: movies.length,
        loading: false,
        isSearching: false,
      };
    },
    resultLoaded: (state, action: PayloadAction<Movie[]>) => {
      const movies = action.payload;
      state.search.data = movies;
      state.ui = {
        ...state.ui,
        currentPage: 1,
        totalCount: movies.length,
        loading: false,
        isSearching: true,
      };
    },
    clearSearch: (state) => {
      state.ui = {
        ...state.ui,
        isSearching: false,
        currentPage: 1,
        totalCount: state.movies.data.length,
      };
    },
    changePage: (state, action: PayloadAction<{ page: number }>) => {
      state.ui.currentPage = action.payload.page;
    },
  },
});

export default slice.reducer;
export const {
  apiCallBegin,
  moviesLoaded,
  resultLoaded,
  clearSearch,
  changePage,
} = slice.actions;

// Base selectors
const selectMoviesData = createSelector(
  (state: RootState) => state.movies,
  (movies) => movies.data
);

const searchSelector = createSelector(
  (state: RootState) => state.search,
  (search) => search.data
);

const uiSelector = createSelector(
  (state: RootState) => state.ui,
  (ui) => ui
);

// Selector for movies in the current page
const moviesInCurrentPage = createSelector(
  [uiSelector, selectMoviesData, searchSelector],
  (ui, allMovies, filteredMovies) => {
    const { isSearching } = ui;
    const movies = isSearching ? filteredMovies : allMovies;
    return paginate(movies, ui.currentPage, ui.pageSize) as Movie[];
  }
);

export { uiSelector, moviesInCurrentPage };
