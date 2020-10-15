import { matrix } from 'mathjs';
import { chunk } from './chunk';
export const parseTextToMatrix = (raw, chunks) => matrix(chunk(raw
    .split('\n')
    .filter((e) => e)
    .map((v) => Number(v.replace(',', '.'))), chunks));
