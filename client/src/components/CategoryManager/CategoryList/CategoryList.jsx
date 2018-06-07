import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import Category from './Category';

const categoryList = (props) => {
  const {
    categories,
  } = props;
  const listItems = categories.map(category =>
    <Category key={category.name} id={category.id} name={category.name} color={category.color} />);
  return (
    <List>
      {listItems}
    </List>
  );
};

categoryList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default categoryList;
