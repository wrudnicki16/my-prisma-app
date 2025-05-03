'use client'

import { useRef } from 'react'
import { createComment } from './actions'

export default function CommentForm({ postId }: { postId: number }) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        try {
          await createComment(formData)
          formRef.current?.reset()
        } catch (error) {
          console.error('Error posting comment:', error)
          // You could add error handling UI here
        }
      }}
      className="mb-8"
    >
      <input type="hidden" name="postId" value={postId} />
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Add a comment
        </label>
        <textarea
          id="content"
          name="content"
          rows={3}
          className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Post Comment
      </button>
    </form>
  )
} 