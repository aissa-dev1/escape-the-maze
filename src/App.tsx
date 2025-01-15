import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { Game } from "./game";
import { Board } from "./game/board";
import { Map } from "./game/map";

function App() {
  const [gameOver, setGameOver] = createSignal(false);
  const [gameId, setGameId] = createSignal(0);
  let boardRef!: HTMLCanvasElement;

  onMount(() => {
    const board = new Board({
      canvas: boardRef,
      width: 400,
      height: 400,
      styles: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#2c3e50",
        borderRadius: "8px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
      },
    });
    const map = new Map({
      board,
    });
    const game = new Game({
      board,
      map,
    });

    function animate() {
      game.draw();
      game.update();

      if (game.gameOver) {
        setGameOver(true);
        return gameId();
      }

      return requestAnimationFrame(animate);
    }

    game.init();
    setGameId(animate());
  });

  createEffect(() => {
    if (gameOver()) {
      cancelAnimationFrame(gameId());
    }
  });

  onCleanup(() => {
    cancelAnimationFrame(gameId());
  });

  return (
    <Show when={gameOver()} fallback={<canvas ref={boardRef} />}>
      <div class="absolute flex flex-col gap-4 text-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <h1 class="text-3xl">Game Over!</h1>
        <button
          class="px-4 py-2 font-bold text-white bg-[#2c3e50] rounded hover:opacity-85 transition-colors"
          onClick={() => window.location.reload()}
        >
          Restart
        </button>
      </div>
    </Show>
  );
}

export default App;
