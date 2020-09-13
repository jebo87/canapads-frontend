import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import authConfig from '../backend_interface/auth_config';
import { Link, useRouteMatch } from 'react-router-dom';
import SideNav from './navigation/SideNav';

import { getLoggedInUser } from '../backend_interface/api_if';
import logo from '../images/logo.svg';
import LoginLogoutButton from './LoginLogoutButton';
import { defaultParamsSearch } from './filters/defaultFilters';
import { setFilters } from './../redux/actions/filterActions';
import { invalidateStore } from './../redux/actions/globalStateActions';
import search_image from './../images/icons8-search.png';
const Header = (props) => {
	const dispatch = useDispatch();
	const [ username, setUsername ] = useState(null);
	const filter = useSelector((state) => state.filters);
	const [ localFilter, setLocalFilter ] = useState({ ...defaultParamsSearch });
	const [ showSideNav, setShowSideNav ] = useState(false);

	const handleSearchChanged = (e) => {
		setLocalFilter({
			...localFilter,
			searchParam: { value: e.target.value }
		});
	};
	let proceed_search = false;

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			var newFilter = {
				...localFilter,
				searchParam: { value: e.target.value }
			};

			proceed_search = true;
			setLocalFilter(newFilter);
		}
	};
	const performSearch = () => {
		dispatch(setFilters({ ...localFilter }));
		dispatch(invalidateStore({ store_invalid: true }));
	};

	useEffect(
		() => {
			if (proceed_search) {
				performSearch();
			}
		},
		[ localFilter ]
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
