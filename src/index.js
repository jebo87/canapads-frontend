import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@chakra-ui/core';
import customTheme from './components/themes/theme';
import * as serviceWorker from './serviceWorker';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import 'normalize-scss/sass/_normalize.scss';
import './styles/styles.scss';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={customTheme}>
			<App />
		</ThemeProvider>;
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
