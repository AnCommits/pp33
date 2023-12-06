$('#userDialog').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget)
    const id = button.data('id')
    document.getElementById('user-id').value = id
    document.getElementById('user-firstname').value =
        document.getElementById('user_firstname_id_' + id).textContent
    document.getElementById('user-lastname').value =
        document.getElementById('user_lastname_id_' + id).textContent
    document.getElementById('user-birthdate').value =
        document.getElementById('user_birthdate_id_' + id).textContent
    document.getElementById('user-email').value =
        document.getElementById('user_email_id_' + id).textContent

    const options = document.getElementsByName('option')
    const optionsSize = options.length
    const roles = document.getElementsByName('role_user_' + id)
    const rolesSize = roles.length

    options.forEach(o => {
        document.getElementById('user_role_' + o.value).selected = false
    })
    for (let r = 0; r < rolesSize; r++) {
        for (let o = r; o < optionsSize; o++) {
            if (roles[r].textContent === options[o].value) {
                let el = document.getElementById('user_role_' + options[o].value)
                document.getElementById('user_role_' + options[o].value).selected = true
                break
            }
        }
    }

    // modal_roles.size = Math.max(, Number(selectSize))


    // const roles = document.getElementById('user_roles_id_' + id)
    // console.log(roles)

    // console.log(els[0].innerText)
    // console.log(els[1].innerText)

    // const roles = button.data('roles')
    // const rolesNames = document.getElementById('all_roles').textContent
    // const allRoles = rolesNames.substring(1, rolesNames.length - 1).split(', ')
    // for (let i in allRoles) {
    //     let el = document.getElementById('role_' + allRoles[i])
    //     if (roles.includes(allRoles[i])) {
    //         el.selected = true
    //     } else {
    //         el.removeAttribute('selected')
    //     }
    // }
    // document.getElementById('user-password').value = button.data('password')

    if ((button.data('action') === 'update')) {
        document.getElementById('userDialogLabel').textContent = 'Редактировать пользователя'
        document.getElementById('delete-user-button').hidden = true
        document.getElementById('save-user-button').hidden = false
        document.getElementById('user-firstname').disabled = false
        document.getElementById('user-lastname').disabled = false
        document.getElementById('user-birthdate').disabled = false
        document.getElementById('user-email').disabled = false
        document.getElementById('user-password-area').hidden = false
        document.getElementById('user-roles').disabled = false

        // const roles = button.data('roles')
        // const rolesNames = document.getElementById('all_roles').textContent
        // const allRoles = rolesNames.substring(1, rolesNames.length - 1).split(', ')
        // for (let i in allRoles) {
        //     let el = document.getElementById('role_' + allRoles[i])
        //     if (roles.includes(allRoles[i])) {
        //         el.selected = true
        //     } else {
        //         el.removeAttribute('selected')
        //     }
        // }
    } else {
        document.getElementById('userDialogLabel').textContent = 'Удалить пользователя'
        document.getElementById('delete-user-button').hidden = false
        document.getElementById('save-user-button').hidden = true
        document.getElementById('user-firstname').disabled = true
        document.getElementById('user-lastname').disabled = true
        document.getElementById('user-birthdate').disabled = true
        document.getElementById('user-email').disabled = true
        document.getElementById('user-password-area').hidden = true
        document.getElementById('user-roles').disabled = true
    }
})

$('#save-user-button').click(async function () {
    const modal = $('#userDialog')
    const id = modal.find('#user-id').val()
    const email = modal.find('#user-email').val()
    const elementWithSuchEmail = document.getElementById('user_id_' + email);
    if (elementWithSuchEmail !== null) {
        if (id !== elementWithSuchEmail.textContent) {
            alert(email + ' уже зарегистрирован. Используйте другой е-мэйл.')
            return
        }
    }
    const firstname = modal.find('#user-firstname').val()
    const lastname = modal.find('#user-lastname').val()
    const birthdate = modal.find('#user-birthdate').val()
    // const password = modal.find('#user-password').val()
    // const roles = $('select#roles').val()

    // console.log(document.getElementById('user_locked_id_' + id))

    const user = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        email: email,
        locked: document.getElementById(id)
        // password: document.getElementById('user_locked_id_' + id)
        // roles: roles
    }

    await fetch('/api/user/update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(user)
    });
    modal.modal('hide')
    document.getElementById('user_firstname_id_' + id).textContent = firstname
    document.getElementById('user_lastname_id_' + id).textContent = lastname
    // console.log(birthdate)
});

$('#delete-user-button').click(async function () {
    const modal = $('#userDialog')
    const id = modal.find('#user-id').val()

    await fetch('/api/user/delete/' + id, {
        method: 'DELETE'
    })
    modal.modal('hide')
    document.getElementById('user_id_' + id).remove()
})
