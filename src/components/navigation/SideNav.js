import React, { useState, useEffect, useRef } from 'react';
import { getLoggedInUser } from './../../backend_interface/api_if';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import LoginLogoutButton from './../LoginLogoutButton';
import icon_plus from './../../images/menu/icons8-plus.png';
import icon_about from './../../images/menu/icons8-about.png';
import icon_home from './../../images/menu/icons8-home.png';
import icon_logout from './../../images/menu/icons8-logout.png';
import icon_messages from './../../images/menu/icons8-messages.png';
import icon_phone from './../../images/menu/icons8-phone.png';
import icon_heart from './../../images/menu/icons8-heart.png';
import icon_user from './../../images/menu/icons8-user.png';
import icon_close from './../../images/menu/icons8-close.png';

import icon_compass from './../../images/menu/icons8-compass.png';
const SideNav = (props) => {
	const [ user, setUser ] = useState(null);
	const [ navOpen, setNavOpen ] = useState(props.toggleNav);
	useEffect(() => {
		getLoggedInUser().then((data) => setUser(data));
	}, []);

	let match = useLocation().pathname;

	const close = async () => {
		props.showNav();
	};
	return (
		<div className="side_nav">
			<div className="side_nav_left">
				<div className="close_nav" onClick={close}>
					<img src={icon_close} alt="" />
				</div>

				{user && (
					<section className="user_info">
						<div className="overlay" />
						<img src={icon_user} alt="" />
						<div className="hi">Hi, {user.name}</div>
					</section>
				)}
				{!user && (
					<section
						className="user_info"
						style={{
							background: 'linear-gradient(43deg, rgba(34,193,195,1) 0%, rgba(83,45,253,1) 100%)'
						}}
					>
						<div className="overlay" />
						<img src={props.logo} alt="" style={{ height: '4rem' }} />
						<div className="hi">Please login to access all the features</div>
					</section>
				)}
				{!user && (
					<div className="login_logout_buttons">
						<LoginLogoutButton type="login" />
					</div>
				)}
				<Link to={`/new`} className={(match === '/new' ? 'active' : '') + ' side_nav_link'}>
					<img src={icon_plus} alt="" />
					Post a listing
				</Link>

				{user && (
					<section className="user_links">
						<Link to={`/dashboard`} className={(match === '/dashboard' ? 'active' : '') + ' side_nav_link'}>
							<img src={icon_home} alt="" />
							Dashboard
						</Link>
						<Link to={`/favorites`} className={(match === '/favorites' ? 'active' : '') + ' side_nav_link'}>
							<img src={icon_heart} alt="" />
							Favorites
						</Link>
						<Link to={`/messages`} className={(match === '/messages' ? 'active' : '') + ' side_nav_link'}>
							<img src={icon_messages} alt="" />
							Messages
						</Link>
						<Link to={`/drafts`} className={(match === '/drafts' ? 'active' : '') + ' side_nav_link'}>
							<img src={icon_compass} alt="" />Drafts
						</Link>
					</section>
				)}
				<section>
					<Link to={`/about`} className={(match === '/about' ? 'active' : '') + ' side_nav_link'}>
						<img src={icon_about} alt="" />
						About
					</Link>
					<Link to={`/contact`} className={(match === '/contact' ? 'active' : '') + ' side_nav_link'}>
						<img src={icon_phone} alt="" />
						Contact Us
					</Link>
					{user && (
						<div className="login_logout_buttons">
							<LoginLogoutButton type="logout" />
						</div>
					)}
				</section>
			</div>
			<div className="side_nav_right" onClick={close} />
		</div>
	);
};

export default SideNav;
