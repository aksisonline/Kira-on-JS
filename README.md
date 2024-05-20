# Kira on JS

## Description

Kira is a specific usecase bot designed initially for Inazuma Guild.

## Setup

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Create a `config.json` file in the root directory with the following structure:

```json
{
  "token": "your-discord-bot-token",
  "keywords": {
    "keyword1": ["response1", "response2"],
    "keyword2": ["response1", "response2"]
  }
}
```

Use the `config_edit.json` file as a reference point to begin from.

Replace `"your-discord-bot-token"` with your Discord bot token. Add any keywords you want the bot to respond to in the `keywords` object.

4. Run `npm start` to deploy the commands and start the bot.

## Commands

The bot commands are located in the `commands` directory. Each command is a JavaScript file that exports an object with a `data` property (containing the command's data) and an `execute` function (which is called when the command is used).

## Events

The bot events are located in the `events` directory. Each event is a JavaScript file that exports an object with a `name` property (the name of the event) and an `execute` function (which is called when the event occurs).

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)
