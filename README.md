# Izam Ecommerce

## Overview

This project is a web application built with Laravel for the backend and React with Material-UI for the frontend. It allows users to view and sell products.

## API Endpoints

### Products

- **GET /api/products**
  - **Description**: Retrieve a list of products.
  - **Response**: Returns a paginated list of products.
    
### Orders

- **POST /api/orders/**
  - **Description**: Create order.
 
  - **Request Body Example**:
    ```json
    {
      "total": 1500,
      "products": [
      {
          "id":12,
          "quantity":2
      },
       {
          "id":13,
          "quantity":2
      },
    ]
    }
    ```
  - **Response**: Returns order details.
    

- **GET /api/orders/${id}**
  - **Description**: View order details.
  - **Response**: Returns the order with list of products.
    
### Authentication

- **POST /api/login**
  - **Description**: Authenticate a user and return a token.
  - **Request Body**: (you can use it after running the ``` $ php artisan db:seed ``` command)
    ```json
    {
      "email": "test@example.com",
      "password": "password"
    }
    ```
  - **Response**: Returns an authentication token if successful.

- **POST /api/logout**
  - **Description**: Log out the authenticated user.
  - **Response**: Returns a success message.

## Setup Instructions


1. **Clone the Repository**:
   ```bash
   git clone https://github.com/raniaSayed/izam-ecommerce.git
   cd izam-ecommerce
   ```

   Install Dependencies:
```bash
$ composer install
```
Environment Setup:

Copy the .env.example to .env:
```bash
$ cp .env.example .env
```

Generate the application key:

```bash
$ php artisan key:generate
```
Set up your database connection in the .env file.
Run Migrations:
```bash
$ php artisan migrate
$ php artisan db:seed
```


Start the Laravel Development Server for both (FE, BE):

```bash
$ composer run dev 
```

Authentication Flow
User Login:

The user submits their email and password to the /api/login endpoint.
If successful, the server responds with an authentication token.
Token Storage:

Store the token in local storage or a state management solution for future requests.
Access Protected Routes:

Use the token for authenticated requests by including it in the headers:
javascript

```bash
axios.get('/api/products', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```
User Logout:

Call the /api/logout endpoint to invalidate the token.


### Screenshot of website

Product List
![product list](https://github.com/raniaSayed/izam-ecommerce/blob/main/public/images/Screenshot%202025-05-18%20at%207.35.48%E2%80%AFPM.png)

Shopinng cart
![shopinng cart](https://github.com/raniaSayed/izam-ecommerce/blob/main/public/images/Screenshot%202025-05-18%20at%207.35.58%E2%80%AFPM.png)

Shoping cart after checkout
![shoping cart after checkout](https://github.com/raniaSayed/izam-ecommerce/blob/main/public/images/Screenshot%202025-05-18%20at%207.36.07%E2%80%AFPM.png)

Filter product list whith price range and categories
![filter product list whith price range and categories](https://github.com/raniaSayed/izam-ecommerce/blob/main/public/images/Screenshot%202025-05-18%20at%207.36.28%E2%80%AFPM.png)

Filter product list with product name search
![filter product list with product name search](https://github.com/raniaSayed/izam-ecommerce/blob/main/public/images/Screenshot%202025-05-18%20at%207.36.45%E2%80%AFPM.png)
