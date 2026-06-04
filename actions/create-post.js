'use server'

import { redirect } from "next/navigation"
import { storePost, updatePostLikeStatus } from "@/lib/posts"
import { uploadImage } from "@/lib/cloudinary"
import { revalidatePath } from "next/cache"

export async function createPost(prevState, formData) {
    const title = formData.get('title')
    const image = formData.get('image')
    const content = formData.get('content')

    // console.log(title, image, content);

    const errors = []

    if (!title || title.trim().length === 0) {
        errors.push('Title is required!')
    }
    if (!image || image.size === 0) {
        errors.push('Image is required')
    }
    if (!content || content.trim().length === 0) {
        errors.push('Content is required!')
    }

    if (errors.length > 0) {
        return { errors };
    }

    let imageUrl;
    try {
        imageUrl = await uploadImage(image);
    } catch (err) {
        throw new Error("Image upload failed! Try again.");
    }

    await storePost({
        imageUrl: imageUrl,
        title,
        content,
        userId: 1
    })

    redirect('/feed') // no need for revalidating page as app router handles revalidation (by server rendering + navigation)
}

export async function togglePostLikeStatus(postId, formData) {
    await updatePostLikeStatus(postId, 2);
    revalidatePath('/', 'layout');
}