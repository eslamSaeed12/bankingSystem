import { DropDbScript } from "../scripts/dropDb"
import { CreateDbScript } from "../scripts/generateDb";
import { execSync } from 'child_process'
import { pgConnection } from "./PgConnection";


async function ScriptsRunner() {

    await pgConnection.connect();

    await DropDbScript();

    await CreateDbScript();

    execSync('npm run db:dev:migrate && npm run db:dev:seed');

    console.log('db syncronized succssesfully !');
}

ScriptsRunner().catch(console.error).finally(process.exit)