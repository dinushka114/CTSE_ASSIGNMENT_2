FROM node

WORKDIR /app/email

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8004

CMD ["npm", "start"]