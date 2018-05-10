# Temporalite Planning 
(freewritten notes)

The inspiration for this app grew out of reading a New York Times article about the division of labor in the household. The claim was that in families with children, the woman ends up shouldering the lion's share of the household workload *even in* families that are committed to equal work-sharing. That made me think about creating an app that would provide some more-or-less 'real-time' feedback to families hoping to establish true gender parity. As I stepped back, I realized what what I was thinking about was really just a use case for a time-tracker app that I had not thought of yet. And thus I realized that really, what I was building was a time-tracker app. There are many good apps out there for time-tracking functionality; we don't really need another one. But why not? It will be instructive.

The basic concept of the app is to allow users to either manually enter or time their activities and enter them on a spreadsheet that is shared with other members of the same workspace. Within a workspace, users can then ask for a variety of different reports on the distribution of time and projects within that workspace: by category/by-user, by-user/by-category, etc.

To that end, we need a bunch of different kinds of record. First of all, we need a user record. Users can be associated with workspaces, but they can also have tasks that do not belong to a workspace, or that belong to a personal workspace (which would be easier to implement? probably the latter):

User:
* Workspaces
* Tasks

Task:
* Workspace
* Project
* Categories
* Paid/Unpaid (?)
* Rate (if any) (?)
* Completed: yes/no

Sprint:
* Start time
* End time
* Task
* Workspace

Workspace?
* Users
* Projects

A user can have many workspaces. A workspace can have many users. (many-many)
A task can have many users; but just one user per task? (one - many to start)
A task is usually part of just one project. Do we need a database record for projects? Or can they simply be tags (like categories) attached to the projects themselves?

A task may need to be distinguished from a sprint: a sprint represents a discrete contribution to a task.

---

## Update Flow

The plan is to allow users to add sprints using a set of three widgets. The first that I'll create is the simplest: a manual entry widget. This widget will allow a user to enter a project, task name, start and end time. When they click submit, the sprint will (in theory) be added to the database. A second widget will be a timer: a user can start tracking a task, and the task will complete tracking (and submit) when the user hits the "stop" button. Finally, a third widget will be a pomodoro timer: a user can set an arbitrary interval, and a rest period, and the widget will count down from that interval, give a rest, and then start again.  

I want to think through a sensible flow for a user to manually enter a task in the Manual Entry widget (or, really, any widget). In doing so, I want to acknowledge a few possibilities: at the moment, without any configuration, the user could add a sprint to a new task, to a task under a different project from the project that contains that task, or to no task at all. So let's consider some todos that follow from this and add them to our Workflowy chart.
