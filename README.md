# Virtual-Keyboard
## Result - [Virtual-Keyboard](https://regemler.github.io/Virtual-Keyboard/)
### Technical requirements
- usage of JQuery and other JS libraries is **not allowed**
- usage of Bootstrap and other UI libraries is **not allowed**
- usage of Angular/React/Vue and other frameworks is **not allowed**
- you can use CSS preprocessors
- [ESLint (eslint-config-airbnb-base)](https://eslint.org/) should be used. It is allowed to add to the .eslintrc.js file ignoring the 'import/extensions' rule in case of using modules and needing to import them into the main file.
- the virtual keyboard is able to switch between two language layouts (English + any other language).
- the buttons on the virtual keyboard display symbols of a selected language
- the application saves a chosen language after the page is reloaded and displays the keyboard on that language
- clicks on the buttons with a mouse on the virtual keyboard and pressing keys on a physical keyboard should input symbols to the text area located on the page above the virtual keyboard
- pressing the Up, Down, Left or Right arrow key inputs an arrow symbol in the input field, or implements navigation on the text area.
- pressing the Enter should move a text cursor to the next line
- the Tab key creates a horizontal indent
- pressing the rest of the function keys on a keyboard does not result in inputting symbols
- the Backspace key removes character before the text cursor
- the Del key removes character after the text cursor
- the Shift, Alt, Ctrl, Caps lock and Space keys should work as on a real keyboard
