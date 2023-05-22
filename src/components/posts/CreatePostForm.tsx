import { useState } from 'react';
import { usePostsActions } from '../../hooks/usePostsActions';
import { PostNew } from '../../models/Post';
import { Button, Card, TextInput } from '@tremor/react';
import { Alert } from '@mui/material';
import { CustomTextArea } from '../custom/CustomTextArea';

interface Props {
	setCreating: (value: boolean) => void;
}

export const CreatePostForm: React.FC<Props> = ({ setCreating }: Props) => {
	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(false);
	const { createNewPost, uploadImage } = usePostsActions();
	const [description, setDescription] = useState('');
	const [newImg, setNewImg] = useState<File | null>(null);

	const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		setNewImg(file);
	};

	const createPost = async (
		newPost: PostNew,
		form: EventTarget & HTMLFormElement
	) => {
		setLoading(true);

		const postResult = await createNewPost(newPost);

		if (postResult.split('-')[0] != 'ok') {
			setResult(postResult);

			setTimeout(() => {
				setResult('');
			}, 2000);
		} else if (newImg != null) {
			const uploadResult = await uploadImage(newImg, postResult.split('-')[1]);

			setLoading(false);

			if (uploadResult != 'ok') {
				setResult(uploadResult);

				setTimeout(() => {
					setResult('');
				}, 2000);
			} else {
				setResult('ok');
				form.reset();
				setTimeout(() => {
					setCreating(false);
				}, 1500);
			}
		}
	};

	const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);

		const title = formData.get('title') as string;
		const muscle = formData.get('muscle') as string;

		const newPost: PostNew = {
			title,
			muscle,
			description,
			images: 'default-post-image.png',
		};

		void createPost(newPost, form);
	};

	return (
		<>
			<Card
				className="create-card"
				style={{ borderRadius: '0 0.5rem 0.5rem 0.5rem' }}
			>
				<p id="create-title">New post form</p>
				<form onSubmit={handleCreate}>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="title">Title:</label>
								</td>
								<td>
									<TextInput name="title" type="text" />
								</td>
								<td>
									<label htmlFor="muscle">Muscle:</label>
								</td>
								<td>
									<TextInput name="muscle" type="text" />
								</td>
							</tr>
							<tr>
								<td colSpan={4}>
									<label>Description:</label>
								</td>
							</tr>
							<tr>
								<td colSpan={4}>
									<CustomTextArea
										value={description}
										onChange={(e) => setDescription(e.currentTarget.value)}
										placeholder="Description..."
									/>
								</td>
							</tr>
							<tr>
								<td>
									<label>Image:</label>
								</td>
								<td colSpan={3}>
									<input
										type="file"
										id="file"
										placeholder="Title..."
										accept=".png, .jpg"
										onChange={handleFileInput}
									/>
								</td>
							</tr>
							<tr>
								<td colSpan={4} className="btns-cell">
									<Button id="create-btn" type="submit" loading={loading}>
										Create
									</Button>
									<Button
										id="cancel-btn"
										type="reset"
										onClick={() => setCreating(false)}
									>
										Cancel
									</Button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				{!loading && result != '' && result != 'ok' && (
					<Alert severity="error" className="alert">
						Error: {result}
					</Alert>
				)}
				{!loading && result != '' && result == 'ok' && (
					<Alert severity="success" className="alert">
						Success: Post created
					</Alert>
				)}
			</Card>
		</>
	);
};
