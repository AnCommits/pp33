function left_block_click_user(clickedNumber) {
    let nav = document.getElementById('left_block_nav')
    let links = nav.getElementsByClassName('nav-link')
    for (i in links) {
        links[i].className = 'nav-link'
    }

    let elTo = document.getElementById('user_link_' + clickedNumber)
    elTo.className = 'nav-link active disabled'
    let list = document.getElementById('list_of_users')
    let line = list.getElementsByClassName('about_user')
    for (i in line) {
        line[i].hidden = true
    }
    let columns = document.getElementsByClassName('about_hide')
    if (clickedNumber !== 0) {
        document.getElementById('tr_id_' + clickedNumber).hidden = false
        document.getElementById('title2').textContent = 'О пользователе'
    } else {
        let list = document.getElementById('list_of_users')
        let line = list.getElementsByClassName('about_user')
        for (i in line) {
            line[i].hidden = false
        }
        document.getElementById('title2').textContent = 'Пользователи'
    }
    for (i in columns) {
        columns[i].hidden = clickedNumber !== 0
    }
}

function new_user_click() {
    document.getElementById('users_panel').hidden = true
    document.getElementById('new_user_panel').hidden = false
}

function users_click() {
    document.getElementById('new_user_panel').hidden = true
    document.getElementById('users_panel').hidden = false
}


function save_new_user_click() {
    console.log('save_new_user_click')
}