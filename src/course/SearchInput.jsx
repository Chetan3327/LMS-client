import React from 'react'
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const SearchInput = ({setSearch}) => {
    const navigate = useNavigate()
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            navigate('/courses')
        }
    }
    return (
        <div className='flex bg-[#f8f8f8] rounded-xl p-2 items-center gap-3'>
            <CiSearch />
            <input onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setSearch(e.target.value)} className='outline-none bg-[#f8f8f8]' type="text" placeholder='Search for Courses' />
        </div>
    )
}

export default SearchInput