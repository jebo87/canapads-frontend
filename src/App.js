import React from 'react';

import { initStore } from './redux/store';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
const store = initStore();
function App() {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
}

export default App;
