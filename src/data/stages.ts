import { MapLayout } from "../game/map";
import { generateMaze } from "../utils/generate-random-maze";

export const STAGES: MapLayout[] = Array(5)
  .fill(null)
  .map((_, i) => {
    if (i === 0) {
      return generateMaze(7, 7);
    }
    if (i === 1) {
      return generateMaze(9, 9);
    }
    if (i === 2) {
      return generateMaze(11, 11);
    }
    if (i === 3) {
      return generateMaze(13, 13);
    }
    if (i === 4) {
      return generateMaze(15, 15);
    }
    return generateMaze(17, 17);
  });

const storedStages = localStorage.getItem("stages");

if (typeof storedStages !== "string") {
  localStorage.setItem("stages", JSON.stringify(STAGES));
} else {
  STAGES.splice(0, STAGES.length, ...JSON.parse(storedStages));
}
