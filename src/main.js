import { k } from "./kaboomLoader.js";
import { room1 } from "./scenes/room1.js";
import { room2 } from "./scenes/room2.js";
import { setBackgroundColor } from "./scenes/roomUtils.js";
import { makeNotificationBox } from "./ui/notificationBox.js";

function addIntroText(k, content, y, size, color = "#eacfba", width = 560) {
  k.add([
    k.text(content, { font: "glyphmesss", size, width, align: "center" }),
    k.color(k.Color.fromHex(color)),
    k.fixed(),
    k.pos(k.center().x, y),
    k.anchor("center"),
  ]);
}

function makeIntroScreen(k) {
  setBackgroundColor(k, "#111329");

  k.add([
    k.rect(600, 320),
    k.color(k.Color.fromHex("#20214a")),
    k.fixed(),
    k.pos(k.center()),
    k.anchor("center"),
  ]);
  k.add([
    k.rect(600, 4),
    k.color(k.Color.fromHex("#eacfba")),
    k.fixed(),
    k.pos(k.center().x, k.center().y - 158),
    k.anchor("center"),
  ]);

  addIntroText(k, "INTRUDER ALERT  /  SECTOR 07", k.center().y - 125, 12, "#a2aed5");
  addIntroText(k, "ESCAPE THE FACTORY", k.center().y - 86, 28);
  addIntroText(k, "Fight through the facility. Find a way out.", k.center().y - 49, 14, "#a2aed5");

  const controls = [
    { x: k.center().x - 180, title: "MOVE", keys: "ARROWS   /   A  D" },
    { x: k.center().x, title: "JUMP", keys: "X   /   SPACE" },
    { x: k.center().x + 180, title: "ATTACK", keys: "Z" },
  ];

  for (const control of controls) {
    k.add([
      k.rect(168, 58),
      k.color(k.Color.fromHex("#171a38")),
      k.fixed(),
      k.pos(control.x, k.center().y + 25),
      k.anchor("center"),
    ]);
    addIntroText(k, control.title, k.center().y + 12, 12, "#a2aed5", 150);
    addIntroText(k, control.keys, k.center().y + 38, 13, "#eacfba", 160);
  }

  addIntroText(k, "PRESS ENTER TO BEGIN", k.center().y + 112, 16, "#eacfba");
  addIntroText(k, "A short adventure through a very long shift.", k.center().y + 142, 10, "#a2aed5");
}

async function main() {
  const room1Data = await (await fetch("./maps/room1.json")).json();
  const room2Data = await (await fetch("./maps/room2.json")).json();

  k.scene("room1", (previousSceneData) => {
    room1(k, room1Data, previousSceneData);
  });
  k.scene("room2", (previousSceneData) => {
    room2(k, room2Data, previousSceneData);
  });

  k.scene("final-exit", () => {
    setBackgroundColor(k, "#20214a");
    k.add(
      makeNotificationBox(
        k,
        "You escaped the factory!\n The End. Thanks for playing!"
      )
    );
  });
}

k.scene("intro", () => {
  makeIntroScreen(k);
  k.onKeyPress("enter", () => {
    // makes audio will be enabled before the game starts
    const AudioContextType = window.AudioContext || window.webkitAudioContext;
    if (AudioContextType) new AudioContextType().resume();
    k.go("room1", { exitName: null });
  });
});

k.go("intro");

main();
