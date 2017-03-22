[![npm](https://img.shields.io/npm/v/mystical-notification.svg)](https://www.npmjs.com/package/mystical-notification)
[![npm](https://img.shields.io/npm/dt/mystical-notification.svg?label=npm%20downloads)](https://www.npmjs.com/package/mystical-notification)
# Mystical-Notification
#### Just some notification crap I needed for a web app. Could use some TLC.


<!--![MysticalNotification](screens/demo.gif)-->

### Explanation
I needed a simple auto complete component for a web app that supported keyboard navigation.
I wanted something light weight and flexible.
After searching around, nothing fit my use case or desire. The component
defaults to Material Design-like styling. This is customizable by setting `itemClass` and `listClass` when creating the component. PRs welcome to improve functionality.
Just want to keep this light weight :smile:


### Installation
`npm install mystical-notification`

### Usage
`mystical` is exposed as a library thanks to Webpack so using a `<script>` tag on your html will work. You can also import/require what you need using the module if you're using a module loader for your app.
### JS
```js
mystical.Mystical.alert({
    color: "#ff4081",
    backgroundColor: "#222",
    template: `
      <div style="padding: 5px">
          <h3> Go Away </h3>
          <label> I don't care what you do man. </label>
      </div>
    `
  });
```

### Public Methods
- `alert(options: MysticalOptions)` - show simple notification


### MysticalOptions 
```ts
interface MysticalOptions {
    template: string;
    backgroundColor?: string;
    color?: string;
    position?: string; // top or bottom for now
}
```
### Contributing
- `git clonehttps://github.com/bradmartin/mystical-notification.git`
- `npm install` - install deps
- `npm run dev` - will transpile and kick off the webpack dev server
