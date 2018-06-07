const blurMin = 0
const blurMax = 8
const lightnessMax = 40
const lightnessMin = 31
const scoreMin = 0
const scoreMax = 141

let metaScores = document.getElementsByClassName('meta-score')
for (let i = 0; i < metaScores.length; i++) {
  const metaScore = metaScores[i].innerText
  const percent = (metaScore - scoreMin) / (scoreMax - scoreMin)
  const lightness = percent * (lightnessMin - lightnessMax) + lightnessMax
  const blur = percent * (blurMax - blurMin) + blurMin
  metaScores[i].style.setProperty('--score-lightness', `${lightness}%`)
  metaScores[i].style.setProperty('--score-blur', `${blur}px`)
}
