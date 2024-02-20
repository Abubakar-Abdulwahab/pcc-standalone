import React from 'react'
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------
import dashboardIcon from '../../assets/static/icons/navbar/ic_dashboard.svg'
import userIcon from '../../assets/static/icons/navbar/ic_user.svg'
import bookingIcon from '../../assets/static/icons/navbar/ic_booking.svg'
import reportIcon from '../../assets/static/icons/navbar/ic_analytics.svg'
import exitIcon from '../../assets/static/icons/navbar/ic_exit.svg'
import settingsIcon from '../../assets/static/icons/navbar/ic_settings.svg'
const getIcon = (name) => (
  <SvgIconStyle src={name} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon(userIcon),
  dashboard: getIcon(dashboardIcon),
  booking: getIcon(bookingIcon),
  reports: getIcon(reportIcon),
  settings: getIcon(settingsIcon),
  exit: getIcon(exitIcon),
  // services: getIcon('ic_settings')
};

const sidebarConfig = [
  {
    subheader: 'general',
    items: [
      {
        title: 'Reports',

        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      {
        title: 'user',

        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
      },

    ]
  },
  {
    subheader: 'Modules',
    items: [
      {
        title: 'Immigrant Module',
        path: PATH_DASHBOARD.services.root,
        icon: ICONS.booking,
        children: [
          { title: 'Create Immigrant', path: PATH_DASHBOARD.services.createImmig, canView: 'officer' },
          { title: 'Character Certificate Request', path: PATH_DASHBOARD.services.ImmigrantProfile, canView: 'officer' },
          ]
      },

    ]
  },
  {
    subheader: 'Misc',
    items: [
      {
        title: 'Settings',

        path: PATH_DASHBOARD.settings.root,
        icon: ICONS.settings
      },
      { title: 'Log Out', path: 'logout', icon: ICONS.exit }
    ]
  }
];
export const userSidebarConfig = [
  {
    subheader: 'general',
    items: [
      {
        title: 'app',

        path: PATH_DASHBOARD.general.userApp,
        icon: ICONS.dashboard
      }
    ]
  }
];

export default sidebarConfig;
