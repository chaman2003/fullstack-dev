import React from 'react';

const ObjectProp = ({ user }) => {
  return (
    <div>
      <ol>
        {user.map((user) => (
          <li>
            {user.name}, {user.age}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ObjectProp;
