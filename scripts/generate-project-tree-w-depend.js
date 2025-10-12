#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // eslint-disable-line no-unused-vars

// Конфигурация
const CONFIG = {
  outputFile: 'PROJECT-STRUCTURE-W-IMPORTS.md',
  ignorePatterns: [
    'node_modules', '.git', 'dist', 'build', '.quasar',
    '.output', 'coverage', '.DS_Store', 'Thumbs.db',
    '.env.local', 'package-lock.json', 'yarn.lock',
    'PROJECT-STRUCTURE.md', 'PROJECT-STRUCTURE-W-IMPORTS.md'
  ],
  includeContent: [
    'package.json',
    'quasar.config.js',
    'vite.config.js',
    '.eslintrc.js'
  ],
  maxDepth: 10,
  analyzeImports: true,
  codeExtensions: ['.vue', '.js', '.ts', '.jsx', '.tsx'],
  maxImportDepth: 3
};

// Кэш для хранения анализа файлов
const fileAnalysisCache = new Map();

function shouldIgnore(name) {
  return CONFIG.ignorePatterns.some(pattern => name === pattern);
}

function isCodeFile(filename) {
  return CONFIG.codeExtensions.includes(path.extname(filename));
}

// Анализирует импорты в файле
function analyzeImports(filePath, depth = 0) {
  if (depth > CONFIG.maxImportDepth) {
    return { imports: [], exports: [], components: [] };
  }

  const cacheKey = `${filePath}:${depth}`;
  if (fileAnalysisCache.has(cacheKey)) {
    return fileAnalysisCache.get(cacheKey);
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const analysis = {
      imports: [],
      exports: [],
      components: [],
      dependencies: []
    };

    // Регулярные выражения для анализа кода
    const importRegex = /import\s+(?:(?:\*\s+as\s+(\w+))|(?:\{([^}]+)\})|(?:([^'\n]+)))\s+from\s+['"]([^'"]+)['"]/g;
    const requireRegex = /(?:const|let|var)\s+([^=]+)\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    const exportRegex = /export\s+(?:default\s+)?(?:class|function|const|let|var)\s+(\w+)/g;
    const componentRegex = /components:\s*{([^}]+)}/g;
    const vueComponentRegex = /name:\s*['"]([^'"]+)['"]/g;

    // Анализ импортов
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const [, defaultImport, namedImports, simpleImport, source] = match;
      analysis.imports.push({
        source,
        imports: namedImports ? namedImports.split(',').map(s => s.trim()) : 
                 defaultImport ? [defaultImport] :
                 simpleImport ? [simpleImport.split(',')[0].trim()] : ['default']
      });
    }

    // Анализ require
    while ((match = requireRegex.exec(content)) !== null) {
      const [, variables, source] = match;
      analysis.imports.push({
        source,
        imports: [variables.split(',')[0].trim()],
        type: 'require'
      });
    }

    // Анализ экспортов
    while ((match = exportRegex.exec(content)) !== null) {
      analysis.exports.push(match[1]);
    }

    // Анализ Vue компонентов
    while ((match = componentRegex.exec(content)) !== null) {
      const components = match[1].split(',').map(c => c.trim().split(':')[0].trim());
      analysis.components.push(...components);
    }

    // Анализ имени Vue компонента
    while ((match = vueComponentRegex.exec(content)) !== null) {
      analysis.components.push(match[1]);
    }

    // Анализ зависимостей (упрощенный)
    analysis.dependencies = [...new Set([
      ...analysis.imports.map(imp => imp.source),
      ...analysis.components
    ])];

    fileAnalysisCache.set(cacheKey, analysis);
    return analysis;

  } catch (error) {
    return { imports: [], exports: [], components: [], dependencies: [], error: error.message };
  }
}

// Генерирует описание файла для ИИ
function generateFileDescription(filePath, analysis) {
  const ext = path.extname(filePath);
  const filename = path.basename(filePath);
  
  let description = `File: ${filename}\n`;
  description += `Path: ${filePath}\n`;
  description += `Type: ${ext.toUpperCase()} file\n`;

  if (analysis.imports.length > 0) {
    description += `Imports:\n`;
    analysis.imports.forEach(imp => {
      description += `  - from "${imp.source}": ${imp.imports.join(', ')}\n`;
    });
  }

  if (analysis.exports.length > 0) {
    description += `Exports: ${analysis.exports.join(', ')}\n`;
  }

  if (analysis.components.length > 0) {
    description += `Components: ${analysis.components.join(', ')}\n`;
  }

  if (analysis.dependencies.length > 0) {
    description += `Dependencies: ${analysis.dependencies.join(', ')}\n`;
  }

  return description + '\n';
}

function getFileContentSafe(filePath, maxLines = 50) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    if (lines.length > maxLines) {
      content = lines.slice(0, maxLines).join('\n') + 
               `\n// ... [file truncated, total ${lines.length} lines] ...\n`;
    }
    
    return content;
  } catch (error) {
    return `// Unable to read file: ${error.message}\n`;
  }
}

function generateProjectTree(dir, prefix = '', depth = 0, relativePath = '') {
  if (depth > CONFIG.maxDepth) return '';

  let result = '';
  
  try {
    const items = fs.readdirSync(dir)
      .filter(item => !shouldIgnore(item))
      .sort((a, b) => {
        const aPath = path.join(dir, a);
        const bPath = path.join(dir, b);
        const aIsDir = fs.statSync(aPath).isDirectory();
        const bIsDir = fs.statSync(bPath).isDirectory();
        
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });

    items.forEach((item, index) => {
      const fullPath = path.join(dir, item);
      const isLast = index === items.length - 1;
      const currentRelativePath = relativePath ? `${relativePath}/${item}` : item;
      
      try {
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          result += `${prefix}${isLast ? '└── ' : '├── '}📁 ${item}/\n`;
          const newPrefix = prefix + (isLast ? '    ' : '│   ');
          result += generateProjectTree(fullPath, newPrefix, depth + 1, currentRelativePath);
        } else {
          result += `${prefix}${isLast ? '└── ' : '├── '}📄 ${item}\n`;
          
          // Анализ файлов кода
          if (CONFIG.analyzeImports && isCodeFile(item)) {
            const analysis = analyzeImports(fullPath);
            const fileDesc = generateFileDescription(currentRelativePath, analysis);
            
            // Добавляем анализ в результат
            result += prefix + '    ' + fileDesc.split('\n').join('\n' + prefix + '    ') + '\n';
          }
          
          // Добавляем содержимое важных файлов
          if (CONFIG.includeContent.includes(item)) {
            const content = getFileContentSafe(fullPath);
            result += `\n${prefix}    /* Content of ${currentRelativePath} */\n`;
            result += content.split('\n').map(line => `${prefix}    ${line}`).join('\n');
            result += `\n${prefix}    ${'='.repeat(50)}\n`;
          }
        }
      } catch (error) { // eslint-disable-line no-unused-vars
        result += `${prefix}${isLast ? '└── ' : '├── '}❌ ${item} [access error]\n`;
      }
    });
  } catch (error) {
    result += `${prefix}└── [directory read error: ${error.message}]\n`;
  }
  
  return result;
}

// Генерирует сводку по проекту для ИИ
function generateProjectSummary() {
  const summary = {
    totalFiles: 0,
    vueFiles: 0,
    jsFiles: 0,
    components: [],
    routes: [],
    stores: [],
    plugins: []
  };

  fileAnalysisCache.forEach((analysis, filePath) => {
    summary.totalFiles++;
    const ext = path.extname(filePath);
    
    if (ext === '.vue') summary.vueFiles++;
    if (ext === '.js') summary.jsFiles++;
    
    // Анализ структуры по путям
    if (filePath.includes('/components/')) {
      summary.components.push(path.basename(filePath));
    } else if (filePath.includes('/router/')) {
      summary.routes.push(path.basename(filePath));
    } else if (filePath.includes('/stores/')) {
      summary.stores.push(path.basename(filePath));
    } else if (filePath.includes('/boot/')) {
      summary.plugins.push(path.basename(filePath));
    }
  });

  return summary;
}

function main() {
  const projectRoot = process.cwd();
  const projectName = path.basename(projectRoot);
  
  console.log('🔄 Generating AI-optimized project structure...');
  
  const header = `# PROJECT STRUCTURE ANALYSIS FOR AI
## Project: ${projectName}
## Generated: ${new Date().toLocaleString()}

## PROJECT OVERVIEW
\`\`\`
`;
// ## Path: ${projectRoot} было сверху, пока в комментах
  
  let output = header;
  
  try {
    const tree = generateProjectTree(projectRoot);
    output += tree;
    
    // Добавляем сводку проекта
    const summary = generateProjectSummary();
    output += `\n\`\`\`\n\n`;
    output += `## PROJECT SUMMARY\n`;
    output += `- Total code files: ${summary.totalFiles}\n`;
    output += `- Vue components: ${summary.vueFiles}\n`;
    output += `- JavaScript files: ${summary.jsFiles}\n`;
    output += `- Components: ${summary.components.length}\n`;
    output += `- Routes: ${summary.routes.length}\n`;
    output += `- Stores: ${summary.stores.length}\n`;
    output += `- Plugins: ${summary.plugins.length}\n\n`;
    
    // Добавляем информацию о package.json
    try {
      const packageJsonPath = path.join(projectRoot, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageInfo = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        output += `## DEPENDENCIES ANALYSIS\n`;
        output += `**Name:** ${packageInfo.name || 'not specified'}\n`;
        output += `**Version:** ${packageInfo.version || 'not specified'}\n`;
        output += `**Quasar Version:** ${packageInfo.dependencies?.quasar || packageInfo.devDependencies?.quasar || 'not found'}\n\n`;
        
        if (packageInfo.dependencies) {
          output += `### Runtime Dependencies (${Object.keys(packageInfo.dependencies).length}):\n`;
          Object.entries(packageInfo.dependencies).forEach(([key, value]) => {
            output += `- ${key}: ${value}\n`;
          });
          output += '\n';
        }
        
        if (packageInfo.devDependencies) {
          output += `### Dev Dependencies (${Object.keys(packageInfo.devDependencies).length}):\n`;
          Object.entries(packageInfo.devDependencies).forEach(([key, value]) => {
            output += `- ${key}: ${value}\n`;
          });
          output += '\n';
        }
        
        if (packageInfo.scripts) {
          output += `### Available Scripts:\n`;
          Object.entries(packageInfo.scripts).forEach(([key, value]) => {
            output += `- \`${key}\`: ${value}\n`;
          });
        }
      }
    } catch (error) {
      output += `\n⚠️ Could not read package.json: ${error.message}\n`;
    }
    
    // Добавляем архитектурные заметки
    output += `\n## ARCHITECTURE NOTES\n`;
    output += `- Framework: Quasar (Vue.js)\n`;
    output += `- State management: ${summary.stores.length > 0 ? 'Pinia/Vuex stores detected' : 'No state management detected'}\n`;
    output += `- Routing: ${summary.routes.length > 0 ? 'Vue Router detected' : 'No routing detected'}\n`;
    output += `- Project structure follows Quasar conventions\n`;
    
    // Сохраняем в файл
    fs.writeFileSync(CONFIG.outputFile, output, 'utf8');
    
    console.log(`✅ AI-optimized project structure saved to: ${CONFIG.outputFile}`);
    console.log(`📊 File size: ${(output.length / 1024).toFixed(2)} KB`);
    console.log(`🔍 Analyzed ${fileAnalysisCache.size} code files`);
    console.log(`📝 Output format: Markdown with import analysis`);
    
  } catch (error) {
    console.error('❌ Error generating structure:', error.message);
    process.exit(1);
  }
}

main();