# Day 27 - DevOps (Docker, CI/CD, Kubernetes)

DevOps automates building, testing, and deploying applications. This day covers containerization, CI/CD pipelines, and Kubernetes orchestration.

## Learning Objectives
- Write Dockerfiles for frontend and backend
- Use docker-compose for multi-service apps
- Set up GitHub Actions CI/CD
- Create Kubernetes deployments and services
- Use Minikube for local K8s development
- Configure Ingress for domain routing

## Concepts Covered

### Docker
```dockerfile
# Backend Dockerfile
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
version: '3'
services:
  backend:
    build: ./backend
    ports: ["5000:5000"]
    env_file: .env
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
```

### GitHub Actions CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy
on: { push: { branches: [main] } }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test && npm run build
```

### Kubernetes Basics
```yaml
# deployment.yaml
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
      - name: my-app
        image: nginx:alpine
        ports: [{ containerPort: 80 }]

# service.yaml
apiVersion: v1
kind: Service
metadata: { name: my-app-service }
spec:
  selector: { app: my-app }
  ports: [{ port: 80, targetPort: 80 }]
  type: NodePort
```

### K8s Commands
```bash
minikube start
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl get pods
kubectl get services
```

### Ingress Setup
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata: { name: mern-ingress }
spec:
  rules:
  - host: notes.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend: { service: { name: frontend-service, port: { number: 80 } } }
      - path: /api
        pathType: Prefix
        backend: { service: { name: backend-service, port: { number: 5000 } } }
```

## Files
| File | Description |
|------|-------------|
| `index.html` | All DevOps topics with code examples |
