#!/bin/bash

# Define the source file and output file
SOURCE_FILE="./index.ts"
OUTPUT_FILE="sv-artisan"

# Build for Linux x64
bun build --compile --target=bun-linux-x64 $SOURCE_FILE --outfile ./build/$OUTPUT_FILE
bun build --compile --target=bun-linux-x64-baseline $SOURCE_FILE --outfile ./build/$OUTPUT_FILE
bun build --compile --target=bun-linux-x64-modern $SOURCE_FILE --outfile ./build/$OUTPUT_FILE

# Build for Linux ARM64
bun build --compile --target=bun-linux-arm64 $SOURCE_FILE --outfile ./build/$OUTPUT_FILE

# Build for Windows x64
bun build --compile --target=bun-windows-x64 $SOURCE_FILE --outfile ./build/$OUTPUT_FILE
bun build --compile --target=bun-windows-x64-baseline $SOURCE_FILE --outfile ./build/$OUTPUT_FILE
bun build --compile --target=bun-windows-x64-modern $SOURCE_FILE --outfile ./build/$OUTPUT_FILE

# Build for macOS arm64
bun build --compile --target=bun-darwin-arm64 $SOURCE_FILE --outfile ./build/$OUTPUT_FILE

# Build for macOS x64
bun build --compile --target=bun-darwin-x64 $SOURCE_FILE --outfile ./build/$OUTPUT_FILE

# Save this script as build.sh and make it executable:
# chmod +x build.sh