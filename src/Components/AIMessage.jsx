import GptLogo from '../assets/gpt-logo.png';

const AIMessage = ({ solution, error }) => {
    return (
        <div className="relative max-w-3/4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#161616] p-1 flex items-center justify-center">
                <img src={GptLogo} alt="TheoGPT" className="w-8 h-8 absolute" />
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-gray-400 text-sm">theoGPT</span>
                <p className={`text-white text-md bg-[#2A2A2A] rounded-[15px] rounded-tl-none py-3 px-4 ml-0 ${error ? 'text-red-400' : ''}`}>
                    {solution}
                </p>
            </div>
        </div>
    )
}

export default AIMessage;
