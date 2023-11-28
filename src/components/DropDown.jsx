const DropDown = ({logout, navigate}) => {
    return(
        <div className="bg-white p-3 px-5 rounded-xl flex flex-col gap-1 shadow-md absolute top-20 right-2">
            <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/profile')}>Profile</span>
            <span className="cursor-pointer hover:text-primary" onClick={() => logout()}>Logout</span>
        </div>
    )
}

export default DropDown