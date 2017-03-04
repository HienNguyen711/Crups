import React from 'react';

const Header = () => {
  return (
    <h2 className="Header text-center">
      This is Crups
    </h2>
  );
};

Header.propTypes = {
  message: React.PropTypes.string
};

export default Header;
