import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import Client from './Client';

const clientList = (props) => {
  const {
    clients,
  } = props;
  const listItems = clients.map(client =>
    <Client key={client.name} id={client.id} name={client.name} color={client.color} />);
  return (
    <List>
      {listItems}
    </List>
  );
};

clientList.propTypes = {
  clients: PropTypes.array.isRequired,
};

export default clientList;