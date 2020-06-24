import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();
const dir:string = Deno.cwd();

router.get('/api/', (context:any) => {
        context.response.body = "This is the API home"
    });

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async(context:any) => {
    await send(context, context.request.url.pathname, {
        root: dir + "/public/",
        index: "index.html"
    });
});

console.log("Listening on http://localhost:5500");
await app.listen({port:5500});