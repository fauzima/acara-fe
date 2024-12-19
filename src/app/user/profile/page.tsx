"use client"

import userGuard from "@/hoc/UserGuard"

function Profile(){
    return (
        <div className="bg-black">
            hi
        </div>
    )
}

export default userGuard(Profile)