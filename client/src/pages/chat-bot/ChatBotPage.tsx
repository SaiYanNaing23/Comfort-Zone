import { Bot } from "lucide-react"

const ChatBotPage = () => {
  return (
    <div className="min-h-screen bg-zinc-900/90 rounded-md text-white font-bold p-5 " >
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full  ">
              <Bot className="size-10" />
          </div>
        </div>
        <div className="chat-header mb-1 ml-2">
          Chat Bot
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        {/* <div className="chat-header">
          Anakin
        </div> */}
        <div className="chat-bubble">I hate you!</div>
      </div>
    </div>
  )
}

export default ChatBotPage
