Meteor.publish('projects', function() {
  return Projects.find();
});

Meteor.publish('tasks', function(projectId) {
  if (projectId) {
    return Tasks.find({projectId: projectId}, {fields: {projectId: 0}});
  }
});

Meteor.publish('subTasks', function(taskId) {
  if (taskId) {
    return Tasks.find({taskId: taskId}, {fields: {taskId: 0}});
  }
});
