# Agenda de Contactos

Aplicacion web basica desarrollada con HTML, CSS y JavaScript para registrar y gestionar contactos.

## Funcionalidades

- Registrar nombre, telefono y correo electronico.
- Mostrar los contactos en tarjetas.
- Buscar contactos en tiempo real.
- Ver el detalle de cada contacto.
- Eliminar contactos.
- Guardar los datos en el almacenamiento local del navegador.

## Como ejecutar

Abrir `index.html` en un navegador. No requiere instalacion de dependencias ni servidor.

## Flujo de Git sugerido

Las funcionalidades se organizan en estas ramas:

- `feature-agregar-contacto`
- `feature-listar-contactos`
- `feature-eliminar-contacto`

El historial local contiene commits separados para la estructura, estilos, funcionalidad y documentacion. Para publicar el proyecto en GitHub:

```bash
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
git push --all origin
```