import { searchMovies } from '../store/actionCreators';
import { useRef } from 'react';
import { clearSearch } from '../store/reducer';
import { useAppDispatch } from '../types/hooks';
const SearchForm = () => {
  const dispatch = useAppDispatch();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = () => {
    if (searchRef.current) {
      const searchTerm = searchRef.current.value;
      if (searchTerm) {
        dispatch(searchMovies(searchTerm));
      }
    }
  };
  const resetFilters = () => {
    if (searchRef.current) {
      searchRef.current.value = '';
    }
    dispatch(clearSearch());
  };

  return (
    <div className="flex items-center justify-center w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="shadow-md rounded-lg p-6 flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="text"
          className="bg-transparent border-2 border-primary rounded-full font-inherit text-base p-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:bg-primary"
          placeholder="Search"
          ref={searchRef}
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="search-submit bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="search-clear bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Clear Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
