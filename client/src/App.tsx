import { Component, For } from 'solid-js';
import styles from './App.module.css';

const macros = [
  {
    name: 'Edge',
  },
  {
    name: 'Code',
  },
  {
    name: 'Terminal',
  },
  {
    name: 'Slack',
  },
  {
    name: 'Zoom',
  },
  {
    name: 'Spotify',
  },
];

const triggerMacro = (index: number) => {
  return fetch(`/api/macro?i=${index}`, {
    method: 'POST',
  });
};

const App: Component = () => {
  const handleClick = async (index: number) => {
    console.log('do', index);
    await triggerMacro(index);
  };

  return (
    <div class={styles.app}>
      <h2 class={styles.heading}>Macropad</h2>
      <ul class={styles.macroList}>
        <For each={macros}>
          {(macro, index) => (
            <li class={styles.macroItem}>
              <button class={styles.macroBtn} onClick={[handleClick, index() + 1]}>{macro.name}</button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default App;
