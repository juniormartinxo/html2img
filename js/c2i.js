const C2I = (function () {
  const $support = (function () {
    const canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d')

    return {
      canvas: !!ctx,
      imageData: !!ctx.getImageData,
      dataURL: !!canvas.toDataURL,
      btoa: !!window.btoa,
    }
  })()

  const downloadMime = 'image/octet-stream'

  function scaleCanvas(canvas, width, height) {
    const w = canvas.width,
      h = canvas.height
    if (width === undefined) {
      width = w
    }
    if (height === undefined) {
      height = h
    }

    let retCanvas = document.createElement('canvas')
    let retCtx = retCanvas.getContext('2d')
    retCanvas.width = width
    retCanvas.height = height
    retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height)
    return retCanvas
  }

  function getDataURL(canvas, type, width, height) {
    canvas = scaleCanvas(canvas, width, height)
    return canvas.toDataURL(type)
  }

  function saveFile(strData) {
    return strData
  }

  function fixType(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg')
    const r = type.match(/png|jpeg|bmp|gif/)[0]
    return 'image/' + r
  }

  /**
   * saveAsImage
   * @param canvas canvasElement
   * @param width {String} image type
   * @param height {Number} [optional] png width
   * @param type {string} [optional] png height
   * @param fileName {String} image name
   */
  const saveAsImage = function (canvas, fileName, url, width, height, type) {
    const fileType = type

    if ($support.canvas && $support.dataURL) {
      if (typeof canvas == 'string') {
        canvas = document.getElementById(canvas)
      }

      if (type === undefined) {
        type = 'png'
      }

      type = fixType(type)

      const strData = getDataURL(canvas, type, width, height)

      let image = saveFile(strData.replace(type, downloadMime))

      fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ _image: image, _fileName: fileName }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(data => {
          /*console.log(data)*/
        })
        .catch(err => console.log(err))
    }
  }

  return {
    saveAsImage: saveAsImage,
    saveAsPNG: function (canvas, fileName, url, width, height) {
      return saveAsImage(canvas, fileName, url, width, height, 'png')
    },
    saveAsJPEG: function (canvas, fileName, url, width, height) {
      return saveAsImage(canvas, fileName, url, width, height, 'jpeg')
    },
  }
})()
