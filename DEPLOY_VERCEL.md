# 🚀 Subir Blink a GitHub y Vercel

Guía para vincular el proyecto a tu GitHub y desplegarlo en Vercel.

---

## Parte 1: Vincular a GitHub

### Paso 1: Crear el repositorio en GitHub (si no existe)

1. Ve a [github.com](https://github.com) e inicia sesión.
2. Clic en **+** → **New repository**.
3. Nombre: `blink-ojos` (o el que prefieras).
4. Deja **Public** y no marques "Add a README".
5. Clic en **Create repository**.

### Paso 2: Inicializar Git y subir el código

Abre la terminal en la carpeta **blink-app** (donde está el `package.json`):

```bash
cd "c:\Users\Fernando\Desktop\curso desarrollador\proyecto ojos\blink-app"
```

Si ya tienes Git inicializado en la carpeta padre, puedes trabajar desde `blink-app`:

```bash
git init
git add .
git commit -m "Blink app - versión inicial"
git branch -M main
git remote add origin https://github.com/Ferropelato/blink-ojos.git
git push -u origin main
```

**Si el repo ya tiene contenido** (ej. README creado al crearlo):

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## Parte 2: Desplegar en Vercel

### Paso 1: Crear cuenta en Vercel

1. Entra en [vercel.com](https://vercel.com).
2. Clic en **Sign Up**.
3. Regístrate con **GitHub** (recomendado para vincular el repo).

### Paso 2: Importar el proyecto

1. En Vercel, clic en **Add New** → **Project**.
2. En **Import Git Repository**, selecciona **blink-ojos** (o conecta GitHub si no aparece).
3. Si no ves el repo, clic en **Adjust GitHub App Permissions** y autoriza el acceso.

### Paso 3: Configurar el build

En la pantalla de configuración:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Other |
| **Root Directory** | `.` (dejar vacío si el repo es solo blink-app) |
| **Build Command** | `npx expo export -p web` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Paso 4: Desplegar

1. Clic en **Deploy**.
2. Espera 2–5 minutos.
3. Al terminar tendrás una URL como: `https://blink-ojos-xxx.vercel.app`

---

## Parte 3: ¿Cómo actualizar después?

**Sí, puedes seguir mejorando desde tu PC y actualizar Vercel.**

### Opción A: Deploy automático (recomendado)

1. Haz cambios en tu código.
2. En la terminal:
   ```bash
   cd "c:\Users\Fernando\Desktop\curso desarrollador\proyecto ojos\blink-app"
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```
3. Vercel detecta el push y **redespliega automáticamente**.
4. En 1–2 minutos la web tendrá los cambios.

### Opción B: Deploy manual

1. En [vercel.com](https://vercel.com) → tu proyecto Blink.
2. Pestaña **Deployments**.
3. Clic en **Redeploy** en el último deployment.

---

## Resumen rápido

| Acción | Comando / Paso |
|--------|----------------|
| **Subir a GitHub** | `git add .` → `git commit -m "mensaje"` → `git push` |
| **Actualizar en Vercel** | Hacer `git push` → Vercel redespliega solo |
| **Ver la app** | Abrir la URL de Vercel en cualquier navegador |

---

## Nota sobre Root Directory

- Si subiste **solo** el contenido de `blink-app` al repo → Root Directory: `.` (vacío).
- Si subiste la carpeta `proyecto ojos` con `blink-app` dentro → Root Directory: `blink-app`.
