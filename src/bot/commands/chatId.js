export default [
  'chatId',
  (ctx) => ctx.reply(ctx.message.chat.id),
];
