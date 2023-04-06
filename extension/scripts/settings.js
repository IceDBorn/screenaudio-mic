const table = document.getElementById('blacklisted')
const remove = document.getElementById('remove-btn')
const clear = document.getElementById('clear-btn')
const placeholder = document.getElementById('placeholder')

function addItem(item) {
  const tr = document.createElement('tr')
  const th = document.createElement('th')
  const div = document.createElement('div')
  const input = document.createElement('input')
  const label = document.createElement('label')

  div.className = 'form-check'
  th.scope = 'row'
  input.className = 'form-check-input'
  input.type = 'checkbox'
  input.id = 'item'
  label.className = 'form-check-label'
  label.htmlFor = 'item'
  label.innerText = item

  div.appendChild(input)
  div.appendChild(label)

  th.appendChild(div)

  tr.appendChild(th)

  table.appendChild(tr)

  placeholder.hidden = true
}

function populateBlacklistedList() {
  for (const item of JSON.parse(window.localStorage.getItem('blacklistedNodes'))) {
    const parsedItem = JSON.parse(item)
    addItem(`${parsedItem.name} (${parsedItem.id})`)
  }
}

remove.addEventListener('click', () => {
  let items = Array.from(table.children)

  for (const item of items) {
    const children = item.firstElementChild.firstElementChild
    if (children) {
      if (children.firstElementChild.checked) {
        let blacklistedNodes = JSON.parse(window.localStorage.getItem('blacklistedNodes'))
        blacklistedNodes = blacklistedNodes.filter(node => node === JSON.stringify(children.lastElementChild.innerText))
        table.removeChild(item)
        items = Array.from(table.children)
        window.localStorage.setItem('blacklistedNodes', JSON.stringify(blacklistedNodes))
      }
      if (items.length <= 1) {
        placeholder.hidden = false
      }
    }
  }
})

populateBlacklistedList()

clear.addEventListener('click', () => {
  if (confirm('Remove all blacklisted nodes?')) {
    window.localStorage.setItem('blacklistedNodes', new Array())
    table.innerHTML = null
    populateBlacklistedList()
}
})