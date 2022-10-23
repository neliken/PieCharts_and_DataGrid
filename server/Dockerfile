FROM node:16-alpine3.15
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --chown=node:node . ./
RUN npm i
COPY --chown=node:node ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
RUN /docker-entrypoint.sh
# ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "start"]