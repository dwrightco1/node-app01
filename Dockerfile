FROM node:10-alpine
WORKDIR /nodeapp
#ENV PORT 81
#ENV DATABASE_IP 172.18.0.10
#ENV DATABASE_USER root
#ENV DATABASE_PW Passw0rd
#ENV DATABASE_NAME nodeapp
COPY . .
RUN yarn install --production
CMD ["node", "/nodeapp/nodeapp.js"]
