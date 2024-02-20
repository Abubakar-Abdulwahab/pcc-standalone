// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const USER_DASHBOARD = '/user-dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  requestService: '/services'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    userApp: path(USER_DASHBOARD, '/app'),
    finances: path(ROOTS_DASHBOARD, '/finances')
  },
  reports: {
    root: path(ROOTS_DASHBOARD, '/reports'),
    extract: path(ROOTS_DASHBOARD, '/reports/police-extract'),
    clearance: path(ROOTS_DASHBOARD, '/reports/character-certificate'),
    guard: path(ROOTS_DASHBOARD, '/reports/guard-services')
  },
  services: {
    root: path(ROOTS_DASHBOARD, '/requests'),
    createImmig: path(ROOTS_DASHBOARD, '/module/create-immgigrant'),
    searchImmig: path(ROOTS_DASHBOARD, '/module/search-immgigrant'),
    createRequest: path(ROOTS_DASHBOARD, '/module/create-request'),
    ImmigrantProfile: path(ROOTS_DASHBOARD, '/module/user-profile'),
    clearance: path(ROOTS_DASHBOARD, '/requests/character-certificate'),
    guard: path(ROOTS_DASHBOARD, '/requests/guard-services')
  },
  settings: {
    root: path(ROOTS_DASHBOARD, '/settings')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),

    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  service: {
    root: path(ROOTS_DASHBOARD, '/service'),

    list: path(ROOTS_DASHBOARD, '/service/list'),
    newService: path(ROOTS_DASHBOARD, '/service/new')
  }
};

export const PATH_DOCS = '/';
