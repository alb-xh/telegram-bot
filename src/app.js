export default class App {
  constructor (bot, server) {
    this.bot = bot;
    this.server = server;
  }

  async stop () {
    this.bot.stop();
    await this.server.stop();

    console.log('APP stopped!');
  }

  async start (port) {
    await this.bot.start();
    await this.server.start(port);

    console.log(`APP started on port: ${port}`);
  }
}
