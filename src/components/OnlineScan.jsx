import { useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import Modal from "./Modal";

function OnlineScan() {
    const [genre, setGenre] = useState("");
    const [language, setLanguage] = useState("");
    const [year, setYear] = useState("");
    const { movie, error, fetchMovie } = useFetchMovies();
    const [showModal, setShowModal] = useState(false);

    const handleFetchMovie = () => {
        fetchMovie({ genre, language, year });
    };

    const handleGenerateAgain = () => {
        fetchMovie({ genre, language, year });
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="mt-4 md:mt-0 p-4 bg-gray-800 rounded shadow-lg w-full flex-1">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Online Scan
            </h2>
            <div className="flex flex-col space-y-2">
                <input
                    type="text"
                    placeholder="Genre"
                    disabled={true}
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Language"
                    disabled={true}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Year"
                    disabled={true}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="p-2 rounded bg-gray-700 text-white focus:outline-none"
                />
                <button
                    onClick={handleFetchMovie}
                    disabled={true}
                    // hover:bg-blue-400
                    className="w-full py-2 bg-gray-500 rounded  text-white mt-4">
                    Work in Progress
                </button>
            </div>
            {error && <ErrorMessage message={error} />}
            {movie && (
                <div>
                    <Modal
                        movie={movie}
                        onClose={closeModal}
                        onGenerateAgain={handleGenerateAgain}
                    />
                </div>
            )}
        </div>
    );
}

export default OnlineScan;
