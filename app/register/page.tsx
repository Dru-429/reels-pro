// "use client"

// import { useRouter } from 'next/navigation'
// import React, { useState } from 'react'

// const page = () => {

//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [confrimPassword, setConfrimPassword] = useState("")
//     const [error, setError] = useState("")

//     const router = useRouter()

//     const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         if(password !== confrimPassword){
//             setError("Your Password dose not match")
//         }

//         try {
//            const res =  await fetch("/api/auth/register", {
//              method: "POST",
//              headers: {"Content-Type": "application/json"},
//              body: JSON.stringify({email, password}),
//            })

//            console.log(res)

//            const data = await res.json()
//            if (!res.ok){
//             setError("Resister failed")
//            }

//            router.push("/login")
           
//         } catch (error) {
//             console.log(error)
//         }
//     }

//   return (
//     <div>
        
//     </div>
//   )
// }

// export default page