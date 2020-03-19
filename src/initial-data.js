const initialDatas = {
    input: '',
    date: new Date().toLocaleString('ja-jp'),
    index: 5,
    tasks: {
        'task-1': {id: 'task-1', 'content': 'take out the garbage', 'checked': false, 'timer': ''},
        'task-2': {id: 'task-2', 'content': 'watch my favorite show', 'checked': false, 'timer': ''},
        'task-3': {id: 'task-3', 'content': 'charge my phone', 'checked': false, 'timer': ''},
        'task-4': {id: 'task-4', 'content': 'cook dinner', 'checked': false, 'timer': ''}
    },
    column: {
        'id': 'column-1',
        'title': '',
        'taskIds': ['task-1', 'task-2', 'task-3', 'task-4']
    },
}

export default initialDatas;