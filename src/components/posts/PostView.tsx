import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	Title,
	Text,
	Button,
} from '@tremor/react';
import { Post } from '../../models/Post';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { CustomTextArea } from '../custom/CustomTextArea';

interface Props {
	setToUpdate: (value: Post | null) => void;
	setToView: (value: Post | null) => void;
	post: Post;
}

export const PostView: React.FC<Props> = ({
	setToUpdate,
	setToView,
	post,
}: Props) => {
	return (
		<>
			<div className="view-nav-buttons">
				<Button onClick={() => setToView(null)} icon={ArrowLongLeftIcon}>
					Back
				</Button>

				<Button onClick={() => setToUpdate(post)}>
					<i className="bi bi-pencil-square"></i>Edit
				</Button>
			</div>
			<div className="view-card">
				<Title>Post ID: {post.id}</Title>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={2}>
								<img
									src={`http://localhost:8080/posts/img/${post.images}`}
									alt="Post image"
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Title>Title:</Title>
								<Text>{post.title}</Text>
							</TableCell>
							<TableCell>
								<Title>Muscle:</Title>
								<Text>{post.muscle}</Text>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>
								<Title>Description: </Title>
								<CustomTextArea
									value={post.description}
									onChange={() => {}}
									placeholder="Description..."
									disabled={true}
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</>
	);
};
