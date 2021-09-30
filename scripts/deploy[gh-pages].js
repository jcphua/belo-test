/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const execa = require("execa");
const fs = require("fs");

const isWin = /^(win32)$/.test(process.platform);

(async () => {
    try {
        console.log("Starting deployment script...")
        const cmd_orphan = await execa("git", ["checkout", "--orphan", "gh-pages"]);
        if (cmd_orphan.failed && /(A branch named 'gh-pages' already exists)/.test(cmd_orphan.stdout)) {
            await execa("git", ["branch", "-D", "gh-pages"]);
        }

        console.log("Building...");
        const cmd_build = await execa("npm", ["run", "build:dev"]);
        if (cmd_build.failed && /(missing script: build)/.test(cmd_build.stdout)) {
            console.log('ERROR: Check your build command');
        }
        // Detect if it's dist or build folder
        const folderName = fs.existsSync("dist") ? "dist" : "build";
        await execa("git", ["--work-tree", folderName, "add", "--all"]);
        await execa("git", ["--work-tree", folderName, "commit", "-m", "gh-pages"]);

        console.log("Pushing to gh-pages...");
        await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
        await execa("rm", isWin? ["-Recurse", folderName] : ["-r", folderName]);
        await execa("git", ["checkout", "-f", "master"]);
        await execa("git", ["branch", "-D", "gh-pages"]);

        console.log("Successfully deployed");
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
})();

/*
// Snippet sequence for manual CLI execution:
git checkout --orphan gh-pages
    // (If "A branch named 'gh-pages' already exists"):
    git branch -D gh-pages 
// Local build command:
    npm run build:dev
git --work-tree dist add --all
git --work-tree dist commit -m gh-pages
git push origin HEAD:gh-pages --force
rm -r dist // rm -Recurse dist
git checkout -f master
git branch -D gh-pages
// */