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

function save_new_user_click() {
    const id = 0
    const email = document.getElementById('email').value
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    if (!checkEmail(email, id) || !checkName(firstname, lastname)) {
        return
    }
    const birthdate = modal.find('#user-birthdate').val()
    const age = getAndCheckAge(birthdate)
    if (age === 'false') {
        return
    }
    const password = document.getElementById('password').value

}

//     const password = modal.find('#user-password').val()
//     console.log(password)
//     console.log(password.length)
//     if (password.length < 2) {
//         alert('Длина пароля должна быть не менее 2 символов.')
//         return
//     }
//
//     function rolesBeforeIncludesAdmin() {
//         const rolesBefore = (document.getElementsByName('role_user_' + id))
//         for (let i = 0; i < rolesBefore.length; i++) {
//             if (rolesBefore[i].textContent === 'ADMIN') {
//                 return true
//             }
//         }
//         return false
//     }
//
//     const rolesNow = $('select#user-roles').val()
//     const parentAdminId = rolesBeforeIncludesAdmin() !== rolesNow.includes('ADMIN')
//         ? Number(document.getElementById('my_id').textContent)
//         : document.getElementById('user_parent_id_id_' + id).textContent
//
//     const age = getAge(birthdate)
//     if (age === 'false') {
//         alert('Некорректная дата')
//         return
//     }
//
//     const user = {
//         id: id,
//         firstname: firstname,
//         lastname: lastname,
//         birthdate: birthdate,
//         email: email,
//         locked: document.getElementById('user_locked_id_' + id).checked,
//         password: password,
//         parentAdminId: parentAdminId,
//         roles: rolesNow
//     }
//
//     let response = await fetch('/api/user/update', {
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json; charset=utf-8'},
//         body: JSON.stringify(user)
//     });
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
    if (firstname === '' || lastname === '') {
        alert('Поля Имя и Фамилия обязательны для заполнения.')
        return false
    }
    return true
}

function checkEmail(email, id) {
    if (email === '') {
        alert('Поле Е-мэйл обязательно для заполнения.')
        return false
    }
    if (emailExists(email, id)) {
        alert(email + ' уже зарегистрирован. Используйте другой е-мэйл.')
        return false
    }
    return true
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

function getAndCheckAge(birthday) {
    if (birthday === '') {
        return ''
    }
    if (Date.now() < new Date(birthday).getTime()) {
        alert('Некорректная дата рождения')
        return 'false';
    }
    return ((new Date(Date.now() - new Date(birthday).getTime())).getUTCFullYear() - 1970).toString();
}
