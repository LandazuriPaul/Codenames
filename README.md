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

### General features

- Whose turn is it currently?

- Randomize teams

- Dirty version

- Counter for the time for each turn --> Time restricted games ?

### Frontend

- Mobile friendly! So that the spymasters can be even more discrete! --> Be clear if you need to scroll right

- Icon to start a game? https://thenounproject.com/search/?q=new%20game

- Party seed in Title

- Join a game / New game in different menus

- Dark theme

### Backend

- Websocket server

- Security:

  - [Helmet](https://github.com/helmetjs/helmet) package? [NestJS security page](https://docs.nestjs.com/techniques/security).

- Backend with websocket rooms:
  - to assign roles in a game (no more cheating!)
  - chat (background colours by team)
  - check for words sent through chat

## Installation

If you want to run the project locally, here are the basic requirements:

- [Node.js](https://nodejs.org/en/): The recommended way is via [`nvm`](https://github.com/nvm-sh/nvm). You can then install the version used for this project: `nvm install lts/erbium`.

- [Yarn](https://classic.yarnpkg.com/): If you have `nvm` installed, you'd prefer to install `yarn` without the node dependency. To do so, the `bash` install is easier: `curl -o- -L https://yarnpkg.com/install.sh | bash`.

This repository uses the [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) as a tool to manage the different packages and apps.

From the root folder, simply run the classic command:

```sh
yarn install
```

This will install all package dependencies in a common `node_modules` folder at the root of the project using a single `yarn.lock` file to avoid conflicts package dependencies.

## Applications

You can learn more about each application in their respective README:

- [Frontend](./packages/frontend): written in TypeScript, developed with React and bundled with Parcel.

- [API](./packages/api): written in TypeScript, developed with NestJS and bundled with Webpack.

## Development

For both the Frontend and the Backend (API), you can navigate to the appropriate folder (`packages/frontend` or `packages/api`) and run the following commands:

- To run a local dev server of the application with Hot Module Reload:

  ```sh
  yarn start:dev
  ```

  For the API, you can also run local server in [debug mode]((https://nodejs.org/en/docs/guides/debugging-getting-started/):

  ```sh
  yarn start:debug
  ```

- To produce a distribution build in the corresponding `dist` folder:
  ```sh
  yarn build
  ```

### Regenerate dictionaries

To regenerate the `packages/frontend/src/data.json` file based on the `dictionaries/dictionary.**.txt` file, you can run:

```sh
yarn generate-dictionaries
```

### Legacy frontend deployment

Once built, if you want to send the `packages/frontend/dist` folder to a static content hosting service accessible via SSH, you can run the `scripts/deploy_static.sh` script. But first, you'll need to set up your hosting information at the beginning of the script:

```sh
# Hosting information
FULL_HOST_ADDRESS="username@host.address"
PORT="21"
DESTINATION_FOLDER="/absolute/path/to/www/"
```

### Technical aspects

This projects uses the following technologies:

- [NestJS](https://nestjs.com): ^7.0.0

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
