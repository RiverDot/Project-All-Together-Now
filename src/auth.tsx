import { FaDiscord } from "react-icons/fa";
import { supabase } from "./supabaseClient";

export function AuthMenu() {

    async function signinWithDiscord() {
        let { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord'
        })
        console.log(data)
    }

    async function logout() {
        let { error } = await supabase.auth.signOut()
    }

    return (
        <>
            <div class={"text-center inline-flex items-center"}>
                <button onClick={signinWithDiscord} type="button" class={"bg-[#5865F2]"}>
                    <FaDiscord class="w-5 h-5 mr-2 -ml-1" />
                    Sign in with Discord
                </button>
                <button onClick={logout} type="button" class={"bg-red-600"}>
                    Logout
                </button>
            </div>
        </>
    )
}