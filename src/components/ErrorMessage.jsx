// src/components/ErrorMessage.js
function ErrorMessage({ message }) {
    return (
        <div className="text-red-500 mt-2">
            <p>{message}</p>
        </div>
    );
}

export default ErrorMessage;
