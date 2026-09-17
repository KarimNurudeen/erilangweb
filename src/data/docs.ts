export interface DocNavItem {
  label: string;
  slug: string;
}

export interface DocSection {
  title: string;
  items: DocNavItem[];
}

export const docsSidebar: DocSection[] = [
{ title: 'Overview', items: [{ label: 'Home', slug: '' }, { label: 'Introduction', slug: 'introduction' }, { label: 'Getting started', slug: 'getting-started' }] },
{
  title: 'Language guide',
  items: [
  { label: 'Language basics', slug: 'language-basics' },
  { label: 'Expressions and operators', slug: 'expressions-operators' },
  { label: 'Control flow', slug: 'control-flow' },
  { label: 'Functions', slug: 'functions' },
  { label: 'Data types', slug: 'data-types' },
  { label: 'Data structures', slug: 'data-structures' }]

},
{
  title: 'Data science',
  items: [
  { label: 'Inspection, statistics & cleaning', slug: 'data-science-inspection' },
  { label: 'Transforming, grouping & joining', slug: 'data-science-transform' },
  { label: 'Accessible visualization', slug: 'data-science-charts' },
  { label: 'Statistical inference', slug: 'data-science-inference' }]

},
{
  title: 'Object-oriented & errors',
  items: [
  { label: 'Object-oriented programming', slug: 'oop' },
  { label: 'Interfaces', slug: 'interfaces' },
  { label: 'Annotations', slug: 'annotations' },
  { label: 'Error handling', slug: 'error-handling' },
  { label: 'Enums and constants', slug: 'enums-constants' }]

},
{
  title: 'Modules & async',
  items: [
  { label: 'Modules and packages', slug: 'modules-packages' },
  { label: 'Namespaces', slug: 'namespaces' },
  { label: 'Asynchronous programming', slug: 'async' },
  { label: 'Working with files and data', slug: 'files-data' }]

},
{
  title: 'Standard library',
  items: [
  { label: 'Core libraries', slug: 'stdlib-core' },
  { label: 'Networking', slug: 'stdlib-networking' },
  { label: 'Web framework', slug: 'stdlib-web' },
  { label: 'Hashing', slug: 'stdlib-hashing' },
  { label: 'Byte/binary data', slug: 'stdlib-bytes' },
  { label: 'Compression & archives', slug: 'stdlib-archives' },
  { label: 'Advanced data structures', slug: 'stdlib-data-structures' },
  { label: 'Randomness & identifiers', slug: 'stdlib-random' },
  { label: 'Running external programs', slug: 'stdlib-run-command' },
  { label: 'Command-line argument parsing', slug: 'stdlib-cli-args' },
  { label: 'Image handling', slug: 'stdlib-image' },
  { label: 'Audio', slug: 'stdlib-audio' },
  { label: 'Video handling', slug: 'stdlib-video' },
  { label: 'Web scraping (HTML/XML)', slug: 'stdlib-html' },
  { label: 'GUI & drawing primitives', slug: 'stdlib-gui' },
  { label: 'OS accessibility (UI automation)', slug: 'stdlib-ui-automation' }]

},
{
  title: 'Tooling',
  items: [
  { label: 'The interactive shell (REPL)', slug: 'repl' },
  { label: 'Command-line tools', slug: 'cli-tools' },
  { label: 'Linting', slug: 'linting' },
  { label: 'Documentation generator', slug: 'doc-generator' },
  { label: 'Formatter', slug: 'formatter' },
  { label: 'Package manager', slug: 'package-manager' }]

},
{
  title: 'Reference',
  items: [
  { label: 'Style guide and best practices', slug: 'style-guide' },
  { label: 'Contextual keywords', slug: 'contextual-keywords' },
  { label: 'Quick reference', slug: 'quick-reference' }]

}];


export const flatDocNav: DocNavItem[] = docsSidebar.
flatMap((section) => section.items).
filter((item) => item.slug !== '');

export interface DocCard {
  title: string;
  body: string;
  meta: string;
  to: string;
}

export const docEntryPoints: DocCard[] = [
{
  title: 'Get started with Erilang',
  body: 'Install Erilang, write your first .eri file, and run it from the terminal.',
  meta: '10 min',
  to: '/docs/getting-started'
},
{
  title: 'Try the sandbox',
  body: 'Write real Erilang and run it right in your browser against the real interpreter. No install required.',
  meta: 'No install',
  to: '/sandbox'
}];


export const docFirstSteps: DocCard[] = [
{
  title: 'Language basics',
  body: 'Variables, constants, names, and how to print a value with show().',
  meta: 'Guide',
  to: '/docs/language-basics'
},
{
  title: 'Control flow',
  body: 'Conditionals, while and counting loops, and branching with WHEN and CASE.',
  meta: 'Guide',
  to: '/docs/control-flow'
},
{
  title: 'Accessible visualization',
  body: 'CHART turns a dataset into an image and a genuine, data-computed spoken description. It\'s the reason Erilang exists.',
  meta: 'Guide',
  to: '/docs/data-science-charts'
},
{
  title: 'Object-oriented programming',
  body: 'Classes, CONSTRUCT/DESTRUCT, inheritance, interfaces, data classes, and operator overloading.',
  meta: 'Guide',
  to: '/docs/oop'
},
{
  title: 'Error handling',
  body: 'TRY and CATCH, custom error types raised with RAISE, and stating assumptions with assert.',
  meta: 'Guide',
  to: '/docs/error-handling'
},
{
  title: 'Core libraries',
  body: 'math, os, time and datetime, regex, hashing, networking, and much more.',
  meta: 'Reference',
  to: '/docs/stdlib-core'
}];
