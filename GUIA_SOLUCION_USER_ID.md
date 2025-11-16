# 🔧 Guía para Solucionar el Problema del user_id Hardcodeado

## 📖 **Descripción del problema**
El sistema tiene hardcodeado `user_id = 1` en todos los módulos de compras, causando errores si no existe un usuario con ID 1 en la base de datos.

## 🎯 **Objetivo**
Hacer que el sistema use automáticamente el ID del usuario que está logueado, obtenido desde `sessionStorage`.

---

## 📋 **PASOS A SEGUIR**

### **🔍 PASO 1: Identificar archivos a modificar**

**Archivos PHP que necesitan cambios:**
```
compras/pedido/index.php
compras/presupuesto/index.php  
compras/orden_compra/index.php
compras/Reg_Compras/index.php
compras/Nota_remi_comp/index.php
compras/notas_cred_deb/index.php
compras/Ajustes_inventario/index.php
```

**Archivos JavaScript que necesitan cambios:**
```
compras/pedido/metodos.js
compras/presupuesto/metodos.js
compras/orden_compra/metodos.js
compras/Reg_Compras/metodos.js
compras/Nota_remi_comp/metodos.js
compras/notas_cred_deb/metodos.js
compras/Ajustes_inventario/metodos.js
```

---

### **📝 PASO 2: Modificar archivos PHP**

En **CADA UNO** de los 7 archivos `index.php` de compras, buscar esta línea (alrededor de la línea 58):

**❌ ANTES:**
```html
<input type="hidden" value="1" id="user_id"/>
```

**✅ DESPUÉS:**
```html
<input type="hidden" value="" id="user_id"/>
```

> **💡 Tip:** Usar Ctrl+H para buscar y reemplazar `value="1" id="user_id"` por `value="" id="user_id"`

---

### **⚙️ PASO 3: Modificar archivos JavaScript**

#### **3A. Agregar llamada al inicio**

En **CADA UNO** de los 7 archivos `metodos.js`, al **principio del archivo** (líneas 1-3), agregar:

```javascript
// Cargar user_id del usuario logueado
cargarUserIdLogueado();
```

**Ejemplo de cómo debe quedar:**
```javascript
// Cargar user_id del usuario logueado
cargarUserIdLogueado();
listar();
campoFecha();
```

#### **3B. Agregar función al final**

En **CADA UNO** de los 7 archivos `metodos.js`, al **final del archivo**, antes de la última llave `}`, agregar:

```javascript

// Función para cargar el user_id real del usuario logueado
function cargarUserIdLogueado() {
    try {
        const datosSesion = JSON.parse(sessionStorage.getItem('datosSesion'));
        
        if (datosSesion && datosSesion.user && datosSesion.user.id) {
            $('#user_id').val(datosSesion.user.id);
            console.log('User ID cargado exitosamente:', datosSesion.user.id);
        } else {
            console.error('No se encontraron datos de sesión válidos');
            alert('Error: No se puede identificar al usuario. Inicie sesión nuevamente.');
            window.location.href = '../../index.html';
        }
    } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        alert('Error al cargar datos del usuario. Inicie sesión nuevamente.');
        window.location.href = '../../index.html';
    }
}
```

---

### **🛠️ PASO 4: (Opcional) Eliminar errores de Flot Charts**

Si aparecen errores como "Invalid dimensions for plot", hacer estos cambios opcionales:

#### **4A. En menu.php**
Buscar y **ELIMINAR** esta línea:
```html
<script src="js/pages/index.js"></script>
```

#### **4B. En archivos index.php de compras**
Buscar y **ELIMINAR** esta línea:
```html
<script src="../../js/demo.js"></script>
```

También eliminar estas líneas de `menu.php`:
```html
<!-- Flot Charts Plugin Js -->
<script src="plugins/flot-charts/jquery.flot.js"></script>
<script src="plugins/flot-charts/jquery.flot.resize.js"></script>
<script src="plugins/flot-charts/jquery.flot.pie.js"></script>
<script src="plugins/flot-charts/jquery.flot.categories.js"></script>
<script src="plugins/flot-charts/jquery.flot.time.js"></script>
```

---

## ✅ **PASO 5: Verificar que funcione**

### **Pasos de verificación:**

1. **Hacer login** en el sistema
2. **Abrir herramientas de desarrollador** (F12)
3. **Ir a la pestaña "Console"**
4. **Navegar a cualquier módulo de compras** (pedidos, presupuestos, etc.)
5. **Verificar en la consola** que aparezca: 
   ```
   User ID cargado exitosamente: [ID_DEL_USUARIO]
   ```
6. **Crear un pedido/compra** → Debe funcionar sin errores

### **Si hay problemas:**

**🔍 Debug paso a paso:**
1. ¿Aparece el mensaje en la consola?
2. ¿El `sessionStorage` tiene datos? (F12 > Application > Session Storage)
3. ¿La estructura de datos es correcta? Debe tener: `datosSesion.user.id`

---

## 📊 **Resumen de cambios**

| Archivo | Cambio requerido |
|---------|------------------|
| 7 archivos PHP | Cambiar `value="1"` por `value=""` en input user_id |
| 7 archivos JS | Agregar llamada `cargarUserIdLogueado()` al inicio |
| 7 archivos JS | Agregar función `cargarUserIdLogueado()` al final |

---

## 🎯 **Resultado esperado**

- ✅ **No más errores** de usuario inexistente
- ✅ **user_id dinámico** basado en el usuario logueado  
- ✅ **Sin modificaciones** en backend/base de datos
- ✅ **Funciona para cualquier usuario** que haga login

---

## 🆘 **Soporte**

Si tienes problemas:
1. Verificar que el login guarde datos en `sessionStorage.datosSesion`
2. Verificar que la estructura sea: `{user: {id: 123, ...}, ...}`
3. Revisar la consola del navegador para errores
4. Verificar que todos los archivos tengan los cambios aplicados

---

**💡 Nota:** Esta solución es **solo frontend** y no requiere cambios en la base de datos ni backend.