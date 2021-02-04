# The first stage
# Build React static files

FROM node:14-alpine as build

WORKDIR /app/frontend
COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./frontend/ ./
RUN yarn build

# The second stage
# Copy React static files and start nginx
FROM nginx:1.19.0-alpine

COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]