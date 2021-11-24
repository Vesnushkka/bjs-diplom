"use strict";

//выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout((res) => {
        if (res.success) {
            location.reload();
        }
    });
};

//получение информации о пользователе
ApiConnector.current((getUser) => {
    if (getUser.success) {
        ProfileWidget.showProfile(getUser.data);
    }
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function getExchangeRate() {
    ApiConnector.getStocks((res) => {
        if (res.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(res.data);
        }
    });
}

getExchangeRate();
setInterval(() => {
    getExchangeRate();
}, 60000);

//Операции с деньгами
//Пополнение баланса
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (res) => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            favoritesWidget.setMessage(true, "Пополнение баланса успешно!");
        } else {
            favoritesWidget.setMessage(false, "Ошибка пополнения баланса!");
        }
    });
};

//Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (res) => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            favoritesWidget.setMessage(true, "Конвертирование валюты успешно!");
        } else {
            favoritesWidget.setMessage(false, "Ошибка конвертирования валюты!");
        }
    });
};

// //Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (res) => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            favoritesWidget.setMessage(true, "Перевод валюты успешно!");
        } else {
            favoritesWidget.setMessage(false, "Ошибка перевода валюты!");
        }
    });
};

// //Работа с избранным
// //Запрос начального списка избранного
ApiConnector.getFavorites((res) => {
    console.log(res);
    if (res.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(res.data);
        moneyManager.updateUsersList(res.data);
    }
});

// //Добавление пользователя в список избранного
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (res) => {
        if (res.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);

            favoritesWidget.setMessage(
                true,
                "Добавление пользователя успешно!"
            );
        } else {
            favoritesWidget.setMessage(
                false,
                "Ошибка добавления пользователя!"
            );
        }
    });
};

//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (res) => {
        if (res.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);

            favoritesWidget.setMessage(true, "Удаление пользователя успешно!");
        } else {
            favoritesWidget.setMessage(false, "Ошибка удаления пользователя!");
        }
    });
};
