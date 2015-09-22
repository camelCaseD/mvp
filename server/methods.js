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
  },

  markTaskAsDone: function(task) {
    Tasks.update({_id: task._id}, {$set: {done: task.done}}, function(error) {
      if (error) {
        throw new Meteor.Error(error.reason);
      }
    });
  },

  removeTask: function(task) {
    Tasks.remove({taskId: task._id}, function(error) {
      if (error) {
        throw new Meteor.Error(error.reason);
      } else {
        Tasks.remove({_id: task._id}, function(error) {
          if (error) {
            console.error(error);
          }
        });
      }
    });
  },

  createProject: function(project) {
    Projects.insert(project, function(error) {
      if (error) {
        throw new Meteor.Error(error.reason);
      }
    });
  }
});
