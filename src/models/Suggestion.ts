export interface Suggestion {
	id: string;
	title: string;
	client: string;
	description: string;
	resolved: boolean;
}

export interface SuggestionResponse {
	_id: string;
	title: string;
	client: string;
	description: string;
	resolved: boolean;
}

export interface SuggestionNew {
	title: string;
	client: string;
	description: string;
}
