window.onload = async function () {
    const response = await fetch('/api/admin/get-all-users')
    if (response.ok) {
        const users = await response.json()
        const myId = response.headers.get('my-id')
        console.log('myId: ', myId)
        console.log(document.getElementById('my_id'))
        // document.getElementById('my_id').textContent = myId

        // --------------- try forEach
        for (let i in users) {
            let user = users[i]
            // ------------------------------ header ------------------------------
            if (user.id === Number(myId)) {
                let roles = []
                user.roles.forEach(r => roles.push(r.name))
                let adminRoles = roles.toString()
                adminRoles = adminRoles.replaceAll(',' , ', ')
                document.getElementById('my_email').textContent = user.email
                document.getElementById('my_roles').textContent = adminRoles
            }

            // ------------------------------ left block ------------------------------
            putUserOnLeftBlock(user)
            putUserOnRightBlock(user)
        }
    } else {
        alert('Ошибка HTTP: ' + response.status)
    }
}

function putUserOnLeftBlock(user) {
    const newTegA = document.createElement('a')
    newTegA.setAttribute('class', 'nav-link')
    newTegA.setAttribute('href', '#')
    newTegA.setAttribute('onclick', 'left_block_user_click(' + user.id + ')')
    newTegA.setAttribute('id', 'left_block_user_' + user.id)
    newTegA.textContent = user.firstname + ' ' + user.lastname
    document.getElementById('left_block').appendChild(newTegA)
}

function putUserOnRightBlock(user) {
}

//------------------------------------------------------------------------------------------------------------
function left_block_user_click(clickedNumber) {
    let nav = document.getElementById('left_block')
    let links = nav.getElementsByClassName('nav-link')
    for (i in links) {
        links[i].className = 'nav-link'
    }

    let elTo = document.getElementById('left_block_' + clickedNumber)
    elTo.className = 'nav-link active disabled'
    let list = document.getElementById('list_of_users')
    let line = list.getElementsByClassName('about_user')
    for (i in line) {
        line[i].hidden = true
    }
    let columns = document.getElementsByClassName('about_hide')
    if (clickedNumber !== 0) {
        document.getElementById('about_user_' + clickedNumber).hidden = false
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

async function lock_click(id) {
    await fetch('/api/user/lock/' + id, {
        method: 'PUT',
        body: document.getElementById('user_locked_' + id).checked
    })
}

async function save_new_user_click() {
    let id = 0
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const birthdate = document.getElementById('birthdate').value
    const email = document.getElementById('email').value
    let password = document.getElementById('password').value
    const message = checkName(firstname, lastname) + checkBirthDate(birthdate) +
        checkEmail(email, id) + checkPassword(password)
    if (message !== '') {
        alert(message)
        return
    }
    const age = getAge(birthdate)
    const roles = $('select#roles').val()
    const parentAdminId = document.getElementById('my_id').textContent

    let user = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        email: email,
        locked: false,
        password: password,
        parentAdminId: Number(parentAdminId),
        roles: roles
    }

    let response = await fetch('/api/user/new_user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(user)
    })
    if (response.ok) {
        user = await response.json()
        id = user.id
        password = user.password

        const newTr = document.createElement('tr')
        newTr.setAttribute('id', 'about_user_' + id)
        newTr.setAttribute('class', 'about_user')
        let innerTr = document.getElementById('about_user_new_user').innerHTML
        innerTr = innerTr.replaceAll('new_user', id.toString())
        newTr.innerHTML = innerTr
        document.getElementById('list_of_users').appendChild(newTr)

        document.getElementById('user_id_' + id).textContent = id.toString()
        setTextContent(user)
        document.getElementById('user_age_' + id).textContent = age
        document.getElementById('user_email_' + id).textContent = email
        document.getElementById('user_password_' + id).textContent = password
        document.getElementById('user_parent_id_' + id).textContent = parentAdminId.toString()
        // document.getElementById('user_roles_new_user').textContent = roles
        // document.getElementById('role_user_new_user').textContent = role

        // let innerUl = ''
        // rolesNow.forEach(r => {
        //     innerUl += '<li class="list-group-item p-0" name="role_user_' + id + '">' + r + '</li>'
        // })

        // добавить user на левую панель

        users_click()
    } else {
        alert('Ошибка HTTP: ' + response.status)
    }
}

function checkName(firstname, lastname) {
    let message = firstname === '' ? 'Поле Имя обязательно для заполнения.\n' : ''
    message += lastname === '' ? 'Поле Фамилия обязательно для заполнения.\n' : ''
    return message
}

function checkEmail(email, id) {
    let message = email === '' ? 'Поле Е-мэйл обязательно для заполнения.\n' : ''
    message += emailExists(email, id) ? (email + ' уже зарегистрирован. Используйте другой е-мэйл.\n') : ''
    return message
}

function emailExists(email, id) {
    let emails = document.getElementsByClassName('class_email')
    for (let i in emails) {
        if (emails[i].textContent === email) {
            if (emails[i].id !== ('user_email_' + id)) {
                return true
            }
        }
    }
    return false
}

function checkBirthDate(birthday) {
    if (birthday === '') {
        return ''
    }
    return Date.now() < new Date(birthday).getTime() ? 'Некорректная дата рождения.\n' : ''
}

function getAge(birthday) {
    return birthday === ''
        ? ''
        : ((new Date(Date.now() - new Date(birthday).getTime())).getUTCFullYear() - 1970).toString()
}

function checkPassword(password) {
    return password.length < 2
        ? 'Длина пароля должна быть не менее 2 символов.\n'
        : ''
}

function rolesBeforeIncludesAdmin(id) {
    const rolesBefore = (document.getElementsByName('role_user_' + id))
    for (let i = 0; i < rolesBefore.length; i++) {
        if (rolesBefore[i].textContent === 'ADMIN') {
            return true
        }
    }
    return false
}

function setTextContent(user) {
    document.getElementById('user_firstname_' + user.id).textContent = user.firstname
    document.getElementById('user_lastname_' + user.id).textContent = user.lastname
    document.getElementById('user_birthdate_' + user.id).textContent =
        user.birthdate === null ? '' : user.birthdate.substring(0, 10)
}
