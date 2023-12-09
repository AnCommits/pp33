window.onload = async function () {
    const responseMe = await fetch('/api/get-me')
    if (responseMe.ok) {
        const me = await responseMe.json()
        putMyDataInHeader(me)
        if (document.getElementById('header_my_roles').textContent.includes('ADMIN')) {
            await adminPage(me.id)
        } else {
            putMyDataInLeftBlock(me)
            putMyDataInRightBlock(me)
        }
    } else {
        alert('Ошибка HTTP: ' + responseMe.status)
    }
}

function putMyDataInHeader(user) {
    let myRoles = []
    user.roles.forEach(r => myRoles.push(r.name))
    document.getElementById('header_my_email').textContent = user.email
    document.getElementById('header_my_roles').textContent =
        myRoles.toString().replaceAll(',', ', ')
}

function putMyDataInLeftBlock(user) {
    document.getElementById('left_block_me').textContent = user.firstname + ' ' + user.lastname
}

function putMyDataInRightBlock(user) {
    document.getElementById('right_block_id').textContent = user.id
    document.getElementById('right_block_firstname').textContent = user.firstname
    document.getElementById('right_block_lastname').textContent = user.lastname
    document.getElementById('right_block_age').textContent = getAge(user.birthdate)
    document.getElementById('right_block_email').textContent = user.email
    putRolesIntoLiTags('right_block_roles', user.roles)
}

function putRolesIntoLiTags(tagId, roles) {
    for (let i in roles) {
        const tagLi = document.createElement('li')
        tagLi.innerHTML = '<li class="list-group-item p-0">' + roles[i].name + '</li>'
        document.getElementById(tagId).appendChild(tagLi)
    }
}

function getAge(birthday) {
    return birthday === null
        ? ''
        : ((new Date(Date.now() - new Date(birthday).getTime())).getUTCFullYear() - 1970).toString()
}
