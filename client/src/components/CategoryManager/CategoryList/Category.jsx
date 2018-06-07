import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteCategory, updateCategory } from '../../../store/actions';


const styles = {
  color: {
    paddingLeft: '2rem',
    height: '100%',
  },
  colorBox: {
    width: '2rem',
    height: '2rem',
    display: 'inline-block',
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    outline: 'none',
    border: 'none',
    marginRight: '1rem',
  },
};

class Category extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...prevState, colorInput: nextProps.color };
  }
  state = {
    anchorEl: null,
    colorInput: null,
  }

  handleDelete = () => {
    this.props.deleteCategory(this.props.id);
  }

  render() {
    const {
      name,
      color,
      classes,
    } = this.props;
    return (
      <ListItem>
        <ListItemIcon>
          <button type="button" className={classes.colorBox} style={{ backgroundColor: color }} />
        </ListItemIcon>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <IconButton>
            <DeleteIcon onClick={this.handleDelete} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteCategory: id => dispatch(deleteCategory(id)),
  updateCategory: category => dispatch(updateCategory(category)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Category));
