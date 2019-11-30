const { ipcRenderer, shell } = require('electron')

// Add event listener to the url form to add new urls
window.onload = function() {
    document.getElementById('url_form').addEventListener('submit', (evt) => {
        evt.preventDefault()
        const input = evt.target[0]
        const title = evt.target[1]
        ipcRenderer.send('add-todo', input.value, title.value)

        // reset fields
        input.value = ''
        title.value = ''
    })
}

// Renderer all items
ipcRenderer.on('todos', (event, items) => {
    const todoList = document.getElementById('read_list')

    if (items.length === 0) {
        todoList.innerHTML = `<p class="text-center">List is empty.</p>`
        return
    }

    const todoItems = items.reduce((html, item) => {
        var display_url = (' ' + item.url).slice(1);
        if (display_url.length > 30) {
            display_url = display_url.substring(0, 30) + '...'
        }
        html += `
        <div id="${item.url}" class="row m-2 border border-info item"><div class="read-item col-8 p-0">
                <p class="m-0 h6 item-title">${item.title}</p>
                <p><i>${display_url}</i></p>
            </div><div class="read-complete col-4 m-0">
                <div class="button">
                    <p>Complete</p>
                </div>
            </div>
        </div>`
        return html
    }, '')
    todoList.innerHTML = todoItems

    // attach event listeners for button click
    todoList.querySelectorAll('.item').forEach(item => {
        //console.log("added complete button listener")
        item.childNodes[0].addEventListener('click', function() {
            shell.openExternal(item.id)
        })

        item.childNodes[1].addEventListener('click', function() {
            ipcRenderer.send('delete-todo', item.id)
        })
    })
})

ipcRenderer.send('renderer_ready')