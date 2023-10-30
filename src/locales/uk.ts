export default {
  meta: {
    logo: 'Склоресурс',
    title: 'Склоресурс – ваш надійний партнер у світі скла.',
    error: {
      data: 'Помилка завантаження даних',
      '404': 'Сторінку не знайдено',
    },
  },
  navbar: {
    menu: {
      services: 'Сервіси',
      posts: 'Статті',
      home: 'Головна',
      components: {
        title: 'Компоненти',
        description: 'Вибір ідеальних компонентів для вашого проекту',
      },
      delivery: {
        title: 'Доставка',
        description: 'Інформація про швидку та безпечну доставку',
      },
      news: {
        title: 'Новини',
        description: 'Статті та новини в одному місці',
      },
      projects: {
        title: 'Проєкти',
        description: 'Галерея успішних проектів',
      },
      reportings: {
        title: 'Звіти',
        description: 'Докладні аналізи та звіти',
      },
      seminars: {
        title: 'Семінари',
        description: 'Інформація про навчальні семінари',
      },
      vacancies: {
        title: 'Вакансії',
        description: 'Актуальні вакансії в нашій компанії',
      },
      production: {
        title: 'Виробництво',
        description: 'Відео про процес виробництва',
      },
      'contact-us': {
        title: 'Зворотній зв’язок',
        description: "Зв'яжіться з нами через форму зворотнього зв'язку",
      },
    },
  },
  footer: {
    contact: {
      title: 'Контакти',
      telephone: 'Телефон',
    },
    address: {
      title: 'Адреса',
      p1: 'Україна',
      p2: 'м. Дубно',
      p3: 'вул. Семидубська, 105',
    },
  },
  home: {
    meta: {
      description:
        "Склоресурс - провідні виробники скла для екстер'єрного та інтер'єрного скління, надають широкий асортимент продукції для вашого проекту.",
    },
    hero: {
      slogan: 'Професійсність. Прозорість. Іноваційність.',
      main: {
        title: 'Склоресурс',
        'sub-title':
          'Сучасне виробництво обробки скла згідно європейських стандартів',
        'learn-more':
          'Компанія "Склоресурс" - це 17 років досвіду в галузі архітектурного та інтер’єрного скління.',
      },
      target: {
        title: 'Місія компанії',
        content:
          'Сучасні технології обробки скла для реалізації ваших мрій. Дивіться на світ із задоволенням!',
      },
    },
    target: {
      location: 'Два виробничих майданчика',
      area: 'Загальна виробнича площа 17 600м²',
      employees: 'Більше 300 працівників',
      products: 'Більше 50 000м² виробів на місяць',
      types: 'Понад 60 видів скла на складі',
      projects: 'Більше 200 проєктів щороку',
    },
    certificates: {
      title:
        'Якість виробів нашої компанії перевірено німецьким інститутом IFT Rosenheim',
    },
    productions: {
      title: 'Виробництво',
    },
    news: {
      title: 'Новини',
      button: 'Всі новини',
      'read-more': 'Читати повністю',
    },
    projects: {
      title: 'Проєкти',
      description:
        'За роки досвіду в галузі обробки скла, ми успішно втілили ряд вражаючих ініціатив спільно з надійними партнерами. Дізнайтеся більше про наші проекти, які не лише змінюють обличчя сучасного скління, а й сприяють збереженню навколишнього середовища.',
      button: 'Всі проєкти',
    },
    'contact-us': {
      title: { default: 'Будемо на ', primary: "зв'язку" },
      telephone: 'Телефон',
      form: {
        username: {
          placeholder: "Ваше ім'я*",
        },
        email: {
          placeholder: 'Ваш email*',
        },
        phone: {
          placeholder: 'Номер телефону',
        },
        message: {
          placeholder: 'Повідомлення*',
        },
        additional: {
          placeholder: 'Як ви про нас дізнались?',
        },
        'submit-button': {
          default: 'Відправити',
          loading: 'Відправлення...',
        },
        'alert-button': 'Закрити',
        alerts: {
          successfully: {
            title: 'Успішно',
            description: 'Ваше повідомлення успішно відправлено',
          },
          error: {
            title: 'Помилка',
            description: 'Помилка при відправці вашого повідомлення',
          },
          captcha: {
            title: 'Помилка',
            description: 'Помилка проходження reCaptcha',
          },
        },
      },
    },
  },
  components: {
    title: 'Компоненти',
    search: 'Пошук',
    filters: 'Фільтри',
    'apply-filters': 'Застосувати фільтри',
    sorting: {
      title: 'Сортування',
      'by-title': 'За назвою',
    },
    categories: {
      title: 'Категорії',
      none: 'Всі категорії',
    },
    'go-to': 'Перейти',
  },
  delivery: {
    title: "Доставка продукції на об'єкт",
  },
  seminars: {
    title: 'Семінари',
  },
  vacancies: {
    title: 'Вакансії',
    'detailed-button': 'Детальніше',
  },
  reportings: {
    title: 'Звіти',
    year: 'рік',
    auditory: 'Ауторський звіт',
    finance: 'Фінансовий звіт',
  },
  news: {
    title: 'Новини',
    'read-more': 'Читати повністю',
    'watch-video': 'Переглянути відео',
  },
  projects: {
    title: 'Проєкти',
    none: 'Не знайдено жодного проєкту',
    show: 'Показано: ',
    filters: {
      title: 'Фільтри',
      location: {
        title: 'Локації',
        'all-locations': 'Всі локації',
      },
      glass: {
        title: 'Тип скла',
        'all-types': 'Всі типи скла',
      },
      year: {
        title: 'Рік',
      },
      search: {
        placeholder: 'Пошук...',
      },
      reset: 'Скинути',
    },
  },
} as const;
