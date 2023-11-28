import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
    return (
        <div className='flex bg-[#f8f8f8] rounded-xl p-2 items-center gap-3'>
            <CiSearch />
            <input className='outline-none bg-[#f8f8f8]' type="text" placeholder='Search for Courses' />
        </div>
    )
}

export default SearchInput