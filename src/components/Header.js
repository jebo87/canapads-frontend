import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import authConfig from '../backend_interface/auth_config';
import { Link, useRouteMatch } from 'react-router-dom';
import SideNav from './navigation/SideNav';

import { getLoggedInUser } from '../backend_interface/api_if';
import logo from '../images/logo.svg';
import LoginLogoutButton from './LoginLogoutButton';
import { setFilters } from './../redux/actions/filterActions';
import { defaultFilters } from './filters/defaultFilters';
import { invalidateStore } from './../redux/actions/globalStateActions';
import search_image from './../images/icons8-search.png';
const Header = (props) => {
	const dispatch = useDispatch();
	const [ username, setUsername ] = useState(null);
	const filter = useSelector((state) => state.filter);
	const [ localFilter, setLocalFilter ] = useState(defaultFilters);
	const [ showSideNav, setShowSideNav ] = useState(false);

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

	const showNav = () => {
		setShowSideNav(!showSideNav);
	};

	return (
		<React.Fragment>
			{showSideNav && <SideNav logo={logo} showNav={showNav} />
			// <SideNav logo={logo} toggleNav={showSideNav} showNav={showNav} />
			}
			<div className={`header ${props.className}`}>
				<button className="header_icon" onClick={showNav}>
					☰
				</button>
				<div className="header_logo" />
				<div className="header_title">
					<img src={logo} alt="logo" />

					<a href="https://www.canapads.ca/"> CANAPADS</a>
				</div>

				<div className="search_area">
					<input
						placeholder="Search..."
						type="text"
						className="search_box"
						onKeyDown={handleKeyDown}
						onChange={handleSearchChanged}
					/>
					<button className="blue_button search_button " onClick={performSearch}>
						<img src={search_image} alt="" />
					</button>
				</div>
			</div>
		</React.Fragment>
	);
};
export default Header;
