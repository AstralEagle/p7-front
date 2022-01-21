import * as React from "react"
import { Routes, Route } from "react-router-dom"
import Login from './Form/Login'
import Signup from './Form/Signup'
import Post from './Form/Post'
import Messages from './Post/Messages'
import Banner from './Banner/Banner'
import Test from './Test/Test'

export default function App() {
  return (
    <div>
      <Banner />
      <Routes>
        <Route path="/log"  element={<Login />} />
        <Route path="/sign" element={<Signup />} />
        <Route path="/test" element={<Test />} />
        <Route path="/post" element={<Post />} />
        <Route path="/message" element={<Messages />} />
    </Routes>
    </div>
  )
}
