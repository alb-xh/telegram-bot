export default [
  '/',
  async (req, res) => {
    try {
      const { chatId, message } = req.body || {};

      if (!chatId || !message) {
        return res
          .status(400)
          .send('BAD REQUEST');
      }

      const bot = req.app.get('bot');

      if (!bot) {
        throw new Error('Bot is not set as global variable!');
      }

      await bot.sendMessage(chatId, message);

      return res
        .status(201)
        .send('CREATED');

    } catch (error) {
      console.error(error);

      if (error.response) {
        const {
          error_code: errorCode,
          description
        } = error.response;

        return res
          .status(errorCode)
          .send(description);
      }

      return res
        .status(500)
        .send('INTERNAL SERVER ERROR');
    }
  },
];
