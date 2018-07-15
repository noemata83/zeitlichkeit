/* Deprecated Component */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryList from './CategoryList/CategoryList';
import CategoryListControls from './CategoryList/CategoryListControls';
import getRandomColor from '../../services/randomColor';

import { checkIfCategoryExists, addCategory } from '../../store/actions';

class CategoryManager extends Component {
  state = {
    input: '',
    color: '',
    anchorEl: null,
  }

  componentDidMount() {
    if (this.state.color === '') {
      this.initColor();
    }
  }

  initColor = () => {
    this.setState({
      color: getRandomColor(),
    });
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  }

  handleOpen = event =>
    this.setState({
      anchorEl: event.currentTarget,
    });

  handleClose = () =>
    this.setState({
      anchorEl: null,
    });

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex, anchorEl: null });
  }

  resetInput = () => {
    this.setState({
      input: '',
      color: getRandomColor(),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.checkIfCategoryExists(this.state.input)) {
      return;
    }
    this.props.addCategory({
      name: this.state.input,
      color: this.state.color,
    });
    this.resetInput();
  }

  render() {
    const {
      categories,
    } = this.props;
    const {
      input,
      color,
      anchorEl,
    } = this.state;
    return (
      <div style={{ fontSize: '2.5rem', padding: '2rem' }}>
        <h1>Manage Task Categories</h1>
        <div style={{ width: '50%', padding: '2rem', margin: '0 auto' }}>
          <CategoryListControls
            input={input}
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
            color={color}
            anchorEl={anchorEl}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            handleChangeComplete={this.handleChangeComplete}
          />
          <CategoryList
            categories={categories}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  checkIfCategoryExists: cat => dispatch(checkIfCategoryExists(cat)),
  addCategory: category => dispatch(addCategory(category)),
});

const mapStateToProps = state => ({
  categories: state.workspace.category_set,
});

CategoryManager.propTypes = {
  categories: PropTypes.array.isRequired,
  checkIfCategoryExists: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManager);
