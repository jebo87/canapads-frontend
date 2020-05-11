import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux/store';

// const MyApp = (props) => {
// 	const { Component, pageProps, store } = props;
// 	return (
// 		<Provider store={store}>
// 			<Component {...pageProps} />
// 		</Provider>
// 	);
// };

// export default withRedux(initStore)(MyApp);
export default withRedux(initStore, { debug: true })(
	class MyApp extends App {
		static async getInitialProps({ Component, ctx }) {
			return {
				pageProps: {
					...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
				}
			};
		}

		render() {
			const { Component, pageProps, store } = this.props;
			return (
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			);
		}
	}
);
