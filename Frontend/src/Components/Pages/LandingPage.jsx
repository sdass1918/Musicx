import React, { useState, useEffect } from "react";
import fileService from "../../lib/fileConfig";
import conf from "../../conf/conf.js";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState(false);
    const [count, setCount] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [type, setType] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [formUrl, setFormUrl] = useState('');
    useEffect(() => {
        // Fetch categories from OpenTDB API
        fetch("https://opentdb.com/api_category.php")
            .then((response) => response.json())
            .then((data) => setCategories(data.trivia_categories))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    const generateQuizLink = (quizId) => {
        return `${conf.appwriteUrl}/database/collections/${conf.appwriteCollectionId}/documents/${quizId}`;
    };

    const handleGenerateClick = () => {
        setShowInput(true);
    };
    const decodeHTMLEntities = (text) => {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(text, "text/html").body.textContent;
        return decodedString;
    };
    
    let questionList = [];
    const handleSubmit = () => {
        if (!selectedCategory || !count || !difficulty) {
            alert("Please fill in all fields.");
            return;
        }
        setLoading(true);
        fetch(`https://opentdb.com/api.php?amount=${count}&category=${selectedCategory}&type=${type}&difficulty=${difficulty}`)
            .then(response => response.json())
            .then(data => {
                
                if (data.results.length === 0) {
                    alert("No questions found.");
                    return;
                }
    
                const questions = data.results.map(question => ({
                    text: question.question,
                    options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
                }));

                questionList = data.results.map(question => ({
                    text: decodeHTMLEntities(question.question),
                    options: [...question.incorrect_answers, question.correct_answer]
                            .map(decodeHTMLEntities) // Decode options as well
                            .sort(() => Math.random() - 0.5),
                    correctAnswer: decodeHTMLEntities(question.correct_answer)
                }));
    
                // Send request to backend
                return fetch("https://quizzite.onrender.com/send-questions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ questions })
                });
            })
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                console.log("Response Data:", data);
                if (data.editUrl) {
                    //alert(`Form created: ${data.formUrl}`);
                    prompt("Form created! Copy this link:", data.editUrl);
                    navigate('/quiz-answers', { state: { questionList } });
                } else {
                    alert("Error: " + (data.error || 'Unknown error'));
                }
            })
            .catch(error => {
                setLoading(false);
                console.error("Error:", error);
                alert("Failed: " + error.message);
            });
    };
    
    const types = [
        {   
            name: "Multiple Choice",
            id: "multiple",
        },
        {
            name: "True/False",
            id: "boolean",
        },
    ];
    const level = [
        {
            name: "Hard",
            id: "hard",
        },
        {
            name: "Easy",
            id: "easy",
        },
        {
            name: "Medium",
            id: "medium",
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
            {!showInput && (
                <>
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg text-center">
                    <h1 className="text-3xl font-bold mb-4">Welcome to Quizzite!</h1>
                    <p className="text-lg text-center mb-6 max-w-lg">
                        Create custom quizzes instantly with Quizzite. Simply enter a topic, number of questions, level, type and let our Quizzite generate an engaging quiz for you!
                    </p>
                    <button
                        onClick={handleGenerateClick}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Generate Quiz
                    </button>
                </div>
                </>
            )}

            {showInput && (
                <div className="mt-6 w-full max-w-lg">
                    <select
                        className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows="4"
                        placeholder="Enter your count of queestions"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                    ></input>
                    <select name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="">Select the level</option>
                        {level.map((level) => (
                            <option key={level.id} value={level.id}>
                                {level.name}
                            </option>
                        ))}
                    </select>
                    <select value={type} name="type" id="quiz" onChange={(e) => setType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="">Select the type</option>
                        {types.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleSubmit}
                        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Generate
                    </button>
                    {loading && (
                        <div className="mt-4 flex justify-center">
                            <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        </div>
                    )}
    
                </div>
            )}
        </div>
    );
}

export default LandingPage;
