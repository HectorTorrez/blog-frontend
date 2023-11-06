export const saveImageToLocalStorage = (imageFile: File): void => {
  const reader = new FileReader()

  reader.onloadend = function () {
    const base64String = reader.result
    if (base64String !== null) {
      localStorage.setItem('image', base64String as string)
    }
  }

  reader.readAsDataURL(imageFile)
}
