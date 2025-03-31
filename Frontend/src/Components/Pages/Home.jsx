import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import LandingPage from './LandingPage';

function Home() {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    return (
        <div>
        {!authStatus ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-500 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to Quizzite</h1>
            <p className="text-lg text-gray-300 mb-6">Your one stop solution for making quizzes!</p>
            <div className="flex space-x-4">
                <button onClick={() => navigate('/signup')} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-lg font-medium transition">Get Started</button>
                <button onClick={() => navigate('/login')} className="px-6 py-3 border border-white hover:bg-white hover:text-gray-500 rounded-full text-lg font-medium transition">Login</button>
            </div>
        </div>) :
        (<LandingPage />)
        }
        </div>
    );
}

export default Home;
