# Posts Page
## NextJS and sqliteDB

## Features
1. Shows latest posts in the home page
2. Feed page show all the posts 
3. Add new posts from 'New Post' page

## NextJS concepts used
- Server actions using `form`, `useFormState` (now useActionState) hook and `bind` method
- Storing data in database (sqlite)
- `useFormStatus` hook for adding loading status while submitting form
- `useFormState` (now useActionState) hook used for form validation and error handling
- Using `Cloudinary` for storing images to cloud platform
- Performing optimistic UI updates using `useOptimistic` hook for instant UI update 
- Using `revalidatePath('path_name')` for re-rendering the required page avoiding nextJS caching