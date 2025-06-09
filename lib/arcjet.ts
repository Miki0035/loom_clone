import arcjet from "@arcjet/next";
import { getEnv } from "./utilis";

const aj = arcjet({
    key: getEnv('ARCJET_API_KEY'),
    rules: [],

})

export default aj;