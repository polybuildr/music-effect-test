var state = {
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
        var logs = store.get(taskData.type + '-logs', []);
        logs.push(taskData);
        store.set(taskData.type + '-logs', logs);
        store.set('exported', false);
    },
}
