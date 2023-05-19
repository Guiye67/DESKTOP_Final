import {
	Button,
	Table,
	TableBody,
	TableRow,
	TextInput,
	Title,
} from '@tremor/react';
import { Post } from '../../models/Post';
import { useState } from 'react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { Alert, TableCell } from '@mui/material';
import { usePostsActions } from '../../hooks/usePostsActions';
import { CustomTextArea } from '../custom/CustomTextArea';

interface Props {
	post: Post;
	setToView: (value: Post | null) => void;
	setToUpdate: (value: Post | null) => void;
}

export const PostUpdater: React.FC<Props> = ({
	post,
	setToView,
	setToUpdate,
}: Props) => {
	const { updatePost, uploadImage } = usePostsActions();
	const [title, setTitle] = useState(post.title);
	const [muscle, setMuscle] = useState(post.muscle);
	const [description, setDescription] = useState(post.description);
	const [result, setResult] = useState('ok');
	const [newImg, setNewImg] = useState<File | null>(null);
	const [deleteImg, setDeleteImg] = useState(false);

	const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		setNewImg(file);
	};

	const handleSubmit = () => {
		const update = async (updatedPost: Post) => {
			const res = await updatePost(updatedPost);

			if (res != 'ok') {
				setResult(res);
			} else if (newImg != null && !deleteImg) {
				const res2 = await uploadImage(newImg, post.id);

				if (res2 != 'ok') setResult(res2);
			}

			setToUpdate(null);
			setToView(null);

			setTimeout(() => {
				setResult('ok');
			}, 2000);
		};

		const updatedPost: Post = {
			id: post.id,
			title,
			muscle,
			description,
			images: deleteImg ? 'default-post-image.png' : post.images,
		};

		void update(updatedPost);
	};

	return (
		<>
			<div className="posts-nav-buttons">
				<Button
					onClick={() => {
						setToUpdate(null);
						setToView(null);
					}}
					icon={ArrowLongLeftIcon}
				>
					Cancel
				</Button>

				<Button onClick={() => handleSubmit()}>Save</Button>
			</div>
			<div className="updater-form">
				{result != 'ok' ? (
					<Alert severity="error">Error: {result}</Alert>
				) : (
					<>
						<Title>Updating: {post.id}</Title>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>
										<Title>Title:</Title>
										<TextInput
											type="text"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											placeholder="Title..."
										/>
									</TableCell>
									<TableCell>
										<Title>Muscle:</Title>
										<TextInput
											type="text"
											value={muscle}
											onChange={(e) => setMuscle(e.target.value)}
											placeholder="Muscle..."
										/>
									</TableCell>
									<TableCell>
										<div id="file-title">
											<Title>Image:</Title>
											<div onClick={() => setDeleteImg(!deleteImg)}>
												<input
													type="checkbox"
													name="deleteImg"
													checked={deleteImg}
													readOnly={true}
												/>{' '}
												<label htmlFor="deleteImg">Delete image?</label>
											</div>
										</div>
										<input
											type="file"
											id="file"
											placeholder="Title..."
											accept=".png, .jpg"
											onChange={handleFileInput}
										/>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={3}>
										<Title>Description: </Title>
										<CustomTextArea
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											placeholder="Description..."
										/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</>
				)}
			</div>
		</>
	);
};
