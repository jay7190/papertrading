# Paper Trading Application

A full-featured paper trading platform built with React that allows users to practice stock trading with virtual money.

## Features

### User Features
- **User Authentication**: Secure login and registration system
- **Stock Search**: Real-time stock search functionality
- **Portfolio Management**:
  - View current holdings
  - Track positions
  - Monitor watchlist
- **Trading**:
  - Place buy/sell orders
  - View order history
  - Real-time position tracking
- **Dashboard**:
  - Portfolio overview
  - Performance metrics
  - Account balance

### Admin Features
- **Admin Dashboard**:
  - User management
  - Order monitoring
  - Balance management
  - Product management

## Tech Stack

- Frontend: React + Vite
- Authentication: Firebase
- State Management: Custom hooks
- API Integration: Real-time stock data

## Project Structure

```
src/
├── Components/
│   ├── AdminDashboard/    # Admin interface components
│   ├── Login/             # Authentication components
│   ├── Registration/      # User registration
│   └── User/              # User interface components
│       ├── Pages/
│       │   ├── Holdings/  # Portfolio holdings
│       │   ├── Order/     # Order management
│       │   ├── Position/  # Position tracking
│       │   ├── searchstock/# Stock search
│       │   └── Watchlist/ # Watchlist management
│       ├── UserNavbar/    # Navigation
│       └── UserFooter/    # Footer
├── config/                # Configuration files
├── hooks/                 # Custom React hooks
└── utils/                 # Utility functions
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd papertrading
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory
   - Add necessary environment variables:
     ```
     VITE_API_KEY=[your-api-key]
     VITE_FIREBASE_CONFIG=[your-firebase-config]
     ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Usage Guide

### User Flow

1. **Registration/Login**
   - Create a new account or login with existing credentials
   - Complete profile setup if required

2. **Stock Search**
   - Use the search functionality to find stocks
   - View real-time stock prices and details
   - Add stocks to watchlist

3. **Trading**
   - Place buy orders with virtual money
   - Manage open positions
   - Place sell orders
   - View order history

4. **Portfolio Management**
   - Monitor current holdings
   - Track profit/loss
   - View performance metrics
   - Manage watchlist

### Admin Flow

1. **Dashboard Access**
   - Login with admin credentials
   - Access admin dashboard

2. **User Management**
   - View user list
   - Manage user accounts
   - Monitor user activities

3. **System Management**
   - Monitor orders
   - Manage virtual balance
   - Configure product settings

## Development Guidelines

1. **Code Structure**
   - Follow component-based architecture
   - Maintain separation of concerns
   - Use custom hooks for shared logic

2. **State Management**
   - Utilize custom hooks for global state
   - Implement proper state updates
   - Handle side effects appropriately

3. **API Integration**
   - Use proper error handling
   - Implement rate limiting
   - Cache responses when appropriate

4. **Testing**
   - Write unit tests for components
   - Test critical user flows
   - Ensure proper error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[Your License Here]

## Support

For support, please [contact details]
