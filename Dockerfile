FROM node:18.16-alpine

ENV HOST=0.0.0.0

WORKDIR /var/www/html/ticketing-frontend

# RUN npm install -g @vue/cli

COPY package.json /var/www/html/ticketing-frontend

RUN npm install

COPY . .

EXPOSE 3000

# CMD npm run dev
CMD ["npm", "run", "dev"]

# FROM nginx:1.24.0-alpine

