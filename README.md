## Currency converter app
A Simple currency converter app.
This uses [openexchangerates.org](https://openexchangerates.org)

### Getting Started

First, run the development server:

```bash
npm install

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t currency_conveter .`
1. Run your container: `docker run -p 3000:3000 currency_conveter`

You can view your images created with `docker images`


### Running Tests
```bash
npm install
 
npm run e2e
```
