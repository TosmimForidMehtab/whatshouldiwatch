import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;
function useFetchMovies() {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    const fetchMovie = async ({ genre, language, year }) => {
        try {
            const response = await axios.get(
                `${API_URL}/?apiKey=${API_KEY}&type=movie&y=${year}&r=json&`
            );
            if (response.data.results.length > 0) {
                const randomMovie =
                    response.data.results[
                        Math.floor(Math.random() * response.data.results.length)
                    ];
                setMovie(randomMovie);

            } else {
                setError("No movies found with the selected filters.");
            }
        } catch (error) {
            setError("Failed to fetch movies. Please try again.");
        }
    };

    return { movie, error, fetchMovie };
}

export default useFetchMovies;
