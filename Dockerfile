FROM node

WORKDIR /usr/src/

COPY . .

EXPOSE 5000

RUN rm -rf node_modules
RUN npm i
RUN npm run build

CMD [ "npm", "start" ]