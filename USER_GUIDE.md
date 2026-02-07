# 📖 Manual de Usuario - TiendaPremium

## 🚀 Inicio Rápido

1. Abre `index.html` en tu navegador preferido
2. La página cargará con un loader animado
3. ¡Listo! Explora todas las funcionalidades

## 🎯 Funcionalidades Principales

### 👤 Sistema de Usuario

#### Acceder al Modal de Usuario
1. Click en el icono de usuario (👤) en el header
2. Aparecerá el modal con dos tabs:
   - **Iniciar Sesión**: Para usuarios existentes
   - **Registrarse**: Para nuevos usuarios

#### Iniciar Sesión
```
Campos:
- Correo electrónico
- Contraseña
- [Checkbox] Recordarme
- Link: ¿Olvidaste tu contraseña?

Opciones adicionales:
- Iniciar sesión con Google
- Iniciar sesión con Facebook
```

#### Registrarse
```
Campos:
- Nombre completo
- Correo electrónico
- Contraseña
- Confirmar contraseña
- [Checkbox] Acepto términos y condiciones

Validaciones:
- Las contraseñas deben coincidir
- Todos los campos obligatorios
```

#### Panel de Usuario (Después de login)
```
Opciones disponibles:
📱 Mi Perfil
🛍️ Mis Pedidos
❤️ Lista de Deseos
📍 Direcciones
💳 Métodos de Pago
⚙️ Configuración
🚪 Cerrar Sesión
```

### 🛒 Carrito de Compras

#### Agregar Productos
1. Navega por el catálogo de productos
2. Click en "Agregar al Carrito" en cualquier producto
3. Verás una notificación de confirmación
4. El contador del carrito se actualiza

#### Abrir Carrito
1. Click en el icono del carrito (🛒) en el header
2. El panel lateral se desliza desde la derecha
3. Muestra todos los productos agregados

#### Gestionar Cantidades
```
Cada producto en el carrito tiene:
- Imagen del producto
- Nombre
- Precio unitario
- Botón [-] disminuir cantidad
- Cantidad actual
- Botón [+] aumentar cantidad
- Botón 🗑️ eliminar producto
```

#### Calcular Total
El total se actualiza automáticamente al:
- Agregar productos
- Cambiar cantidades
- Eliminar productos

### 🔍 Búsqueda de Productos

1. Usa el campo de búsqueda en el header
2. Escribe el nombre del producto
3. Los resultados se filtran en tiempo real
4. Compatible con búsqueda por categoría activa

### 🏷️ Filtrado por Categorías

#### Método 1: Tarjetas de Categorías
```
Categorías disponibles:
💻 Electrónica (125 productos)
👕 Moda (230 productos)
🏠 Hogar (180 productos)
💪 Deportes (95 productos)
💄 Belleza (150 productos)
🎮 Juguetes (88 productos)
```

#### Método 2: Filtros de Productos
Botones de filtro encima del grid de productos:
- Todos
- Electrónica
- Moda
- Hogar
- Deportes

### 📧 Newsletter

1. Scroll hasta la sección de Newsletter
2. Ingresa tu correo electrónico
3. Click en "Suscribirse"
4. Recibirás una confirmación

### 📱 Navegación

#### Desktop
- Header sticky (se queda fijo al hacer scroll)
- Menú de navegación completo
- Búsqueda visible
- Iconos de carrito y usuario

#### Mobile
- Menú hamburguesa (pendiente de implementación)
- Carrito y usuario en pantalla completa
- Navegación vertical

## 🎨 Características Visuales

### Efectos en Hover
```
Elementos interactivos:
✅ Productos: Elevan + glow border
✅ Categorías: Elevan + glow background
✅ Botones: Scale + shadow glow
✅ Links: Color change smooth
✅ Inputs: Border glow + background change
```

### Animaciones
```
Al cargar la página:
- Loader giratorio
- Fade in de elementos

Al hacer scroll:
- Products appear con fade up
- Hero con parallax
- Smooth transitions

Al interactuar:
- Ripple en botones primary
- Slide de modales y paneles
- Toast notifications
```

### Partículas de Fondo
- 30 partículas flotantes
- Movimiento ascendente lento
- Fade in/out suave
- No interfieren con clicks

## 🎯 Tips de Uso

### Para Desarrolladores

1. **Personalizar Colores**
   ```css
   /* Editar en css/styles.css */
   :root {
       --primary-color: #6366f1;
       --accent-purple: #a855f7;
   }
   ```

2. **Agregar Productos**
   ```javascript
   // Editar en js/main.js
   const productsData = [
       {
           id: 13,
           title: "Nuevo Producto",
           category: "electronica",
           price: 99.99,
           // ...
       }
   ];
   ```

3. **Cambiar Imágenes**
   - Actualmente usa iconos Font Awesome
   - Puedes reemplazar con URLs de imágenes reales
   - Editar en la función `createProductCard()`

### Para Usuarios

1. **Explorar Productos**
   - Scroll por el catálogo
   - Usa filtros para encontrar lo que buscas
   - Hover sobre productos para ver efectos

2. **Crear Cuenta**
   - Click en icono de usuario
   - Tab "Registrarse"
   - Completa el formulario

3. **Comprar**
   - Agrega productos al carrito
   - Revisa tu carrito
   - Click en "Proceder al Pago" (funcionalidad pendiente)

## 🔔 Notificaciones

El sistema muestra notificaciones para:
- ✅ Producto agregado al carrito
- ✅ Login exitoso
- ✅ Registro exitoso
- ✅ Cierre de sesión
- ✅ Suscripción a newsletter
- ❌ Errores (contraseñas no coinciden, etc.)

### Tipos de Notificaciones
```
🟢 Success: Fondo verde
🔴 Error: Fondo rojo
ℹ️ Info: Fondo azul (pendiente)
⚠️ Warning: Fondo naranja (pendiente)
```

## 🎮 Atajos de Teclado (Futuros)

```
Planeados para futuras versiones:
- ESC: Cerrar modales/panels
- CTRL + K: Abrir búsqueda
- CTRL + B: Abrir carrito
- CTRL + U: Abrir usuario
```

## 🐛 Solución de Problemas

### El loader no desaparece
- Refresca la página (F5)
- Verifica que JavaScript está habilitado

### Los productos no se muestran
- Abre la consola del navegador (F12)
- Verifica errores en JavaScript
- Confirma que main.js carga correctamente

### Animaciones lentas
- Normal en dispositivos antiguos
- Los efectos usan GPU acceleration
- Considera desactivar partículas editando createParticles()

### Modal no se cierra
- Click en el X de cerrar
- Click fuera del modal (en el overlay)
- Refresca si persiste

## 📞 Soporte

Para soporte técnico o preguntas sobre el código:
- Revisa README.md
- Revisa DESIGN_GUIDE.md
- Consulta el código fuente (bien comentado)

---

**¡Disfruta explorando TiendaPremium!** 🛍️✨
