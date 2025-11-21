import { useNavigate } from "react-router";

export const NoPropertyFound = () => {
    const navigation = useNavigate();
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center text-center bg-card">
            <h2 className="text-3xl font-semibold text-accent-foreground mb-3">
                No Properties Available
            </h2>
            <p className="text-accent-foreground max-w-md mb-6">
                There are currently no properties listed.
                Please contact the seller or your real estate agent for more information.
            </p>

            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={() => navigation('/contact')}>
                Contact Agent
            </button>
        </div>
    );
}