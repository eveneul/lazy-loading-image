import {animDepixelate} from './utils/ainmDepixelate.js'
import Rivus from '../lib/rivus/rivus.js'

window.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('[data-rivus]').forEach((rivus) => {
		new Rivus(rivus)
	})
})
