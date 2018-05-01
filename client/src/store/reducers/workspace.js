import actionTypes from '../actions/actionTypes';

// const initialState = {
//     workspace: {
//         id: null,
//         name: '',
//         users: []
//     },
//     projects: [],
//     tasks: [],
//     sprints: []
// }


// Dummy State for the purposes of building UI Components
const initialState = {
    id: null,
    name: 'Personal',
    users: [
        {
            id: 2,
            username: 'jones'
        },
        {
            id: 1,
            username: "noema"
        }
    ],
    project_set: [
        "Master Django Development",
        "Make Zeitlichkeit App"
    ],
    task_set: [
        {
            id: 2,
            name: "Build Django Backend",
            project: "Make Zeitlichkeit App",
            categories: ["Web Development"],
            completed: false,
        },
        {
            name: "Learn Django Rest Framework",
            id: 6,
            project: "Make Zeitlichkeit App",
            categories: [
                "Web Development"
            ],
            completed: false,
        },
        {
            name: "Figure out what Serializers Do",
            id: 7,
            project: "Make Zeitlichkeit App",
            categories: [
                "Web Development"
            ],
            completed: false,
        },
        {
            name: "Study the Django Docs",
            id: 8,
            project: "Make Zeitlichkeit App",
            categories: [
                "Learning",
                "Web Development"
            ],
            completed: false,
        }
    ],
    category_set: [
        "Learning",
        "Household",
        "Web Development"
    ],
    sprints: [
        {
            id: 1,
            owner: "noema",
            task: "Build Django Backend",
            start_time: "2018-04-29T10:00:00",
            end_time: "2018-04-29T11:00:00"
        },
        {
            id: 2,
            owner: "noema",
            task: "Build Django Backend",
            start_time: "2018-04-30T10:00:00",
            end_time: "2018-04-30T11:00:00",
        },
        {
            id: 3,
            owner: "noema",
            task: "Build Django Backend",
            start_time: "2018-05-01T10:00:00",
            end_time: "2018-05-01T11:00:00"
        },
        {
            id: 4,
            owner: "noema",
            task: "Learn Django Rest Framework",
            start_time: "2018-05-01T11:00:00",
            end_time: "2018-05-01T11:15:00"
        },
        {
            id: 5,
            owner: "noema",
            task: "Learn Django Rest Framework",
            start_time: "2018-04-30T11:00:00",
            end_time: "2018-05-01T11:15:00"
        }
    ]
}

export default (state=initialState, action) => {
    
    return state;
}