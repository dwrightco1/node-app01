FROM node:10-alpine
WORKDIR /node-app01
ENV PORT 81
COPY . .
RUN yarn install --production
CMD ["node", "/node-app01/server.js"]
