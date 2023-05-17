export interface Diet {
	id: string;
	client: string;
	age: string;
	gender: string;
	weight: string;
	height: string;
	objective: string;
	allergens: string;
	resolved: boolean;
}

export interface DietResponse {
	_id: string;
	client: string;
	age: string;
	gender: string;
	weight: string;
	height: string;
	objective: string;
	allergens: string;
	resolved: boolean;
}

export interface DietNew {
	client: string;
	age: string;
	gender: string;
	weight: string;
	height: string;
	objective: string;
	allergens: string;
}
