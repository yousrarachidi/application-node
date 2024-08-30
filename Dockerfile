FROM node:20-bookworm-slim
WORKDIR .
COPY package.json  .
COPY package-lock.json  .
ENV PATH=$PATH:./node_modules/.bin/
RUN npm ci
ENV DB_NAME ${DB_NAME}
ENV DB_USER ${DB_PASSWORD}
ENV DB_PASSWORD ${DB_PASSWORD}
ENV DB_HOST ${DB_HOST}
EXPOSE 3000
EXPOSE 3001
CMD ["sh", "-c" , "tail", "-f", "/dev/null"]
