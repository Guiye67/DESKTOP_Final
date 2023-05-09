import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './styles/App.css';
import { Navigation } from './components/navigation/Navigation';
import {
	ClientsPage,
	ClassesPage,
	PostsPage,
	SuggestionsPage,
	DietsPage,
	LoginPage,
	PageNotExists,
} from './pages/Pages';

// https://www.schemecolor.com/grey-and-purple-color-scheme.php

function App() {
	const LoginContainer = () => {
		return (
			<>
				<div className="login-content">
					<Routes>
						<Route path="/" element={<LoginPage />} />
					</Routes>
				</div>
			</>
		);
	};

	const DefaultContainer = () => {
		return (
			<>
				<Navigation />
				<div className="content">
					<Routes>
						<Route path="/clients" element={<ClientsPage />} />
						<Route path="/classes" element={<ClassesPage />} />
						<Route path="/posts" element={<PostsPage />} />
						<Route path="/suggestions" element={<SuggestionsPage />} />
						<Route path="/diets" element={<DietsPage />} />
						<Route path="*" element={<PageNotExists />} />
					</Routes>
				</div>
			</>
		);
	};

	return (
		<div className="wrapper">
			<Router>
				<Routes>
					<Route path="/" element={<LoginContainer />} />
					<Route path="*" element={<DefaultContainer />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
