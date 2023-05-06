import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './styles/App.css';
import { Navigation } from './components/navigation/Navigation';
import ClientsPage from './pages/clients/ClientsPage';
import ClassesPage from './pages/classes/ClassesPage';
import PostsPage from './pages/posts/PostsPage';
import SuggestionsPage from './pages/suggestions/SuggestionsPage';
import DietsPage from './pages/diets/DietsPage';
import LoginPage from './pages/login/LoginPage';

function App() {
	return (
		<div className="wrapper">
			<Router>
				{window.location.pathname != '/' && <Navigation />}
				<div className="content">
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/clients" element={<ClientsPage />} />
						<Route path="/classes" element={<ClassesPage />} />
						<Route path="/posts" element={<PostsPage />} />
						<Route path="/suggestions" element={<SuggestionsPage />} />
						<Route path="/diets" element={<DietsPage />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
