'use client'

import { Comment, User } from '../../generated/prisma'
import { deleteComment } from './actions'
import { useState } from 'react'
import DeleteCommentModal from './DeleteCommentModal'

type CommentWithAuthor = Comment & {
  author: User
}

type ErrorState = {
  message: string;
  commentId: number | null;
}

export default function CommentList({ comments }: { comments: CommentWithAuthor[] }) {
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null)
  const [error, setError] = useState<ErrorState | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const handleDeleteClick = (commentId: number) => {
    setCommentToDelete(commentId)
    setError(null)
  }

  const handleCloseModal = () => {
    setCommentToDelete(null)
  }

  const handleDelete = async (commentId: number, postId: number) => {
    try {
      setIsDeleting(commentId)
      await deleteComment(commentId, postId)
      setCommentToDelete(null)
      setIsDeleting(null)
    } catch (error) {
      console.error('Error deleting comment:', error)
      setError({
        message: error instanceof Error ? error.message : 'Failed to delete comment',
        commentId
      })
      setIsDeleting(null)
    }
  }

  const commentBeingDeleted = comments.find(c => c.id === commentToDelete)

  return (
    <>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {comment.author.name || 'Anonymous'}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-gray-700">{comment.content}</p>
                {error?.commentId === comment.id && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </div>
              <button
                onClick={() => handleDeleteClick(comment.id)}
                className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                title="Delete comment"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
        )}
      </div>

      {commentBeingDeleted && (
        <DeleteCommentModal
          isOpen={true}
          onClose={handleCloseModal}
          onConfirm={() => handleDelete(commentBeingDeleted.id, commentBeingDeleted.postId)}
          isDeleting={isDeleting === commentBeingDeleted.id}
        />
      )}
    </>
  )
} 