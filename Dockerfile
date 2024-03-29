FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 4000

# CMD [ "npm" ,"run" , "db:push", "&&" , "node", "dist/index.js" ]
CMD [ "./command.sh" ]