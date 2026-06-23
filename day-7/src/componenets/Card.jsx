import PropTypes from "prop-types";
import React from "react";

const Card=({username = "harish", age , status})=> {
  return (
    <div>
      <h1>
        {username} <br />
        {age} <br />
        {status}
      </h1>
    </div>
  );
}

Card.proptypes = {
  username: PropTypes.string,
  age: PropTypes.number,
  status: PropTypes.string,
};

export default Card;
