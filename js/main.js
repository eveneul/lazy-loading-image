import {animDepixelate} from './utils/ainmDepixelate.js'
import Rivus from '../lib/rivus/rivus.js'

window.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('[data-rivus]').forEach((rivus) => {
		new Rivus(rivus)
	})
})

const images = document.querySelectorAll('.c-image')

const inViewObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const image = entry.target.querySelector('.c-image__image')
				animDepixelate(image)
			}
		})
	},
	{
		root: null,
		rootMargin: '1px',
		threshold: 1
	}
)

images.forEach((image) => {
	inViewObserver.observe(image)
})
