// src/types.js

// Page constants
export const Page = {
  HOMEPAGE: 'homepage',
  PRODUCE: 'produce',
  FARMS: 'farms',
  ABOUT: 'about',
  REGISTER: 'register',
  LOGIN: 'login',
  CART: 'cart',
  FEEDBACK: 'feedback',
  ORDER_CONFIRMATION: 'orderConfirmation'
};

// User roles
export const UserType = {
  CUSTOMER: 'customer',
  FARMER: 'farmer'
};

// Produce categories
export const ProduceCategory = {
  VEGETABLES: 'vegetables',
  FRUITS: 'fruits',
  HERBS: 'herbs',
  OTHER: 'other'
};

// Seasons
export const Season = {
  SPRING: 'spring',
  SUMMER: 'summer',
  FALL: 'fall',
  WINTER: 'winter',
  ALL: 'all'
};

// Feedback types
export const FeedbackType = {
  GENERAL: 'general',
  BUG: 'bug',
  SUGGESTION: 'suggestion',
  COMPLIMENT: 'compliment'
};

// Default object shapes
export const DefaultObjects = {
  User: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    userType: UserType.CUSTOMER,
    createdAt: ''
  },
  ProduceItem: {
    id: '',
    name: '',
    farmName: '',
    price: '',
    image: '',
    category: ProduceCategory.VEGETABLES,
    season: Season.ALL,
    description: ''
  },
  CartItem: {
    quantity: 1
  },
  FarmItem: {
    id: '',
    name: '',
    location: '',
    description: '',
    image: ''
  },
  FeedbackSubmission: {
    name: '',
    email: '',
    feedbackType: FeedbackType.GENERAL,
    message: '',
    rating: 0
  }
};