export const linkify = (inputText: string): string => {
  let replacedText: RegExp | string = ''
  let replacePattern1: RegExp | string = ''
  let replacePattern2: RegExp | string = ''
  let replacePattern3: RegExp | string = ''

  // URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>')

  // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>')

  // Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-.])+@[a-zA-Z0-9\-.]+\.[a-zA-Z0-9]{2,5})/gim
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>')

  return replacedText
}
