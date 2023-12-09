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
    // const age = getAge(birthdate)
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

    let response = await fetch('/admin/api/save-user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(user)
    })
    if (response.ok) {
        user = await response.json()
        id = user.id
        password = user.password

        console.log(id)
        console.log(password)
        // const newTr = document.createElement('tr')
        // newTr.setAttribute('id', 'about_user_' + id)
        // newTr.setAttribute('class', 'about_user')
        // let innerTr = document.getElementById('right_block_user_new_user').innerHTML
        // innerTr = innerTr.replaceAll('new_user', id.toString())
        // newTr.innerHTML = innerTr
        // document.getElementById('right_block_users').appendChild(newTr)
        //
        // document.getElementById('user_id_' + id).textContent = id.toString()
        // setTextContent(user)
        // document.getElementById('user_age_' + id).textContent = age
        // document.getElementById('user_email_' + id).textContent = email
        // document.getElementById('user_password_' + id).textContent = password
        // document.getElementById('user_parent_id_' + id).textContent = parentAdminId.toString()


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

function checkPassword(password) {
    return password.length < 2
        ? 'Длина пароля должна быть не менее 2 символов.\n'
        : ''
}

function users_click() {
    document.getElementById('new_user_panel').hidden = true
    document.getElementById('users_panel').hidden = false
}
