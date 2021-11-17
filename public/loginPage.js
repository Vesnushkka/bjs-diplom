"use strict";
const userForm = new UserForm();

console.log(userForm);

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (i) => {
        if (i.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(i.error);
        }
    });
};

console.log(userForm);

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (i) => {
        if (i.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(i.error);
        }
    });
};
