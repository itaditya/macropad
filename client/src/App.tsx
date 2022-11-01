import { Component, createSignal, For, Match, Show, Switch } from 'solid-js';
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

const numList = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, 0, 0];

const App: Component = () => {
  const [isFullscreen, setFullscreen] = createSignal(false);
  const [mode, setMode] = createSignal('macro');

  async function handleFullScreen() {
    if (!isFullscreen()) {
      await document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  }

  const handleMacro = async (index: number) => {
    console.log('macro', index);
    window.navigator.vibrate(50);
    await fetch(`/api/macro?i=${index}`, {
      method: 'POST',
    });
  };

  const handleNum = async (index: number) => {
    console.log('num', index);
    window.navigator.vibrate(50);
    await fetch(`/api/num?i=${index}`, {
      method: 'POST',
    });
  };

  const handleMode = () => {
    console.log('toggle mode');
    setMode((prev) => {
      return prev === 'macro' ? 'numpad' : 'macro';
    });
  };

  return (
    <div class={styles.app}>
      <header class={styles.header}>
        <button class={styles.modeBtn} onClick={handleMode}>
          M
        </button>
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
      <Switch>
        <Match when={mode() === 'macro'}>
          <ul class={styles.macroList}>
            <For each={macros}>
              {(macro, index) => (
                <li class={styles.macroItem}>
                  <button
                    class={styles.macroBtn}
                    onClick={[handleMacro, index() + 1]}
                  >
                    {macro.name}
                  </button>
                </li>
              )}
            </For>
          </ul>
        </Match>
        <Match when={mode() === 'numpad'}>
          <ul class={styles.numList}>
            <For each={numList}>
              {(num, index) => (
                <li class={styles.numItem}>
                  <button
                    class={styles.numBtn}
                    onClick={[handleNum, num]}
                  >
                    {num}
                  </button>
                </li>
              )}
            </For>
          </ul>
        </Match>
      </Switch>
    </div>
  );
};

export default App;
