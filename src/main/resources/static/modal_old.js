// $('#userDialog').on('show.bs.modal', function (event) {
//     const button = $(event.relatedTarget)
//     const id = button.data('id')
//     document.getElementById('user-id').value = id
//     document.getElementById('user-firstname').value =
//         document.getElementById('user_firstname_id_' + id).textContent
//     document.getElementById('user-lastname').value =
//         document.getElementById('user_lastname_id_' + id).textContent
//     document.getElementById('user-birthdate').value =
//         document.getElementById('user_birthdate_id_' + id).textContent
//     document.getElementById('user-email').value =
//         document.getElementById('user_email_id_' + id).textContent
//     document.getElementById('user-password').value =
//         document.getElementById('user_password_id_' + id).textContent
//
//     const options = document.getElementsByName('option')
//     const optionsSize = options.length
//     const roles = document.getElementsByName('role_user_' + id)
//     const rolesSize = roles.length
//     document.getElementById('user-roles').size = Math.min(5, optionsSize)
//     options.forEach(o => {
//         document.getElementById('user_role_' + o.value).selected = false
//     })
//     for (let r = 0; r < rolesSize; r++) {
//         for (let o = r; o < optionsSize; o++) {
//             if (roles[r].textContent === options[o].value) {
//                 document.getElementById('user_role_' + options[o].value).selected = true
//                 break
//             }
//         }
//     }
//
//     if ((button.data('action') === 'update')) {
//         document.getElementById('userDialogLabel').textContent = 'Редактировать пользователя'
//         document.getElementById('delete-user-button').hidden = true
//         document.getElementById('save-user-button').hidden = false
//         document.getElementById('user-firstname').disabled = false
//         document.getElementById('user-lastname').disabled = false
//         document.getElementById('user-birthdate').disabled = false
//         document.getElementById('user-email').disabled = false
//         document.getElementById('user-password-area').hidden = false
//         document.getElementById('user-roles').disabled = false
//     } else {
//         document.getElementById('userDialogLabel').textContent = 'Удалить пользователя'
//         document.getElementById('delete-user-button').hidden = false
//         document.getElementById('save-user-button').hidden = true
//         document.getElementById('user-firstname').disabled = true
//         document.getElementById('user-lastname').disabled = true
//         document.getElementById('user-birthdate').disabled = true
//         document.getElementById('user-email').disabled = true
//         document.getElementById('user-password-area').hidden = true
//         document.getElementById('user-roles').disabled = true
//     }
// })
//
// $('#save-user-button').click(async function () {
//     const modal = $('#userDialog')
//     const id = modal.find('#user-id').val()
//     const firstname = modal.find('#user-firstname').val()
//     const lastname = modal.find('#user-lastname').val()
//     const birthdate = modal.find('#user-birthdate').val()
//     const email = modal.find('#user-email').val()
//     const password = modal.find('#user-password').val()
//     const message = checkName(firstname, lastname) + checkBirthDate(birthdate) +
//         checkEmail(email, id) + checkPassword(password)
//     if (message !== '') {
//         alert(message)
//         return
//     }
//     const age = getAge(birthdate)
//     const rolesNow = $('select#user-roles').val()
//     const parentAdminId = rolesBeforeIncludesAdmin(id) !== rolesNow.includes('ADMIN')
//         ? Number(document.getElementById('my_id').textContent)
//         : document.getElementById('user_parent_id_id_' + id).textContent
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
//     })
//     if (response.ok) {
//         setTextContent(user)
//         document.getElementById('user_age_id_' + id).textContent = age
//         document.getElementById('user_password_id_' + id).textContent = await response.text()
//
//         const myEmail = document.getElementById('my_email')
//         const oldEmail = document.getElementById('user_email_id_' + id)
//         if (myEmail.textContent === oldEmail.textContent) {
//             myEmail.textContent = email
//             document.getElementById('my_roles').textContent = rolesNow.toString()
//         }
//         oldEmail.textContent = email
//
//         let innerUl = ''
//         rolesNow.forEach(r => {
//             innerUl += '<li class="list-group-item p-0" name="role_user_' + id + '">' + r + '</li>'
//         })
//         document.getElementById('user_roles_id_' + id).innerHTML = innerUl
//         document.getElementById('user_link_' + id).textContent = firstname + ' ' + lastname
//
//         modal.modal('hide')
//     } else {
//         alert('Ошибка HTTP: ' + response.status)
//     }
// });
//
// $('#delete-user-button').click(async function () {
//     const modal = $('#userDialog')
//     const id = modal.find('#user-id').val()
//
//     await fetch('/api/user/delete/' + id, {
//         method: 'DELETE'
//     })
//     modal.modal('hide')
//     document.getElementById('tr_id_' + id).remove()
//     document.getElementById('user_link_' + id).remove()
// })
