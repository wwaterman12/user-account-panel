import React from 'react';
import Proptypes from 'prop-types';
import md5 from 'js-md5';
import './styles.css';

const defaultImage = encodeURI('https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png');

const UserImage = ({ email, firstName, lastName }) => (
  <div className="imageWrapper">
    <img
      src={`https://www.gravatar.com/avatar/${md5(email).trim()}?s=200&d=${defaultImage}`}
      alt="User Profile"
    />
    <h2>{`${firstName} ${lastName}`}</h2>
  </div>
);

UserImage.propTypes = {
  email: Proptypes.string,
  firstName: Proptypes.string,
  lastName: Proptypes.string,
};

export default UserImage;
