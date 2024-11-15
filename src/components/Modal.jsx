import React from "react";

function Modal({ movie, onClose, onGenerateAgain, onPlayNow }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md overflow-hidden">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Movie Selected
                </h2>
                <div className="max-h-60 overflow-auto">
                    <p className="text-center mb-4 break-words">{movie}</p>
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onGenerateAgain}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
                        Generate Again
                    </button>
                    {onPlayNow && (
                        <button
                            onClick={onPlayNow}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
                            Play Now
                        </button>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 w-full py-2 bg-red-600 text-white rounded hover:bg-red-500">
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal;
