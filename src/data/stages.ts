import { MapLayout } from "../game/map";
import { generateMaze } from "../utils/generate-random-maze";

export const STAGES: MapLayout[] = Array(3)
  .fill(null)
  .map(() => generateMaze(7, 7));

const storedStages = localStorage.getItem("stages");

if (typeof storedStages !== "string") {
  localStorage.setItem("stages", JSON.stringify(STAGES));
} else {
  STAGES.splice(0, STAGES.length, ...JSON.parse(storedStages));
}
