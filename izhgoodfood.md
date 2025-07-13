POST https://yarden.tech/webhook/izhgoodfood/registration

Body
```json
{
    "email": "yar.ryabov@mail.ru",
    "password": "qwerty",
    "phone": "79999999999",
    "full_name": "Ярослав"
}
```

Response
- 400 - Ошибка при валидации полей запроса/Пользователь уже существует
- 200 - Возвращает jwt в заголовке Token

====

POST https://yarden.tech/webhook/izhgoodfood/login

Body
```json
{
    "email": "yar.ryabov@mail.ru",
    "password": "qwerty"
}
```

Response
- 400 - Ошибка при валидации полей запроса/Пользователь не существует
- 403 - Неправильный пароль
- 200 - Возвращает jwt в заголовке Token

=====

GET https://yarden.tech/webhook/izhgoodfood/delivery-interval

Header
- Authorization: Bearer Token

Response
- 200 - Возвращает `[{id:1, from:"07:00:00", to:"08:00:00"}, ...]`

====

PUT https://yarden.tech/webhook/izhgoodfood/user

Header
- Authorization: Bearer Token

Body
```json
{
    "full_name": "Ярослав",
    "phone": "79999999999",
    "address": "asd",
    "delivery_interval_id": 1,
    "delivery_type": "[contact|without_contact]",
    "peculiarities": "[string|null]",
    "plastic_recycling": false,
    "payment_method": "[cash|transfer|terminal|qr|invoice]"
}
```

Response
- 400 - Ошибка при валидации полей запроса/Пользователь не существует
- 200 - Возвращает обновленный jwt в заголовке Token

====

GET https://yarden.tech/webhook/izhgoodfood/menu/current

Header
- Authorization: Bearer Token

Response
- 200 - Возвращает `[{"date": "2025-06-26","dises": [{"category": "breakfast","items": [{"id": 1, "name": "Сырная лепешка с легким салатом"}, ...]}, ...]}, ...]`

====

POST https://yarden.tech/webhook/izhgoodfood/order

Header
- Authorization: Bearer Token

Body
```json
[{"date": "2025-06-23", "items": [{"dish_id": 1, "comment": "", "quantity": 1}]}]
```

Response
- 400 - Ошибка при валидации полей запроса/Пользователь не существует
- 201 - Заказ создан

====

GET https://yarden.tech/webhook/izhgoodfood/order

Header
- Authorization: Bearer Token

Response
- 400 - Ошибка при валидации полей запроса/Пользователь не существует
- 200 - Возвращает последние 5 заказов в формате `{"id": "3","created_at": "2025-06-29T15:11:28.628Z","items": [{"date": "2025-06-23","comment": null,"dishes": [{"category": "breakfast","items": [{"id": "1","name": "Сырная лепешка с легким салатом","quantity": 1}]}]}]}`
