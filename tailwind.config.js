export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    keyframes: {
      'fade-in-down': {
        '0%': {
          opacity: '0',
          transform: 'translateY(-10px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
      'slide-down': {
        '0%': {
          transform: 'translateY(-10px)',
        },
        '100%': {
          transform: 'translateY(0)',
        },
      },
    },
    colors: {
      primary: {
        100: '#ebf1fd',
        200: '#D9E5FD',
        400: '#2724B7',
        default: '#0064FF',
        600: '#3730F2',
        900: '#06051A',
      },
      gray: {
        light: '#6C6C6C',
        dark: '#333333',
      },
      customColor: '#0064FF',
    },
    animation: {
      'fade-in-down': 'fade-in-down 0.5s ease-out',
      'slide-down': 'slide-down 0.5s ease-out',
    },
  },
};
export const plugins = [];
