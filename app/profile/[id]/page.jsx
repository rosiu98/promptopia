"use client"

import Profile from '@components/Profile'
import React, { useEffect, useState } from 'react'

const page = ({params}) => {

    const id = params.id

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${id}/posts`)

            const data = await response.json()

            console.log(data)

            setPosts(data)
        }

        fetchUser()
    }, [])



  return (
    <Profile name={posts[0]?.creator?.username} desc="Welcome to your personalized profile page" data={posts} />
  )
}

export default page