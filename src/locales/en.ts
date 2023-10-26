export default {
  meta: {
    logo: 'Skloresurs',
    title: 'Skloresurs – your reliable partner in the world of glass.',
    error: {
      data: 'Error loading data',
      '404': 'Page not found',
    },
  },
  navbar: {
    menu: {
      services: 'Services',
      posts: 'Articles',
      home: 'Home',
      components: {
        title: 'Components',
        description: 'Selecting the perfect components for your project',
      },
      delivery: {
        title: 'Delivery',
        description: 'Information about fast and secure delivery',
      },
      news: {
        title: 'News',
        description: 'Articles and news in one place',
      },
      projects: {
        title: 'Projects',
        description: 'Gallery of successful projects',
      },
      reportings: {
        title: 'Reports',
        description: 'Detailed analyses and reports',
      },
      seminars: {
        title: 'Seminars',
        description: 'Information about educational seminars',
      },
      vacancies: {
        title: 'Vacancies',
        description: 'Current job openings in our company',
      },
      production: {
        title: 'Production',
        description: 'Video about the production process',
      },
      'contact-us': {
        title: 'Contact Us',
        description: 'Get in touch with us through the contact form',
      },
    },
  },
  footer: {
    contact: {
      title: 'Contact',
      telephone: 'Telephone',
    },
    address: {
      title: 'Address',
      p1: 'Ukraine',
      p2: 'Dubno',
      p3: 'Semidubska Street, 105',
    },
  },

  home: {
    meta: {
      description:
        'Skloresurs - leading manufacturers of glass for exterior and interior glazing, providing a wide range of products for your project.',
    },
    hero: {
      slogan: 'Professionalism. Transparency. Innovation.',
      main: {
        title: 'Skloresurs',
        'sub-title':
          'Modern production of glass processing according to European standards',
        'learn-more':
          '"Skloresurs" company has 17 years of experience in the field of architectural and interior glazing.',
      },
      target: {
        title: 'Company mission',
        content:
          'Modern glass processing technologies to realize your dreams. Look at the world with pleasure!',
      },
    },
    target: {
      location: 'Two production sites',
      area: 'Total production area 17,600m²',
      employees: 'More than 300 employees',
      products: 'Over 50,000m² of products per month',
      types: 'Over 60 types of glass in stock',
      projects: 'More than 200 projects annually',
    },
    certificates: {
      title:
        'The quality of our products has been verified by the German institute IFT Rosenheim',
    },
    productions: {
      title: 'Production',
    },
    news: {
      title: 'News',
      button: 'All News',
      'read-more': 'Read More',
    },
    projects: {
      title: 'Projects',
      description:
        'With years of experience in glass processing, we have successfully implemented a range of impressive initiatives in collaboration with reliable partners. Learn more about our projects, which not only transform the face of modern glasswork but also contribute to environmental preservation.',
      button: 'All Projects',
    },
    'contact-us': {
      title: { default: 'Contact ', primary: 'us' },
      telephone: 'Telephone',
      form: {
        username: {
          placeholder: 'Your name*',
        },
        email: {
          placeholder: 'Your email*',
        },
        phone: {
          placeholder: 'Phone number',
        },
        message: {
          placeholder: 'Message*',
        },
        additional: {
          placeholder: 'How did you hear about us?',
        },
        'submit-button': {
          default: 'Submit',
          loading: 'Submitting...',
        },
        'alert-button': 'Close',
        alerts: {
          successfully: {
            title: 'Success',
            description: 'Your message has been successfully sent',
          },
          error: {
            title: 'Error',
            description: 'Error sending your message',
          },
          captcha: {
            title: 'Error',
            description: 'reCaptcha verification error',
          },
        },
      },
    },
  },
  components: {
    title: 'Components',
    search: 'Search',
    filters: 'Filters',
    'apply-filters': 'Apply filters',
    sorting: {
      title: 'Sorting',
      'by-title': 'By title',
    },
    categories: {
      title: 'Categories',
      none: 'All categories',
    },
    'go-to': 'Go to shop',
  },
  delivery: {
    title: 'Delivery of Products',
    p1: 'We understand the importance of timely and safe delivery, which is why our transportation department has a modern fleet equipped with manipulators. This allows us to safely load and unload glass packages of any size and weight.',
    p2: 'Glass packages are carefully packaged to prevent damage during transportation and securely fastened to the transport.',
    p3: 'Our drivers have years of experience and are well-versed in the routes, allowing us to reduce delivery time and provide the highest quality of service.',
  },
  seminars: {
    title: 'Seminars',
  },
  vacancies: {
    title: 'Vacancies',
    'detailed-button': 'Learn More',
  },
  reportings: {
    title: 'Reportings',
    year: 'year',
    auditory: "Auditor  's Report",
    finance: 'Financial Report',
  },
  news: {
    title: 'News',
    'read-more': 'Read More',
    'watch-video': 'Watch Video',
  },
  projects: {
    title: 'Projects',
  },
} as const;
