
const UserIcon = ({ name, className }: { name: string, className: string }) => {
    return (
        <div>
            <div className={`flex items-center justify-center text-white font-medium rounded-full bg-blue-500 ${className}`}>
                {name?.split('')[0]}
            </div>
        </div>
    )
}

export default UserIcon