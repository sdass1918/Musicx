import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function QuizAnswers() {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();

    const questions = state?.questionList || [];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Quiz Answers</h1>
                {questions.length > 0 ? (
                    <ul className="text-left">
                        {questions.map((question, index) => (
                            <li key={index} className="mb-6">
                                <p className="font-semibold">{index + 1}. {question.text}</p>
                                <p className="text-green-600">✅ Correct Answer: {question.correctAnswer}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No questions available.</p>
                )}
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default QuizAnswers;
