# E-commerce Backend API Documentation

## Overview

This document provides a guide to the main API endpoints for managing orders, discounts, and retrieving analytics for your e-commerce backend. The backend is built with TypeScript and Bun and provides functionalities for adding items to a cart, applying discounts, checking out, and viewing order summaries.

## Base URL

Ensure the base URL is correctly set in your environment. By default, it's set to:

```text
{{baseUrl}} = http://localhost:3000
```

## Endpoints

### 1. Add Item to Cart

- **Endpoint:** `POST /cart/add-item`
- **Description:** Adds an item to the user’s cart.
- **Request Body:**

  ```json
  {
    "productId": "prod-001",
    "quantity": 2
  }
  ```

- **Response:** Contains the updated cart details with the newly added item.
- **Response:**

  ```json
  {
    "correlationId": "7e90a86d-1eae-4b27-a59d-58593e3f8d94",
    "message": "Item added to cart"
  }
  ```

### 2: Checkout

- **Endpoint:** `POST /cart/checkout`
- **Description:** Proceeds with the checkout process for the items in the cart without applying any discounts.
- **Request Body:**

  ```json
  {
    "discountId": "c78a5ef1-1e7a-44da-8576-ceed2e0bd335" // Optional
  }
  ```

- **Expected Response:**

  ```json
  {
    "order": {
      "cart": {
        "items": [
          {
            "productId": "prod-001",
            "quantity": 2,
            "price": 1000
          }
        ],
        "totalCartValue": 2000
      },
      "discountDetails": {
        // AdditionalField
        "expiresAt": "2024-11-12T16:33:57.360Z",
        "used": true,
        "id": "c78a5ef1-1e7a-44da-8576-ceed2e0bd335",
        "code": "10_PERCENT"
      },
      "discountValue": 200, // AdditionalField
      "orderId": "order-1731342855624",
      "orderValue": 1800
    }
  }
  ```

### 3: Generate Discount Code

- **Endpoint:** `POST /admin/generate-discount-code`
- **Description:** Generates a discount code for the user.
- **Request Body:**

  ```json
  {}
  ```

- **Expected Response:**

  ```json
  {
    "message": "Discount code generated",
    "discountCode": "DISCOUNT123",
    "correlationId": "7e90a86d-1eae-4b27-a59d-58593e3f8d94"
  }
  ```

### 4: Get Orders Analysis

- **Endpoint:** `GET /admin/orders-analytics`

- **Description:** Retrieves a summary of all placed orders, including key analytics.

- **Expected Response:**

  ```json
  {
    "summary": {
      "totalOrders": 3,
      "itemCount": 6,
      "totalAmount": 5800,
      "discountCodes": ["10_PERCENT"],
      "totalDiscountAmount": 200
    },
    "correlationId": "63b0cef3-5972-44b1-b48d-7ed588e6d8af"
  }
  ```

### 5 Authorization:

- Ensure that a valid bearer token is provided in the `Authorization` header for this endpoint.

- **Example of Authorization Header:**

  ```
  Authorization: Bearer YOUR_ACCESS_TOKEN
  ```

- Replace `YOUR_ACCESS_TOKEN` with the actual token obtained from the authentication service.

### Example Flow - Add Item, Generate Discount, Then Checkout with Discount

1. **Add Item:**

   - Use the `/cart/add-item` endpoint to add items to the cart.

2. **Generate Discount:**

   - Use the `/admin/generate-discount-code` endpoint. If successful, a `discountCode` will be returned.

3. **Checkout with Discount:**

   - Pass the obtained `discountCode` in the checkout request body to apply the discount during checkout.

   - **Sample Request for Checkout with Discount Code:**

     **Endpoint:** `POST /cart/checkout`

     **Request Body:**

     ```json
     {
       "discountId": "c78a5ef1-1e7a-44da-8576-ceed2e0bd335"
     }
     ```

     **Expected Response:**

     ```json
     {
       "order": {
         "cart": {
           "items": [
             {
               "productId": "prod-001",
               "quantity": 2,
               "price": 1000
             }
           ],
           "totalCartValue": 2000
         },
         "discountDetails": {
           "expiresAt": "2024-11-12T16:33:57.360Z",
           "used": true,
           "id": "c78a5ef1-1e7a-44da-8576-ceed2e0bd335",
           "code": "10_PERCENT"
         },
         "discountValue": 200,
         "orderId": "order-1731342855624",
         "orderValue": 1800
       }
     }
     ```

4. **Authorization:**

- Ensure that a valid bearer token is provided in the `Authorization` header for all endpoints that require authentication.

- **Example of Authorization Header:**

  ```
  Authorization: Bearer YOUR_ACCESS_TOKEN
  ```

- Replace `YOUR_ACCESS_TOKEN` with the actual token obtained from the authentication service.
