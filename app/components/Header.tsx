"use client"

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'


const header = () => {

    const { data: session } = useSession()
    
    const handleSignout = async () => {
        try {
            await signOut()
        } catch (error) {
            
        }
    }

  return (
    <div>
        <button 
            onClick={handleSignout}
        >
            SignOut
        </button>
        {
            session ? (
                <div></div>
            )
            : (
                <div></div>
            )
        }
    </div>
  )
}

export default header