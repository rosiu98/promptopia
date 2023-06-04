"use client"

import {useState, useEffect} from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
        ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = async (e) => {

    setSearchText(e.target.value)

    if(e.target.value.length !== 0) { 
    const response = await fetch(`/api/prompt/search/${searchText}`)

    const data = await response.json()

    setPosts(data)
    } else {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

  }


  const handleTagClick = async (tag) => {

    const cleanTag = tag.toString().replace('#', '')

    setSearchText(cleanTag)

    const response = await fetch(`/api/prompt/search/${cleanTag}`)

    const data = await response.json()

    setPosts(data)

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      console.log(data)

      setPosts(data)
    }

    fetchPosts()


  }, []) 

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search for a tag or a username' value={searchText} onChange={handleSearchChange} required className='search_input peer' />
      </form>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed