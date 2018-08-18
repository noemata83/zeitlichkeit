import { filterByUser, filterByCategory, filterByProject, filterByDay } from './data';

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
    expect(filterByUser(sprints, 'wallace').length).toBe(2);
    expect(filterByUser(sprints, 'wallace')[0].task).toBe('Fix the widget');
  });

  test('filters sprints by category', () => {
    expect(filterByCategory('Anti-pesto', sprints, tasks).length).toBe(1);
  });

  test('filters sprints by project', () => {
    expect(filterByProject('Deal with pesky rabbit bother', sprints, tasks).length).toEqual(1);
  });

  test('filters sprints by date', () => {
    const testDate = new Date();
    testDate.setFullYear(2018);
    testDate.setMonth(6); // January = 0 !
    testDate.setDate(3);
    expect(filterByDay(sprints, testDate).length).toEqual(2);
  });
});