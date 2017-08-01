Валидация формы

- у кнопки (submit) должен быть тип button
- регистрируем обработчик клика на кнопку и блокируем всплытие события.
- cтруктура разметки поля для валидатора:
    ```jade
        .form__wrap-field
            input.form__field(
                class="js-validate",
                data-type-of-validate="email"
                data-error-type="текст ошибки типа"
                data-error-required="текст незаполненого поля"
                required
            )
            .form__msg-err(добавляется скриптом)
    ```

Для каждого валидируемого поля (c классом js-validate) можно указать:
1.  `required` - поле обязательно к заполнению
1.  `data-type-of-validate` - указать тип валидации:
    1. `email` - проверка по regexp email
    1. `phone` - проверка по regexp phone
    1. `pass`  - проверка пароля, количество символов
    1. `confpass` - проверка подтверждения пароля на соответсвия паролю
    1. `integer` - только целые числа
    1. `float` - дисятичные числа
    1. `select` - валидация селекта
1. `data-error-type` - текст ошибки по типу
1. `data-error-required` - текст ошибки для незаполниного поля