export class Environment {
  static PORT = process.env.PORT || 4000;

  public static get TOKEN() {
    if (!process.env.TOKEN) {
      console.log("UNSET TOKEN SIGNATURE");
      process.exit(1);
    }
    return process.env.TOKEN;
  }
}
