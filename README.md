# Lightning Lunch - UI

Now that the backend has been created, it is time to create the UI.

If your backend is not working, or is incomplete, then you can find a working version [here](https://github.com/sainsburys-tech/jumpstart-lightninglunch-backend).

## Getting started

Run `yarn` to install dependencies. You will need to have a `NEXUS_TOKEN` to do this. You should have been provided with one prior to today. If you don't have one then let us know and we will sort it out for you.

The nexus token needs to be set as an environment variable.

```bash
EXPORT NEXUS_TOKEN=<token>
```

To persist this token when restarting your terminal, you will need the following line to your `~/.bashrc` or `~/.zshrc`:

```bash
EXPORT NEXUS_TOKEN=<token>
```

And then either restart your terminal, or run `source ~/.bashrc` or `source ~/.zshrc`.

Run `yarn start` to start the application.

## Useful extensions

It is highly recommended that you install [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Prettier enforces consistent styling to your code (e.g. removing unnecessary whitespace, new lines etc), keeping it clean and readable.

Once the extension has been installed, you may have to enable it.  
In the VS Code settings, make sure that the default formatter is prettier, and that format on save is enabled.

Many teams also use [eslint](https://eslint.org/). Whilst it has not been added for this application, if you are joining a UI team then it is likely that you will be required to install it. Whilst prettier can be used to enforce consistent styling, eslint can help enforce best practices (e.g. removing unused imports, or adherence to a [style guide](https://github.com/airbnb/javascript)).

## Project Steps:

Below you can find the steps for the project. We will be working through these steps as a group, but feel free to read ahead if you are working fast! :)

[Step 1](./steps/Step1.md)
[Step 2](./steps/Step2.md)
[Step 3](./steps/Step3.md)
[Step 4](./steps/Step4.md)
[Step 5](./steps/Step5.md)

## Learn More

Flexbox:

- https://flexboxfroggy.com/
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/

CSS Grid:

- https://cssgridgarden.com/
- https://css-tricks.com/snippets/css/complete-guide-grid/
- https://learncssgrid.com/

React:

- https://reactjs.org/tutorial/tutorial.html
- https://reactforbeginners.com/
  - Previous grads got the company to pay for this course, if you are interested then let one of us know then we can send you the details.

Component libraries:

- Luna (Sainsburys) - https://jsainsburyplc.github.io/luna/
- Bolt (Argos) - https://sainsburys-tech.github.io/dig-bolt-monorepo-ui/@sainsburys-tech/bolt/index.html

Part of this skeleton was created using [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

To learn more about React, check out the [React documentation](https://reactjs.org/).
