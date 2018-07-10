import React from 'react';
import Button from '@material-ui/core/Button';
import { Field } from 'redux-form';
import { FormControl  } from '@material-ui/core';
import { renderDateField, renderTimeField } from '../../UI/Forms/renderFields';

export default () => (
  <FormControl>
    <Field component={renderDateField} name="date" label="Date:" type="date" />
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2rem',
      }}
    >
      <Field
        component={renderTimeField}
        name="start_time"
        label="Start Time:"
        type="time"
      />
      <Field
        component={renderTimeField}
        name="end_time"
        label="End Time:"
        type="time"
      />
    </div>
    <Button variant="raised" color="secondary" type="submit">
      Submit
    </Button>
  </FormControl>
);
// );
