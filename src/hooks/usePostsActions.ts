import { Post, PostNew } from '../models/Post';
import {
	CreatePost,
	DeletePost,
	GetAllPosts,
	UpdatePost,
	UploadImage,
} from '../services/PostCalls';
import { deletePost, setPosts } from '../store/posts/slice';
import { useAppDispatch, useAppSelector } from './store';

export const usePostsActions = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector((state) => state.login.token);

	const getPosts = async (): Promise<string> => {
		const posts: Post[] = await GetAllPosts(token);

		if (posts[0].id == '-1') return posts[0].title;

		dispatch(setPosts(posts));
		return 'ok';
	};

	const createNewPost = async (newPost: PostNew): Promise<string> => {
		const result = await CreatePost(newPost, token);

		if (result.split('-')[0] == 'ok') void getPosts();

		return result;
	};

	const uploadImage = async (image: File, id: string): Promise<string> => {
		const result = await UploadImage(image, id, token);

		if (result == 'ok') void getPosts();

		return result;
	};

	const updatePost = async (updatedPost: Post): Promise<string> => {
		const result = await UpdatePost(updatedPost, token);

		if (result == 'ok') void getPosts();

		return result;
	};

	const deletePostById = async (id: string): Promise<void> => {
		const result = await DeletePost(id, token);

		if (result == 'ok') dispatch(deletePost(id));
	};

	return { getPosts, createNewPost, updatePost, deletePostById, uploadImage };
};
