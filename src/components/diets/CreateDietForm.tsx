import { useState, useEffect } from 'react';
import { useDietsActions } from '../../hooks/useDietsActions';
import { useAppSelector } from '../../hooks/store';
import { useClientsActions } from '../../hooks/useClientsActions';
import { DietNew } from '../../models/Diet';
import {
	Card,
	SelectBox,
	SelectBoxItem,
	Button,
	TextInput,
} from '@tremor/react';
import { Alert } from '@mui/material';
import { CustomNumberInput } from '../custom/CustomNumberInput';

interface Props {
	setCreating: (value: boolean) => void;
}

export const CreateDietForm: React.FC<Props> = ({ setCreating }: Props) => {
	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(false);
	const { createNewDiet } = useDietsActions();
	const clients = useAppSelector((state) => state.clients);
	const [loadingClients, setloadingClients] = useState(false);
	const { getClients } = useClientsActions();
	const [dietClient, setDietClient] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');
	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');

	useEffect(() => {
		const getAllClients = async () => {
			setloadingClients(true);
			await getClients();
			setloadingClients(false);
		};

		if (clients.length == 0) void getAllClients();
	}, []);

	const createDiet = async (
		newDiet: DietNew,
		form: EventTarget & HTMLFormElement
	) => {
		setLoading(true);

		const postResult = await createNewDiet(newDiet);

		setLoading(false);

		if (postResult != 'ok') {
			setResult(postResult);
		} else {
			setResult('ok');
			setDietClient('');
			setAge('');
			setGender('');
			setWeight('');
			setHeight('');
			form.reset();
			setTimeout(() => {
				setCreating(false);
			}, 1500);
		}
	};

	const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);

		const objective = formData.get('objective') as string;
		const allergens = formData.get('allergens') as string;

		const newDiet: DietNew = {
			client: dietClient,
			age,
			gender,
			weight,
			height,
			objective,
			allergens,
		};

		void createDiet(newDiet, form);
	};

	return (
		<>
			<Card
				className="create-card"
				style={{ borderRadius: '0 0.5rem 0.5rem 0.5rem' }}
			>
				<p id="create-title">New diet form</p>
				<form onSubmit={handleCreate}>
					<table>
						<tbody>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td colSpan={2}>
									{loadingClients ? (
										<p>Loading...</p>
									) : (
										<>
											<label>Client:</label>{' '}
											<SelectBox
												value={dietClient}
												onValueChange={(value) => setDietClient(value)}
												className="select-client"
											>
												{clients.map((item, index) => (
													<SelectBoxItem
														value={item.email}
														text={item.email}
														key={index}
													/>
												))}
											</SelectBox>
										</>
									)}
								</td>
								<td colSpan={2}>
									<label>Age:</label> <br />
									<SelectBox
										value={age}
										onValueChange={(value) => setAge(value)}
										className="select-client"
									>
										<SelectBoxItem value="10-19" text="10-19" />
										<SelectBoxItem value="20-29" text="20-29" />
										<SelectBoxItem value="30-39" text="30-39" />
										<SelectBoxItem value="40-49" text="40-49" />
										<SelectBoxItem value="50-59" text="50-59" />
										<SelectBoxItem value="60-69" text="60-69" />
										<SelectBoxItem value="70-79" text="70-79" />
										<SelectBoxItem value="80-89" text="80-89" />
										<SelectBoxItem value="90-99" text="90-99" />
									</SelectBox>
								</td>
								<td colSpan={2}>
									<label>Gender:</label>{' '}
									<SelectBox
										value={gender}
										onValueChange={(value) => setGender(value)}
										className="select-client"
									>
										<SelectBoxItem value="Male" text="Male" />
										<SelectBoxItem value="Female" text="Female" />
										<SelectBoxItem value="Other" text="Other" />
									</SelectBox>
								</td>
							</tr>
							<tr>
								<td colSpan={3}>
									<label>Weight (kg):</label>
									<CustomNumberInput
										value={weight}
										onChange={(e) => {
											const value = e.currentTarget.value;
											if (parseInt(value) >= 0)
												setWeight(e.currentTarget.value);
										}}
										placeholder="Weight"
									/>
								</td>
								<td colSpan={3}>
									<label>Height (cm):</label>
									<CustomNumberInput
										value={height}
										onChange={(e) => {
											const value = e.currentTarget.value;
											if (parseInt(value) >= 0)
												setHeight(e.currentTarget.value);
										}}
										placeholder="Height"
									/>
								</td>
							</tr>
							<tr>
								<td colSpan={3}>
									<label>Objective:</label>
									<TextInput name="objective" />
								</td>
								<td colSpan={3}>
									<label>Allergens:</label>
									<TextInput name="allergens" />
								</td>
							</tr>
							<tr>
								<td colSpan={6} className="btns-cell">
									<Button id="create-btn" type="submit" loading={loading}>
										Create
									</Button>
									<Button
										id="cancel-btn"
										type="reset"
										onClick={() => setCreating(false)}
									>
										Cancel
									</Button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				{!loading && result != '' && result != 'ok' && (
					<Alert severity="error" className="alert">
						Error: {result}
					</Alert>
				)}
				{!loading && result != '' && result == 'ok' && (
					<Alert severity="success" className="alert">
						Success: Client created
					</Alert>
				)}
			</Card>
		</>
	);
};
