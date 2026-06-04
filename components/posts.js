'use client'
import Post from './post-item';
import { togglePostLikeStatus } from '@/actions/create-post';
import { useOptimistic } from "react";

export default function Posts({ posts }) {
  // const [isPending, startTransition] = useTransition();

  const [optimisticPosts, setOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
    const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId)

    // return posts as before if no matching post found
    if (updatedPostIndex === -1) return prevPosts;

    // select the post to update
    // set the likes of that post
    // set the like status for that post
    const updatedPost = { ...prevPosts[updatedPostIndex] };
    updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts]; // change new posts to prevPosts but the selected one to updated post and return all posts
    newPosts[updatedPostIndex] = updatedPost;
    return newPosts;
  })

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const updatePost = async (postId) => {
      setOptimisticPosts(postId);
      await togglePostLikeStatus(postId)
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}