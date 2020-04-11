# Codenames

This project tries to reproduce a web version of the board game [Codenames](<https://en.wikipedia.org/wiki/Codenames_(board_game)>).

There is a running instance of the game accessible at [https://codenames.landazuri.fr](https://codenames.landazuri.fr).

## Dictionaries

The dictionaries used to generate the games are in the `dictionaries` folder:

- [`dictionary.en.txt`](./dictionaries/dictionary.en.txt): English

- [`dictionary.fr.txt`](./dictionaries/dictionary.fr.txt): French

Any correction or addition is very welcome, so we can spice up the game :)

### Development

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
