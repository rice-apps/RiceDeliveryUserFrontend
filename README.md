# Helpful links for general front-end development learning 
- What is react-native? http://www.reactnativeexpress.com/environment
- What is mobx state tree? https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254
- Don't want to use your typical terminal on your mac? Upgrade to Fish! Fish is a shell with really cool features that you can customize on a web interface: https://lobster1234.github.io/2017/04/08/setting-up-fish-and-iterm2/

# How to setup project

### Step 1: Pull from Github

### Step 2: Yarn install

### Step 3: Podfile Install

### Step 4: Link with `react-native link`

### Step 5: Go to Xcode Workspace & Add Tipsi-Stripe into Libraries, following instructions from their site

### Step 6: Click on Link Binaries w/ Libraries and drag libTPSStripe.a

# Developer workflow:


1. Pull the master branch 

    `git pull origin master`

2. Create bug / feature branch: 

    `git checkout -b <branch name>`

3. Make changes and make as many commits as need be. Make sure to name commits starting with branch name! e.g. if branch name is FEATURE 1, make the commit message: 'FEATURE 1: blah blah blah'

4. squash to 1 commit: 

    `git rebase -i HEAD~<Number of commits>`

5. checkout the master branch: 

   `git checkout master`

6. pull the master branch: 

   `git pull origin master`

7. checkout feature branch: 

   `git checkout <branch name>`

8. rebase from master: 

   `git rebase master`

9. push feature branch up: 

    `git push origin <branchname> --force`

# Installation instructions

- Install Homebrew, a package manager:

  `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

- Install react-native: https://facebook.github.io/react-native/docs/getting-started

  `brew install node`

  `brew install yarn`

  `brew install watchman`

  `npm install -g react-native-cli`

- Install Ignite: https://github.com/infinitered/ignite

  `npm install -g ignite-cli`

- Make sure you have Xcode 9.4.1: https://developer.apple.com/download/more/. Once you have it installed it and unzipped the file, rename it to Xcode9.4.1 and drag it into your application folder. Then run: 

  `sudo xcode-select -s /Applications/Xcode9.4.1.app/Contents/Developer`

  `xcode-select -p` - this selects 9.4.1 as your command line tool, which is compatible with the version of xcode we are running.

  you should see this pop up in your terminal:
  `/Applications/Xcode9b1.app/Contents/Developer`

- start boilerplate by running: 

  `yarn install` - this installs all the dependencies needed for the project.
  - If you don't have yarn installed: run `brew install yarn` 

  `react-native run-ios` - this runs the ios simulator. 

#  testIgniteProject

[![Build Status](https://semaphoreci.com/api/v1/ir/ignite-ir-boilerplate-bowser/branches/master/badge.svg)](https://semaphoreci.com/ir/ignite-ir-boilerplate-bowser)



## The latest and greatest boilerplate for Infinite Red opinions

This is the boilerplate that [Infinite Red](https://infinite.red) uses as a way to test bleeding-edge changes to our React Native stack.

Currently includes:

* React Native
* React Navigation
* MobX State Tree
* TypeScript
* And more!

## Quick Start

The Ignite Bowser boilerplate project's structure will look similar to this:

```
ignite-project
├── src
│   ├── app
│   ├── i18n
│   ├── lib
│   ├── models
│   ├── navigation
│   ├── services
│   ├── theme
│   ├── views
├── storybook
│   ├── views
│   ├── index.ts
│   ├── storybook-registry.ts
│   ├── storybook.ts
├── test
│   ├── __snapshots__
│   ├── storyshots.test.ts.snap
│   ├── mock-i18n.ts
│   ├── mock-reactotron.ts
│   ├── setup.ts
│   ├── storyshots.test.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   ├── ignite.json
│   └── plugins
├── index.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
└── package.json
```

The directory structure uses a ["feature first, function second"](https://alligator.io/react/index-js-public-interfaces/) approach to organization. Files are grouped by the feature they are supporting rather than the type of file.

For example: A custom `Button` component would have the main component file, and test, and any assets or helper files all grouped together in one folder.

This is a departure from the previous boilerplate, which grouped files by type (components together, styles together, tests together, images together, etc.). One feature of this new approach is the use of index files which export specific functions from files in the directory to create a public interface for each "thing", or "feature. You'll see that pattern quite a bit in this boilerplate.


## ./src directory

Included in an Ignite boilerplate project is the src directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the src directory looks similar to the following:

```
src
├── app
│── i18n
├── lib
├── models
├── navigation
├── services
├── theme
├── views
```

**app**
This is where a lot of your app's initialization takes place. Here you'll find:
* root-component.tsx - This is the root component of your app that will render your navigators and other views.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**lib**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigation**
This is where your `react-navigation` navigators will live.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**views**
This is where all of your components will live. Both dumb components and screen components will be located here. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components.

You may choose to futher break down this directory by organizing your components into "domains", which represent cohesive areas of your application. For example, a "user" domain could hold all components and screens related to managing a user.

**storybook**
This is where your stories will be registered and where the Storybook configs will live

**test**
This directory will hold your Jest configs and mocks, as well as your [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all your component storybooks.

**ignite**
The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find generators, plugins and examples to help you get started with React Native.

## Running Storybook
From the command line in your generated app's root directory, enter `yarn run storybook`
This starts up the storybook server.

In `src/app/main.tsx`, change `SHOW_STORYBOOK` to `true` and reload the app.

For Visual Studio Code users, there is a handy extension that makes it easy to load Storybook use cases into a running emulator via tapping on items in the editor sidebar. Install the `React Native Storybook` extension by `Orta`, hit `cmd + shift + P` and select "Reconnect Storybook to VSCode". Expand the STORYBOOK section in the sidebar to see all use cases for components that have `.story.tsx` files in their directories.

## Previous Boilerplates

* [2017 aka Andross](https://github.com/infinitered/ignite-ir-boilerplate-andross)
* [2016 aka Ignite 1.0](https://github.com/infinitered/ignite-ir-boilerplate-2016)

## Premium Support

[Ignite CLI](https://infinite.red/ignite) and [Ignite IR Boilerplate](https://github.com/infinitered/ignite-ir-boilerplate-bowser), as open source projects, are free to use and always will be. [Infinite Red](https://infinite.red/) offers premium Ignite CLI support and general mobile app design/development services. Email us at [hello@infinite.red](mailto:hello@infinite.red) to get in touch with us for more details.