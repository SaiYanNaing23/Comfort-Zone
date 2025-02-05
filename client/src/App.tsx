import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import AuthCallbackPage from "./pages/auth/AuthCallbackPage"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layout/MainLayout"
import ChatPage from "./pages/chat/ChatPage"
import AlbumPage from "./pages/album/AlbumPage"
import AdminPage from "./pages/admin/AdminPage"
import LyricsPage from "./layout/components/LyricsPage"
import ChatBotPage from "./pages/chat-bot/ChatBotPage"
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'}/> } />
        <Route path="/auth-callback" element={ <AuthCallbackPage/> } />
        <Route path="/admin" element={<AdminPage/>} />


        <Route element={<MainLayout/>} >
          <Route path="/" element={ <HomePage/> } />
          <Route path="/chat" element={ <ChatPage/> } />
          <Route path="/albums/:albumId" element={ <AlbumPage/> } />
          <Route path="/lyrics" element={<LyricsPage/>} />
          <Route path="/chat-bot" element={<ChatBotPage/>} />
        </Route>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
