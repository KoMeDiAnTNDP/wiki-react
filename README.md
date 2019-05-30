# [Wiki Search](https://wiki-searcher.herokuapp.com)

Это приложение ищет совпадения по вашему запросу в русской Википедии. Вы можете выбрать 2 темы: светлую и тёмную. Также есть возможность посмотреть подсказку, в которой можно узнать что данное поле или кнопка значит.

## Элементы управления

![Найти](src/pic/search.svg?width=16px) &mdash; Кнопка для поиска

<img src="https://github.com/KoMeDiAnTNDP/wiki-react/master/src/pic/search.svg" width="16">

![Обновить](src/pic/refresh.svg) &mdash; Кнопка для того чтобы убрать результат поиска и все поля ввода ставит в значение по умолчнаию.

![Светлая тема](src/pic/moon.svg) ![Тёмная тема](src/pic/moon-color.svg) &mdash; Переключает со светлой темы на тёмную и наоборот.

![Подсказка(светлая)](src/pic/hint.svg) ![Подсказка(теманя)](src/pic/hint-color.svg) &mdash; Подсказка

## `Использование`

Сначала посмиотрите подсказку, там в кратце описаны действия. После прочтения введите ваш запрос в поле "Введите запрос", затем выберите нужное вам количество статей (по умолчанию стоит 10). Потом нажмите на кнопку поиска `Найти`. Если вы хотите сменить тему со светлой на тёмную, то нажмите га полумесяц в правом верхнем углу. Если вы не знает что делают кнопки или для чего нужно то или иное поле, то нажмите на лампочку в левом верхнем углу. Для того чтобы убрать результаты поиска нажмите на кнопку `Обновить`. При нажатии на эту кнопку исчезнут результаты поиска, исчезнит ваш запрос и количество статей выставиться в 10.


### `Ограничения`

:warning:Данный сервис ищет только в __русской Википедии__. Если вы введёте запрос не на русском языке, то есть шанс, что вы не найдёте нужной вам информации.


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
