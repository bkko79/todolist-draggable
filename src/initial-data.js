const initialDatas = {
    input: '',
    date: new Date().toLocaleString('ja-jp'),
    index: 5,
    tasks: {
        'task-1': {id: 'task-1', 'content': '部屋を掃除する', 'checked': false, 'timer': ''},
        'task-2': {id: 'task-2', 'content': '6時まで上野駅', 'checked': false, 'timer': ''},
        'task-3': {id: 'task-3', 'content': 'スマホ充電する', 'checked': false, 'timer': ''},
        'task-4': {id: 'task-4', 'content': '晩ご飯準備する', 'checked': false, 'timer': ''}
    },
    column: {
        'id': 'column-1',
        'title': '',
        'taskIds': ['task-1', 'task-2', 'task-3', 'task-4']
    },
}

export default initialDatas;