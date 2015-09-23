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

Meteor.publish('estimateData', function(projectId) {
  var projects = Projects.find();

  if (projects.count() === 1) {
    return Tasks.find({projectId: projectId});
  } else {
    var tasks = Tasks.find({taskId: {$exists: false}}).fetch();

    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];

      if (task.charge) {

      }
    }
  }
});
