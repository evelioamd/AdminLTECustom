#!/usr/bin/env node

'use strict'

const { exec } = require("node:child_process");

const branchName = require('current-git-branch');

const distFiles = [
    './../../build/',
    './../../plugins/',
];

const path = require('path')

class Zip {
    constructor() {
        this.options = {
            verbose: false
        }

        this.getArguments()
    }

    getArguments() {
        if (process.argv.length > 2) {
            const arg = process.argv[2]
            switch (arg) {
                case '-v':
                case '--verbose':
                    this.options.verbose = true
                    break
                default:
                    throw new Error(`Unknown option ${arg}`)
            }
        }
    }

    run() {
        // Compress files
        let currentBranch = branchName();
        let bundleName = `dist-${currentBranch}.zip`;

        // run the `ls` command using exec
        exec(`zip -r ${bundleName} dist/ plugins/`, (err, output) => {
            // once the command has completed, the callback function is called
            if (err) {
                // log and return if we encounter an error
                console.error("could not execute command: ", err)
                return
            }
            // log the output received from the command
            console.log("Output: \n", output)
        })
        
    }
}

(new Zip()).run()
