Микросервис регистрации/аутентификации, далее "микросервис"

Термины:
OAUTH2 протокол сквозной аутентификации
scope -- область прав пользователя, название роли
access token -- токен доступа к микросервисам системы (короткий срок жизни, многоразовый)
refresh token -- токен доступа только для получения новой пары access и refresh tokens (длительный срок жизни, одноразовый)



  Требования:

1.Микросервис должен обеспечивать работу по протоколу HTTP
2.Микросервис должен обеспечивать формализацию функциональности по restAPI
3Микросервис должен обеспечивать функциональность:
Регистрацию в системе по email + password
Регистрацию в системе через ВКонтакте по протоколу OAuth2
Аутентификацию по email + password
Авторизацию по значению scope пользователя.
Создание сессии
Уничтожение сессии
Сброс пароля по email
Верификацию регистрации по email
Верификацию сброса пароля
Генерацию пары access и refresh tokens



  Адреса:
Все запросы направляются по 
протоколу https
домену nekrasov.pw
префиксу /ide-accessibility/api/registration-authorization
  Пример:
https://nekrasov.pw/ide-accessibility/api/registration-authorization/*
Где * последующий постфикс маршрута из документации к rest


Структура объекта ответа restApi
{
  status: string,
  description?: string,
  data?: any
}

Где:
status принимает только тип string и обозначает результат выполнения действия
description (опционально) принимает только тип string и обозначает описание статуса
data (опционально) принимает любой тип, несёт полезную нагрузку, если имеется, при выполнении действия


Виды статусов ответа к restApi
notSuccess не успешная обработка запроса.
invalidEmail -- невалидная строка с email
invalidPassword -- невалидная строка с паролем
notConfirmed -- email адрес не подтверждён (аккаунт не подтверждён)
notAuthenticate -- не аутентифицирован в системе
authenticate -- аутентифицирован в системе
existUser -- пользователь уже существует
invalidFirstname -- невалидное имя
invalidLastname -- невалидная фамилия



Виды полезной нагрузки
token - объект содержащий refreshToken
{
  refreshToken: string
}


Маршруты restAPI
Регистрация по email + password
Путь: /signin/email
Метод http: POST

Принимаемые поля
{
  method: 'registration',
  email: 'example@example.example',
  firstname: 'Firstname',
  lastname: 'Lastname'
}

Возвращаемые статусы
notSuccess
invalidEmail
invalidLastname
invalidFirstname
existUser
success


Аутентификация по email + password
Путь: /signin/email
Метод http: POST

Принимаемые поля
{
  method: 'authentication',
  username: 'example@example.example',
  password: 'password'
}

Возвращаемые статусы
notSuccess
invalidEmail
invalidPassword
notConfirmed
success + token


Аутентификация через ВКонтакте по протоколу OAuth2
Путь: /signin/vkontakte
Метод http: GET

Принимаемые поля
Из API VKontakte OAUTH2
Для ручного взаимодействия отсутствуют

Возвращаемые статусы
notSuccess
success + token



Сброс пароля по email
Путь: /recovery/password
Метод http: POST

Принимаемые поля
{
  email: 'example@example.example'
}

Возвращаемые статусы
notSuccess
invalidEmail
success



Получение новой пары access + refresh token
Путь: /session/update
Метод http: POST

Принимаемые поля
{
  refreshToken: string
}

Возвращаемые статусы
notSuccess
notAuthenticate
success + token



Дестрой сессии
Путь: /session/destroy
Метод http: POST

Принимаемые поля
{
  refreshToken: string
}

Возвращаемые статусы
notSuccess
notAuthenticate
success
