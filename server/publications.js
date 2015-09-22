Meteor.publish('projects', function() {
  return Projects.find();
});

Meteor.publish('tasks', function(projectId) {
  return Tasks.find({projectId: projectId}, {fields: {projectId: 0}});
});
