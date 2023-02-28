# Привіт 👋
## Це стартовий проект для верстки сайта W8Shippings

### Які технології використвовуються


### Технології:

- [Vite](https://vitejs.dev/) - Frontend tools. По суті він займається збіркою проектів
- [Handlebars](https://handlebarsjs.com/) - Дає змогу розділити верстку на файли: footer.hbs, header.hbs
- [Tailwindcss](https://tailwindcss.com/docs/installation) - CSS фреймворк. Прискорює роботу по верстці
- [Swiper](https://swiperjs.com/get-started) - Слайдер
- [Tom-select](https://tom-select.js.org/) - Пошук у селекті (autocompleate)
- [Lightgallery](https://www.lightgalleryjs.com/docs/getting-started/) - фото/відео галерея
- [Animate.css](https://animate.style//) - бібліотека CSS анімацій 

### Файлова структура:

```
├───fonts - шрифти
├───icons - всі файли архіву з сайту iconMoon
├───src
│   ├───css
│   │   │   app.css - головний файл стилів
│   │   └───components - файли компонентів. Чим менше тут буде файлів тим краще. Компоненти краще робити в HTML
│   ├───data - різні json плайсхолдери з данними для верстки
│   ├───img - картинки
│   ├───js - допоміжні файли
│   │   └───modules - кастомні модулі
│   └───partials - частини верстки: Блоки, секції, ui-елементи
│           header.hbs - хедер
│           block-auto.hbs      - якщо це Блок, то назфа файлу складається з block-{назва}
│           section-offer.hbs   - якщо це Секція то назфа файлу складається section-{назва}
│           ui-buttons.hbs      - якщо це Елемент UI то назфа файлу складається ui-{назва}
│           footer.hbs - футер
├───index.html - головна сторінка, тут можна верстати блоки по одному
├───ui.html - UI - тут виводиться результат всієї роботи
├───main.js - головний файл js
├───tailwind.config.js - конфігурація tailwind, кольори, розмір контейнера ...
├───theme.json - кольори теми
├───vite.config.js - конфігурація Vite. Найчастіше використовується для передачі даних у шаблон hbs
```

# Що вже зроблено:
 - ✅ Шрифти підключено
 - ✅ Файл tailwind.config.js налаштовано на тему сайту
 - ✅ Деякі компоненти UI готові, але тільки десктопна версія

# Що треба зробити:
 - все решту) Потім напишу. Для початку шапку та футер
