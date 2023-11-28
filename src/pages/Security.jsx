import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import useAuthHeaders from '../hooks/useAuthHeaders'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

const Security = () => {
    const [visibleOldPassword, setVisibleOldPassword] = useState(false);
    const [visibleNewPassword, setVisibleNewPassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const [formData, setFormData] = useState(null)
    const [error, setError] = useState("")
    const headers = useAuthHeaders()

    const handleInput = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        if (!formData || !formData.oldPassword || !formData.password || !formData.confirmPassword) {
            setError("Required Fields missing!");
            return;
        }
        if(formData.confirmPassword !== formData.password){
            setError("New Password and Confirm Password didn't matched!")
            return;
        }

        axios.put(`${BACKEND_URL}/password/update-password`, formData, {headers}).then((response) => {
            console.log(response)
            toast.success("Password Updated Successfully !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }).catch((error) => {
            if (error.message === 'Network Error') {
                setError('Oops! Something went wrong.');
            } else {
                setError(error.response.data.error);
            }
        })
               
    }
    return(
            <div className="p-5 min-w-[450px]">
                <h3 className="my-2 mb-4 font-bold text-2xl text-primary">Reset Password</h3>
                <form className="flex flex-col gap-3">
                    <div className="relative">
                        <input className="outline-none rounded-xl border p-2 w-full" name="oldPassword" type={visibleOldPassword ? "text" : "password"} placeholder="Old Password" onChange={(e) => handleInput(e)} />
                        {visibleOldPassword ? 
                        (<FaRegEyeSlash className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisibleOldPassword(false)}/>) 
                        : (<FaRegEye className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisibleOldPassword(true)}/>)}
                    </div>
                    <div className="relative">
                        <input className="outline-none rounded-xl border p-2 w-full" name="password" type={visibleNewPassword ? "text" : "password"} placeholder="New Password" onChange={(e) => handleInput(e)} />
                        {visibleNewPassword ? 
                        (<FaRegEyeSlash className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisibleNewPassword(false)}/>) 
                        : (<FaRegEye className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisibleNewPassword(true)}/>)}
                    </div>
                    <div className="relative">
                        <input className="outline-none rounded-xl border p-2 w-full" name="confirmPassword" type={visibleConfirmPassword ? "text" : "password"} placeholder="Confirm Password" onChange={(e) => handleInput(e)} />
                        {visibleConfirmPassword ? 
                        (<FaRegEyeSlash className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisibleConfirmPassword(false)}/>) 
                        : (<FaRegEye className="text-gray-600 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={() => setVisibleConfirmPassword(true)}/>)}
                    </div>
                    <button onClick={(e) => handleSubmit(e)} className="mt-2 bg-primary px-4 p-2 text-white rounded-xl">Update Password</button>
                    {error && (<div className="text-center whitespace-normal border-red-400 p-2 border-solid border-2 rounded-xl bg-red-100">{error}</div>)}
                    <ToastContainer />
                </form>
            </div>
    )
}

export default Security