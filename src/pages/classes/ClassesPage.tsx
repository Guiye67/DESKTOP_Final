import { useEffect, useState } from 'react';
import '../../styles/ClassesPage.css';
import { Button, Card } from '@tremor/react';
import { Alert } from '@mui/material';
import { useClassesActions } from '../../hooks/useClassesActions';
import { ClassesTable } from '../../components/classes/ClassesTable';

export default function ClassesPage() {
	const { getClasses } = useClassesActions();

	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('ok');
	const [creating, setCreating] = useState(false);
	const [toDelete, setToDelete] = useState(['']);

	useEffect(() => {
		const getAllClasses = async () => {
			setLoading(true);
			setResult(await getClasses());
			setLoading(false);
		};
		void getAllClasses();
	}, []);

	return (
		<div className="classes-page">
			<div className="title">
				<h1>Classes</h1>
				<button>Create New</button>
			</div>
			{/* creating && <CreateClientForm setCreating={setCreating} /> */}
			<Card>
				{loading && <p>Loading...</p>}
				{result != 'ok' && (
					<>
						<p style={{ color: 'red' }}>Error Fetching Data: ({result})</p>
					</>
				)}
				{!loading && <ClassesTable setToDelete={setToDelete} />}
			</Card>

			{/* toDelete[0] != '' && (
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
					You are about to delete <strong>{toDelete[1]}</strong> class
				</Alert>
			) */}
		</div>
	);
}
// onClick={() => setCreating(true)}
