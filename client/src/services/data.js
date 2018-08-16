import * as R from 'ramda';
import moment from './moment';


const getDurationInMilliseconds = sprint =>
  new Date(sprint.end_time) - new Date(sprint.start_time);

const getTotalDurationInMilliseconds = sprints =>
  sprints.reduce(
    (duration, sprint) => duration + getDurationInMilliseconds(sprint),
    0,
  );

const ConvertToHours = seconds => seconds / 3600000;

export const filterByProject = (project, sprints, tasks) =>
  sprints.filter((sprint) => {
    const thetask = tasks.filter(task => task.name === sprint.task)[0];
    return thetask.project === project;
  });

export const generateProjectBreakdown = (projects, sprints, tasks) => {
  const group = projects
    .reduce((grouped, project) => {
      grouped[project.name] = ConvertToHours(
        getTotalDurationInMilliseconds(filterByProject(project.name, sprints, tasks)));
      if (!grouped[project.name]) delete grouped[project.name];
      return grouped;
    }, {});
  group.date = new Date();
  return group;
};

export const filterByCategory = (cat, sprints, tasks) => {
  const filteredsprints = sprints.filter((sprint) => {
    const thetask = tasks.filter(task => task.name === sprint.task)[0];
    return thetask.categories.includes(cat);
  });
  return filteredsprints;
};

export const getTotalDuration = sprints =>
  sprints.reduce(
    (total, sprint) => moment.duration(total).add(getDurationInMilliseconds(sprint)),
    moment.duration(0),
  );

export const filterByUser = (sprints, user) => R.filter(sprint => sprint.owner === user, sprints);

const compareDates = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getYear() === date2.getYear();

export const filterByDay = (sprints, date) =>
  sprints.filter(sprint => compareDates(new Date(sprint.start_time), date));

