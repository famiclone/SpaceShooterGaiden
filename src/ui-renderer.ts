import Renderer from "./renderer";

const palette = {
  0x00: "#000000",
  0x01: "#ffffff",
  0x02: "#49aa10",
  0x04: "#b21030",
};

export default class UIRenderer extends Renderer {
  progress(
    percent: number,
    x: number,
    y: number,
    width: number = 10,
    height = 4
  ) {
    this.ctx.fillStyle = palette[0x01];
    this.ctx.fillRect(x - 2, y - 2, width + 4, height + 4);

    this.ctx.fillStyle = palette[0x01];
    this.ctx.fillRect(x + width + 2, y + 1, 1, 2);

    this.ctx.fillStyle = palette[0x00];
    this.ctx.fillRect(x - 1, y - 1, width + 2, height + 2);

    this.ctx.fillStyle = palette[0x04];
    this.ctx.fillRect(x, y, width, 4);
    this.ctx.fillStyle = palette[0x02];
    this.ctx.fillRect(x, y, percent / width, 4);
  }

  text(text: string, x: number, y: number, blink = false) {
    if (blink) {
      if (Math.floor(Date.now() / 300) % 2 === 0) {
        text.split("").forEach((char: string, index: number) => {
          this.ctx.drawImage(
            this.image,
            this.spriteSheetMap[char].x,
            this.spriteSheetMap[char].y,
            this.spriteSheetMap[char].w,
            this.spriteSheetMap[char].h,
            index * 8 + x,
            y,
            8,
            8
          );
        });
      }
    } else {

    text.split("").forEach((char: string, index: number) => {
      this.ctx.drawImage(
        this.image,
        this.spriteSheetMap[char].x,
        this.spriteSheetMap[char].y,
        this.spriteSheetMap[char].w,
        this.spriteSheetMap[char].h,
        index * 8 + x,
        y,
        8,
        8
      );
    });
    }
  }
}
