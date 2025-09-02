import * as React from 'react';
import './App.css';
import { TVChartContainer } from './components/TVChartContainer/index';
import { version } from './libraries/charting_library';

const App = () => {
	return (
		<div className={ 'App' }>
			<header className={ 'App-header' }>
				<h1 className={ 'App-title' }>
					Laika Chart
				</h1>
			</header>
			<TVChartContainer />
		</div>
	);
};

export default App;
