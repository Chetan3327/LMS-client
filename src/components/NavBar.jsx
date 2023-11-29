import {logo} from '../imageUrls'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';
import SearchInput from '../course/SearchInput'
import DropDown from './DropDown'
import {useContext} from 'react'
import {UserContext} from '../context/user-context'

const NavBar = () => {
    const {setSearch} = useContext(UserContext)
    const navigate = useNavigate()
    const [cookie, setCookie, removeCookie] = useCookies(['jwt-access-token'])
    const [dropDownVisible, setDropDownVisible] = useState(false)
    // console.log(cookie['jwt-access-token'])
    const logout = () => {
        removeCookie('jwt-access-token')
        setDropDownVisible(false)
        navigate('/')
    }

    return(
        <nav className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-2 px-3 bg-transparent'>
            <div className='flex gap-4'>
                <img src={logo} width={40} alt="logo" className='cursor-pointer' onClick={() => navigate('/')} />
                <SearchInput setSearch={setSearch} />
            </div>
            {/* <div className='bg-black text-white cursor-pointer px-4 p-2 rounded-xl shadow-sm hover:scale-105 duration-300' onClick={() => setCookie('jwt-access-token', 'value')} >set cookie</div> */}
            <div className='bg-black text-white cursor-pointer px-4 p-2 rounded-xl shadow-sm hover:scale-105 duration-300' onClick={() => navigate('/courses')} >Courses</div>
            <div className='bg-black text-white cursor-pointer px-4 p-2 rounded-xl shadow-sm hover:scale-105 duration-300' onClick={() => navigate('/createCourse')} >createCourse</div>
            <div className='bg-black text-white cursor-pointer px-4 p-2 rounded-xl shadow-sm hover:scale-105 duration-300' onClick={() => navigate('/dashboard')} >created Courses</div>
            {cookie['jwt-access-token'] ? (
            <div className='flex gap-3 items-center'>
                {/* <CgProfile className='cursor-pointer' onClick={() => navigate('/profile')} /> */}
                <CgProfile className='cursor-pointer mr-5' onClick={() => setDropDownVisible((prev) => !prev)} />
                {dropDownVisible && (<DropDown logout={logout} navigate={navigate} />)}
            </div>) : (
            <div className='flex gap-3'>
                <span className='p-2 px-4 hover:scale-105 duration-300 cursor-pointer bg-[#002d74] text-white rounded-xl' onClick={() => navigate('/login')}>Login</span>
                <span className='p-2 px-4 hover:scale-105 duration-300 cursor-pointer bg-white border-2 border-[#002d74] text-[#002d74] rounded-xl' onClick={() => navigate('/register')}>SignUp</span>
            </div>) }
            
        </nav>
    )
}
export default NavBar