# WeRoad TypeScript challenge (backend) 🛫

<p align="center">
  <img src="https://theme.zdassets.com/theme_assets/9115960/ef5800cc529889d180b05b57e40dd50e5c7adb73.png" width="200" alt="WeRoad Logo" />
</p>

### Use case
Implement a checkout process for WeRoad users to buy a Travel where:
- the user can select a travel to book;
- the user inputs an email and the number of seats to reserve;
- the user pays the total amount to confirm the booking (FAKE payment step);

### Requirements
- A Travel has a max capacity of 5 seats;
- After confirming the number of seats to reserve the availability should be granted for 15 minutes before the cart expires;

### Reasoning behind decisions
- I used TypeORM and MySQL as those felt more appropriate for a faster development and iteration cycle.
- Migrations include data seeding to avoid manually adding required data.
- HTTP provider was left at default (Express) as I didn't need MVC.
- GraphQL was integrated using the official '@nestjs/graphql @nestjs/apollo' combo.
- Testing was done using mock services for GraphQL resolvers, and in-memory SQLite DB (with seed data) for mocking repositories (DataSource).

### Challenge based on the following stack:
- [MySql](https://github.com/mysql/mysql-server)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Nest](https://github.com/nestjs/nest)
- [GraphQL](https://github.com/graphql)
- [Nuxt 3](https://github.com/nuxt/nuxt)
- [Tailwind](https://tailwindcss.com/)

Have a great trip! 👩‍✈️

## Running the app 🗄
Start the server on `http://localhost:9000`:

```bash
# dockerized (mysql included)
$ docker compose up

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running tests 🔍

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Author
Mirko Grasso
grasso.mirko@gmail.com