"use strict";
const userForm = new UserForm();

console.log(userForm);

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (res) => {
        if (res.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(res.error);
        }
    });
};

console.log(userForm);

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (res) => {
        if (res.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(res.error);
        }
    });
};
