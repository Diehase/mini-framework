// framework/dom.js

// Создание элемента Virtual DOM
export function h(tag, attrs = {}, children = []) {
  return {
    tag,
    attrs,
    children: Array.isArray(children) ? children : [children],
  };
}

// Превращение Virtual DOM в реальный DOM
export function mount(vnode, container) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    const textNode = document.createTextNode(String(vnode));
    container.appendChild(textNode);
    return textNode;
  }

  const el = document.createElement(vnode.tag);

  for (const [key, value] of Object.entries(vnode.attrs || {})) {
    // Custom Event Handling API (перехват onEvent)
    if (key.startsWith('on')) {
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else if (key === 'className') {
      el.className = value;
    } else if (key === 'checked' || key === 'value') {
      el[key] = value;
    } else if (key === 'autofocus' && value) {
      setTimeout(() => el.focus(), 0); // Фокус после рендера
    } else {
      el.setAttribute(key, value);
    }
  }

  for (const child of vnode.children) {
    if (child !== null && child !== false) {
      mount(child, el);
    }
  }

  container.appendChild(el);
  return el;
}

// Рендер приложения (в нашем фреймворке мы заменяем содержимое для простоты)
export function renderApp(vnode, container) {
  container.innerHTML = ''; 
  mount(vnode, container);
}