import { Component, createSignal, For, Show } from 'solid-js';
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
  const [isFullscreen, setFullscreen] = createSignal(false);

  async function handleFullScreen() {
    if (!isFullscreen()) {
      await document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  }

  const handleClick = async (index: number) => {
    console.log('do', index);
    await triggerMacro(index);
  };

  return (
    <div class={styles.app}>
      <header class={styles.header}>
        <button class={styles.spareBtn}>S</button>
        <h2 class={styles.heading}>Macropad</h2>
        <button class={styles.fullscreenBtn} onClick={handleFullScreen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            width="1em"
            fill="currentColor"
          >
            <Show
              when={isFullscreen()}
              fallback={
                <path d="M10 38v-9.65h3V35h6.65v3Zm0-18.35V10h9.65v3H13v6.65ZM28.35 38v-3H35v-6.65h3V38ZM35 19.65V13h-6.65v-3H38v9.65Z" />
              }
            >
              <path d="M16.65 38v-6.65H10v-3h9.65V38Zm11.7 0v-9.65H38v3h-6.65V38ZM10 19.65v-3h6.65V10h3v9.65Zm18.35 0V10h3v6.65H38v3Z" />
            </Show>
          </svg>
        </button>
      </header>
      <ul class={styles.macroList}>
        <For each={macros}>
          {(macro, index) => (
            <li class={styles.macroItem}>
              <button
                class={styles.macroBtn}
                onClick={[handleClick, index() + 1]}
              >
                {macro.name}
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default App;
