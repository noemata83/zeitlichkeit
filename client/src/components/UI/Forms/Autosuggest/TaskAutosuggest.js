import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Autosuggest from 'react-autosuggest/dist/Autosuggest';
import { TextField, Paper, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
      },
      suggestion: {
        display: 'block',
      },
      suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
      },
});

const renderInput = (inputProps) => {
    const {classes, ref, ...other} = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: ref,
                ...other,
            }}
        />
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;
  
    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }

function renderSuggestion(suggestion, { query, isHighlighted}) {
    return (
      <MenuItem component="div"><div><span>{suggestion}</span></div></MenuItem>
    );
  }

class TaskAutosuggest extends Component {
    state = {
        suggestions: []
    }

    handleSuggestionsClearRequested = () => {
        this.setState({
          suggestions: [],
        });
    };

    getSuggestions = (value) => {
        // console.log(this.props.tasks);
        console.log(this.props.project);
        const regex = new RegExp('^' + value, 'i');
        return this.props.tasks.filter(task => (regex.test(task.name) && (task.project === this.props.project))).map(task => task.name);
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value),
        });
      };

    getSuggestionValue = (suggestion) => {
        return suggestion;
    }

    render() {
        const { classes } = this.props;
        const inputProps = {
            placeholder: "What are you up to?",
            value: this.props.task,
            onChange: this.props.updateTaskInput,
        };  
        return (
            <Autosuggest  
                        theme={{
                            container: classes.container,
                            suggestionsContainerOpen: classes.suggestionsContainerOpen,
                            suggestionsList: classes.suggestionsList,
                            suggestion: classes.suggestion,
                        }}
                        renderInputComponent={renderInput} suggestions={this.state.suggestions} renderSuggestionsContainer={renderSuggestionsContainer} onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested} onSuggestionsClearRequested={this.handleSuggestionsClearRequested} getSuggestionValue={this.getSuggestionValue} renderSuggestion={renderSuggestion} inputProps={inputProps}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.workspace.task_set
    }
}

TaskAutosuggest.propTypes = {
    tasks: PropTypes.array,
    task: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    classes: PropTypes.object,
    updateTaskInput: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(TaskAutosuggest));