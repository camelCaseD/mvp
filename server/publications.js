Meteor.publish('projects', function() {
  return Projects.find();
});

Meteor.publish('tasks', function(projectId) {
  if (projectId) {
    return Tasks.find({projectId: projectId});
  }
});

Meteor.publish('subTasks', function(taskId) {
  if (taskId) {
    return Tasks.find({taskId: taskId});
  }
});
