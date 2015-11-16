var notify = require("gulp-notify");

module.exports = function(errorObject, callback) {
  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') this.emit('end');
};

/*
  error: function() {
    // Extract the message and map it to an array.
    var errorItems = arguments[0]['message']
      .split('\n')
      .map(function(str) {
        return str.trim();
      });
    // Store the items as a title and message.
    var title = errorItems[0] || 'refer to console',
      message = errorItems[1] || 'refer to console';
    // Override the default message.
    arguments[0]['message'] = message;
    // Send the notification.
    notify.onError({
      title: title
    }).apply(this, arguments);
    // Keep Gulp from hanging.
    this.emit('end');
  }







 */
