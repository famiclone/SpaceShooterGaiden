export default class Logger {
  error(message: string) {
    console.error(message);
  }

  warn(message: string) {
    console.warn(message);
  }

  info(message: string) {
    console.info("âšī¸ " + message);
  }

  debug(message: string) {
    console.log("đ " + message);
  }
}
