# DevOps

## Days
- [Day 27 - DevOps](../day-27/)

## Docker

Containerize applications for consistent deployment.

### Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```

### Docker Compose
```yaml
services:
  backend:
    build: ./backend
    ports: ["5000:5000"]
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
```

## CI/CD with GitHub Actions
```yaml
name: Deploy
on: { push: { branches: [main] } }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test && npm run build
```

## Kubernetes

Orchestrate containers in production.

### Commands
```bash
minikube start
kubectl apply -f deployment.yaml
kubectl get pods
kubectl get services
```

### Deployment YAML
```yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: my-app }
spec:
  replicas: 3
  selector: { matchLabels: { app: my-app } }
  template:
    metadata: { labels: { app: my-app } }
    spec:
      containers:
      - name: app
        image: nginx:alpine
        ports: [{ containerPort: 80 }]
```

### Ingress
Route traffic to services:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata: { name: app-ingress }
spec:
  rules:
  - host: myapp.local
    http:
      paths:
      - path: /
        backend: { service: { name: frontend, port: { number: 80 } } }
```

## Cloud Deployment
- **Vercel**: Deploy frontend (React, Vite, Next.js)
- **Render**: Deploy backend (Node.js, Express)
- **Railway/Fly.io**: Full stack deployment
- **AWS/GCP**: Cloud platforms for production
