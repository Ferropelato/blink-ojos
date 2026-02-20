# Solución: Error al escanear QR con Expo Go

## ¿Puedo compartir el QR con otra persona?

**Sí**, con condiciones:
- El QR contiene una URL (ej: `exp://xxx.ngrok.io`) que apunta a tu PC
- La otra persona puede escanearlo o abrir esa URL en Expo Go
- **Importante:** Tu PC debe tener el túnel (`npx expo start --tunnel`) ejecutándose
- Si apagas la PC o cierras la terminal, la URL dejará de funcionar

Para compartir: puedes enviar una **captura del QR** o la **URL** que aparece en la terminal. La persona con iPhone/Android puede abrirla en Expo Go.

---

## Problemas originales

## Causas frecuentes

1. **Teléfono y PC en redes distintas** (WiFi vs datos móviles)
2. **Firewall de Windows** bloqueando la conexión
3. **Puertos ocupados** por otra instancia de Expo

---

## Solución 1: Modo túnel (recomendado)

El modo túnel funciona aunque el celular use datos móviles.

1. **Cierra** cualquier terminal donde corra Expo
2. Abre una terminal en la carpeta `blink-app`
3. Ejecuta:

```bash
npx expo start --tunnel
```

4. La primera vez puede pedir instalar `@expo/ngrok` — acepta
5. Espera a que aparezca el QR
6. Escanea el QR con la **cámara del celular** (no con Expo Go directamente)
7. Debería abrirse en Expo Go

---

## Solución 2: Misma red WiFi

Si teléfono y PC están en la misma WiFi:

1. Cierra procesos de Expo y puertos ocupados:

```bash
# En PowerShell, buscar proceso en puerto 8081
netstat -ano | findstr :8081

# Matar el proceso (reemplaza PID por el número que salga)
taskkill /PID <número> /F
```

2. Inicia normalmente:

```bash
npx expo start
```

3. Escanea el QR

---

## Solución 3: Introducir URL manualmente

1. En la terminal de Expo verás algo como: `exp://192.168.X.X:8081`
2. Abre **Expo Go** en el celular
3. Toca **"Enter URL manually"** o **"Introducir URL manualmente"**
4. Escribe la URL que aparece en la terminal
5. Asegúrate de que el celular esté en la **misma WiFi** que la PC

---

## Solución 4: Probar en web

Si el QR sigue fallando, prueba en el navegador:

```bash
npx expo start --web
```

Se abrirá en `http://localhost:8081` (o el puerto que indique).

---

## Comprobar firewall

1. Windows Defender Firewall → "Permitir una aplicación"
2. Busca **Node** o **Expo**
3. Activa las casillas para **Red privada**

Si no aparece, añade una regla para permitir el puerto 8081.

---

## Limitación: segundo plano (minimizar)

**En Expo Go**, cuando minimizas la app, el timer se detiene. No se ejecuta nada en segundo plano.

**Motivo:** Las restricciones de iOS/Android limitan la ejecución en background. Expo Go no permite tareas en segundo plano.

**Solución:** Para que funcione con la app minimizada, necesitas crear un **development build** (APK/IPA) en lugar de usar Expo Go. En un build propio, las notificaciones programadas sí pueden enviar recordatorios cuando la app está en segundo plano.

### Crear development build con EAS

1. Instala EAS CLI: `npm install -g eas-cli`
2. Inicia sesión: `eas login`
3. Configura el proyecto: `eas build:configure`
4. Genera el APK Android: `eas build --platform android --profile development`

El APK resultante se puede instalar en tu dispositivo y tendrá soporte para:
- Notificaciones en segundo plano
- Sensores de proximidad (teléfono boca abajo)
- Recordatorios en pantalla bloqueada
