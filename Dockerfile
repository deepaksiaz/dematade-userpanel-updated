FROM node:14-alpine3.14 AS builder
WORKDIR /work
COPY package.json ./
RUN npm install
COPY . ./
RUN apk add --no-cache tzdata
ENV TZ=Asia/Kolkata
#RUN npm run build

#Stage 2
#######################################

#FROM nginx:1.20-alpine
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#COPY --from=builder /work/build .
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
ENTRYPOINT ["npm", "start"]

