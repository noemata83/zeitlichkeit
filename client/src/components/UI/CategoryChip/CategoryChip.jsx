import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const mapStateToProps = state => ({
  categories: state.workspace.category_set,
});

const styles = {
  Category: {
    margin: '0 1rem',
  },
  CategoryLabel: {
    color: 'white',
  },
};

export default connect(mapStateToProps)(withStyles(styles)((props) => {
  const { cat, categories, classes } = props;
  const category = categories.find(c => c.name === cat);
  return (
    <Chip
      style={{ backgroundColor: category.color }}
      key={`category-${category.id}`}
      label={category.name}
      classes={{ root: classes.Category, label: classes.CategoryLabel }}
    />
  );
}));
