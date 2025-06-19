# ttechlibraryversionincrementer

A Visual Studio Code extension to automatically increment version numbers in your code files on save, using a special tag.

## Features

- **Automatic Version Increment:**  
    When a file contains the `@incrementOnSave` tag and a version line like `* @version x.x.x.x`, saving the file will prompt you to increment the version.
- **Smart Version Increment Logic:**  
    When you increment a higher-order number in the version (such as major or minor), all lower-order numbers (like build or revision) are reset to 0. For example, incrementing the minor version in `1.2.3.4` results in `1.3.0.0`.
- **Interactive Prompt:**  
    On save, an input box appears allowing you to choose which part of the version (major, minor, build, revision) to increment.

## Requirements

- Visual Studio Code 1.50.0 or higher.

## Usage

1. Add `@incrementOnSave` anywhere in your file. Ideally this should be in a JSDoc Comment near the top.
2. Ensure your file contains a version line in the format:  
     `@version 1.0.0.0`
3. Save the file.
4. Choose which part of the version to increment from the prompt.

## Extension Settings

This extension does not contribute any settings currently.

## Release Notes

### 1.0.0

- Initial release: automatic version increment on save with interactive prompt.

### 1.0.1

- Fix Bug where * was added to JSDoc Comments upon save.
