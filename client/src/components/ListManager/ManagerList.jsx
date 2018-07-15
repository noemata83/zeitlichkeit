import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import ManagerListItem from './ManagerListItem';

const itemList = (props) => {
  const {
    items,
    update,
    deleteItem,
  } = props;
  const listItems = items.map(item =>
    (<ManagerListItem
      key={item.name}
      id={item.id}
      name={item.name}
      color={item.color}
      update={update}
      deleteItem={deleteItem}
    />));
  return (
    <List>
      {listItems}
    </List>
  );
};

itemList.propTypes = {
  items: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default itemList;
