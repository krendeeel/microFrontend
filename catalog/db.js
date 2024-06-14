// eslint-disable-next-line no-undef
module.exports = {
  products: [
    { id: 1, name: "Чеснок", price: 254, seller_id: 123 },
    { id: 2, name: "Бананы", price: 65, seller_id: 123 },
    { id: 3, name: "Хрен", price: 65, seller_id: 456 },
    { id: 4, name: "Баклажан", price: 567, seller_id: 456 },
    { id: 5, name: "Топинамбур", price: 300, seller_id: 789 },
  ],
  sellers: [
    { id: 123, name: "Продавец 1" },
    { id: 456, name: "Продавец 2" },
    { id: 789, name: "Продавец 3" }
  ],
  comments: [
    { id: 987, product_id: 1, body: "Вкусно", date: new Date('2017-07-03'), user_id: 23 },
    { id: 995, product_id: 1, body: "и точка", date: new Date('2017-08-17'), user_id: 23},
    { id: 987, product_id: 2, body: "Очень вкусно", date: new Date('2017-07-03'), user_id: 56 },
    { id: 995, product_id: 3, body: "Круто", date: new Date('2017-08-17'), user_id: 56},
    { id: 987, product_id: 4, body: "Невозможно", date: new Date('2017-07-03'), user_id: 89 },
    { id: 995, product_id: 5, body: "Превосходно", date: new Date('2017-08-17'), user_id: 89 }
  ],
  users: [
    { id: 23, name: "Пользователь 1" },
    { id: 56, name: "Пользователь 2" },
    { id: 89, name: "Пользователь 3" }
  ],
}