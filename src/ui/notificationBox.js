export function makeNotificationBox(k, content) {
  const lines = content.split("\n").length;
  const width = Math.min(560, k.width() - 32);
  const fontSize = lines > 3 ? 24 : 32;
  const container = k.make([
    k.rect(width, Math.max(100, lines * fontSize * 1.5 + 32)),
    k.color(k.Color.fromHex("#162331")),
    k.fixed(),
    k.pos(k.center()),
    k.area(),
    k.anchor("center"),
    {
      close() {
        k.destroy(this);
      },
    },
  ]);
  container.add([
    k.text(content, {
      font: "glyphmesss",
      size: fontSize,
      width: width - 32,
      align: "center",
    }),
    k.color(k.Color.fromHex("#f0dfb3")),
    k.area(),
    k.anchor("center"),
  ]);

  return container;
}
