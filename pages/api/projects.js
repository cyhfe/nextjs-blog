import trelloCover from '../../public/images/projects/trello-clone.png';
import bookShelfCover from '../../public/images/projects/book-shelf.png';
import nasaCover from '../../public/images/projects/nasa.png';
import pongCover from '../../public/images/projects/pong.png';
import paintCover from '../../public/images/projects/paint.png';
import reactUICover from '../../public/images/projects/react-ui.png';
import hooksCover from '../../public/images/projects/hooks.png';

export const projects = [
  {
    id: 0,
    title: 'Trello Clone',
    description: [
      'React + Typescript + React DnD实现仿trello的可拖拽看板应用。',
      'express + fs模块文件存储实现持久化并提供RESTFUL API。',
      'context + useReducer进行状态管理。',
      '自定义拖拽图层样式。',
    ],
    cover: trelloCover,
    github: 'https://github.com/cyhfe/trello-clone.git',
    demo: 'https://cyh-trello-clone.herokuapp.com/',
  },
  {
    id: 1,
    title: 'Book Shelf',
    description: ['登陆注册', 'jwt鉴权', 'mongoDB持久化', 'express', '路由'],
    cover: bookShelfCover,
    github: 'https://github.com/cyhfe/book-shelf',
    demo: 'https://cyh-bookshelf.herokuapp.com/',
  },
  {
    id: 2,
    title: 'NASA',
    description: ['mongoose', 'crud', 'arwesUI框架'],
    cover: nasaCover,
    github: 'https://github.com/cyhfe/nasa-mission-control',
    demo: 'https://cyh-nasa.herokuapp.com/',
  },
  {
    id: 3,
    title: 'pong',
    description: ['canvas', 'requestAnimationFrame实现动画'],
    cover: pongCover,
    github: 'https://github.com/cyhfe/pong',
    demo: 'https://cyhfe.github.io/pong/',
  },
  {
    id: 4,
    title: 'paint',
    description: ['redux', 'canvas', 'react'],
    cover: paintCover,
    github: 'https://github.com/cyhfe/redux-paint',
    demo: 'https://cyh-paint.herokuapp.com/',
  },
  {
    id: 5,
    title: 'React UI组件库',
    description: ['组件设计', 'storybook'],
    cover: reactUICover,
    github: 'https://github.com/cyhfe/react-ui',
    demo: 'https://cyhfe.github.io/react-ui/',
  },
  {
    id: 6,
    title: 'React hooks库',
    description: ['react hooks'],
    cover: hooksCover,
    github: 'https://github.com/cyhfe/my-hooks',
    demo: 'https://www.npmjs.com/package/@cyhfe/my-hooks',
  },
];
