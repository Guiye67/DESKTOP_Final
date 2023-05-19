import { CallError } from '../models/CallError';
import {
	Post,
	PostCreateResponse,
	PostNew,
	PostResponse,
} from '../models/Post';

export const GetAllPosts = async (token: string) => {
	const requestOptions: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};

	return fetch('http://localhost:8080/posts/', requestOptions).then(
		async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				return [
					{
						id: '-1',
						title: err.message,
						muscle: '',
						description: '',
						images: '',
					},
				] as Post[];
			}

			const data: PostResponse[] = (await response.json()) as PostResponse[];
			const output: Post[] = [];
			data.forEach((post) => {
				output.push({
					id: post._id,
					title: post.title,
					muscle: post.muscle,
					description: post.description,
					images: post.images,
				} as Post);
			});
			return output;
		}
	);
};

export const CreatePost = (newPost: PostNew, token: string) => {
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
		body: JSON.stringify(newPost),
	};

	return fetch('http://localhost:8080/posts/', requestOptions).then(
		async (response) => {
			if (response.status != 201) {
				const err: CallError = (await response.json()) as CallError;
				return err.message;
			}

			const data: PostCreateResponse =
				(await response.json()) as PostCreateResponse;
			return `ok-${data.newPost._id}`;
		}
	);
};

export const UploadImage = (image: File, id: string, token: string) => {
	const data = new FormData();
	data.append('image', image);

	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			Authorization: `Bearer: ${token}`,
		},
		body: data,
	};

	return fetch(`http://localhost:8080/posts/img/${id}`, requestOptions).then(
		async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				return err.message;
			}

			return 'ok';
		}
	);
};

export const UpdatePost = (updatedPost: Post, token: string) => {
	const requestOptions: RequestInit = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
		body: JSON.stringify(updatedPost),
	};

	return fetch(
		`http://localhost:8080/posts/${updatedPost.id}`,
		requestOptions
	).then(async (response) => {
		if (response.status > 299) {
			const err: CallError = (await response.json()) as CallError;
			return err.message;
		}

		return 'ok';
	});
};

export const DeletePost = (id: string, token: string) => {
	const requestOptions: RequestInit = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};
	return fetch(`http://localhost:8080/posts/${id}`, requestOptions).then(
		async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				return err.message;
			}

			return 'ok';
		}
	);
};
