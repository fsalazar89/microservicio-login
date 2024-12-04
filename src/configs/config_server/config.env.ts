// config.ts
import dotenv from 'dotenv';

let ambiente;
if (process.env.AMBIENTE == 'local') {
    ambiente = './environments/.env.local';
} else if (process.env.AMBIENTE == 'pruebas') {
    ambiente = './environments/.env.qa';
} else if (process.env.AMBIENTE == 'produccion'){
    ambiente = './environments/.env.prod';
}

dotenv.config({ path: ambiente });