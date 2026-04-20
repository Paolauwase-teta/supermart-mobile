const ts = require('typescript');
const path = require('path');

const configPath = ts.findConfigFile(
  './',
  ts.sys.fileExists,
  'tsconfig.json'
);

if (!configPath) {
  throw new Error("Could not find a valid 'tsconfig.json'.");
}

const parseConfigHost = {
  fileExists: ts.sys.fileExists,
  readFile: ts.sys.readFile,
  readDirectory: ts.sys.readDirectory,
  useCaseSensitiveFileNames: true
};

const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsedCommandLine = ts.parseJsonConfigFileContent(
  configFile.config,
  parseConfigHost,
  './'
);

const program = ts.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options);
const emitResult = program.emit();

const allDiagnostics = ts
  .getPreEmitDiagnostics(program)
  .concat(emitResult.diagnostics);

allDiagnostics.forEach(diagnostic => {
  if (diagnostic.file) {
    const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
  } else {
    console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
  }
});
