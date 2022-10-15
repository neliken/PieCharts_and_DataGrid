FROM ubuntu
WORKDIR /app
COPY . ./
RUN apt-get update && apt-get install -y --no-install-recommends npm
RUN npm install --production
CMD ["npm", "start"]