if (location.hash.replace('#phase', '') != '1'
    && location.hash.replace('#phase', '') != '2'
    && location.hash.replace('#phase', '') != '3'
    ) {
        alert('Please set the phase number before proceeding!');
}

var state = {
    getCurrentPhaseNum: function () {
        return location.hash.replace('#phase', '');
    },
    type: null,
    startTime: 0,
    startTask: function (type) {
        state.type = type;
        state.startTime = new Date();
    },
    finishTask: function (data) {
        var finishTime = new Date();
        var timeTaken = (finishTime - state.startTime)/1000;
        var taskData = {
            type: state.type,
            timeTaken: timeTaken,
        };
        for (var key in data) {
            taskData[key] = data[key];
        }
        state.store(taskData);
    },
    store: function (taskData) {
        taskData.id = 'xxxx-xxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        taskData.phase = state.getCurrentPhaseNum();
        var logs = store.get(taskData.type + '-logs', []);
        logs.push(taskData);
        store.set(taskData.type + '-logs', logs);
        store.set('exported', false);
    },
}
