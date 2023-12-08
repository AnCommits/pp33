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

async function lock_click(id) {
    await fetch('/api/user/lock/' + id, {
        method: 'PUT',
        body: document.getElementById('user_locked_id_' + id).checked
    })
}

async function save_new_user_click() {
    const id = 0
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const birthdate = document.getElementById('birthdate').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const message = checkName(firstname, lastname) + checkBirthDate(birthdate) +
        checkEmail(email, id) + checkPassword(password)
    if (message !== '') {
        alert(message)
        return
    }
    const age = getAge(birthdate)
    const roles = $('select#roles').val()
    const parentAdminId = Number(document.getElementById('my_id').textContent)

    const user = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        email: email,
        locked: false,
        password: password,
        parentAdminId: parentAdminId,
        roles: roles
    }
    let response = await fetch('/api/user/new_user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(user)
    })
    let result = await response.json()
}

//

//     document.getElementById('user_password_id_' + id).textContent = await response.text()
//
//     document.getElementById('user_age_id_' + id).textContent = age.toString()
//     document.getElementById('user_birthdate_id_' + id).textContent = birthdate
//     document.getElementById('user_firstname_id_' + id).textContent = firstname
//     document.getElementById('user_lastname_id_' + id).textContent = lastname
//
//     let myEmail = document.getElementById('my_email')
//     let oldEmail = document.getElementById('user_email_id_' + id)
//     if (oldEmail.textContent === myEmail.textContent) {
//         myEmail.textContent = email
//         document.getElementById('my_roles').textContent = rolesNow.toString()
//     }
//     oldEmail.textContent = email
//
//     let innerUl = ''
//     rolesNow.forEach(r => {
//         innerUl += '<li class="list-group-item p-0" name="role_user_' + id + '">' + r + '</li>'
//     })
//     document.getElementById('user_roles_id_' + id).innerHTML = innerUl
//     document.getElementById('user_link_' + id).textContent = firstname + ' ' + lastname
//
//     modal.modal('hide')
// });

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
            if (emails[i].id !== ('user_email_id_' + id)) {
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
