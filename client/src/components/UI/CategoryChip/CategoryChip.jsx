import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { getCategories } from '../../../store/reducers';

const styles = {
  Category: {
    margin: '0 .25rem',
    fontSize: '1.1rem !important',
    height: 'auto',
  },
  CategoryLabel: {
    color: 'white',
  },
};

const CategoryChip = (props) => {
  const {
    cat,
    categories,
    classes,
    task,
    deleteCategory,
  } = props;
  const category = categories.find(c => c.name === cat);
  return (
    <Chip
      style={{ backgroundColor: category.color }}
      key={`category-${category.id}`}
      label={category.name}
      onDelete={() => deleteCategory(task, category.name)}
      classes={{ root: classes.Category, label: classes.CategoryLabel }}
    />
  );
};

CategoryChip.propTypes = {
  cat: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categories: getCategories(state),
});


export default connect(mapStateToProps)(withStyles(styles)(CategoryChip));
