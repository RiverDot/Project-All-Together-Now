import { useEffect, useState } from 'preact/hooks'
// @ts-ignore
import { route } from 'preact-router';
import './app.css'

import { supabase } from "./supabaseClient";


export function App() {
  const [User, setUser] = useState({})



  async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user)
      console.log(user)
    }
    else {
      route('/auth')
    }
  }

  useEffect(() => {
    getUser()
    console.log(User)
  }, [])



  return (
    <>
      <div class={"text-center inline-flex items-center flex-col gap-3"}>
        <div>
          <h1 class={"text-white text-3xl font-bold"}>Add Available Times</h1>
        </div>

        <div class={"text-center inline-flex items-center"}>
          <button onClick={() => {route('/date')}} type="button" class={"bg-green-500"}>
            Non Repeating
          </button>
          <button onClick={() => {route('/time')}} type="button" class={"bg-teal-400"}>
            Repeating
          </button>
        </div>

        <div class={"text-center inline-flex items-center"}>
          <button onClick={() => {route('/edit-time')}} type="button" class={"bg-teal-400"}>
            Edit Repeating
          </button>
        </div>
      </div>
    </>
  )
}
