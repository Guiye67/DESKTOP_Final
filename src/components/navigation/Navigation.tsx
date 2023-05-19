import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.css';
import { UserBox } from './UserBox';
import { useEffect } from 'react';
import { useSuggestionsActions } from '../../hooks/useSuggestionsActions';
import { useAppSelector } from '../../hooks/store';
import { Badge } from '@tremor/react';

export const Navigation = () => {
	const { getSuggestions } = useSuggestionsActions();
	const suggestions = useAppSelector((state) => state.suggestions);

	useEffect(() => {
		const getAllSuggestions = async () => {
			await getSuggestions();
		};
		void getAllSuggestions();
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
						<li>Diets</li>
					</NavLink>
				</ul>
				<div className="user-box">
					<UserBox />
				</div>
			</div>
		</>
	);
};
