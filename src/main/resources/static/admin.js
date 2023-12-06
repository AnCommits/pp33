$('#userDialog').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget)
    document.getElementById('user-id').value = button.data('id')
    document.getElementById('user-firstname').value = button.data('firstname')
    document.getElementById('user-lastname').value = button.data('lastname')
    document.getElementById('user-birthdate').value = button.data('birthdate')
    document.getElementById('user-email').value = button.data('email')
    document.getElementById('user-locked').value = button.data('locked')
    document.getElementById('user-password').value = button.data('password')

    if ((button.data('action') === 'update')) {
        document.getElementById('userDialogLabel').textContent = 'Редактировать пользователя'
        document.getElementById('delete-user-button').hidden = true
        document.getElementById('save-user-button').hidden = false
        document.getElementById('user-firstname').disabled = false
        document.getElementById('user-lastname').disabled = false
        document.getElementById('user-birthdate').disabled = false
        document.getElementById('user-email').disabled = false
        document.getElementById('user-password-area').hidden = false
        document.getElementById('roles').disabled = false

        const roles = button.data('roles')
        const rolesNames = document.getElementById('all_roles').textContent
        const allRoles = rolesNames.substring(1, rolesNames.length - 1).split(', ')
        for (let i in allRoles) {
            let el = document.getElementById('role_' + allRoles[i])
            if (roles.includes(allRoles[i])) {
                el.selected = true
            } else {
                el.removeAttribute('selected')
            }
        }

    } else {
        document.getElementById('userDialogLabel').textContent = 'Удалить пользователя'
        document.getElementById('delete-user-button').hidden = false
        document.getElementById('save-user-button').hidden = true
        document.getElementById('user-firstname').disabled = true
        document.getElementById('user-lastname').disabled = true
        document.getElementById('user-birthdate').disabled = true
        document.getElementById('user-email').disabled = true
        document.getElementById('user-password-area').hidden = true
        document.getElementById('roles').disabled = true
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
    const password = modal.find('#user-password').val()
    const roles = $('select#roles').val()

    const user = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        email: email,
        locked: modal.find('#user-locked').val(),
        password: password,
        roles: roles
    }

    await fetch('/api/user/update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(user)
    });
    modal.modal('hide')
    document.getElementById('user_firstname_id_' + id).textContent = firstname
    document.getElementById('user_lastname_id_' + id).textContent = lastname
    console.log(birthdate)
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
