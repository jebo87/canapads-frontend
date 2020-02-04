import React from 'react';

const Tag = (props) => {
	const classes = 'tag ' + props.tagClass;
	return (
		<div className="tag">
			<div className={classes}>{props.tag}</div>
		</div>
	);
};

export default Tag;
