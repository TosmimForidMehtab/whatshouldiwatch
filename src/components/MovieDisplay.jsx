function MovieDisplay({ movie }) {
    return (
        <div className="mt-4 p-4 bg-gray-700 rounded shadow">
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <p>{movie.overview}</p>
        </div>
    );
}

export default MovieDisplay;
