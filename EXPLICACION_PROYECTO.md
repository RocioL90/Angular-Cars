# 📘 Explicación del Proyecto - CRUD Angular

## 🎯 ¿Qué es este proyecto?

Es una aplicación web simple de Angular que permite **Crear, Leer, Actualizar y Eliminar** usuarios. Se conecta a una API REST para guardar los datos.

---

## 📁 Estructura del Proyecto

### **1. Archivos Principales (src/app/)**

#### **`app.ts` y `app.html`**
- **¿Qué hace?** Es el componente raíz de toda la aplicación
- **`app.html`**: Muestra el contenido principal (un enrutador que carga otros componentes)
- **`app.ts`**: Define el componente base con el selector `<app-root>`

#### **`app.config.ts`**
- **¿Qué hace?** Configuración global de la aplicación
- **`provideRouter(routes)`**: Configura el sistema de rutas para navegación
- **`provideHttpClient()`**: Habilita las peticiones HTTP (GET, POST, PUT, DELETE) a APIs

#### **`app.routes.ts`**
- **¿Qué hace?** Define las rutas de la aplicación (qué URL muestra qué componente)
- **`path: ''`**: La ruta raíz (http://localhost:4200) muestra el `UsuarioComponent`
- **`path: '**'`**: Cualquier ruta no definida redirige a la raíz

---

### **2. Modelo de Datos (src/app/models/)**

#### **`usuario.model.ts`**
```typescript
export interface Usuario {
  _id?: string;      // ID del usuario (opcional, lo asigna el servidor)
  nombre: string;    // Nombre del usuario
  apellido: string;  // Apellido del usuario
  email: string;     // Email del usuario
  genero: string;    // Género del usuario
}
```
- **¿Qué hace?** Define la estructura de datos que representa un usuario
- `interface`: Es como un "contrato" que define qué propiedades tiene un usuario

---

### **3. Servicio API (src/app/services/)**

#### **`api.service.ts`**
- **¿Qué hace?** Se comunica con el servidor (API) para hacer operaciones CRUD
- **Métodos principales:**
  - `getAll()`: Obtiene todos los usuarios
  - `getById(id)`: Obtiene un usuario por su ID
  - `create(usuario)`: Crea un nuevo usuario
  - `update(id, usuario)`: Actualiza un usuario existente
  - `delete(id)`: Elimina un usuario
  
- **URL del API**: `https://crudcrud.com/api/.../usuarios`
  - Esta es una API pública de prueba (los datos pueden expirar después de cierto tiempo)

---

### **4. Componente Usuario (src/app/components/usuario/)**

#### **`usuario.component.ts`** (Lógica)
- **¿Qué hace?** Maneja toda la lógica del componente

**Propiedades:**
- `usuarios`: Array con todos los usuarios cargados
- `selectedUsuario`: Usuario seleccionado para editar
- `isLoading`: Indica si se están cargando datos
- `errorMessage`: Mensaje de error si algo falla
- `showPopup`: Controla si se muestra el popup de edición
- `newUsuario`: Datos del formulario para agregar nuevo usuario

**Métodos principales:**
1. **`ngOnInit()`**: Se ejecuta cuando se carga el componente, llama a `loadUsuarios()`
2. **`loadUsuarios()`**: Carga todos los usuarios desde la API
3. **`saveObject()`**: Guarda un nuevo usuario
4. **`editUsuario()`**: Abre el popup con los datos de un usuario para editar
5. **`updateObject()`**: Actualiza un usuario existente
6. **`deleteUsuario()`**: Elimina un usuario (pide confirmación)
7. **`closePopup()`**: Cierra el popup de edición
8. **`clearNewUsuarioForm()`**: Limpia el formulario de nuevo usuario

#### **`usuario.component.html`** (Interfaz)
- **¿Qué hace?** Define cómo se ve visualmente el componente

**Partes principales:**
1. **Tabla de usuarios**: Muestra todos los usuarios con botones EDITAR y ELIMINAR
2. **Formulario de agregar**: En la parte inferior (tfoot) para agregar nuevos usuarios
3. **Popup de edición**: Una ventana emergente que aparece al hacer clic en EDITAR
4. **Loader**: Indicador de carga mientras se obtienen los datos
5. **Mensaje de error**: Muestra errores si algo falla

**Directivas de Angular usadas:**
- `*ngIf="condición"`: Muestra/oculta elementos según una condición
- `*ngFor="let item of items"`: Repite elementos en un array
- `[(ngModel)]="variable"`: Vincula inputs con datos (two-way binding)
- `(click)="método()"`: Ejecuta un método al hacer clic
- `{{ variable }}`: Muestra el valor de una variable

#### **`usuario.component.css`** (Estilos)
- **¿Qué hace?** Define los estilos visuales del componente
- Colores de botones, sombras, efectos hover, etc.

---

## 🔄 Flujo de Funcionamiento

1. **Inicio**: Al cargar la página, se ejecuta `ngOnInit()` que llama a `loadUsuarios()`
2. **Carga de datos**: `loadUsuarios()` hace una petición GET a la API para obtener todos los usuarios
3. **Mostrar datos**: Los usuarios se muestran en la tabla HTML
4. **Agregar usuario**: El usuario llena el formulario y hace clic en AGREGAR → se llama a `saveObject()` → se envía POST a la API
5. **Editar usuario**: El usuario hace clic en EDITAR → se abre el popup con los datos → se modifican y se hace clic en ACTUALIZAR → se llama a `updateObject()` → se envía PUT a la API
6. **Eliminar usuario**: El usuario hace clic en ELIMINAR → se pide confirmación → se llama a `deleteUsuario()` → se envía DELETE a la API

---

## 🎨 Conceptos Angular Importantes

### **Componentes**
- Son partes reutilizables de la interfaz
- Tienen 3 archivos: `.ts` (lógica), `.html` (template), `.css` (estilos)
- Se usan con el selector: `<app-usuario></app-usuario>`

### **Servicios**
- Contienen lógica de negocio compartida
- En este caso, `ApiService` maneja todas las peticiones HTTP
- Se inyectan en los componentes con `constructor(private apiService: ApiService)`

### **Observables (RxJS)**
- Las peticiones HTTP devuelven Observables
- Se subscriben con `.subscribe()` para manejar respuestas exitosas (`next`) o errores (`error`)

### **Directivas**
- `*ngIf`: Renderiza condicionalmente
- `*ngFor`: Renderiza listas
- `[(ngModel)]`: Two-way binding (HTML ↔ TypeScript)
- `(click)`: Evento de clic

### **Standalone Components**
- Este proyecto usa componentes standalone (sin módulos)
- Cada componente importa lo que necesita directamente

---

## 🧹 Código Limpiado

### **Archivos eliminados:**
- ❌ `objeto.ts` y `objeto.spec.ts` - No se usaban en ninguna parte

### **Código innecesario eliminado:**
- ❌ Múltiples `console.log()` de depuración en el componente de usuario
- ✅ Se mantiene solo `console.error()` para errores importantes

### **Correcciones:**
- ✅ Comentario incorrecto en `usuario.model.ts` corregido

---

## 🚀 Cómo Ejecutar

```bash
npm install    # Instala las dependencias
npm start      # Inicia el servidor de desarrollo en http://localhost:4200
```

---

## 📊 Resumen para la Presentación

**"Este es un proyecto CRUD en Angular que permite gestionar usuarios mediante una API REST. La aplicación tiene 3 capas principales:"**

1. **Modelo**: Define la estructura de datos (usuario con nombre, apellido, email, género)
2. **Servicio**: Se comunica con la API para realizar operaciones HTTP (GET, POST, PUT, DELETE)
3. **Componente**: Presenta la interfaz visual y maneja la lógica de negocio (validaciones, popups, alertas)

**Flujo**: Usuario interacciona con la interfaz → Componente procesa la acción → Servicio hace petición HTTP → API responde → Componente actualiza la vista

---

## ❓ Preguntas Probables en la Defensa

**¿Qué es Angular?**
- Un framework de TypeScript para construir aplicaciones web de una sola página (SPA)
- Usa componentes, servicios y enrutamiento

**¿Por qué usar servicios separados?**
- Para reutilizar lógica (el mismo ApiService podría usarse en varios componentes)
- Separar responsabilidades (la UI no debe hablar directamente con la API)

**¿Qué es CRUD?**
- Create, Read, Update, Delete - las 4 operaciones básicas de base de datos

**¿Qué es una API REST?**
- Un servicio web que expone endpoints HTTP para manipular recursos (usuarios en este caso)

---

## 🔗 Recursos Útiles

- [Documentación oficial de Angular](https://angular.io/docs)
- [Guía de Interacción Componente-Servicio](https://angular.io/guide/component-interaction)
- [Tutorial de HTTP Client](https://angular.io/guide/http)

