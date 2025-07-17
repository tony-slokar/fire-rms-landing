// demo.js
// All components are now loaded via individual script tags in index.html.
// This final script just calls ReactDOM.render to start the application.

ReactDOM.render(
  React.createElement(App),
  document.getElementById('react-app-container')
);
