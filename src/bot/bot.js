export default class Bot {
  constructor (telegrafBot) {
    this.telegrafBot = telegrafBot;
  }

  setCommands (commands) {
    for (const [ command, ctxCb ] of commands) {
      this.telegrafBot.command(command, ctxCb);
    }
  }

  setEvents (events) {
    for (const [ event, ctxCb ] of events) {
      this.telegrafBot.on(event, ctxCb);
    }
  }

  setup (commands, events) {
    this.setCommands(commands);
    this.setEvents(events);
  }

  stop () {
    this.telegrafBot.stop();
  }

  async start () {
    await this.telegrafBot.launch();
  }

  sendMessage (chatId, message) {
    return this.telegrafBot.telegram.sendMessage(chatId, message);
  }
}
