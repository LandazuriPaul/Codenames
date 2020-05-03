# Codenames

This project tries to reproduce a web version of the board game [Codenames](<https://en.wikipedia.org/wiki/Codenames_(board_game)>).

There is a running instance of the game accessible at [https://codenames.landazuri.fr](https://codenames.landazuri.fr).

## Dictionaries

The dictionaries used to generate the games are in the `dictionaries` folder:

- [`dictionary.en.txt`](./dictionaries/clean/dictionary.en.txt): English

- [`dictionary.fr.txt`](./dictionaries/clean/dictionary.fr.txt): French

Any correction or addition is very welcome, so we can spice up the game :)

## Roadmap

Here is an unordered list of improvements coming up:

- Mobile friendly! So that the spymasters can be even more discrete! --> Be clear if you need to scroll right

- Whose turn is it currently?

- Icon to start a game? https://thenounproject.com/search/?q=new%20game

- Randomize teams

- Party seed in Title

- Join a game / New game in different menus

- Dirty version

- Counter for the time for each turn --> Time restricted games ?

- Dark theme

- Backend with websocket rooms:
  - to assign roles in a game (no more cheating!)
  - chat (background colours by team)
  - check for words sent through chat

## Installation

This repository uses [Lerna](https://lerna.js.org/) as a tool to manage the different packages and apps.

If you want to install Lerna globally, you can run:

```sh
npm i -g lerna
```

Otherwise, you can run all lerna commands by preceding them with `npx`. It will run the lerna cli from your npm global cache.

To bootstrap the project and install all the dependencies for each package and application, run the following:

```sh
# If you have lerna installed globally
lerna bootstrap --hoist

# Otherwise
npx lerna bootstrap --hoist
```

The `--hoist` option allows to "hoist" common dependencies across the different packages into a common `node_modules` folder at the root of this repository. Therefore it can spare lots of space on your local machine. This option is not mandatory though, and you can still install the dependencies in each package just by omitting this option. To learn more about the "hoist" mechanism and possible cons, you can [read the hosit documentation](https://github.com/lerna/lerna/blob/master/doc/hoist.md).

## Applications

You can learn more about each application in their respective README:

- [Frontend](./apps/frontend): written in TypeScript, developed with React and bundled with Parcel.

- [API](./apps/api): written in TypeScript, developed with NestJS and bundled with Webpack.

## Development

If you want to run the project locally, here are the basic requirements:

- [Node.js](https://nodejs.org/en/): The recommended way is via [`nvm`](https://github.com/nvm-sh/nvm). You can then install the version used for this project: `nvm install lts/erbium`.

- [Yarn](https://classic.yarnpkg.com/): If you have `nvm` installed, you'd prefer to install `yarn` without the node dependency. To do so, the `bash` install is easier: `curl -o- -L https://yarnpkg.com/install.sh | bash`.

Then you can clone this repository and run the project locally:

- Install the dependencies:

  ```sh
  yarn install
  ```

- Run the development server:

  ```sh
  yarn start
  ```

- To produce a distribution build:

  ```sh
  yarn build
  ```

- To deploy the `dist` folder, if you have set up a `scripts/.env` file following the [`example.env`](./scripts/example.env), you can simply run:

  ```sh
  yarn deploy
  ```

- To regenerate the `src/data.json` file based on the `dictionaries/dictionary.**.txt` file, you can run:
  ```sh
  yarn generate-dictionaries
  ```

### Technical aspects

This projects uses the following technologies:

- [React + React DOM](https://reactjs.org/): ^16.12.0

- [Parcel](https://parceljs.org/): ^1.12.4

- [TypeScript](https://www.typescriptlang.org/): ^3.7.3

This project also includes some development dependencies (`devDependencies` in `package.json`) with their respective configuration file for a better developer experience:

- [EditorConfig](https://editorconfig.org/): `.editorconfig` — not a `devDependency` but allows consistant configuration across IDEs and editors.

- [ESLint](https://eslint.org/) with [TypeScript parser](https://github.com/typescript-eslint/typescript-eslint) and React

- React Hooks configuration: `.eslintrc` following [this article](https://medium.com/@oliver.grack/using-eslint-with-typescript-and-react-hooks-and-vscode-c583a18f0c75) as a starting point.
- [Prettier](https://prettier.io/): `.prettierrc` — formatting options

## Author

Paul Landázuri
