// TODO: Add error handling for invalid inputs


const fs = require('fs');


function parseIt() {

    // // console.log(`0: ` + process.argv[0])
    // // console.log(`1: ` + process.argv[1])
    // // console.log(`2: ` + process.argv[2])
    // // console.log(`3: ` + process.argv[3])
    // // console.log(`4: ` + process.argv[4])


    var fileNames = [];


    // if no filename provided
    if (process.argv[2] == undefined) {
        console.log('Use -h for help.')
        return 1;
    };


    //help
    const helpCommand = process.argv[2];

    if (['-h', '--help'].includes(helpCommand)) {
        
                    // ansi escape code - bold
        console.log('\n\x1b[1mNAME\x1b[0m \n       Simple JSON Parser - \n       parseIt - return true if valid json object, else false')

                    // ansi escape code - bold
        console.log('\x1b[1mSYNOPSIS\x1b[0m');
        console.log('       \x1b[1mparseIt\x1b[0m [FILE]... [File2ElectricBoogaloo]... [Fil3]...\n');

        console.log('       -h, --help \n              you are here\n');
        return 0;
    };


    // grab arguments ()
    // skip first two items in process.argv
    for (let i = 2; i < process.argv.length; i++) {
        fileNames.push(process.argv[i]);
        // // console.log(process.argv[i]);
    };


    // meat and potatos here
    if (fileNames.length > 0) {

        for (let i = 0; i < fileNames.length; i++) {

            var currentFile = fileNames[i];
            const allFileContents = fs.readFileSync(currentFile, 'utf-8');
            var linesInObject = allFileContents.split(/\r?\n/);
            var cleanLines = [];


            for (let p = 0; p < linesInObject.length; p++) {

                let currentLine = linesInObject[p].trim();

                if (currentLine != '') {
                    cleanLines.push(currentLine);
                };
            };

            console.log('START - cleanLines length: ' + cleanLines.length)
            console.log()


            // weed out blank files
            if (cleanLines.length == 0) {
                console.log('BEEP BOOP BEEP - BLANK FILE DETECTED');
                return 1;
            };


            // check for trailing comma in contents && object
            if (cleanLines[cleanLines.length - 1].slice(-1) == ',' || cleanLines[cleanLines.length - 1].slice(-2, -1) == ',') {
                console.log('Error: Trailing comma detected in object or contents');
                return 1;
            };


            var singleLine = false

            // check first and last char match curly braces
            function checkCurlyBraces() {
 
                var firstChar = cleanLines[0];
                firstChar = firstChar[0];
        
                var lastChar = cleanLines[cleanLines.length - 1];
                lastChar = lastChar[lastChar.length - 1];


                // check first and last char
                if (firstChar == '{' && lastChar == '}') {
                    console.log('first && last char valid');
                    console.log()
                } else {
                    console.log('first || last char invalid');
                    console.log()
                    return false;
                };

            };


            // check contents of object against base pattern
            function checkPattern() {

                // pattern - opening quote (") - must be start of string (^)
                    // any alphanumeric char, any number of times, followed by an optional space 0 or 1 times
                        // closing quote (")
                            // colon (:)
                                // space
                                    // any alphanumeric char, any number of times, followed by an optional space 0 or 1 times
                                        // closing quote (") - must be end of string ($)
                // var pattern = RegExp(/^"(\w* ?)*": "?(\w* ?)*"?/);
                var pattern = RegExp(/^"(\w* ?)*": (true|false|null|"(\w* ?)*"|[0-9])/);

                var resultsOfAllChecks = new Set([]);


                if (cleanLines.length == 1) {   
                    singleLine = true;
                    var contents = cleanLines[0].slice(1, -1);

                    if (pattern.test(contents) || cleanLines[0] == '{}') {
                        //console.log('worked - single')
                        resultsOfAllChecks.add(true);
                    } else {
                        //console.log(`didn't worked - single`)
                        resultsOfAllChecks.add(false);
                    };
                    
                };


                for (let n = 1; n < cleanLines.length - 1; n++) {

                    if (!singleLine) {

                        var contents = cleanLines[n].slice(0, cleanLines[n].length);

                    };


                    console.log(n)
                    console.log(contents)

                    console.log(`pattern match:          ${pattern.test(contents)}`)
                    console.log()

                    if (pattern.test(contents)) {
                        //console.log('worked')
                        resultsOfAllChecks.add(true);
                    } else {
                        //console.log(`didn't worked`)
                        resultsOfAllChecks.add(false);
                    };

                };

                // if resultsOfAllChecks includes false this would be true, we invert it to display false when false is present
                console.log()
                console.log(`>>> All Checks Are True:    ${String(!resultsOfAllChecks.has(false)).toUpperCase()} <<<`)
                console.log()
                console.log()
                console.log()
                console.log('------------------')
            };
            


            // if (checkPattern() && checkCurlyBraces()) {

            // };


            checkCurlyBraces()
            checkPattern()

        };

    };

};

parseIt();



