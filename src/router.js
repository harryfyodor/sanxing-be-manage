import Daily from './page/daily';
import Broadcast from './page/broadcast';
import Tags from './page/tags';
import About from './page/about';
import Article from './page/article';
import Pics from './page/pics';
import Word from './page/word';

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
    main: Article
  },
  {
    path: '/pics',
    main: Pics
  },
  {
    path: '/word',
    main: Word
  }
]

export default routes
