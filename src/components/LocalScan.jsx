import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Modal from "./Modal";

function LocalScan() {
    const [movieFiles, setMovieFiles] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [folderName, setFolderName] = useState("");

    const isMovieFile = (fileName) => {
        const movieExtensions = /\.(mp4|mkv|avi|mov)$/i;
        const tvSeriesPatterns = /S\d{2}E\d{2}|Episode|Ep/i;
        return (
            movieExtensions.test(fileName) && !tvSeriesPatterns.test(fileName)
        );
    };

    const handleFolderSelect = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const folderPath = files[0].webkitRelativePath || files[0].name;
            const extractedFolderName = folderPath.split("/")[0];
            setFolderName(extractedFolderName);
        } else {
            setFolderName("");
        }
        const movieFiles = files.filter((file) => isMovieFile(file.name));
        if (movieFiles.length === 0) {
            setError("No movies found in this folder.");
            setSelectedMovie(null);
        } else {
            setError(null);
            setMovieFiles(movieFiles);
            selectRandomMovie(movieFiles);
            setShowModal(true);
        }
    };

    const selectRandomMovie = (files) => {
        if (files.length > 0) {
            const randomMovie =
                files[Math.floor(Math.random() * files.length)].name;
            setSelectedMovie(randomMovie);
            setShowModal(true);
        }
    };

    const handleGenerateAgain = () => {
        selectRandomMovie(movieFiles);
    };

    const handlePlayNow = () => {
        const selectedFile = movieFiles.find(
            (file) => file.name === selectedMovie
        );

        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            const newTab = window.open("", "_blank");
            newTab.document.body.innerHTML = `
            <video controls autoplay style="width: 100%; height: 100%; object-fit: cover;">
                <source src="${fileURL}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;

            newTab.document.querySelector("video").onplay = () => {
                const videoElement = newTab.document.querySelector("video");
                if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                } else if (videoElement.mozRequestFullScreen) {
                    // Firefox
                    videoElement.mozRequestFullScreen();
                } else if (videoElement.webkitRequestFullscreen) {
                    // Chrome, Safari, and Opera
                    videoElement.webkitRequestFullscreen();
                } else if (videoElement.msRequestFullscreen) {
                    // IE/Edge
                    videoElement.msRequestFullscreen();
                }
            };
        } else {
            setError("No movie selected.");
        }
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setShowModal(false);
    };

    return (
        <div className="mt-4 md:mt-0 p-4 bg-gray-800 rounded shadow-lg w-full flex-1">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Local Scan
            </h2>
            <div className="flex flex-col items-center">
                {/* Hide default input */}
                <label
                    htmlFor="folder-input"
                    className="cursor-pointer w-full p-2 mb-2 text-center bg-blue-600 text-white rounded hover:bg-blue-500">
                    {folderName && `Selected Folder: ${folderName}` || "Select Folder to Scan"}
                </label>
                <input
                    type="file"
                    id="folder-input"
                    webkitdirectory="true"
                    multiple
                    onChange={handleFolderSelect}
                    className="hidden"
                />
            </div>
    
            {error && <ErrorMessage message={error} />}
            {movieFiles.length > 0 && !showModal && (
                <button
                    onClick={handleGenerateAgain}
                    className="mt-4 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                    Generate Again
                </button>
            )}
            {showModal && (
                <Modal
                    movie={selectedMovie}
                    onClose={closeModal}
                    onGenerateAgain={handleGenerateAgain}
                    onPlayNow={handlePlayNow}
                />
            )}
        </div>
    );
}

export default LocalScan;
