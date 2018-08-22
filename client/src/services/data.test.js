/* This file contains a series of very basic unit tests for ensuring 
|*   the integrity of the Temporalite data pipeline */

import {
  filterByUser,
  filterByCategory,
  filterByProject,
  filterByDay,
  filterByDateRange,
  generateProjectStack,
  generateWeeklyProjectStack,
  generateWeek,
  getWeekOrigin,
} from './data';

// Dummy data
const sprints = [
  {
    id: 0,
    owner: 'gromit',
    task: 'Fix the widget',
    start_time: '2018-06-30T06:30:00.000Z',
    end_time: '2018-06-30T07:30:00.000Z',
  },
  {
    id: 1,
    owner: 'gromit',
    task: 'Find more cheese',
    start_time: '2018-07-01T12:30:00.000Z',
    end_time: '2018-07-01T1:00:00.000Z',
  },
  {
    id: 2,
    owner: 'wallace',
    task: 'Fix the widget',
    start_time: '2018-07-02T11:30:00.000Z',
    end_time: '2018-07-02T14:45:00.000Z',
  },
  {
    id: 3,
    owner: 'wallace',
    task: 'Invent things',
    start_time: '2018-07-03T13:30:00.000Z',
    end_time: '2018-07-03T15:45:00.000Z',
  },
  {
    id: 4,
    owner: 'totty',
    task: 'Bunny ranching',
    start_time: '2018-07-03T08:00:00.000Z',
    end_time: '2018-07-03T14:00:00.000Z',
  },
];

const projects = [
  {
    name: 'Deal with pesky rabbit bother',
    workspace: 1,
    id: 32,
    fee: '0.00',
    rate: '0.00',
    client: 'Lady Tottington',
  },
  {
    name: 'Retrieve cheese from moon',
    workspace: 1,
    id: 33,
    fee: '0.00',
    rate: '0.00',
    client: null,
  },
  {
    name: 'Make a fortune',
    workspace: 1,
    id: 34,
    fee: '0.00',
    rate: '0.00',
    client: null,
  },
];

const tasks = [
  {
    name: 'Fix the widget',
    id: 93,
    project: 'Retrieve cheese from moon',
    categories: ['Hijinks'],
    completed: false,
    billable: false,
  },
  {
    name: 'Bunny ranching',
    id: 94,
    project: 'Deal with pesky rabbit bother',
    categories: ['Anti-pesto'],
    completed: false,
    billable: false,
  },
  {
    name: 'Invent things',
    id: 95,
    project: 'Make a fortune',
    categories: ['Hijinks'],
    completed: false,
    billable: false,
  },
  {
    name: 'Find more cheese',
    id: 96,
    project: null,
    categories: ['Hijinks'],
    completed: false,
    billable: false,
  },
];

describe('data service filters appropriately', () => {
  test('filters sprints by user', () => {
    expect(filterByUser(sprints, 'wallace')).toHaveLength(2);
    expect(filterByUser(sprints, 'wallace')[0]).toHaveProperty(
      'task',
      'Fix the widget',
    );
  });

  test('filters sprints by category', () => {
    expect(filterByCategory('Anti-pesto', sprints, tasks)).toHaveLength(1);
  });

  test('filters sprints by project', () => {
    expect(
      filterByProject('Deal with pesky rabbit bother', sprints, tasks),
    ).toHaveLength(1);
  });

  test('filters sprints by date', () => {
    const testDate = new Date(2018, 6, 3, 0, 0, 0);
    expect(filterByDay(sprints, testDate)).toHaveLength(2);
  });

  test('filters sprints by date range', () => {
    const startDate = new Date(2018, 6, 3, 0, 0, 0);
    const endDate = new Date(2018, 6, 4, 0, 0, 0);
    expect(filterByDateRange(sprints, startDate, endDate)).toHaveLength(2);
  });
});

describe('calendar functions are working', () => {
  test('generateWeek generates a week of successive dates', () => {
    const week = generateWeek(new Date(2018, 6, 3, 0, 0, 0, 0));
    expect(week[6]).toEqual(new Date(2018, 6, 3, 0, 0, 0, 0).toDateString());
    expect(week[5]).toEqual(new Date(2018, 6, 2, 0, 0, 0, 0).toDateString());
    expect(week[4]).toEqual(new Date(2018, 6, 1, 0, 0, 0, 0).toDateString());
  });

  test('getWeekOrigin finds the date of the next Sunday', () => {
    const date = new Date(2018, 7, 22, 0, 0, 0, 0);
    const nextSunday = getWeekOrigin(date);
    expect(nextSunday.getDay()).toEqual(0);
    expect(nextSunday.getDate()).toEqual(26);
  });
});


describe('data service generates appropriately shaped stack chart data', () => {
  test('generateProjectStack creates a day object of appropriate shape', () => {
    const projectStack = generateProjectStack(projects, sprints, tasks);
    expect(projectStack).toHaveProperty('Make a fortune');
  });

  test('data service generates appropriately shaped stack chart data for a week', () => {
    const week = generateWeek(new Date(2018, 6, 3, 0, 0, 0, 0));
    const weekData = generateWeeklyProjectStack(projects, sprints, tasks, week);
    expect(weekData).toHaveLength(7);
    expect(weekData[6]).toHaveProperty('Deal with pesky rabbit bother', 6);
    expect(weekData[6]).toHaveProperty('Make a fortune', 2.25);
    expect(weekData[6]).not.toHaveProperty('Retrieve cheese from the moon');
  });
});
