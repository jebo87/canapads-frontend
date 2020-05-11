import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import authConfig from '../backend_interface/auth_config';
import { getLoggedInUser } from '../backend_interface/api_if';
import logo from '../images/logo.svg';
import LoginLogoutButton from './LoginLogoutButton';
import { setFilters } from './../redux/actions/filterActions';
import { defaultFilters } from './filters/defaultFilters';
import { invalidateStore } from './../redux/actions/globalStateActions';

const Header = () => {
	const dispatch = useDispatch();
	const [ username, setUsername ] = useState(null);
	const filter = useSelector((state) => state.filter);
	const [ localFilter, setLocalFilter ] = useState(defaultFilters);

	const handleSearchChanged = (e) => {
		setLocalFilter({
			...localFilter,
			searchParam: { value: e.target.value }
		});
	};

	const handleKeyDown = async (e) => {
		if (e.key === 'Enter') {
			var newFilter = {
				...localFilter,
				searchParam: { value: e.target.value }
			};
			await setLocalFilter(newFilter);
			performSearch();
		}
	};
	const performSearch = async () => {
		await dispatch(invalidateStore({ store_invalid: true }));

		dispatch(setFilters({ ...localFilter, ...filter }));
	};

	useEffect(
		() => {
			getLoggedInUser().then((data) => setUsername(data));
		},
		[ filter ]
	);

	return (
		<div className="header">
			<div className="header_logo" />
			<div className="header_title">
				<img src={logo} alt="logo" />

				<a href="https://www.canapads.ca/"> CANAPADS</a>
			</div>
			<div className="menu">
				<ul>
					<li>
						{' '}
						<button className="active" href="#">
							listings
						</button>{' '}
					</li>

					<li>
						{' '}
						<button href="">messages</button>{' '}
					</li>
					<li>
						{' '}
						<button href="">dashboard</button>{' '}
					</li>
				</ul>
			</div>
			<div className="search_area">
				<input
					placeholder="Search..."
					type="text"
					className="search_box"
					onKeyDown={handleKeyDown}
					onChange={handleSearchChanged}
				/>
			</div>
			<button onClick={performSearch}>Search</button>
			<LoginLogoutButton />
			<div className="header_name">
				<img src="" alt="" />
				{username && username.name}
			</div>
		</div>
	);
};
export default Header;
