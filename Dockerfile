FROM node:10-alpine
WORKDIR /nodeapp
ENV PORT 81
COPY . .
RUN yarn install --production
CMD ["node", "/nodeapp/server.js"]
