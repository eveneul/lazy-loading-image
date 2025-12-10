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
			if (!entry.isIntersecting) return

			const image = entry.target.querySelector('.c-image__image')
			if (!image) return

			animDepixelate(image)

			inViewObserver.unobserve(entry.target)
		})
	},
	{
		threshold: 0,
		rootMargin: '0px 0px -20% 0px'
	}
)

images.forEach((image) => {
	inViewObserver.observe(image)
})
