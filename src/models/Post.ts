export interface Post {
	id: string;
	title: string;
	muscle: string;
	description: string;
	images: string;
}

export interface PostResponse {
	_id: string;
	title: string;
	muscle: string;
	description: string;
	images: string;
}

export interface PostNew {
	title: string;
	muscle: string;
	description: string;
	images: string;
}
