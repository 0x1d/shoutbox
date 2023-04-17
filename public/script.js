const gun = Gun({ peers: [`${window.origin}/gun`] })
const data = gun.get('posts')

const dtf = new Intl.DateTimeFormat('de-CH', {
    dateStyle: 'short',
    timeStyle: 'short'
})

const formTpl = () => `
    <button id="write">Write something...</button>
    <form id="message-form">
        <textarea class="message-field" rows="6"></textarea><br>
        <button type="submit">Post</button>
        <button type="reset">Cancel</button>
    </form>
`

const postTpl = (id, dt, msg) => `
    <div id="${id}" class="post">${dt}<br>${msg}</div>
`

const app = () => `
    <div class="content">
        ${formTpl()}
        <div class="posts"></div>
    </div>
`

const renderPost = (entry, id) => {
    if (!$(`#${id}`).get(0)) {
        $('.posts').prepend(
            postTpl(
                id,
                dtf.format(entry.dt),
                entry.message.replaceAll('\n', "<br>")
            )
        )
    }
}
const encodeHTML = (s) => {
    return s.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
const bindEvents = (dataStore) => {

    let msgForm = $('#message-form')
    let writeButton = $('#write')

    let toggleForm = () => {
        writeButton.toggle()
        msgForm.toggle()
    }

    msgForm
        .on('submit', (event) => {
            event.preventDefault()
            let msg = $(event.target).find('.message-field')
            if (msg.val().length < 10) {
                alert('come on, write a bit more')
                return
            }
            dataStore.set({
                dt: new Date().getTime(),
                message: encodeHTML(msg.val())
            })
            msg.val('')
            toggleForm()
        }).on('reset', (e) => {
            e.preventDefault()
            writeButton.toggle()
            msgForm.toggle()
        })

    // write something button
    writeButton.on('click', (e) => {
        msgForm.toggle()
        writeButton.toggle()
    })
}

$(document).ready(() => {

    $('body').append(app())

    data.map().on(renderPost)

    bindEvents(data)

})