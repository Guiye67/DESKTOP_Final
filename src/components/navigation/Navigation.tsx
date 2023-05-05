import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.css';

export const Navigation = () => {
	return (
		<>
			<div className="sidebar">
				<h2>Navigation</h2>
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
						<li>Suggestions</li>
					</NavLink>
					<hr />
					<NavLink to="/diets">
						<li>Diets</li>
					</NavLink>
				</ul>
			</div>
		</>
	);
};
