# Kira on JS

## Description

Kira is a specific usecase bot designed initially for Inazuma Guild.

## Setup

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Define Environment variables TOKEN, CLIENT_ID, GUILD_ID, and CHANNEL_ID or simply create a .env file with the following variables
4. Run `npm start` to deploy the commands and start the bot.

## Commands

The bot commands are located in the `commands` directory. Each command is a JavaScript file that exports an object with a `data` property (containing the command's data) and an `execute` function (which is called when the command is used).

## Events

The bot events are located in the `events` directory. Each event is a JavaScript file that exports an object with a `name` property (the name of the event) and an `execute` function (which is called when the event occurs).

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)
