import {animDepixelate} from './utils/ainmDepixelate.js'

const startButton = document.getElementById('start')
const targetImg = document.querySelector('.c-image__image')

startButton.addEventListener('click', () => {
	animDepixelate(targetImg)
})
