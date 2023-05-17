import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../models/Post';

const DEFAULT_STATE: Post[] = [];

export const postsSlice = createSlice({
	name: 'posts',
	initialState: DEFAULT_STATE,
	reducers: {
		setPosts: (_state, action: PayloadAction<Post[]>) => {
			return action.payload;
		},
		deletePost: (state, action: PayloadAction<string>) => {
			return state.filter((post) => post.id != action.payload);
		},
	},
});

export default postsSlice.reducer;

export const { setPosts, deletePost } = postsSlice.actions;
