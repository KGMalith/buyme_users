
FROM node:14
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4001
CMD ["npm", "start"]
