# Chrome Extension Starter Kit for Next.js + TypeScript + Tailwind CSS
A modern and flexible starter kit for building Chrome Extensions using Next.js, TypeScript, and Tailwind CSS. This starter kit simplifies the process of building scalable Chrome Extensions with a clean, production-ready setup.

## Features:
- Next.js for server-side rendering and easy development
-TypeScript for strong typing and better developer experience
- Tailwind CSS for responsive, utility-first design
- Chrome extension architecture ready to use:
- Content scripts for injecting functionality into the browser
- Background scripts for handling long-lived processes
` Injected scripts for manipulating DOM elements

## Project Structure:
- `public/content`: Contains the wallet content script file.
- `public/background`: Includes the wallet background.js script.
- `public/injected`: Injects classes and styles into the window.
- `out`: The directory containing the built Chrome Extension ready to be loaded into Chrome.

  
## How to Setup Your Chrome Extension
This starter kit requires no complicated setup. Just follow these easy steps:

1. Install Dependencies:
Run the following command to install all necessary dependencies:

```bash Copy code
npm install
```
2. Build the Extension:
To build the extension for use, run:

```bash Copy code
npm run build
```
3. Load into Chrome:
Open Chrome and navigate to chrome://extensions/
Enable Developer Mode (toggle on the top-right)
Click on Load unpacked and select the out directory from your project.

## Congratulations! 🎉
Your Chrome extension is now ready! You can now start building your own features and customizing the starter kit.

## Support & Community
⭐ If you found this project useful, please give it a star! It helps others discover it and supports the development of the project.

🔄 Fork this repository to contribute or modify it for your own needs!

## Additional Resources
For more information on building Chrome Extensions with Next.js, TypeScript, and Tailwind CSS, refer to the following resources:

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/reference/api)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)
