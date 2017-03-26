import Daily from './page/daily';
import Broadcast from './page/broadcast';
import Tags from './page/tags';
import About from './page/about';

const routes = [
  { path: '/',
    exact: true,
    main: About
  },
  { path: '/daily',
    main: Daily
  },
  { path: '/broadcast',
    main: Broadcast
  },
  { path: '/tags',
    main: Tags
  },
  { path: '/articles',
    main: Broadcast
  }
]

export default routes;