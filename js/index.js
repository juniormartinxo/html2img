const btnSave = document.getElementById('btn-save')
const imgOut = document.getElementById('img-out')

const target = $('#target')

btnSave.addEventListener('click', function (e) {
  const imageName = Math.floor(Date.now() * Math.random()).toString(36)
  const url = 'base64ToImage.php'

  html2canvas(target, {
    onrendered: function (canvas) {
      theCanvas = canvas
      document.body.appendChild(canvas)
      C2I.saveAsPNG(canvas, imageName, url)

      imgOut.appendChild(canvas)
    },
  })
})
