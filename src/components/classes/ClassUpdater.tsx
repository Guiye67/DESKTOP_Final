import { Alert } from '@mui/material';
import { useClassesActions } from '../../hooks/useClassesActions';
import { Class } from '../../models/Class';
import { useState } from 'react';
import {
	MultiSelectBox,
	MultiSelectBoxItem,
	SelectBox,
	SelectBoxItem,
	TableCell,
} from '@tremor/react';
import { HOURS, MINS } from '../../utils/constants/constants';

interface Props {
	item: Class;
	setUpdating: (value: string) => void;
}

export const ClassUpdater: React.FC<Props> = ({ item, setUpdating }: Props) => {
	const { updateClass } = useClassesActions();
	const [name, setName] = useState(item.name);
	const [days, setDays] = useState(item.days);
	const [duration, setDuration] = useState(item.duration);
	const [result, setResult] = useState('ok');
	const [hour, setHour] = useState(item.hour.split(':')[0]);
	const [min, setMin] = useState(item.hour.split(':')[1]);

	const handleSubmit = () => {
		const update = async (updatedClass: Class) => {
			const res = await updateClass(updatedClass);

			if (res == 'ok') setUpdating('');

			setResult(res);

			setTimeout(() => {
				setResult('ok');
			}, 2000);
		};

		const time = `${hour}:${min}`;

		const updatedClass: Class = {
			id: item.id,
			name,
			days,
			hour: time,
			duration,
			signedUp: item.signedUp,
		};

		void update(updatedClass);
	};

	return (
		<>
			{result != 'ok' ? (
				<Alert severity="error">Error: {result}</Alert>
			) : (
				<>
					<TableCell>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							size={1}
						/>
					</TableCell>
					<TableCell>
						<MultiSelectBox value={[...days]} onValueChange={setDays}>
							<MultiSelectBoxItem value="Mon" text="Monday" />
							<MultiSelectBoxItem value="Tue" text="Tuesday" />
							<MultiSelectBoxItem value="Wed" text="Wednesday" />
							<MultiSelectBoxItem value="Thu" text="Thursday" />
							<MultiSelectBoxItem value="Fri" text="Friday" />
						</MultiSelectBox>
					</TableCell>
					<TableCell className="select-box-cell">
						<SelectBox
							value={hour}
							onValueChange={setHour}
							className="select-box"
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
					</TableCell>
					<TableCell>
						<input
							type="text"
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
							size={1}
						/>
					</TableCell>
					<TableCell>{item.signedUp.length}</TableCell>
					<TableCell className="text-right">
						<i className="bi bi-check2" onClick={() => handleSubmit()}></i>
						<i className="bi bi-x" onClick={() => setUpdating('')}></i>
					</TableCell>
				</>
			)}
		</>
	);
};
