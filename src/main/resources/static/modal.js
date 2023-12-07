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
    document.getElementById('user-password').value =
        document.getElementById('user_password_id_' + id).textContent

    const options = document.getElementsByName('option')
    const optionsSize = options.length
    const roles = document.getElementsByName('role_user_' + id)
    const rolesSize = roles.length
    document.getElementById('user-roles').size = Math.min(5, optionsSize)
    options.forEach(o => {
        document.getElementById('user_role_' + o.value).selected = false
    })
    for (let r = 0; r < rolesSize; r++) {
        for (let o = r; o < optionsSize; o++) {
            if (roles[r].textContent === options[o].value) {
                document.getElementById('user_role_' + options[o].value).selected = true
                break
            }
        }
    }

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
    const password = modal.find('#user-password').val()

    function rolesBeforeIncludesAdmin() {
        const rolesBefore = (document.getElementsByName('role_user_' + id))
        for (let i = 0; i < rolesBefore.length; i++) {
            if (rolesBefore[i].textContent === 'ADMIN') {
                return true
            }
        }
        return false
    }
    const rolesNow = $('select#user-roles').val()
    const parentAdminId = rolesBeforeIncludesAdmin() !== rolesNow.includes('ADMIN')
        ? Number(document.getElementById('my_id').textContent)
        : document.getElementById('user_parent_id_id_' + id).textContent

    const user = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        email: email,
        locked: document.getElementById('user_locked_id_' + id).checked,
        password: password,
        parentAdminId: parentAdminId,
        roles: rolesNow
    }

    await fetch('/api/user/update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(user)
    });
    modal.modal('hide')

    document.getElementById('user_firstname_id_' + id).textContent =
        document.getElementById('user-firstname').value
    document.getElementById('user_lastname_id_' + id).textContent =
        document.getElementById('user-lastname').value
    document.getElementById('user_email_id_' + id).textContent =
        document.getElementById('user-email').value

    const birthday = document.getElementById('user-birthdate').value
    const ageDate = new Date(Date.now() - new Date(birthday).getTime());
    document.getElementById('user_age_id_' + id).textContent = (ageDate.getUTCFullYear() - 1970).toString()
    document.getElementById('user_birthdate_id_' + id).textContent = birthday

    let innerUl = ''
    rolesNow.forEach(r => {
        innerUl += '<li class="list-group-item p-0" name="role_user_' + id + '">' + r + '</li>'
    })
    document.getElementById('user_roles_id_' + id).innerHTML = innerUl

    // todo
    // document.getElementById('user_password_id_' + id).textContent =
    //     document.getElementById('user-password').value
});

$('#delete-user-button').click(async function () {
    const modal = $('#userDialog')
    const id = modal.find('#user-id').val()

    await fetch('/api/user/delete/' + id, {
        method: 'DELETE'
    })
    modal.modal('hide')
    document.getElementById('tr_id_' + id).remove()
})
