import UserIcon from '../assets/user-icon.svg'

const UserMessage = ({Question}) => {
    return( 
        <div className="max-w-3/4 flex items-start gap-4 self-end flex-row-reverse">
            <div className="w-10 h-10 rounded-full bg-transparent p-1 flex items-center justify-center">
                <img src={UserIcon} alt="User" className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2 items-end">
                <span className="text-gray-400 text-sm">You</span>
                <p className="text-black text-md bg-[#d9d9d9] rounded-[15px] rounded-tr-none py-2 px-4">
                    {Question}
                </p>
            </div>

        </div>
    )
}

export default UserMessage;
