import { k } from "./kaboomLoader.js";
import { room1 } from "./scenes/room1.js";
import { room2 } from "./scenes/room2.js";
import { setBackgroundColor } from "./scenes/roomUtils.js";
import { makeNotificationBox } from "./ui/notificationBox.js";

function addIntroText(
  k,
  content,
  x,
  y,
  size,
  color = "#f0dfb3",
  width = 560,
  align = "center"
) {
  k.add([
    k.text(content, { font: "glyphmesss", size, width, align }),
    k.color(k.Color.fromHex(color)),
    k.fixed(),
    k.pos(x, y),
    k.anchor(align === "left" ? "left" : "center"),
  ]);
}

function makeIntroScreen(k) {
  setBackgroundColor(k, "#1b303c");

  k.add([
    k.rect(600, 320),
  k.color(k.Color.fromHex("#162331")),
    k.fixed(),
    k.pos(k.center()),
    k.anchor("center"),
  ]);
  k.add([
    k.rect(600, 4),
    k.color(k.Color.fromHex("#49d6bb")),
    k.fixed(),
    k.pos(k.center().x, k.center().y - 158),
    k.anchor("center"),
  ]);

  const center = k.center();
  k.add([
    k.circle(48),
    k.color(k.Color.fromHex("#49d6bb")),
    k.opacity(0.14),
    k.fixed(),
    k.pos(center.x - 185, center.y + 22),
    k.anchor("center"),
  ]);
  k.add([
    k.sprite("player", { anim: "idle" }),
    k.scale(3),
    k.fixed(),
    k.pos(center.x - 185, center.y + 22),
    k.anchor("center"),
  ]);

  addIntroText(k, "EMERGENCY BROADCAST  /  07", center.x, center.y - 128, 11, "#90b7a5");
  addIntroText(k, "ESCAPE THE FACTORY", center.x, center.y - 98, 26);
  addIntroText(k, "Find the burner boss to unlock double jump, then escape.", center.x, center.y - 71, 10, "#90b7a5", 540);
  addIntroText(k, "RECOVERY UNIT 01", center.x - 185, center.y + 87, 10, "#49d6bb", 160);

  const controls = [
    { title: "MOVE", detail: "Left / Right Arrows or A / D" },
    { title: "JUMP", detail: "X or Space; press again in air after unlock" },
    { title: "ATTACK", detail: "Z; strike enemies in front of you" },
  ];

  controls.forEach((control, index) => {
    const rowY = center.y - 26 + index * 49;
    k.add([
      k.rect(348, 42),
      k.color(k.Color.fromHex("#203541")),
      k.fixed(),
      k.pos(center.x + 112, rowY),
      k.anchor("center"),
    ]);
    addIntroText(k, control.title, center.x - 48, rowY - 7, 9, "#49d6bb", 300, "left");
    addIntroText(k, control.detail, center.x - 48, rowY + 7, 10, "#f0dfb3", 300, "left");
  });

  addIntroText(k, "PRESS ENTER TO BEGIN", center.x, center.y + 125, 14, "#f0dfb3");
  addIntroText(k, "Health pickups restore one heart", center.x, center.y + 147, 9, "#90b7a5");
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
    setBackgroundColor(k, "#162331");
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
