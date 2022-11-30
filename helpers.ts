const {readFileSync} = require('fs');

// read txt file & return array of lines in file
export function readTxtFile(path: string): string[] {
    const contents = readFileSync(path, 'utf8');

    const lines = contents.split(/\r?\n/);

    return lines;
}