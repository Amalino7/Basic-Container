FROM node:23-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV PORT=8000
ENV NODE_ENV="production"
ENV WHITELISTED_DOMAINS=""
ENV TOKEN_KEY="ighlerffzhbdvkbghdtkjgbfj"

EXPOSE 8000
CMD ["npm","start"]