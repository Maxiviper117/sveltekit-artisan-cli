# SvelteKit Artisan CLI Tool

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Creating a Svelte Component](#creating-a-svelte-component)
  - [Creating a SvelteKit Page](#creating-a-sveltekit-page)
  - [Creating a SvelteKit Layout](#creating-a-sveltekit-layout)
  - [Help Command](#help-command)
- [Examples](#examples)
- [Notes](#notes)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The **SvelteKit Artisan CLI Tool** is a powerful command-line interface designed to streamline the creation of Svelte components, pages, and layouts within your SvelteKit projects. It automates boilerplate setup, ensures consistency, and enhances your development workflow by providing flexible options tailored to your project's configuration.

## Features

- **Create Svelte Components**: Quickly generate new Svelte components with support for nested directories.
- **Create SvelteKit Pages and Layouts**: Automate the creation of `+page.svelte`, `+page.ts/js`, `+page.server.ts/js`, `+layout.svelte`, `+layout.ts/js`, and `+layout.server.ts/js` files based on your project's TypeScript configuration.
- **TypeScript and JavaScript Support**: Automatically detect if your project uses TypeScript and create appropriate script files. Alternatively, specify which scripts to create using flags.
- **Prevent Overwriting**: Safeguard existing files by avoiding overwriting them. If a file already exists, it will be skipped, and a message will inform you.
- **Color-Coded Terminal Output**: Enhanced user experience with colored messages indicating success, warnings, and errors.

## Installation

### Prerequisites

- **Bun**: Ensure you have [Bun](https://bun.sh/) installed as your JavaScript runtime.
- **Git**: For cloning the repository (if applicable).

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/sveltekit-cli.git
   cd sveltekit-cli
   ```

2. **Install Dependencies**

   The CLI tool uses [Commander](https://github.com/tj/commander.js) for command parsing and [Chalk](https://github.com/chalk/chalk) for terminal coloring.

   Install dependencies using Bun:

   ```bash
   bun install
   ```

3. **Make the Script Executable**

   Ensure that the CLI script is executable:

   ```bash
   chmod +x index.ts
   ```

4. **(Optional) Link the CLI Globally**

   To use the CLI tool globally across your system, you can link it:

   ```bash
   bun link
   ```

   After linking, you can use the CLI commands from anywhere in your terminal.

## Usage

You can use the CLI tool to create components, pages, and layouts in your SvelteKit project. The commands support nested folder structures using `/` or `.` notation. Additionally, the tool respects your project's TypeScript configuration and provides options to create main and server script files.

### General Syntax

```bash
bun index.ts <command> [name] [options]
```

### Creating a Svelte Component

Generate a new Svelte component. Supports nested directories using `/` or `.`.

**Syntax:**

```bash
bun index.ts create:component <name>
```

**Parameters:**

- `<name>`: Name of the component. Use `/` or `.` to denote nested folders.

**Example:**

```bash
bun index.ts create:component Button
```

This creates `src/lib/components/Button.svelte`.

For nested components:

```bash
bun index.ts create:component ui/Button
```

Creates `src/lib/components/ui/Button.svelte`.

**Sample Output:**

```
Component "Button" created at /path/to/project/src/lib/components/Button.svelte
```

### Creating a SvelteKit Page

Generate a new SvelteKit page with optional script files. The command can create `+page.svelte`, `+page.ts/js`, and `+page.server.ts/js` based on flags and project configuration.

**Syntax:**

```bash
bun index.ts create:page [name] [options]
```

**Parameters:**

- `[name]` (optional): Name of the page. If omitted, the files are created directly in `src/routes`.

**Options:**

- `-c, --script`: Create the main script file (`+page.ts` or `+page.js`).
- `-s, --server`: Create the server script file (`+page.server.ts` or `+page.server.js`).

**Behavior:**

- If `tsconfig.json` exists in the project root, `.ts` files are created; otherwise, `.js` files are used.
- The `--script` and `--server` flags control the creation of respective script files independently.

**Examples:**

1. **Create a Page Without Any Script Files**

   ```bash
   bun index.ts create:page
   ```

   **Result:**
   - Creates `src/routes/+page.svelte` if it doesn't already exist.

2. **Create a Page with Main Script File Only**

   ```bash
   bun index.ts create:page about --script
   ```

   **Result:**
   - Creates `src/routes/about/+page.svelte` if it doesn't exist.
   - Creates `src/routes/about/+page.ts` or `+page.js` based on project configuration.

3. **Create a Page with Server Script File Only**

   ```bash
   bun index.ts create:page contact --server
   ```

   **Result:**
   - Creates `src/routes/contact/+page.svelte` if it doesn't exist.
   - Creates `src/routes/contact/+page.server.ts` or `+page.server.js` based on project configuration.

4. **Create a Page with Both Main and Server Script Files**

   ```bash
   bun index.ts create:page products --script --server
   ```

   **Result:**
   - Creates `src/routes/products/+page.svelte` if it doesn't exist.
   - Creates `src/routes/products/+page.ts` or `+page.js`.
   - Creates `src/routes/products/+page.server.ts` or `+page.server.js`.

**Sample Output:**

```bash
➜ bun index.ts create:page products -c -s
Page "products" created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.svelte
Script file created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.ts
Server script file created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.server.ts
```

If files already exist:

```bash
➜ bun index.ts create:page products -c -s
Page "products" already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.svelte. Skipping.
Script file already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.ts. Skipping.
Server script file already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.server.ts. Skipping.
```

### Creating a SvelteKit Layout

Generate a new SvelteKit layout with optional script files. The command can create `+layout.svelte`, `+layout.ts/js`, and `+layout.server.ts/js` based on flags and project configuration.

**Syntax:**

```bash
bun index.ts create:layout [name] [options]
```

**Parameters:**

- `[name]` (optional): Name of the layout. If omitted, the files are created directly in `src/routes`.

**Options:**

- `-c, --script`: Create the main script file (`+layout.ts` or `+layout.js`).
- `-s, --server`: Create the server script file (`+layout.server.ts` or `+layout.server.js`).

**Behavior:**

- If `tsconfig.json` exists in the project root, `.ts` files are created; otherwise, `.js` files are used.
- The `--script` and `--server` flags control the creation of respective script files independently.

**Examples:**

1. **Create a Layout Without Any Script Files**

   ```bash
   bun index.ts create:layout
   ```

   **Result:**
   - Creates `src/routes/+layout.svelte` if it doesn't already exist.

2. **Create a Layout with Main Script File Only**

   ```bash
   bun index.ts create:layout admin --script
   ```

   **Result:**
   - Creates `src/routes/admin/+layout.svelte` if it doesn't exist.
   - Creates `src/routes/admin/+layout.ts` or `+layout.js` based on project configuration.

3. **Create a Layout with Server Script File Only**

   ```bash
   bun index.ts create:layout admin --server
   ```

   **Result:**
   - Creates `src/routes/admin/+layout.svelte` if it doesn't exist.
   - Creates `src/routes/admin/+layout.server.ts` or `+layout.server.js` based on project configuration.

4. **Create a Layout with Both Main and Server Script Files**

   ```bash
   bun index.ts create:layout dashboard --script --server
   ```

   **Result:**
   - Creates `src/routes/dashboard/+layout.svelte` if it doesn't exist.
   - Creates `src/routes/dashboard/+layout.ts` or `+layout.js`.
   - Creates `src/routes/dashboard/+layout.server.ts` or `+layout.server.js`.

**Sample Output:**

```bash
➜ bun index.ts create:layout admin -c -s
Layout "admin" created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.svelte
Script file created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.ts
Server script file created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.server.ts
```

If files already exist:

```bash
➜ bun index.ts create:layout admin -c -s
Layout "admin" already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.svelte. Skipping.
Script file already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.ts. Skipping.
Server script file already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.server.ts. Skipping.
```

### Help Command

The CLI provides help information for users to understand available commands and options.

**Syntax:**

```bash
bun index.ts help
```

**Description:**

Displays help information about available commands and options.

**Example Output:**

```bash
Usage: bun index.ts [options] [command]

Options:
  -h, --help         display help for command

Commands:
  create:component <name>  Create a new Svelte component, using `/` or `.` notation for nested folders
  create:page [name]       Create a new SvelteKit page, using `/` or `.` notation for nested folders, or directly in `src/routes` if no name is provided
  create:layout [name]     Create a new SvelteKit layout, using `/` or `.` notation for nested folders, or directly in `src/routes` if no name is provided
  help                     Display help information
```

## Examples

### Creating a Page and Handling Existing Files

1. **Create a Page with Script Files**

   ```bash
   bun index.ts create:page products -c
   ```

   **Output:**

   ```
   Page "products" created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.svelte
   Script file created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.ts
   ```

2. **Create the Server Script File for the Same Page**

   ```bash
   bun index.ts create:page products -s
   ```

   **Output:**

   ```
   Page "products" already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.svelte. Skipping.
   Server script file created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.server.ts
   ```

3. **Attempting to Create an Existing Server Script**

   ```bash
   bun index.ts create:page products -s
   ```

   **Output:**

   ```
   Page "products" already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.svelte. Skipping.
   Server script file already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\products\+page.server.ts. Skipping.
   ```

### Creating a Layout

1. **Create a Layout with Script Files**

   ```bash
   bun index.ts create:layout admin -c -s
   ```

   **Output:**

   ```
   Layout "admin" created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.svelte
   Script file created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.ts
   Server script file created at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.server.ts
   ```

2. **Attempt to Recreate an Existing Layout**

   ```bash
   bun index.ts create:layout admin -c -s
   ```

   **Output:**

   ```
   Layout "admin" already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.svelte. Skipping.
   Script file already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.ts. Skipping.
   Server script file already exists at D:\David\Development\Experiments\bun\sveltekit-cli\src\routes\admin\+layout.server.ts. Skipping.
   ```

### Creating a Nested Component

```bash
bun index.ts create:component ui/buttons/PrimaryButton
```

**Output:**

```
Component "ui/buttons/PrimaryButton" created at /path/to/project/src/lib/components/ui/buttons/PrimaryButton.svelte
```

### Creating a Nested Page with Scripts

```bash
bun index.ts create:page dashboard/analytics --script --server
```

**Output:**

```
Page "dashboard/analytics" created at /path/to/project/src/routes/dashboard/analytics/+page.svelte
Script file created at /path/to/project/src/routes/dashboard/analytics/+page.ts
Server script file created at /path/to/project/src/routes/dashboard/analytics/+page.server.ts
```

## Notes

- **File Overwriting**: The CLI tool does **not** overwrite existing files. If a file already exists, it will be skipped, and a warning message will inform you. This ensures that your existing work remains intact.

- **Terminal Coloring**: Success messages are displayed in green, warnings in yellow, and error messages in red for enhanced readability and user experience.

- **Nested Directories**: Use `/` or `.` in the component, page, or layout names to create nested folders.

  **Example:**

  ```bash
  bun index.ts create:component ui/buttons/PrimaryButton
  ```

  This creates `src/lib/components/ui/buttons/PrimaryButton.svelte`.

- **TypeScript Detection**: The tool automatically detects if your project uses TypeScript by checking for a `tsconfig.json` file in the root directory. It creates `.ts` files accordingly. If no TypeScript configuration is found, `.js` files are created.

- **Default Creation**: If no name is provided to `create:page` or `create:layout`, the files are created in the `src/routes` directory with default names:
  - `create:page` creates `+page.svelte`.
  - `create:layout` creates `+layout.svelte`.

- **Custom Script and Server Script Flags**:
  - `--script` (`-c`): Creates the main script file (`+page.ts/js` or `+layout.ts/js`).
  - `--server` (`-s`): Creates the server script file (`+page.server.ts/js` or `+layout.server.ts/js`).
  - These flags can be used independently or together to create only the desired files.

- **Windows Path Handling**: The CLI tool is compatible with Windows. Ensure that you use the appropriate path separators (`/` or `.`) when specifying nested names.

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or enhancements, feel free to open an issue or submit a pull request.

### Steps to Contribute

1. **Fork the Repository**

   Click the "Fork" button at the top-right corner of the repository page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/yourusername/sveltekit-cli.git
   cd sveltekit-cli
   ```

3. **Install Dependencies**

   ```bash
   bun install
   ```

4. **Create a New Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make Your Changes**

   Implement your feature or fix.

6. **Commit Your Changes**

   ```bash
   git commit -m "Add feature: your feature description"
   ```

7. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**

   Go to the original repository and create a pull request from your fork.

## License

This project is licensed under the [MIT License](LICENSE).

---

*Happy coding with your SvelteKit projects! 🚀*