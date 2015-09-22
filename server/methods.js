Meteor.methods({
  createSubTask: function(subTask, task) {
    subTask.taskId = task._id;

    Tasks.insert(subTask, function(error, id) {
      if (error) {
        throw new Meteor.Error(error.reason);
      }
    });
  },

  createTask: function(task, project) {
    task.projectId = project._id;

    Tasks.insert(task, function(error, id) {
      if (error) {
        throw new Meteor.Error(error.reason);
      }
    });
  }
});
