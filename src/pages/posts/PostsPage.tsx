import '../../styles/PostsPage.css';
import { Button, Card } from '@tremor/react';
import { usePostsActions } from '../../hooks/usePostsActions';
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';

export default function PostsPage() {
	const { deletePostById, getPosts } = usePostsActions();

	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('ok');
	const [creating, setCreating] = useState(false);
	const [toDelete, setToDelete] = useState(['']);

	useEffect(() => {
		const getAllPosts = async () => {
			setLoading(true);
			setResult(await getPosts());
			setLoading(false);
		};
		void getAllPosts();
	}, []);

	const handleDelete = () => {
		void deletePostById(toDelete[0]);
		setToDelete(['']);
	};

	return (
		<div className="posts-page">
			<div className="title">
				<h1>Posts</h1>
				<button onClick={() => setCreating(true)}>Create New</button>
			</div>
			{/* creating && <CreateClientForm setCreating={setCreating} /> */}
			<Card style={{ borderRadius: '0 0.5rem 0.5rem 0.5rem' }}>
				{loading && <p>Loading...</p>}
				{result != 'ok' && (
					<>
						<p style={{ color: 'red' }}>Error Fetching Data: ({result})</p>
					</>
				)}
				{/* !loading && <ClientsTable setToDelete={setToDelete} /> */}
			</Card>

			{toDelete[0] != '' && (
				<Alert
					id="confirmation-alert"
					severity="warning"
					action={
						<>
							<Button
								color="green"
								size="xs"
								style={{ marginRight: '5px' }}
								onClick={handleDelete}
							>
								Delete
							</Button>
							<Button color="red" size="xs" onClick={() => setToDelete([''])}>
								Cancel
							</Button>
						</>
					}
				>
					You are about to delete client with email:{' '}
					<strong>{toDelete[1]}</strong>
				</Alert>
			)}
		</div>
	);
}
