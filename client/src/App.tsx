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
    <div class={styles.App}>
      <h2>Macropad</h2>
      <For each={macros}>
        {(macro, index) => (
          <div>
            <button onClick={[handleClick, index() + 1]}>{macro.name}</button>
          </div>
        )}
      </For>
    </div>
  );
};

export default App;
