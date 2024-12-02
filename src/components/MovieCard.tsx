interface MovieCardI {
  movie: {
    title: string;
    rating: number;
    plot: string;
    poster: string;
  };
}
const MovieCard = ({ movie: { title, rating, plot, poster } }: MovieCardI) => {
  return (
    <div className="group w-72 m-4 shadow-md relative overflow-hidden rounded-sm">
      <img className="w-full" src={`${poster}`} alt="movie poster" />
      <div className="text-gray-300 flex items-center justify-between p-2.5 px-4 pb-4 tracking-wide">
        <h3 className="mt-0">{title}</h3>
        <span
          className={`bg-primary py-1 px-2 rounded-sm font-bold ${
            rating > 8
              ? 'text-green-500'
              : rating > 4.5
              ? 'text-orange-500'
              : 'text-red-500'
          }`}
        >
          {rating}
        </span>
      </div>

      <div className="group-hover:translate-y-0 bg-white p-8 absolute left-0 bottom-0 right-0 max-h-[70%] transform translate-y-[101%] overflow-y-hidden transition-transform duration-300 ease-in">
        <h3>Overview</h3>
        {plot}
      </div>
    </div>
  );
};

export default MovieCard;
