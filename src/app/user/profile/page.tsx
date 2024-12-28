"use client"

import EditAvatar from "@/components/userProfile/editAvatar"
import userGuard from "@/hoc/UserGuard"

function Profile(){
    return (
        <div>
            <EditAvatar />
        </div>
    )
}

export default userGuard(Profile)