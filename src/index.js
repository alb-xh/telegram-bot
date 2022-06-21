
import 'dotenv/config';

import _ from 'lodash';
import express from 'express';
import { Telegraf } from 'telegraf';

import Bot, { commands, events } from './bot/index.js';
import Server, { middlewares, routes } from './server/index.js';
import App from './app.js';

const ENV_VARIABLE_NAMES = [ 'BOT_TOKEN', 'SERVER_PORT' ];
const STOP_SIGNALS = [ 'SIGINT', 'SIGTERM' ];

const env = _.pick(process.env, ENV_VARIABLE_NAMES);

for (const envVariableName of ENV_VARIABLE_NAMES) {
  if (!env[envVariableName]) {
    throw new Error(`${envVariableName} must be provided!`);
  }
}

const telegrafBot = new Telegraf(env.BOT_TOKEN);

const bot = new Bot(telegrafBot);
bot.setup(commands, events);

const expressApp = express();
expressApp.set('bot', bot);

const server = new Server(expressApp);
server.setup(middlewares, routes);

const app = new App(bot, server);

for (const stopSignal of STOP_SIGNALS) {
  process.once(stopSignal, async () => {
    await app.stop();
  });
}

app.start(env.SERVER_PORT);
