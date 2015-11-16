'use strict';
import notify from 'gulp-notify';

const note = {
    error: (args) => {
        // Extract the message and map it to an array.
        let errorItems = args[0]['message']
            .split('\n')
            .map(function(str) {
                return str.trim();
            });
        
        // Store the items as a title and message.
        let title = errorItems[0] || 'refer to console';
        let message = errorItems[1] || 'refer to console';
        
        // Override the default message.
        args[0]['message'] = message;
        
        // Send the notification.
        notify.onError({
            title: title
        }).apply(this, args);
        
        // Keep Gulp from hanging.
        this.emit('end');
    }
};

export default note;
