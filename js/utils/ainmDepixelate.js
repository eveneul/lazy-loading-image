// 특정 이미지 요소에 모자이크 -> 점점 세밀하게 -> 원본으로
// 캔버스를 덮어 씌웠다가 마지막에 캔버스 요소 삭제

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export async function animDepixelate(element) {
	const parentElement = element.parentNode // 이미지 태그의 부모 (인라인 스타일)

	// 기존에 남아 있는 캔버스가 있다면 제거
	const previousCanvas = parentElement.querySelector('canvas')
	if (previousCanvas) previousCanvas.remove()

	// 그게 아니라면 캔버스 생성 + 부모에 추가
	const canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.style.left = '0'
	canvas.style.top = '0'
	canvas.style.width = '100%'
	canvas.style.height = '100%'
	canvas.style.zIndex = '10'

	parentElement.appendChild(canvas)

	// ctx
	const ctx = canvas.getContext('2d', {willReadFrequently: true})

	// 이미지 실제 크기 정보
	const maxWidth = 128
	let w = element.naturalWidth
	let h = element.naturalHeight

	// 너무 큰 이미지는 maxWidth 기준으로 축소
	if (w > maxWidth) {
		h = (maxWidth * h) / w
		w = maxWidth
	}

	const pixelate = async (sample_amout) => {
		return new Promise((resolve) => {
			if (!canvas.parentNode) {
				resolve()
				return
			}

			const sample_size = Math.round(w / sample_amout)

			ctx.canvas.width = w
			ctx.canvas.height = h

			ctx.drawImage(element, 0, 0, w, h)

			const pixelArr = ctx.getImageData(0, 0, w, h).data

			for (let y = 0; y < h; y += sample_size) {
				for (let x = 0; x < w; x += sample_size) {
					const pixcel = (x + y * w) * 4
					ctx.fillStyle = `rgba(${pixelArr[pixcel]}, ${pixelArr[pixcel + 1]}, ${pixelArr[pixcel + 2]}, ${pixelArr[pixcel + 3]})`
					ctx.fillRect(x, y, sample_size, sample_size)
				}
			}

			resolve()
		})
	}

	// 애니메이션 타임라인

	const ITERATION_DELAY = 100

	await pixelate(8)
	await delay(ITERATION_DELAY)
	await pixelate(16)
	await delay(ITERATION_DELAY)
	await pixelate(32)
	await delay(ITERATION_DELAY)
	await pixelate(48)
	await delay(ITERATION_DELAY)
	await pixelate(96)
	await delay(ITERATION_DELAY)
	await pixelate(128)

	// 애니메이션 끝 캔버스 제거
	canvas.remove()
	parentElement.classList.remove('-pixelated')
}
