import * as R from 'ramda';
import moment from './moment';

/* Date Functions */

const compareDates = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getYear() === date2.getYear();

export const filterByDay = (sprints, date) =>
  sprints.filter(sprint => compareDates(new Date(sprint.start_time), date));

export const filterByDateRange = (sprints, startDate, endDate) =>
  sprints.filter(
    sprint =>
      new Date(sprint.start_time) > startDate &&
      new Date(sprint.start_time) < endDate,
  );

const addDays = (date, days) => {
  const newDate = new Date(date);
  const dateOffset = days * (24 * 60 * 60 * 1000);
  newDate.setTime(newDate.getTime() + dateOffset);
  return newDate;
}

export const generateWeek = (date) => {
  const week = [6, 5, 4, 3, 2, 1, 0];
  return week.map(day => new Date(addDays(date, -day)).toDateString());
};

/* Duration Functions */

const getDurationInMilliseconds = sprint =>
  new Date(sprint.end_time) - new Date(sprint.start_time);

const getTotalDurationInMilliseconds = sprints =>
  sprints.reduce(
    (duration, sprint) => duration + getDurationInMilliseconds(sprint),
    0,
  );

export const getTotalDuration = sprints =>
  sprints.reduce(
    (total, sprint) =>
      moment.duration(total).add(getDurationInMilliseconds(sprint)),
    moment.duration(0),
  );

const convertToHours = seconds => seconds / 3600000;

/* Filter functions */

export const filterByProject = (project, sprints, tasks) =>
  sprints.filter(sprint => {
    const thetask = tasks.filter(task => task.name === sprint.task)[0];
    if (thetask) {
      return thetask.project === project;
    } else {
      return false;
    }
  });

export const filterByCategory = (cat, sprints, tasks) => {
  const filteredsprints = sprints.filter(sprint => {
    const thetask = tasks.filter(task => task.name === sprint.task)[0];
    return thetask.categories.includes(cat);
  });
  return filteredsprints;
};

export const filterByUser = (sprints, user) =>
  R.filter(sprint => sprint.owner === user, sprints);

/* Pipelines */

export const getTotalDurationByDay = R.pipe(
  filterByDay,
  getTotalDurationInMilliseconds,
  convertToHours,
);

export const getTotalDurationByProject = R.pipe(
  filterByProject,
  getTotalDurationInMilliseconds,
  convertToHours,
);

export const getTotalDurationByCategory = R.pipe(
  filterByCategory,
  getTotalDurationInMilliseconds,
  convertToHours,
);

/* Chart Data Generators */

export const getStackKeys = data =>
  data.reduce((acc, datum) => {
    return Array.from(
      new Set([...acc, ...Object.keys(datum).filter(key => key !== 'date')]),
    );
  }, []);

export const generateProjectStack = (projects, sprints, tasks, date = new Date()) => {
  const group = [...projects, null].reduce((grouped, project) => {
    // eslint-disable-next-line no-param-reassign
    const projectName = project ? project.name : null;
    grouped[projectName] = getTotalDurationByProject(
      projectName,
      sprints,
      tasks,
    );
    if (!grouped[projectName]) {
      delete grouped[projectName]; // eslint-disable-line no-param-reassign
    }
    return grouped;
  }, {});
  group.date = date;
  return group;
};

export const generateWeeklyProjectStack = (projects, sprints, tasks, week) => {
  return week.map(day => generateProjectStack(
    projects,
    filterByDay(sprints, new Date(day)),
    tasks,
    new Date(day),
  ));
};
