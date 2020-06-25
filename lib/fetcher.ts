import { readJson } from "https://deno.land/std@v0.58.0/fs/mod.ts";

//Doesn't work. Don't know why
//Might be messing something obvious up, but
//I think it might be the ../ part of the path

export async function fetchJSON() {
    return await readJson("../cache/current.json")
}