import { useEffect, useLayoutEffect, useState } from "react"
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteProfile from "../components/DeleteProfile";
import ProfileUpload from "../components/ProfileUpload";
import AccountInfo from "../components/AccountInfo";
import Security from './Security'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
const Profile = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [cookie, setCookie, removeCookie] = useCookies(['jwt-access-token'])
    if(!cookie['jwt-access-token']){
        navigate('/login')
    }

    const [profile, setProfile] = useState(null)
    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/`, {headers}).then((response) => {
            console.log(response)
            setProfile(response.data)
        })
    }, [])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': cookie['jwt-access-token']
    }

    const deleteAccount = () => {
        axios.delete(`${BACKEND_URL}/user/`, {headers}).then((response) => {
            removeCookie('jwt-access-token')
            navigate('/register')
        }).catch((error) => {
            if (error.message === 'Network Error') {
                setError('Oops! Something went wrong.');
            } else {
                setError(error.response.data.error);
            }
        })
    }

    const uploadImageUrl = (imageUrl) => {
        axios.put(`${BACKEND_URL}/password/upload-image`, {imageUrl: imageUrl} ,{headers}).then((response) => {
            toast.success("Image Uploaded Successfully !", {
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

    const updateUser = (profile) => {
        console.log(profile)
        axios.put(`${BACKEND_URL}/user`, profile, {headers}).then((response) => {
            console.log(response)
            if(response.status === 201){
                toast.success("Profile Updated Successfully !", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }else if(response.status === 200){
                toast.success("test Successfull !", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }).catch((error) => {
            if (error.message === 'Network Error') {
                setError('Oops! Something went wrong.');
            } else {
                setError(error.response.data.error);
            }
        })
    }

    const [section, setSection] = useState("accountInfo")
    const renderContent = () => {
        switch (section) {
          case 'accountInfo':
            return <AccountInfo initialInfo={profile} setSection={setSection} updateUser={updateUser} /> ;
          case 'deleteAccount':
            return <DeleteProfile userId={profile.username} deleteAccount={deleteAccount} />
          case 'profileChange':
            return <ProfileUpload uploadImageUrl={uploadImageUrl} />
          case 'resetPassword':
            return <Security />
          default:
            return null;
        }
    };
    
    return(
        <div className="bg-cyan-100 min-h-screen flex items-center justify-center">
            {profile ? 
            (<div className="bg-white shadow-lg flex gap-5">
                <div className="flex flex-col gap-2 pl-2 py-2">
                    <button className="px-2 py-1 rounded w-full hover:bg-primary hover:text-white" onClick={() => setSection("accountInfo")}>Account Info</button>
                    <button className="px-2 py-1 rounded w-full hover:bg-primary hover:text-white" onClick={() => setSection("deleteAccount")}>Delete Account</button>
                    <button className="px-2 py-1 rounded w-full hover:bg-primary hover:text-white" onClick={() => setSection("resetPassword")}>Password Reset</button>
                    <button className="px-2 py-1 rounded w-full hover:bg-primary hover:text-white" onClick={() => setSection("profileChange")}>Profile Change</button>
                </div>
                <div className="flex items-start pt-10 justify-center min-w-[500px] min-h-[500px]">
                    {renderContent()}
                </div>
            </div>):
            (<p>Loading...</p>)}
            <ToastContainer />
        </div>
    )
}
export default Profile