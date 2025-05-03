'use server'

import { PrismaClient } from '../../generated/prisma'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function createComment(formData: FormData) {
  const content = formData.get('content') as string
  const postId = parseInt(formData.get('postId') as string)

  if (!content || !postId) {
    throw new Error('Missing required fields')
  }

  // TODO: Get the actual user ID from the session
  const userId = 1 // Replace this with actual authenticated user ID

  try {
    await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        postId,
      },
    })

    // Revalidate the post page to show the new comment
    revalidatePath(`/posts/${postId}`)
  } catch (error) {
    console.error('Error creating comment:', error)
    throw new Error('Failed to create comment')
  }
} 