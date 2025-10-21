# API Lens

**API Lens** es una herramienta web que permite a desarrolladores y equipos **pegar la URL de una API (REST o GraphQL)**, detectar y visualizar sus endpoints en un **grafo interactivo**, **probar requests** directamente desde la interfaz y **generar automáticamente tipos TypeScript** y clientes básicos para acelerar el consumo de APIs.

---

## 🎯 Visión

Construir una herramienta que demuestre dominio técnico en el manejo de APIs, arquitectura frontend moderna y generación de tipos, con impacto real para procesos de desarrollo.

---

## 🚀 Objetivos del Producto

- **Demostrar comprensión profunda de APIs** (OpenAPI, GraphQL, REST).
- **Mostrar dominio de TypeScript avanzado**, generación automática de tipos y validaciones.
- **Exponer buenas prácticas de arquitectura** (modularidad, seguridad, tests, CI/CD).
- **Producir un entregable técnico reproducible** (cliente, types y tests automáticos).
- **Crear una herramienta útil** para reclutadores y equipos de desarrollo (B2B / DevTools).

---

## 🧩 Principios de Diseño

| Principio | Descripción | Por qué |
|------------|-------------|----------|
| **Modularidad** | Separar parsing, visualización y ejecución de requests. | Facilita mantenimiento, tests y escalabilidad. |
| **Progressive Enhancement** | Soporte mínimo sin spec + mejoras cuando hay OpenAPI/GraphQL. | Cubre más casos reales. |
| **Seguridad y privacidad** | No almacenar claves ni tokens en texto plano. | Uso responsable con APIs externas. |
| **UX para desarrolladores** | “Try it”, copiar types, descargar cliente, todo rápido. | Muestra foco en productividad. |
| **Observabilidad** | Logs, historial local y tests reproducibles. | Refleja profesionalismo y control. |

---

### Componentes
1. **Frontend (SPA)**
   - Framework: React + TypeScript (Vite)
   - UI: TailwindCSS + shadcn/ui
   - Visualización: React Flow (grafo interactivo)
   - Estado: React Query + Zustand
---

## ⚙️ Tecnologías Clave

| Tecnología | Propósito |
|-------------|------------|
| **React + TypeScript** | Base del frontend con tipado estricto |
| **Vite** | Dev server rápido y build eficiente |
| **TailwindCSS** | Estilos utilitarios modernos |
| **React Flow** | Visualización interactiva de endpoints |
| **React Query** | Manejo de fetching y caching de datos |
| **Zustand** | Estado global liviano para la UI |
| **quicktype-core / openapi-typescript** | Generación automática de tipos |
| **Vercel Functions** | Proxy serverless sin necesidad de backend permanente |
| **Jest / Playwright** | Testing unitario y E2E |
| **ESLint / Prettier / Husky** | Estilo y calidad de código |
| **Docker** | Reproducibilidad del entorno de desarrollo |

---

## 🧠 Flujo de Usuario (MVP)

1. El usuario pega una URL o carga un archivo OpenAPI.
2. El sistema detecta si es REST, OpenAPI o GraphQL.
3. Se normaliza el spec y se genera un grafo con los endpoints.
4. El usuario puede probar un endpoint (“Try it”).
5. Se genera código TypeScript a partir de la respuesta o el spec.
6. El usuario puede copiar o descargar los tipos generados.

---

## 🧪 Roadmap

### MVP
- Pegar URL → ver grafo → probar endpoint → generar types → copiar/descargar.
- Proxy serverless básico.
- Tests unitarios y E2E.
- Deploy en Vercel con 2 APIs públicas de ejemplo.

### v1
- Generación de types desde OpenAPI.
- Historial local de endpoints.
- Autocompletado de parámetros.
- Exportar cliente TypeScript.
- Integración CI/CD (GitHub Actions).

### v2
- Generación de esquemas Zod.
- Inferencia de flujos entre endpoints.
- Integración con repos GitHub (PR automáticos).
- Persistencia multi-usuario (Supabase).

---

## 🔒 Seguridad

- No persistir API keys ni tokens.
- Limitar tamaño de respuesta (2MB).
- Sanitizar respuestas (sin HTML ejecutable).
- Avisar al usuario si se usan credenciales.
- Limitar requests por IP (rate limiting básico).

---

## 🧑‍💻 Autor

Proyecto creado por **Brayan** como demostración de habilidades en desarrollo frontend moderno, arquitectura modular y generación automática de tipos.

---

## 🪄 Licencia

MIT License © 2025
