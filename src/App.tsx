import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { Game } from "./game";
import { Board } from "./game/board";
import { Map } from "./game/map";

function App() {
  const [gameOver, setGameOver] = createSignal(false);
  const [gameId, setGameId] = createSignal(0);
  let boardRef!: HTMLCanvasElement;
  let stageElmRef!: HTMLParagraphElement;
  const board = new Board({
    canvas: boardRef,
    width: 400,
    height: 400,
    styles: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#1a1a1a",
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

  onMount(() => {
    function animate() {
      game.draw();
      game.update();

      if (game.gameOver) {
        setGameOver(true);
        return gameId();
      }

      stageElmRef.textContent = `Stage ${game.currentStage + 1}/${
        game.stages.length
      }`;
      return requestAnimationFrame(animate);
    }

    board.setCanvas(boardRef);
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
    <Show
      when={gameOver()}
      fallback={
        <>
          <canvas ref={boardRef} />
          <div
            class="flex gap-4 absolute py-2 px-4 md:px-0"
            style={{
              width: `${board.width}px`,
              left: `${window.innerWidth / 2 - board.width / 2}px`,
              top: `${board.height}px`,
            }}
          >
            <div class="w-1/2 grid gap-2 bg-[#2c3e50] p-2">
              <button
                class="controller__arrow__button"
                onClick={() => {
                  map.player.moveUp(map.layout);
                }}
              >
                <img
                  src="/icons/chevron-up.svg"
                  alt="Arrow up"
                  class="size-6"
                />
              </button>
              <div class="grid grid-cols-2 gap-2">
                <button
                  class="controller__arrow__button"
                  onClick={() => {
                    map.player.moveLeft(map.layout);
                  }}
                >
                  <img
                    src="/icons/chevron-left.svg"
                    alt="Arrow left"
                    class="size-6"
                  />
                </button>
                <button
                  class="controller__arrow__button"
                  onClick={() => {
                    map.player.moveRight(map.layout);
                  }}
                >
                  <img
                    src="/icons/chevron-right.svg"
                    alt="Arrow right"
                    class="size-6"
                  />
                </button>
              </div>
              <button
                class="controller__arrow__button"
                onClick={() => {
                  map.player.moveDown(map.layout);
                }}
              >
                <img
                  src="/icons/chevron-down.svg"
                  alt="Arrow down"
                  class="size-6"
                />
              </button>
            </div>
            <div class="w-1/2 bg-[#2c3e50] text-white p-2">
              <p ref={stageElmRef}>
                Stage: {game.currentStage + 1}/{game.stages.length}
              </p>
            </div>
          </div>
        </>
      }
    >
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
