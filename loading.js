// This file is a bit ugly to optimize first-paint:
//   1. No external resources blocking loader display
//   2. Terser friendly (no multi-line JS templates)
const getSVG = () => {
	const rect = (_, idx) => `<rect x="-4" y="24" ry="10" width="8" height="16" transform="rotate(${idx * 30})" style="animation-delay:${(idx - 11) / 10}s" />`;

	return '' +
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100">' +
			'<style>' +
				'@keyframes cycle{' +
					'from{opacity:0}' +
					'to{opacity:1}' +
				'}' +

				'rect{' +
					'fill:#fffc;' +
					'animation:cycle 1.2s infinite' +
				'}' +
			'</style>' +
			new Array(12).fill()
				.map(rect)
				.join('') +
		'</svg>';
}

const createElement = (tag, properties) => Object.assign(document.createElement(tag), properties);
const createStyle = textContent => createElement('style', {textContent});
const tagName = 'cfware-loading';

customElements.define(tagName, class CFWareLoading extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({mode: 'open'}).append(
			createStyle(
				':host{' +
					'display:grid;' +
					'grid:1fr auto auto 1fr/1fr;' +
					'opacity:1;' +
					'background:#333;' +
					'color:#ddd;' +
					'user-select:none;' +
					'font-size:1.2rem;' +
					'line-height:1;' +
					'text-align:center' +
				'}' +

				'img{' +
					'width:4rem;' +
					'margin:auto' +
				'}'
			),
			createElement('div'),
			createElement('img', {
				alt: '',
				src: `data:image/svg+xml;base64,${btoa(getSVG())}`
			}),
			'Loading'
		);
	}
});

document.head.prepend(createStyle(
	'html,body{' +
		'display:grid;' +
		'height:100%;' +
		'margin:0;' +
		'overflow:hidden' +
	'}' +

	'body[loaded] ' + tagName + ',' +
	'body:not([loaded]) :not(' + tagName + '){' +
		'display:none' +
	'}'
));

document.body.prepend(createElement(tagName));
