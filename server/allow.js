Tasks.allow({
  update: function(userId, doc, fieldNames, modifier) {
    var allowed = false;

    fieldNames.forEach(function(field) {
      if (field === 'charge') {
        allowed = true;
      }
    });

    return allowed;
  }
});
