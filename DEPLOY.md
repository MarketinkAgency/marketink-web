# Desplegar MarketINK en Vercel

## Opción A — desde la terminal (5 minutos, no necesitas GitHub)

```bash
cd marketink-web
npm install
npx vercel        # te pide login la primera vez, luego enter a todo
npx vercel --prod # cuando quieras publicarlo de verdad
```

`npx vercel` te devuelve una URL tipo `marketink-web-xxxx.vercel.app`.
Esa la puedes abrir desde cualquier dispositivo.

## Opción B — desde GitHub (mejor a largo plazo)

1. Crea un repo vacío en GitHub bajo `MarketinkAgency`.
2. ```bash
   cd marketink-web
   git init && git add . && git commit -m "MarketINK web"
   git remote add origin git@github.com:MarketinkAgency/marketink-web.git
   git push -u origin main
   ```
3. En vercel.com → Add New → Project → importa el repo → Deploy.
4. Cada `git push` vuelve a desplegar solo.

## Lo único que hay que cambiar antes de publicar

`lib/copy.ts`, al principio:

```ts
export const site = {
  call: "TU LINK REAL DE CALENDLY",   // ← esto
  instagram: "https://instagram.com/marketinkagency",
  whatsapp: "https://wa.me/13854909918",
  email: "hello@marketinkagency.com",
};
```

## Dominio

En Vercel → Settings → Domains → añade `marketinkagency.com`.
Ojo: eso lo desconecta de Shopify. Hazlo solo cuando decidas cortar.

## Notas

- No hay variables de entorno. El sitio es estático, no necesita llaves.
- Idiomas: `/es` y `/en`. La raíz `/` redirige según el idioma del navegador.
