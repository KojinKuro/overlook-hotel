function setDOM(element, html) {
  element.innerHTML = html();
}

function appendDOM(element, html) {
  element.append(html());
}

export { appendDOM, setDOM };
