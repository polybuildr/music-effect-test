function exportData() {
    var logs = [].concat(
        store.get('typing-logs', []),
        store.get('arithmetic-logs', []),
        store.get('choose-logs', [])
    );
    var dataBlob = new Blob([JSON.stringify(logs, null, '  ')], {type: 'text/plain;charset=utf-8'});
    var now = new Date();
    saveAs(dataBlob, now.getHours() + '-' + now.getMinutes() + "-data.json", true);
    store.set('exported', true);
}

function clearData() {
    if (!store.get('exported', false)) {
        if (!confirm('This data has not been exported! Are you sure you want to delete it?')) {
            return;
        }
    }
    store.remove('typing-logs');
    store.remove('arithmetic-logs');
    store.remove('choose-logs');
    alert('Cleared data!');
}
