FROM node:16-alpine3.15
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --chown=node:node . ./
RUN npm i
ENV NODE_ENV docker
CMD ["npm", "start"]
