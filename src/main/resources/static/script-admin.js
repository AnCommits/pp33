async function adminPage(myId) {
    const response = await fetch('/admin/api/get-all-users')
    if (response.ok) {
        const users = await response.json()
        document.getElementById('my_id').textContent = myId
        users.forEach(user => {
            putUserOnLeftBlock(user)
            putUserOnRightBlock(user)
        })
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
    const newTr = document.createElement('tr')
    newTr.setAttribute('class', 'about_user')
    newTr.setAttribute('id', 'about_user_' + user.id)
    newTr.innerHTML = document.getElementById('right_block_user_new_user').innerHTML
        .replaceAll('new_user', user.id.toString())
    document.getElementById('right_block_users').appendChild(newTr)

    document.getElementById('user_id_' + user.id).textContent = user.id.toString()
    document.getElementById('user_firstname_' + user.id).textContent = user.firstname
    document.getElementById('user_lastname_' + user.id).textContent = user.lastname
    document.getElementById('user_birthdate_' + user.id).textContent =
        user.birthdate === null ? '' : user.birthdate.substring(0, 10)
    document.getElementById('user_age_' + user.id).textContent = getAge(user.birthdate)
    document.getElementById('user_email_' + user.id).textContent = user.email
    document.getElementById('user_password_' + user.id).textContent = user.password
    document.getElementById('user_parent_id_' + user.id).textContent = user.parentAdminId.toString()
    putRolesIntoRolesTag('user_roles_' + user.id, user.roles)
}

function left_block_user_click(id) {
    handleClick('left_block_user_' + id, true)
    document.getElementById('title2').textContent = 'О пользователе'
    document.getElementById('about_user_' + id).hidden = false
}

function left_block_admin_click() {
    handleClick('left_block_admin', false)
    document.getElementById('title2').textContent = 'Пользователи'
}

function handleClick(elementId, hide) {
    let links = document.getElementById('left_block').getElementsByClassName('nav-link')
    for (i in links) {
        links[i].className = 'nav-link'
    }
    document.getElementById(elementId).className = 'nav-link active disabled'
    let line = document.getElementById('right_block_users').getElementsByClassName('about_user')
    for (i in line) {
        line[i].hidden = hide
    }
    let columns = document.getElementsByClassName('admin_column')
    for (i in columns) {
        columns[i].hidden = hide
    }
}

async function lock_click(id) {
    await fetch('/admin/api/lock/' + id, {
        method: 'PUT',
        body: document.getElementById('user_locked_' + id).checked
    })
}
//------------------------------------------------------------------------------------------------------------

// function new_user_click() {
//     document.getElementById('users_panel').hidden = true
//     document.getElementById('new_user_panel').hidden = false
// }

// function users_click() {
//     document.getElementById('new_user_panel').hidden = true
//     document.getElementById('users_panel').hidden = false
// }


// async function save_new_user_click() {
//     let id = 0
//     const firstname = document.getElementById('firstname').value
//     const lastname = document.getElementById('lastname').value
//     const birthdate = document.getElementById('birthdate').value
//     const email = document.getElementById('email').value
//     let password = document.getElementById('password').value
//     const message = checkName(firstname, lastname) + checkBirthDate(birthdate) +
//         checkEmail(email, id) + checkPassword(password)
//     if (message !== '') {
//         alert(message)
//         return
//     }
//     const age = getAge(birthdate)
//     const roles = $('select#roles').val()
//     const parentAdminId = document.getElementById('my_id').textContent
//
//     let user = {
//         id: id,
//         firstname: firstname,
//         lastname: lastname,
//         birthdate: birthdate,
//         email: email,
//         locked: false,
//         password: password,
//         parentAdminId: Number(parentAdminId),
//         roles: roles
//     }
//
//     let response = await fetch('/api/user/new_user', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json; charset=utf-8'},
//         body: JSON.stringify(user)
//     })
//     if (response.ok) {
//         user = await response.json()
//         id = user.id
//         password = user.password
//
//         // const newTr = document.createElement('tr')
//         // newTr.setAttribute('id', 'about_user_' + id)
//         // newTr.setAttribute('class', 'about_user')
//         // let innerTr = document.getElementById('right_block_user_new_user').innerHTML
//         // innerTr = innerTr.replaceAll('new_user', id.toString())
//         // newTr.innerHTML = innerTr
//         // document.getElementById('right_block_users').appendChild(newTr)
//         //
//         // document.getElementById('user_id_' + id).textContent = id.toString()
//         // setTextContent(user)
//         // document.getElementById('user_age_' + id).textContent = age
//         // document.getElementById('user_email_' + id).textContent = email
//         // document.getElementById('user_password_' + id).textContent = password
//         // document.getElementById('user_parent_id_' + id).textContent = parentAdminId.toString()
//
//
//         // document.getElementById('user_roles_new_user').textContent = roles
//         // document.getElementById('role_user_new_user').textContent = role
//
//         // let innerUl = ''
//         // rolesNow.forEach(r => {
//         //     innerUl += '<li class="list-group-item p-0" name="role_user_' + id + '">' + r + '</li>'
//         // })
//
//         // добавить user на левую панель
//
//         users_click()
//     } else {
//         alert('Ошибка HTTP: ' + response.status)
//     }
// }

// function checkName(firstname, lastname) {
//     let message = firstname === '' ? 'Поле Имя обязательно для заполнения.\n' : ''
//     message += lastname === '' ? 'Поле Фамилия обязательно для заполнения.\n' : ''
//     return message
// }

// function checkEmail(email, id) {
//     let message = email === '' ? 'Поле Е-мэйл обязательно для заполнения.\n' : ''
//     message += emailExists(email, id) ? (email + ' уже зарегистрирован. Используйте другой е-мэйл.\n') : ''
//     return message
// }

// function emailExists(email, id) {
//     let emails = document.getElementsByClassName('class_email')
//     for (let i in emails) {
//         if (emails[i].textContent === email) {
//             if (emails[i].id !== ('user_email_' + id)) {
//                 return true
//             }
//         }
//     }
//     return false
// }

// function checkBirthDate(birthday) {
//     if (birthday === '') {
//         return ''
//     }
//     return Date.now() < new Date(birthday).getTime() ? 'Некорректная дата рождения.\n' : ''
// }

// function checkPassword(password) {
//     return password.length < 2
//         ? 'Длина пароля должна быть не менее 2 символов.\n'
//         : ''
// }

// function rolesBeforeIncludesAdmin(id) {
//     const rolesBefore = (document.getElementsByName('role_user_' + id))
//     for (let i = 0; i < rolesBefore.length; i++) {
//         if (rolesBefore[i].textContent === 'ADMIN') {
//             return true
//         }
//     }
//     return false
// }

// function setTextContent(user) {
//     document.getElementById('user_firstname_' + user.id).textContent = user.firstname
//     document.getElementById('user_lastname_' + user.id).textContent = user.lastname
//     document.getElementById('user_birthdate_' + user.id).textContent =
//         user.birthdate === null ? '' : user.birthdate.substring(0, 10)
// }
