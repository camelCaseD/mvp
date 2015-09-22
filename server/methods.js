Meteor.methods({
  createSubTask: function(subTask, task) {
    subTask.taskId = task._id;

    Tasks.insert(subTask, function(error, id) {
      if (error) {
        throw new Meteor.Error(error.reason);
      }
    });
  }
});
