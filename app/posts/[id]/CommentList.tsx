import { Comment, User } from '../../generated/prisma'

type CommentWithAuthor = Comment & {
  author: User
}

export default function CommentList({ comments }: { comments: CommentWithAuthor[] }) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
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
            </div>
          </div>
        </div>
      ))}

      {comments.length === 0 && (
        <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
      )}
    </div>
  )
} 