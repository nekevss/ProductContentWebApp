import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { readJsonSync } from "https://deno.land/std@v0.58.0/fs/mod.ts";


const app = new Application();
const router = new Router();
const dir:string = Deno.cwd();


router
    .get('/api/', (context:any) => {
        let data = readJsonSync("./cache/current.json")
        context.response.body = JSON.stringify(data, null, 4);
    })
    .get('/api/:id', (context:any) => {
        let data:any = readJsonSync("./cache/current.json")
        if (context.params && context.params.id && context.params.id <= data.length) {
            context.response.body = JSON.stringify(data[context.params.id], null, 8);
        }
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