function left_block_click_user(clickedNumber) {
    let nav = document.getElementById('left_block_nav')
    let links = nav.getElementsByClassName('nav-link')
    for (i in links) {
        links[i].className = 'nav-link'
    }
    // console.log(links)
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
    } else {
        let list = document.getElementById('list_of_users')
        let line = list.getElementsByClassName('about_user')
        for (i in line) {
            line[i].hidden = false
        }
    }
    for (i in columns) {
        columns[i].hidden = clickedNumber !== 0
    }

}
