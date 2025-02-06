import { Bot } from "lucide-react"
import parse from "html-react-parser";

const results = "Comfort is a popular digital music, podcast, and video streaming service that gives users access to millions of songs and other content from artists all over the world. Here are some key features and aspects of Spotify:\n\n1. **Music Streaming**: Spotify allows users to stream music online and listen to songs on-demand. It offers a vast library of songs across various genres, artists, and albums.\n\n2. **Playlists**: Users can create and share their own playlists, or listen to curated playlists made by Spotify or other users. Spotify also offers personalized playlists like \"Discover Weekly\" and \"Release Radar.\"\n\n3. **Podcasts**: In addition to music, Spotify hosts a large collection of podcasts covering various topics.\n\n4. **Free and Premium Plans**: Spotify offers a free, ad-supported version, as well as a premium subscription service that provides ad-free listening, offline downloads, and higher audio quality.\n\n5. **Social Features**: Users can follow friends, artists, and influencers to see what they're listening to. They can also share music on social media platforms.\n\n6. **Multi-Platform Support**: Spotify is available on various devices, including smartphones, tablets, computers, smart speakers, and even some cars and gaming consoles.\n\n7. **Spotify Connect**: This feature allows users to seamlessly switch the playback of music between different devices.\n\nSpotify was launched in 2008 and has since become one of the largest music streaming services globally."
const ChatBotPage = () => {
  return (
    <div className="min-h-screen bg-zinc-900/90 rounded-md text-white font-bold p-5 " >
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
        <div className="chat-bubble">What is Comfort?</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full  ">
              <Bot className="size-10" />
          </div>
        </div>
        <div className="chat-header mb-1 ml-2">
          Chat Bot
        </div>
        <div className="chat-bubble">
          {parse(results)}
      </div>
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
