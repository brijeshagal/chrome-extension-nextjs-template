import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { globSync } from 'glob';

const distDir = 'out';
const basePath = 'next-assets/_next';

const MAGIC_STRING = '__this_is_a_placeholder_for_the_inline_scripts__';

console.log('grab all the html files');
const baseDir = resolve(distDir.replace(/^\//, ''));
console.log('baseDir', baseDir);
const htmlFiles = globSync(`${baseDir}/**/*.html`);
htmlFiles.forEach((file) => {
  // grab inline scripts from each html file
  const contents = readFileSync(file).toString();
  const scripts = [];
  const newFile = contents.replace(/<script>(.+?)<\/script>/g, (_, data) => {
    const addMagicString = scripts.length === 0;
    scripts.push(`${data}${data.endsWith(';') ? '' : ';'}`);
    return addMagicString ? MAGIC_STRING : '';
  });

  // early exit if we have no inline scripts
  if (!scripts.length) {
    console.log(`No scripts found in HTML file ${file}`);
    return;
  }
  console.log(`processing ${file}`);

  // combine all the inline scripts, add a hash, and reference the new file
  console.log('\trewriting');
  const chunk = scripts.join('');
  const hash = createHash('md5').update(chunk).digest('hex');
  const filePath = `${basePath}/static/chunks/chunk.${hash}.js`
  writeFileSync(`${baseDir}/${filePath}`, chunk);
  writeFileSync(
    file,
    newFile.replace(
      MAGIC_STRING,
      `<script src="${filePath}" crossorigin=""></script>`
    )
  );
  console.log('\tfinished');
});