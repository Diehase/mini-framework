import { h, renderApp } from '../framework/dom.js';
import { Store } from '../framework/state.js';
import { Router } from '../framework/router.js';

const store = new Store({
  todos: [],
  filter: '/',
  editingId: null
});

const router = new Router(store);
router.init();

const actions = {
  addTodo: (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      const newTodos = [...store.getState().todos, { id: Date.now(), text: e.target.value.trim(), completed: false }];
      store.setState({ todos: newTodos });
    }
  },
  toggleTodo: (id) => {
    const newTodos = store.getState().todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    store.setState({ todos: newTodos });
  },
  deleteTodo: (id) => {
    const newTodos = store.getState().todos.filter(t => t.id !== id);
    store.setState({ todos: newTodos });
  },
  toggleAll: (e) => {
    const completed = e.target.checked;
    const newTodos = store.getState().todos.map(t => ({ ...t, completed }));
    store.setState({ todos: newTodos });
  },
  clearCompleted: () => {
    const newTodos = store.getState().todos.filter(t => !t.completed);
    store.setState({ todos: newTodos });
  },
  startEditing: (id) => {
    store.setState({ editingId: id });
  },
  stopEditing: (e, id) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      const text = e.target.value.trim();
      if (text) {
        const newTodos = store.getState().todos.map(t => t.id === id ? { ...t, text } : t);
        store.setState({ todos: newTodos, editingId: null });
      } else {
        actions.deleteTodo(id);
      }
    } else if (e.key === 'Escape') {
      store.setState({ editingId: null });
    }
  }
};

function App(state) {
  const { todos, filter, editingId } = state;

  const visibleTodos = todos.filter(t => {
    if (filter === '/active') return !t.completed;
    if (filter === '/completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return h('section', { className: 'todoapp' }, [
    h('header', { className: 'header' }, [
      h('h1', {}, 'todos'),
      h('input', { 
        className: 'new-todo', 
        placeholder: 'What needs to be done?', 
        autofocus: true,
        onKeyUp: actions.addTodo 
      })
    ]),
    
    todos.length > 0 ? h('section', { className: 'main' }, [
      h('input', { 
        id: 'toggle-all', 
        className: 'toggle-all', 
        type: 'checkbox', 
        checked: activeCount === 0,
        onChange: actions.toggleAll 
      }),
      h('label', { for: 'toggle-all' }, 'Mark all as complete'),
      h('ul', { className: 'todo-list' }, visibleTodos.map(todo => {
        const isEditing = editingId === todo.id;
        let liClass = todo.completed ? 'completed' : '';
        if (isEditing) liClass += ' editing';

        return h('li', { className: liClass.trim() }, [
          h('div', { className: 'view' }, [
            h('input', { className: 'toggle', type: 'checkbox', checked: todo.completed, onChange: () => actions.toggleTodo(todo.id) }),
            h('label', { onDblClick: () => actions.startEditing(todo.id) }, todo.text),
            h('button', { className: 'destroy', onClick: () => actions.deleteTodo(todo.id) })
          ]),
          isEditing ? h('input', { 
            className: 'edit', 
            value: todo.text, 
            autofocus: true,
            onKeyUp: (e) => actions.stopEditing(e, todo.id),
            onBlur: (e) => actions.stopEditing(e, todo.id)
          }) : false
        ])
      }))
    ]) : false,

    todos.length > 0 ? h('footer', { className: 'footer' }, [
      h('span', { className: 'todo-count' }, [
        h('strong', {}, String(activeCount)),
        ` item${activeCount === 1 ? '' : 's'} left`
      ]),
      h('ul', { className: 'filters' }, [
        h('li', {}, h('a', { href: '#/', className: filter === '/' ? 'cyber-btn selected' : 'cyber-btn' }, 'All')),
        h('li', {}, h('a', { href: '#/active', className: filter === '/active' ? 'cyber-btn selected' : 'cyber-btn' }, 'Active')),
        h('li', {}, h('a', { href: '#/completed', className: filter === '/completed' ? 'cyber-btn selected' : 'cyber-btn' }, 'Completed'))
      ]),
      completedCount > 0 ? h('button', { className: 'clear-completed cyber-btn-accent', onClick: actions.clearCompleted }, 'Clear completed') : false
    ]) : false
  ]);
}

const rootElement = document.getElementById('app');
const updateScreen = (state) => {
  renderApp(App(state), rootElement);
};

store.subscribe(updateScreen);
updateScreen(store.getState());