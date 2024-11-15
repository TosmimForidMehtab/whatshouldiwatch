import OnlineScan from "./OnlineScan";
import LocalScan from "./LocalScan";

function HomePage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-darkBlue text-white p-4 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                What Should I Watch?
            </h1>
            <div className="flex flex-col md:flex-row md:space-x-8 mt-4 w-full max-w-4xl">
                <OnlineScan />
                <LocalScan />
            </div>
        </div>
    );
}

export default HomePage;
