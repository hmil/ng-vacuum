/**
 * Processes the markdown output of api-documenter before it is fed to docusaurus.
 * 
 * Based on https://github.com/faastjs/faast.js/blob/3fee21b84491bceb5996bf4c9db33f20fbb6525e/build/make-docs.js
 */

const { readdirSync, createReadStream, writeFileSync, mkdirSync } = require("fs");
const { createInterface } = require("readline");
const { join, parse } = require("path");

async function main() {
    const inputDir = join(__dirname, "../build/docs/api");
    const outputDir = join(__dirname, "../docs/docs/api");
    const docFiles = readdirSync(inputDir);

    mkdirSync(outputDir, {
        recursive: true
    });

    for (const docFile of docFiles) {
        try {
            const { name: id, ext } = parse(docFile);
            if (ext !== ".md") {
                continue;
            }

            const input = createReadStream(join(inputDir, docFile));
            const output = [];
            const lines = createInterface({
                input,
                crlfDelay: Infinity
            });

            let isCode = false;

            let title = "";
            lines.on("line", line => {
                let skip = false;
                if (!title) {
                    const titleLine = line.match(/## (.*)/);
                    if (titleLine) {
                        title = titleLine[1];
                    }
                }
                
                if (line.startsWith('```')) {
                    // Remove blank line before end of code block
                    if (isCode) {
                        while (output[output.length - 1] === '') {
                            output.pop();
                        }
                    }
                    isCode = !isCode;
                }

                // Convert <b> tags to plain markdown
                line = line.replace(/<b>(.+)<\/b>/gm, '**$1**');

                // Skip the breadcrumb for the toplevel index file.
                const homeLink = line.match(/\[Home\]\(.\/index\.md\) &gt; (.*)/);
                if (homeLink) {
                    if (homeLink[1]) {
                        output.push(homeLink[1]);
                    }
                    skip = true;
                }
                // See issue #4. api-documenter expects \| to escape table
                // column delimiters, but docusaurus uses a markdown processor
                // that doesn't support this. Replace with an escape sequence
                // that renders |.
                if (line.startsWith("|")) {
                    line = line.replace(/\\\|/g, "&#124;");
                }
                // Remove empty commentss because they cause troubles with the mdx parser
                line = line.replace(/<!-- -->/g, '');
                if (!skip) {
                    output.push(line);
                }
            });

            await new Promise(resolve => lines.once("close", resolve));
            input.close();

            const header = [
                "---",
                `id: ${id}`,
                `title: ${title}`,
                `hide_title: true`,
                `custom_edit_url: null`,
                "---"
            ];

            writeFileSync(join(outputDir, docFile), header.concat(output).join("\n"));
        } catch (err) {
            console.error(`Could not process ${docFile}: ${err}`);
        }
    }
}

main();