FROM node:19
WORKDIR /run/app
COPY . .
RUN mkdir -p db
RUN npm install
CMD ["npm", "start"]