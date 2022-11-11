//@ts-nocheck

type AssetList = {
  [name: string]:  any;
};

export default class AssetLoader {
  private toLoad: number;
  private loaded: number;
  isLoaded: boolean;
  list: AssetList;
  constructor() {
    this.toLoad = 0;
    this.loaded = 0;
    this.isLoaded = false;
    this.list = {};
  }

  load(assets: string[]) {
    const imageExt = ["png"];
    const jsonExt = ["json"];
    const configExt = ["toml"];

    this.toLoad = assets.length;
    return new Promise((resolve) => {
      assets.forEach((asset) => {
        const extension = asset.split(".").pop() || "";

        if (imageExt.includes(extension)) {
          this.loadImage(asset, resolve);
        } else if (jsonExt.includes(extension)) {
          this.loadJson(asset, resolve);
        } else if (configExt.includes(extension)) {
          this.loadConfig(asset, resolve);
        }
      });
    });
  }

  loadHandler(resolve) {
    this.loaded += 1;

    if (this.loaded === this.toLoad) {
      this.loaded = 0;
      this.toLoad = 0;
      resolve(this);
      this.isLoaded = true;
    }
  }

  loadImage(src: string, resolve) {
    const image = new Image();
    image.src = src;

    image.addEventListener(
      "load",
      () => {
        this.loadHandler(resolve);
      },
      false
    );
    const name = src.split("/").pop().split(".")[0];

    if (name) {
      this.list[name] = image;
    }
  }

  async loadConfig(src, resolve) {
    fetch(src)
      .then((data) => data.text())
      .then((text) => {
        const config = text.split("\n").reduce((obj, str) => {
          const [key, value] = str.trim().split("=");
          if (!key || !value) return obj;
          obj[key.trim()] = value.trim();
          return obj;
        }, {});

        const name = src.split("/").pop().split(".")[0];

        if (name) {
          this.list[name] = config;
        }
      });
  }

  async loadJson(src, resolve) {
    try {
      const response: Response = await fetch(src);
      const data: any = await response.json();
      this.loadHandler(resolve);

      const name = src.split("/").pop().split(".")[0];
      this.list[name] = data;
    } catch (error) {}
  }
}
