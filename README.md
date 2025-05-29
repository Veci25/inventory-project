<<<<<<< HEAD
# Product Inventory Management System

This is a full-stack application for managing product inventory, built with:

- **Front End**: Angular + Angular Material  
- **Back End**: Spring Boot + RESTful APIs  
- **Database**: H2 (in-memory, easily replaceable)

## Features

- View all products
- Add new products
- Edit existing products
- Delete products
- View product details
- Responsive design using Angular Material
- CORS-enabled communication between frontend and backend

---

## Folder Structure
root/
├── backend-product-inventory/ # Spring Boot backend
└── product-inventory-frontend/ # Angular frontend
---

## Prerequisites

- Java 17+
- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)
- Gradle

---

##  Backend Setup (Spring Boot)

1. Navigate to the backend project:

    ```bash
    cd backend-product-inventory
    ```

2. Run the backend:

    ```bash
    ./gradlew spring-boot:run
    ```

3. Backend runs on: `http://localhost:8080`

### API Endpoints

| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | `/api/products`       | Get all products      |
| GET    | `/api/products/{id}`  | Get product by ID     |
| POST   | `/api/products`       | Create a product      |
| PUT    | `/api/products/{id}`  | Update a product      |
| PATCH  | `/api/products/{id}`  | Partially update      |
| DELETE | `/api/products/{id}`  | Delete a product      |

---

##  Frontend Setup (Angular)

1. Navigate to the frontend project:

    ```bash
    cd product-inventory-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the frontend:

    ```bash
    ng serve
    ```

4. Open in browser: `http://localhost:4200`

> **Ensure backend is running on port 8080 for API access.**

---

## CORS Configuration (Backend)

To enable frontend-backend communication, a CORS configuration is required in Spring Boot:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("*")
            .allowedHeaders("*");
    }
}
```

