import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/store';
import { useClientsActions } from '../../hooks/useClientsActions';
import {
	Button,
	SelectBox,
	SelectBoxItem,
	Table,
	TableBody,
	TableRow,
	TextInput,
	Title,
} from '@tremor/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { Alert, TableCell } from '@mui/material';
import { Diet } from '../../models/Diet';
import { useDietsActions } from '../../hooks/useDietsActions';
import { CustomNumberInput } from '../custom/CustomNumberInput';

interface Props {
	diet: Diet;
	setToView: (value: Diet | null) => void;
	setToUpdate: (value: Diet | null) => void;
}

export const DietUpdater: React.FC<Props> = ({
	diet,
	setToView,
	setToUpdate,
}: Props) => {
	const { updateDiet } = useDietsActions();
	const [dietClient, setDietClient] = useState(diet.client);
	const [age, setAge] = useState(diet.age);
	const [gender, setGender] = useState(diet.gender);
	const [weight, setWeight] = useState(diet.weight);
	const [height, setHeight] = useState(diet.height);
	const [objective, setObjective] = useState(diet.objective);
	const [allergens, setAllergens] = useState(diet.allergens);
	const [result, setResult] = useState('ok');
	const clients = useAppSelector((state) => state.clients);
	const [loadingClients, setloadingClients] = useState(false);
	const { getClients } = useClientsActions();

	useEffect(() => {
		const getAllClients = async () => {
			setloadingClients(true);
			await getClients();
			setloadingClients(false);
		};

		if (clients.length == 0) void getAllClients();
	}, []);

	const handleSubmit = () => {
		const update = async (updatedDiet: Diet) => {
			const res = await updateDiet(updatedDiet);

			setResult(res);

			setToUpdate(null);
			setToView(null);

			setTimeout(() => {
				setResult('ok');
			}, 2000);
		};

		const updatedDiet: Diet = {
			id: diet.id,
			client: dietClient,
			age,
			gender,
			weight,
			height,
			objective,
			allergens,
			resolved: diet.resolved,
		};

		void update(updatedDiet);
	};

	return (
		<>
			<div className="view-nav-buttons">
				<Button
					onClick={() => {
						setToUpdate(null);
						setToView(null);
					}}
					icon={ArrowLongLeftIcon}
				>
					Cancel
				</Button>

				<Button onClick={() => handleSubmit()}>Save</Button>
			</div>
			<div className="updater-form">
				{result != 'ok' ? (
					<Alert severity="error">Error: {result}</Alert>
				) : (
					<>
						<Title>Diet ID: {diet.id}</Title>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={2}>
										<Title>Client:</Title>
										{loadingClients ? (
											<p>Loading...</p>
										) : (
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
										)}
									</TableCell>
									<TableCell colSpan={2}>
										<Title>Age:</Title>
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
									</TableCell>
									<TableCell colSpan={2}>
										<Title>Gender:</Title>
										<SelectBox
											value={gender}
											onValueChange={(value) => setGender(value)}
											className="select-client"
										>
											<SelectBoxItem value="Male" text="Male" />
											<SelectBoxItem value="Female" text="Female" />
											<SelectBoxItem value="Other" text="Other" />
										</SelectBox>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={3}>
										<Title>Weight:</Title>
										<CustomNumberInput
											value={weight}
											onChange={(e) => {
												const value = e.currentTarget.value;
												if (parseInt(value) >= 0)
													setWeight(e.currentTarget.value);
											}}
											placeholder="Weight"
										/>
									</TableCell>
									<TableCell colSpan={3}>
										<Title>Height:</Title>
										<CustomNumberInput
											value={height}
											onChange={(e) => {
												const value = e.currentTarget.value;
												if (parseInt(value) >= 0)
													setHeight(e.currentTarget.value);
											}}
											placeholder="Height"
										/>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={3}>
										<Title>Objective:</Title>
										<TextInput
											type="text"
											defaultValue={objective}
											onChange={(e) => setObjective(e.currentTarget.value)}
										/>
									</TableCell>
									<TableCell colSpan={3}>
										<Title>Allergens:</Title>
										<TextInput
											type="text"
											defaultValue={allergens}
											onChange={(e) => setAllergens(e.currentTarget.value)}
										/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</>
				)}
			</div>
		</>
	);
};
