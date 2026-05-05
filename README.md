Mini-Framework & TodoMVC
A custom lightweight frontend framework built from scratch — no React, no Vue, no Angular.
English · Русский
</div>

<a name="english"></a>
Mini-Framework & TodoMVC (EN)
A custom lightweight frontend framework built from scratch (without React, Vue, or Angular) and a fully functional TodoMVC application demonstrating its capabilities. The project features a Cyberpunk-themed UI.

Features
The framework implements four core pillars of modern frontend architecture:
PillarDescriptionDOM AbstractionA declarative way to build UI using JavaScript objects instead of writing raw HTML strings or manually mutating the DOM.Event HandlingA custom Event API integrated directly into the element creation process, eliminating the need to manually call addEventListener().State ManagementA centralized, globally reachable store that acts as the single source of truth for the application's data.Routing SystemA hash-based router that synchronizes the application's URL with the global state, allowing seamless navigation.

Why things work the way they work
The framework is built on the paradigm of State-Driven UI.
Manually selecting DOM elements and changing their properties (Imperative UI) leads to spaghetti code that is hard to maintain, as the state of the application becomes scattered across the DOM.
To solve this, the framework uses DOM Abstraction — a conceptual Virtual DOM approach:

The developer describes how the UI should look based on the current State. When the user interacts with the app (via the custom Event Handling), they trigger an action that updates the Store. Once the Store receives new data (setState), it automatically notifies the subscriber (the main rendering function), which generates a new virtual representation of the UI and mounts it to the DOM.

This ensures that the DOM is always a pure reflection of the underlying JavaScript data object, making the application predictable, easier to debug, and highly scalable.

Getting Started
bashnpx serve


<a name="russian"></a>
Mini-Framework & TodoMVC (RU)
Пользовательский легковесный фронтенд-фреймворк, созданный с нуля (без использования React, Vue или Angular), и полностью функциональное приложение TodoMVC, демонстрирующее его возможности. Проект имеет пользовательский интерфейс в стиле киберпанк.

Ключевые возможности
Фреймворк реализует четыре основных компонента современной фронтенд-архитектуры:
КомпонентОписаниеАбстракция DOMДекларативный способ создания пользовательского интерфейса с использованием объектов JavaScript вместо написания необработанных HTML-строк или ручного изменения DOM.Обработка событийКастомный API событий, интегрированный непосредственно в процесс создания элементов, что избавляет разработчиков от необходимости вручную вызывать addEventListener().Управление состояниемЦентрализованное, глобально доступное хранилище (Store), которое выступает в качестве единственного источника истины для данных приложения.Система маршрутизацииРоутер на основе хэшей, который синхронизирует URL-адрес приложения с глобальным состоянием, обеспечивая бесшовную навигацию.

Почему всё работает именно так
Фреймворк построен на парадигме State-Driven UI (интерфейса, управляемого состоянием).
Ручной выбор элементов DOM и изменение их свойств (императивный UI) приводит к «спагетти-коду», который трудно поддерживать, поскольку состояние приложения оказывается разбросанным по всему DOM.
Для решения этой проблемы фреймворк использует абстракцию DOM — концептуальный подход Virtual DOM:

Разработчик описывает, как должен выглядеть интерфейс на основе текущего состояния (State). Когда пользователь взаимодействует с приложением (через кастомную систему обработки событий), он запускает действие, которое обновляет хранилище (Store). Как только хранилище получает новые данные (setState), оно автоматически уведомляет подписчика (основную функцию рендеринга), которая генерирует новое виртуальное представление интерфейса и монтирует его в DOM.

Это гарантирует, что DOM всегда является чистым отражением базового объекта данных JavaScript, что делает приложение предсказуемым, простым в отладке и легко масштабируемым.

Запуск проекта
bashnpx serve
