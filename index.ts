#!/usr/bin/env bun

import { Command } from "commander";
import { $ } from "bun";
import path from "path";
import fs from "fs";
import chalk from "chalk";

const program = new Command();

// Define color schemes
const success = chalk.green;
const errorMsg = chalk.red;
const warning = chalk.yellow;
const info = chalk.blue;
const title = chalk.bold;

// Helper function to create directories using Bun Shell
async function ensureDirectoryExistence(dirPath) {
  try {
    await $`mkdir -p ${dirPath}`;
  } catch (err) {
    console.error(errorMsg(`Failed to create directory: ${err.message}`));
  }
}

// Helper function to check if tsconfig.json exists
function isTypescriptProject() {
  const tsconfigPath = path.join(process.cwd(), "tsconfig.json");
  return fs.existsSync(tsconfigPath);
}

// Helper function to determine file extension based on project type
function getFileExtension() {
  return isTypescriptProject() ? "ts" : "js";
}

// Helper function to safely create a file if it doesn't exist
async function createFileIfNotExists(filePath, content, description) {
  if (fs.existsSync(filePath)) {
    console.log(
      warning(`${description} already exists at ${filePath}. Skipping.`)
    );
    return;
  }

  try {
    // Use Bun's shell to write the content to the file
    await $`echo ${content} > ${filePath}`;
    console.log(success(`${description} created at ${filePath}`));
  } catch (err) {
    console.error(
      errorMsg(`Failed to create ${description.toLowerCase()}: ${err.message}`)
    );
  }
}

// Command to create a Svelte component using Bun's Shell
program
  .command("create:component <name>")
  .description(
    "Create a new Svelte component, using `/` or `.` notation for nested folders"
  )
  .action(async (name) => {
    const formattedName = name.replace(/\./g, "/");
    const componentDir = path.join(
      process.cwd(),
      "src",
      "lib",
      "components",
      formattedName
    );
    const componentPath = `${componentDir}.svelte`;

    await ensureDirectoryExistence(path.dirname(componentPath));

    const content = `<script>
</script>

<div>
  <!-- ${formattedName} component -->
</div>

<style>
</style>`;

    await createFileIfNotExists(componentPath, content, `Component "${name}"`);
  });

// Command to create a new SvelteKit page using Bun's Shell
program
  .command("create:page [name]")
  .description(
    "Create a new SvelteKit page, using `/` or `.` notation for nested folders, or directly in `src/routes` if no name is provided"
  )
  .option("-c, --script", "Create a +page.ts/js file")
  .option("-s, --server", "Create a +page.server.ts/js file")
  .action(async (name = "", options) => {
    const formattedName = name ? name.replace(/\./g, "/") : "";
    const pageDir = path.join(process.cwd(), "src", "routes", formattedName);
    const fileExtension = getFileExtension();
    const pagePath = path.join(pageDir, `+page.svelte`);

    await ensureDirectoryExistence(pageDir);

    const pageTitle = name || "Home";
    const svelteContent = `<script>
</script>

<div>
  <h1>${pageTitle} Page</h1>
</div>

<style>
</style>`;

    await createFileIfNotExists(pagePath, svelteContent, `Page "${pageTitle}"`);

    // Create +page.ts/js if --script flag is passed
    if (options.script) {
      const pageScriptPath = path.join(pageDir, `+page.${fileExtension}`);
      const pageScriptContent =
        fileExtension === "ts"
          ? `/** @type {import('./$types').PageLoad} */
export function load() {

}`
          : `/** @type {import('./$types').PageLoad} */
export function load() {

}`;
      await createFileIfNotExists(
        pageScriptPath,
        pageScriptContent,
        `Script file`
      );
    }

    // Create +page.server.ts/js if --server flag is passed
    if (options.server) {
      const pageServerScriptPath = path.join(
        pageDir,
        `+page.server.${fileExtension}`
      );
      const serverScriptContent =
        fileExtension === "ts"
          ? `/** @type {import('./$types').PageServerLoad} */
export async function load() {

}`
          : `/** @type {import('./$types').PageServerLoad} */
export async function load() {

}`;
      await createFileIfNotExists(
        pageServerScriptPath,
        serverScriptContent,
        `Server script file`
      );
    }
  });

// Command to create a new SvelteKit layout using Bun's Shell
program
  .command("create:layout [name]")
  .description(
    "Create a new SvelteKit layout, using `/` or `.` notation for nested folders, or directly in `src/routes` if no name is provided"
  )
  .option("-c, --script", "Create a +layout.ts/js file")
  .option("-s, --server", "Create a +layout.server.ts/js file")
  .action(async (name = "", options) => {
    const formattedName = name ? name.replace(/\./g, "/") : "";
    const layoutDir = path.join(process.cwd(), "src", "routes", formattedName);
    const fileExtension = getFileExtension();
    const layoutPath = path.join(layoutDir, `+layout.svelte`);

    await ensureDirectoryExistence(layoutDir);

    const layoutName = name || "default";
    const svelteContent = `<script>
</script>

<div>
  <slot></slot>
</div>

<style>
</style>`;

    await createFileIfNotExists(
      layoutPath,
      svelteContent,
      `Layout "${layoutName}"`
    );

    // Create +layout.ts/js if --script flag is passed
    if (options.script) {
      const layoutScriptPath = path.join(layoutDir, `+layout.${fileExtension}`);
      const layoutScriptContent =
        fileExtension === "ts"
          ? `/** @type {import('./$types').LayoutLoad} */
export function load() {

}`
          : `/** @type {import('./$types').LayoutLoad} */
export function load() {

}`;
      await createFileIfNotExists(
        layoutScriptPath,
        layoutScriptContent,
        `Script file`
      );
    }

    // Create +layout.server.ts/js if --server flag is passed
    if (options.server) {
      const layoutServerScriptPath = path.join(
        layoutDir,
        `+layout.server.${fileExtension}`
      );
      const layoutServerContent =
        fileExtension === "ts"
          ? `/** @type {import('./$types').LayoutServerLoad} */
export async function load() {

}`
          : `/** @type {import('./$types').LayoutServerLoad} */
export async function load() {

}`;
      await createFileIfNotExists(
        layoutServerScriptPath,
        layoutServerContent,
        `Server script file`
      );
    }
  });

// Command to handle the scenario where no arguments are provided
program
  .command("help")
  .description("Display help information")
  .action(() => {
    program.outputHelp();
  });

// Parse the command-line arguments
program.parse(process.argv);
