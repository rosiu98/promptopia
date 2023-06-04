import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (request , { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.find({ $or: [
            { "prompt": new RegExp('.*' + params.id + '.*') },
            { "tag": new RegExp('.*' + params.id + '.*') }
        ] }).populate('creator')

        if(!prompt) return new Response('Search not found', { status: 404 })


        return new Response(JSON.stringify(prompt) , {status: 200})

    } catch (error) {
        return new Response('Failed to search all prompts', { status: 500})
        
    }
}