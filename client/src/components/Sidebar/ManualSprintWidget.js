import React, { Component } from 'react';
import { reduxForm, Field, reset, formValueSelector } from 'redux-form';
import { renderTimeField, renderDateField, renderSelectField } from '../UI/Forms/renderFields';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { addTaskandSprint, addSprint } from '../../store/actions';


// function toDatetimeLocal(date) {
//     const ten = i => (i < 10 ? '0' : '' ) + i,
//     YYYY = date.getFullYear(),
//     MM = ten(date.getMonth() + 1),
//     DD = ten(date.getDate()),
//     HH = ten(date.getHours()),
//     II = ten(date.getMinutes()),
//     SS = ten(date.getSeconds());
//     return `${YYYY}-${MM}-${DD}T${HH}:${II}:${SS}`;
// }


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
      marginTop: 0,
      minWidth: 120,
      display: 'flex',
      flexDirection: 'column',
      height: '300px'
    },
    button: {
        margin: theme.spacing.unit,
    }
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
    
    checkIfTaskExists = (task, project) => {
        if (!this.props.tasks.filter(existingtask => existingtask.project === project).map(existingtask => existingtask.name).includes(task)) {
            return true;
        }
        return false;
    }

    onSubmit = (values) => {
        const { task } = this.state;
        const { project, date, start_time, end_time } = values;
        const isNew = this.checkIfTaskExists(task, project);
        const sprint_data = {
            task: task,
            start_time: new Date(`${date}T${start_time}:00`).toISOString(),
            end_time: new Date(`${date}T${end_time}:00`).toISOString()
        }
        if (isNew) {
            const task_data = {
                "name": task,
                "project": {
                    "name": project
                },
                "categories": [],
                "completed": false,
                "sprint_set": []
            }
            this.props.addTaskAndSprint(task_data, sprint_data);
            return this.props.resetForm();
        }
        this.props.addSprint(sprint_data);
        return this.props.resetForm();
    }

    render() {
        const { projects, classes } = this.props;
        const projectlist = ['None', ...projects].map((project, index) => <MenuItem key={index} value={project}>{project}</MenuItem>);
        const inputProps = {
            placeholder: "What are you up to?",
            value: this.state.task,
            onChange: this.updateTaskInput,
        };    
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='project_select'>Project</InputLabel>
                    <Field
                        name="project"
                        component={renderSelectField}
                        inputProps={{
                            name: 'project',
                            id: 'project_select'
                        }}
                        children={projectlist}
                    />
                    {/* For the time being, I am simply going to omit the Autosuggest field from 
                        my redux-form. I don't need to do any validation, and the state-based logic
                        I have already set up seems perfectly fine. It will make for a slightly
                        disjointed submit process (pulling both from props and state, rather
                        than treating all values in a unified way), but the setup cost just seems too
                        high to justify at the moment. */}
                    <Autosuggest  
                        theme={{
                            container: classes.container,
                            suggestionsContainerOpen: classes.suggestionsContainerOpen,
                            suggestionsList: classes.suggestionsList,
                            suggestion: classes.suggestion,
                        }}
                        renderInputComponent={renderInput} suggestions={this.state.suggestions} renderSuggestionsContainer={renderSuggestionsContainer} onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested} onSuggestionsClearRequested={this.handleSuggestionsClearRequested} getSuggestionValue={this.getSuggestionValue} renderSuggestion={renderSuggestion} inputProps={inputProps}/>
                    <Field component={renderDateField} name="date" label="Date:" type="date" />
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom: '2rem'}}>
                        <Field component={renderTimeField} name="start_time" label="Start Time:" type="time" />
                        <Field component={renderTimeField} name="end_time" label="End Time:" type="time"/>
                    </div>
                    <Button variant="raised" color="secondary" type="submit">Submit</Button>
                </FormControl>
            </form>
        );
    }
}

const selector = formValueSelector('manualSprintForm'); // <-- same as form name

const mapStateToProps = state => {
    return {
        project: selector(state, 'project'),
        projects: state.workspace.project_set,
        tasks: state.workspace.task_set,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTaskAndSprint: (task_data, sprint_data) => dispatch(addTaskandSprint(task_data, sprint_data)),
        addSprint: (sprint_data) => dispatch(addSprint(sprint_data)),
        resetForm: () => dispatch(reset('manualSprintForm'))
    }
}

export default reduxForm({
    form: 'manualSprintForm',
})(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManualSprintWidget)));