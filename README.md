# CodeLabAPIUsuario

API de Usuario do CodeLab

## Development Start

```bash
docker compose up --build
```

## Execução de Testes

- "attach" ao container para executar os testes.
- cato não deserje obter os relatórios de cobertura, remova o sufixo `:cov` dos comandos abaixo.

### Unit

```bash
npm run test:cov
```

### E2E

```bash
npm run test:e2e:cov
```
