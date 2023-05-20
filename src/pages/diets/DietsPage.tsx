import { Button } from '@tremor/react';
import '../../styles/DietsPage.css';

export default function DietsPage() {
	return (
		<div className="diets-page">
			<div className="title">
				<h1>Diets</h1>
				<Button>Create New</Button>
			</div>
		</div>
	);
}
