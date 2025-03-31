import React from 'react'
import { useDispatch } from 'react-redux'
import authenticationService from '../../lib/appwrite'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authenticationService.logout().then(() => {
            dispatch(logout())
        })
    }
  
    return (
        <button
            className='px-6 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn