"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "../custom/Navbar"

const AuthSessionChecker = ({children}) => {
  const { data: session } = useSession()
  if(session) {
    return( 
    <div>
      {/* Signed in as {session.user.email} */}
      <Navbar logBtnFunction={signOut} logBtnTxt={"Sign Out"}/>
      {children}
    </div>
  )}
  return( 
  <div className="bg-red-500">
    <Navbar logBtnFunction={signIn} logBtnTxt={"Sign In"}/>
  </div>
)}

export default AuthSessionChecker