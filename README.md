# @cfware/loading [![NPM Version][npm-image]][npm-url]

Display a loading spinner until the `loaded` attribute is set to the document body.

## Usage

Create `loading.js`:
```js
import '@cfware/loading';
```

Create `index.html`:
```html
<!doctype html>
<html lang="en-US">
	<head>
		<meta charset="utf-8">

		<script type="module" src="loading.js"></script>
		<script type="module" defer src="app.js"></script>
	</head>
	<body>
	</body>
</html>
```

Create `app.js`, ensure it runs `document.body.setAttribute('loaded', '')` when the
application is ready to be displayed.

[npm-image]: https://img.shields.io/npm/v/@cfware/loading.svg
[npm-url]: https://npmjs.org/package/@cfware/loading
