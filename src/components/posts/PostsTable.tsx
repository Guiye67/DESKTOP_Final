import { useState } from 'react';
import { useAppSelector } from '../../hooks/store';
import { Post } from '../../models/Post';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	TextInput,
} from '@tremor/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const getFilteredPosts = (filter: string, posts: Post[]) => {
	if (!filter) return posts;
	return posts.filter((post) =>
		post.title.toLowerCase().includes(filter.toLowerCase())
	);
};

interface Props {
	setToDelete: (value: string[]) => void;
	setToView: (value: Post | null) => void;
}

export const PostsTable: React.FC<Props> = ({
	setToDelete,
	setToView,
}: Props) => {
	const posts = useAppSelector((state) => state.posts);
	const [filter, setFilter] = useState('');

	const filteredPosts = getFilteredPosts(filter, posts);

	return (
		<>
			<TextInput
				icon={MagnifyingGlassIcon}
				placeholder="Search post..."
				onChange={(e) => setFilter(e.target.value)}
			/>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell></TableHeaderCell>
						<TableHeaderCell>Title</TableHeaderCell>
						<TableHeaderCell>Muscle</TableHeaderCell>
						<TableHeaderCell>Description</TableHeaderCell>
						<TableHeaderCell className="text-right"></TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{filteredPosts.map((post) => (
						<TableRow key={post.id}>
							<TableCell>
								<img
									src={`http://localhost:8080/posts/img/${post.images}`}
									alt="Post image"
									id="small-image"
								/>
							</TableCell>
							<TableCell>{post.title}</TableCell>
							<TableCell>{post.muscle}</TableCell>
							<TableCell className="w-full">
								{post.description.length > 80
									? `${post.description.slice(0, 80)}...`
									: post.description}
							</TableCell>
							<TableCell className="text-right">
								<i
									className="bi bi-zoom-in"
									onClick={() => {
										setToView(post);
									}}
								></i>
								<i
									className="bi bi-trash"
									onClick={() => setToDelete([post.id, post.title])}
								></i>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
