FROM node:lts-slim AS builder

RUN apt-get update && apt-get install -y openssl

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./  
COPY --chown=node:node prisma ./prisma/  

RUN npm install

COPY --chown=node:node . .

RUN npx prisma generate  

RUN npx nest build


FROM node:lts-slim

RUN apt-get update && apt-get install -y openssl

WORKDIR /home/node/app

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/package*.json ./  
COPY --from=builder /home/node/app/prisma ./prisma

#COPY .env .env  

RUN chown -R node:node /home/node/app && chmod -R 755 /home/node/app

RUN npx prisma generate

USER node

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
