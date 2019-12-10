import React from 'react';

const AdPopup = (props) => {


    const displayName = `${props.ad.title}`;

    return (
        <div>
            <div>
                {displayName} |{' '}
                <a
                    target="_new"
                    href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search`}
                >
                    Wikipedia
          </a>
            </div>
            <img width={240} src={props.ad.image} />
        </div>
    );

};

export default AdPopup;