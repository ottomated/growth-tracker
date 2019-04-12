# Growth Tracker

A discord bot for tracking how your server grows over time

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.JS](https://github.com/creationix/nvm) (I use the latest version but it shouldn't really matter)
- [Cairo](https://github.com/Automattic/node-canvas#installation)

### Installing

Clone the repository

```
git clone https://github.com/ottomated/growth-tracker
```

Install packages

```
cd growth-tracker
npm install
```

Set up config

```
mv config.example.js config.js
```

Add your bot's token to the bottom of `config.js`

```js
// The token for this bot to login with
exports.token = 'YOUR TOKEN GOES HERE';
```

Run the bot

```
node .
```

## Contributing

Please send me all your pull requests!

## License

This project is licensed under the GNU GPLv3 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Thanks to `@Syndicate#0001` for creating the bot's logo!
