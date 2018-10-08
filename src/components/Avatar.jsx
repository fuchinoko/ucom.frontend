import { withRouter } from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserIcon from './Icons/User';

const Avatar = props => (
  <span
    className={classNames(
      'avatar',
      { 'avatar_rounded': props.rounded },
      { 'avatar_square': props.square },
      { [`avatar_${props.size}`]: Boolean(props.size) },
      { 'avatar_border_white': props.borderWhite },
      { 'avatar_blank': !props.src },
    )}
  >
    {props.src ? (
      <img className="avatar__img" src={props.src} alt={props.alt} />
    ) : (
      <UserIcon />
    )}

    {props.showBadge && (
      <span
        role="presentation"
        className="avatar__badge"
        title={props.badgeTitle}
        onClick={(e) => {
          e.preventDefault();

          if (props.badgeLink) {
            props.history.push(props.badgeLink);
          }
        }}
      >
        {props.badgeUrl ? (
          <img src={props.badgeUrl} alt={props.badgeTitle} />
        ) : (
          <UserIcon />
        )}
      </span>
    )}


  </span>
);

Avatar.propTypes = {
  square: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  borderWhite: PropTypes.bool,
};

Avatar.defaultProps = {
  square: false,
  rounded: false,
};

export default withRouter(Avatar);
