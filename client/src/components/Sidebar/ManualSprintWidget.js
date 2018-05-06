import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

function toDatetimeLocal(date) {
    const ten = i => (i < 10 ? '0' : '' ) + i,
    YYYY = date.getFullYear(),
    MM = ten(date.getMonth() + 1),
    DD = ten(date.getDate()),
    HH = ten(date.getHours()),
    II = ten(date.getMinutes()),
    SS = ten(date.getSeconds());
    return `${YYYY}-${MM}-${DD}T${HH}:${II}:${SS}`;
}

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

  const styles = theme => ({
    container: {
      flexGrow: 1,
      position: 'relative',
    },
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
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120
    },
  });
  

class ManualSprintWidget extends Component {
    state = {
        start_time: new Date(),
        end_time: new Date(),
        task: '',
        project: '',
        suggestions: []
    }

    updateTaskInput = (event, { newValue, method }) => {
        this.setState({
            task: newValue
        })
    }
    changeStartHandler = (event) => {
        this.setState({
            start_time: new Date(event.target.value)
        });
    }
    changeEndHandler = (event) => {
        this.setState({
            end_time: new Date(event.target.value)
        });
    }
    
    handleSuggestionsClearRequested = () => {
        this.setState({
          suggestions: [],
        });
      };
    
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getSuggestions = (value) => {
        
        const regex = new RegExp('^' + value, 'i');
      
        return this.props.tasks.filter(task => regex.test(task.name)).map(task => task.name);
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
        const { tasks, projects, classes } = this.props;
        const projectlist = projects.map((project, index) => <MenuItem key={index} value={project}>{project}</MenuItem>)
        const inputProps = {
            placeholder: "What are you up to?",
            value: this.state.task,
            onChange: this.updateTaskInput
          };      
        return(
            <div>
                <FormControl className={classes.formControl}>
                    <Autosuggest 
                        theme={{
                            container: classes.container,
                            suggestionsContainerOpen: classes.suggestionsContainerOpen,
                            suggestionsList: classes.suggestionsList,
                            suggestion: classes.suggestion,
                        }}
                        renderInputComponent={renderInput} suggestions={this.state.suggestions} renderSuggestionsContainer={renderSuggestionsContainer} onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested} onSuggestionsClearRequested={this.handleSuggestionsClearRequested} getSuggestionValue={this.getSuggestionValue} renderSuggestion={renderSuggestion} inputProps={inputProps}/>
                    <InputLabel htmlFor='project_select'>Project</InputLabel>
                    <Select
                        value={this.state.project}
                        onChange={this.handleChange}
                        inputProps={{
                        name: 'project',
                        id: 'project_select'
                        }}
                    >
                    {projectlist}
                    </Select>
                    <TextField name="start_time" label="Start Time:" type="datetime-local" fullWidth onChange={this.changeStartHandler} value={toDatetimeLocal(this.state.start_time)}/>
                    <TextField name="end_time" label="End Time:" type="datetime-local" fullWidth onChange={this.changeEndHandler} value={toDatetimeLocal(this.state.end_time)}/>
                    <button onClick={() => console.log(`${this.state.task}: \n${this.state.start_time.toISOString()}\n${this.state.end_time.toISOString()}`)}>Submit</button>
                </FormControl>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.workspace.project_set,
        tasks: state.workspace.task_set
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ManualSprintWidget));