import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../src/Components/Pages/Home.jsx'
import AuthLayout from './Components/AuthLayout.jsx'
import Login from './Components/Login.jsx'
import LandingPage from './Components/Pages/LandingPage.jsx'
import SignUp from '../src/Components/Pages/Signup.jsx'
import QuizAnswers from './Components/Pages/QuizAnswers.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignUp />
                </AuthLayout>
            ),
        },
        {
            path: "/landingpage",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <LandingPage />
                </AuthLayout>
            ),
        },
        {
            path: "/quiz-answers",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <QuizAnswers />
                </AuthLayout>
            ),
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)