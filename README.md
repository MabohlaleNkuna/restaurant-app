# Restaurant Reservation App

## Description
The Restaurant Reservation App is a mobile application built with React Native that allows users to book restaurant reservations, manage bookings, receive notifications, and handle payments through Stripe. The app also includes authentication and real-time updates using Socket.io.


## Linked Repositories
Backend - [https://github.com/Yolanda-landii/RestaurantApp_Server/tree/backend]
Admin - [https://github.com/MabohlaleNkuna/restaurant-app-admin/tree/development]

## Features
- User authentication (Login/Register)
- Browse available restaurants
- Make reservations
- Manage and cancel reservations
- Receive real-time notifications
- Secure payment integration with Stripe
- User profile management

## Technologies Used
- React Native
- React Navigation
- AsyncStorage
- Stripe for payments
- Socket.io for real-time notifications
- Axios for API requests
- Node.js & MongoDB (Backend API)

## Installation
### Prerequisites
- Node.js installed
- React Native development environment setup
- Create a `.env` file with necessary API keys

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd restaurant-reservation-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the project:
   ```bash
   npm start
   ```

## Environment Variables
Create a `.env` file in the root directory and add:
```env
API_BASE_URL=<your_api_base_url>
STRIPE_PUBLIC_KEY=<your_stripe_public_key>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
```

## Folder Structure
```
restaurant-reservation-app/
│-- src/
│   │-- components/
│   │-- screens/
│   │-- utils/
│   │-- assets/
│-- App.js
│-- package.json
│-- README.md
```

## API Endpoints
### Restaurants
- `GET /restaurants` - Fetch available restaurants

### Reservations
- `POST /reservations` - Create a new reservation
  ```json
  {
    "restaurantId": "123",
    "userId": "456",
    "date": "2025-02-04",
    "time": "19:00"
  }
  ```
- `GET /reservations` - Get user's reservations
- `PUT /reservations/:id` - Update reservation status

### Payment
- `POST /payment` - Handle payments through Stripe
  ```json
  {
    "amount": 5000,
    "currency": "USD",
    "paymentMethodId": "pm_1JXXXXXX"
  }
  ```

## Authentication
- User authentication is handled using AsyncStorage for storing session tokens.
- Upon login, a JWT token is stored and used for API requests.
- Token expiration and refresh mechanisms are implemented.

## Real-Time Notifications
- Socket.io is used to notify users of reservation updates.
- Example event:
  ```javascript
  socket.on("reservationUpdate", (data) => {
    console.log("Reservation updated:", data);
  });
  ```

## Contributors
- Developer: [Your Name]

## License
This project is licensed under the MIT License.

