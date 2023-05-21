import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.css';
import { UserBox } from './UserBox';
import { useEffect } from 'react';
import { useSuggestionsActions } from '../../hooks/useSuggestionsActions';
import { useAppSelector } from '../../hooks/store';
import { Badge } from '@tremor/react';
import { useDietsActions } from '../../hooks/useDietsActions';

export const Navigation = () => {
	const { getSuggestions } = useSuggestionsActions();
	const { getDiets } = useDietsActions();
	const suggestions = useAppSelector((state) => state.suggestions);
	const diets = useAppSelector((state) => state.diets);
	let aux = 0;

	useEffect(() => {
		const getAllSuggestions = async () => {
			await getSuggestions();
		};

		const getAllDiets = async () => {
			await getDiets();
		};

		if (aux == 0) {
			void getAllSuggestions();
			void getAllDiets();
			aux++;
		}

		const interval = setInterval(() => {
			void getAllSuggestions();
			void getAllDiets();
		}, 180000);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<div className="sidebar">
				<img
					src="/gymyang_logo.png"
					alt="Gym&Yang Logo"
					style={{ width: '50px', height: '50px' }}
				/>
				<h1>Gym & Yang</h1>

				<ul>
					<NavLink to="/clients">
						<li>Clients</li>
					</NavLink>
					<hr />
					<NavLink to="/classes">
						<li>Classes</li>
					</NavLink>
					<hr />
					<NavLink to="/posts">
						<li>Posts</li>
					</NavLink>
					<hr />
					<NavLink to="/suggestions">
						<li>
							Suggestions{' '}
							{suggestions.filter((sugg) => !sugg.resolved).length > 0 && (
								<Badge>
									{suggestions.filter((sugg) => !sugg.resolved).length}
								</Badge>
							)}
						</li>
					</NavLink>
					<hr />
					<NavLink to="/diets">
						<li>
							Diets{' '}
							{diets.filter((diet) => !diet.resolved).length > 0 && (
								<Badge>{diets.filter((diet) => !diet.resolved).length}</Badge>
							)}
						</li>
					</NavLink>
				</ul>
				<div className="user-box">
					<UserBox />
				</div>
			</div>
		</>
	);
};
