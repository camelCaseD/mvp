Meteor.methods({
  createSubTask: function(subTask, task) {
    subTask.taskId = task._id;

    Tasks.insert(subTask, function(error, id) {
      if (error) {
        throw new Meteor.Error(error.reason);
      }
    });
  },

  createTask: function(task, projectId) {
    task.projectId = projectId;

    var labels = task.labels;

    Tasks.insert(task, function(error, id) {
      if (error) {
        throw new Meteor.Error(error.reason);
      } else {
        for (var i = 0; i < labels.length; i++) {
          var label = labels[i];

          Labels.upsert({name: label}, {$set: {name: label}, $push: {tasks: id}}, function(error) {
            if (error) {
              throw new Meteor.Error(error.reason);
            }
          });
        }
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
  },

  removeProject: function(projectId) {
    var tasks = Tasks.find({projectId: projectId}).fetch();
    tasks.forEach(function(task) {
      Tasks.remove({taskId: task._id}, function(error) {
        if (error) {
          throw new Meteor.Error(error.reason);
        }
      });
    });

    Tasks.remove({projectId: projectId}, function(error) {
      if (error) {
        throw new Meteor.Error(error.reason);
      } else {
        Projects.remove({_id: projectId}, function(error) {
          if (error) {
            throw new Meteor.Error(error.reason);
          }
        })
      }
    })
  },

  clock: function(taskId, newHours) {
    var task = Tasks.findOne({_id: taskId});

    if (!task.hours) {
      task.hours = [];
    }

    task.hours.push({hours: newHours, clockedAt: new Date()});

    task.totalHours = task.totalHours ? task.totalHours + newHours : newHours;

    Tasks.update({_id: taskId}, {$set: {hours: task.hours, totalHours: task.totalHours}}, function(error) {
      if (error) {
        throw new Meteor.Error(error.reason);
      } else if (task.taskId) {
        var parentTask = Tasks.findOne({_id: task.taskId});
        parentTask.totalHours = parentTask.totalHours ? parentTask.totalHours + task.totalHours : task.totalHours;
        
        Tasks.update({_id: parentTask._id}, {$set: {totalHours: parentTask.totalHours}});
      }
    });
  }
});
