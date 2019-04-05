import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'nb-home',
  //   link: '/pages/dashboard',
  // },  
  {
    title: 'Users',
    icon: 'nb-person',
    link: '/pages/user/list',    
    home: true,
  },  
  {
    title: 'Team',
    icon: 'nb-person',
    link: '/pages/team/list',    
  },  
  {
    title: 'My Visuals',
    icon: 'nb-bar-chart',
    link: '/pages/my-visual/list',    
  },  
  {
    title: 'All Visuals',
    icon: 'nb-bar-chart',
    link: '/pages/all-visual/list',    
  },  
  {
    title: 'Featured Visuals',
    icon: 'nb-bar-chart',
    link: '/pages/featured-visual/list',    
  },  
  {
    title: 'Challenges',
    icon: 'nb-star',
    link: '/pages/challenge/list',    
  }, 
  // {
  //   title: 'Viz Of Day',
  //   icon: 'nb-bar-chart',
  //   link: '/pages/viz-of-day/list',    
  // },  
  {
    title: 'Video',
    icon: 'nb-play',
    link: '/pages/video/list',    
  },
  {
    title: 'Miscellaneous',
    icon: 'nb-tables',
    children: [
      {
        title: 'Country',
        link: '/pages/country/list',
      },
      {
        title: 'Category',
        link: '/pages/category/list',
      },
      {
        title: 'University',
        link: '/pages/university/list',
      }
    ],
  },
  {
    title: 'CMS',
    icon: 'nb-grid-b-outline',
    children: [
      {
        title: 'Home',
        children: [
          {
            title: 'Video Section',
            link: '/pages/cms/home/video_section',
          },
          {
            title: 'About Us',
            link: '/pages/cms/home/about_us',
          },
          {
            title: 'Our Partners',
            link: '/pages/cms/home/partner/list',
          },
          {
            title: 'Latest News',
            link: '/pages/cms/home/news/list',
          }
        ]
      },
      {
        title: 'About',
        children: [
          {
            title: 'About Us',
            link: '/pages/cms/about/about_us',
          },          
          {
            title: 'Our Journey',
            link: '/pages/cms/about/journey/list',
          }
        ]
      }      
    ],
  }  
];
