import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
      comments: {
        include: {
          author: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!post) notFound()
  return post
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-2">By {post.author.name || 'Anonymous'}</p>
        <div className="prose max-w-none">
          {post.content}
        </div>
      </article>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <CommentForm postId={post.id} />
        <CommentList comments={post.comments} />
      </div>
    </div>
  )
}