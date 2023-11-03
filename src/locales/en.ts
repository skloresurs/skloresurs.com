export default {
  meta: {
    logo: 'Skloresurs',
    title: 'Skloresurs – your reliable partner in the world of glass.',
    error: {
      data: 'Error loading data',
      '404': 'Page not found',
    },
    filters: {
      title: 'Filters',
      search: 'Search...',
      reset: 'Reset',
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
      catalog: {
        title: 'Catalog',
        description:
          'Explore our glass catalog and find the perfect solutions for your project.',
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
        'Skloresurs - a modern glass processing production according to European standards.',
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
        'Over the years of experience in the glass processing industry, we have successfully implemented a series of impressive projects in collaboration with reliable partners. Learn more about our projects, which not only transform the face of modern glazing but also contribute to environmental conservation.',
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
    title: 'Glass Processing Components',
    description:
      'The widest selection of glass processing components. Find the perfect solutions for your project. High quality and reliability. Browse our components catalog right now.',
    none: 'No components found',
    categories: {
      title: 'Categories',
      all: 'All Categories',
    },
    'go-to': 'Go To',
  },
  delivery: {
    title: 'Delivery of Products',
    description:
      'Delivery that meets your needs. Safe loading and unloading of glass packages of any size and weight. Learn more about our delivery terms.',
  },
  news: {
    title: 'News',
    'return-back': 'Return Back',
    description:
      'Join us and stay updated on the latest articles and news in the glass processing industry. Interesting and relevant materials, the latest technological advancements, and much more.',
  },
  projects: {
    title: 'Projects',
    description:
      'We invite you to explore our project gallery and find inspiration in the world of glass processing. Learn more about our projects and innovations that inspire industry professionals.',
    none: 'No projects found',
    show: 'Showing: ',
    filters: {
      location: {
        title: 'Locations',
        all: 'All Locations',
      },
      glass: {
        title: 'Glass Type',
        all: 'All Glass Types',
      },
      year: {
        title: 'Year',
      },
    },
  },
  reportings: {
    title: 'Reportings',
    description:
      'Learn more about our seminars. Gain valuable knowledge and insights in the field of glass processing and discover new trends and skills in our industry.',
    year: 'year',
    auditory: "Auditor  's Report",
    finance: 'Financial Report',
  },
  seminars: {
    title: 'Seminars',
    description:
      'Learn more about our seminars. Gain valuable knowledge and insights in the field of glass processing at our events. Discover the latest trends and skills in our industry.',
  },
  vacancies: {
    title: 'Vacancies',
    'return-back': 'Return Back',
    description:
      'Discover our current job openings and the opportunity to join our team.',
    'detailed-button': 'Learn More',
  },
  catalog: {
    title: 'Catalog',
    description:
      'Open our catalog to explore the range of products for creating unique designer solutions.',
    exterior: 'Exterior',
    interior: 'Interior',
  },
} as const;
