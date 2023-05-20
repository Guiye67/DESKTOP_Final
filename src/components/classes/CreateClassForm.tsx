import {
	Button,
	Card,
	MultiSelectBox,
	MultiSelectBoxItem,
	SelectBox,
	SelectBoxItem,
	TextInput,
} from '@tremor/react';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { useClassesActions } from '../../hooks/useClassesActions';
import { ClassNew } from '../../models/Class';
import { HOURS, MINS } from '../../utils/constants/constants';

interface Props {
	setCreating: (value: boolean) => void;
}

export const CreateClassForm: React.FC<Props> = ({ setCreating }: Props) => {
	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(false);
	const [days, setDays] = useState<string[]>([]);
	const [hour, setHour] = useState<string>('9');
	const [min, setMin] = useState<string>('00');
	const { createNewClass } = useClassesActions();

	const createClass = async (
		newClass: ClassNew,
		form: EventTarget & HTMLFormElement
	) => {
		setLoading(true);

		const postResult = await createNewClass(newClass);

		setLoading(false);

		if (postResult != 'ok') {
			setResult(postResult);
		} else {
			setResult('ok');
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

		const name = formData.get('name') as string;
		const duration = formData.get('duration') as string;

		const time = `${hour}:${min}`;

		const newClass: ClassNew = {
			name,
			days,
			hour: time,
			duration,
			signedUp: [],
		};

		void createClass(newClass, form);
	};

	return (
		<Card
			className="create-card"
			style={{ borderRadius: '0 0.5rem 0.5rem 0.5rem' }}
		>
			<p id="create-title">New class form</p>
			<form onSubmit={handleCreate}>
				<table>
					<tbody>
						<tr>
							<td>
								<label>Name:</label>
							</td>
							<td>
								<TextInput name="name" type="text" />
							</td>
						</tr>
						<tr>
							<td>Days:</td>
							<td>
								<MultiSelectBox value={[...days]} onValueChange={setDays}>
									<MultiSelectBoxItem value="Mon" text="Monday" />
									<MultiSelectBoxItem value="Tue" text="Tuesday" />
									<MultiSelectBoxItem value="Wen" text="Wendesday" />
									<MultiSelectBoxItem value="Thu" text="Thursday" />
									<MultiSelectBoxItem value="Fri" text="Friday" />
								</MultiSelectBox>
							</td>
						</tr>
						<tr>
							<td>
								<label>Hour:</label>
							</td>
							<td>
								<SelectBox
									value={hour}
									onValueChange={setHour}
									style={{
										width: '80px',
										minWidth: '80px',
										display: 'inline-block',
									}}
									placeholder=""
								>
									{HOURS.map((h) => (
										<SelectBoxItem key={h} value={h} text={h} />
									))}
								</SelectBox>{' '}
								<strong>:</strong>{' '}
								<SelectBox
									value={min}
									onValueChange={setMin}
									style={{
										width: '80px',
										minWidth: '80px',
										display: 'inline-block',
									}}
									placeholder=""
								>
									{MINS.map((m) => (
										<SelectBoxItem key={m} value={m} text={m} />
									))}
								</SelectBox>
							</td>
						</tr>
						<tr>
							<td>
								<label>Duration:</label>
							</td>
							<td>
								<TextInput name="duration" type="text" placeholder="E.g. 1h" />
							</td>
						</tr>
						<tr>
							<td colSpan={2} className="btns-cell">
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
					Success: Class created
				</Alert>
			)}
		</Card>
	);
};
