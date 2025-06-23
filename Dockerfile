# Etapa 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar arquivos de configuração primeiro
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY components.json ./
COPY eslint.config.js ./

# Instalar dependências
RUN npm ci --only=production=false

# Copiar código fonte
COPY ./src ./src
COPY ./public ./public
COPY ./index.html ./

# Executar build
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 