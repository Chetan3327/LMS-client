import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const AccessDenied = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const redirectToLogin = () => {
            navigate('/login');
        };
        redirectToLogin()
    }, [navigate])
    return(
        <div>
            AccessDenied. 
            Redirecting to Login Page.
        </div>
    )
}
export default AccessDenied