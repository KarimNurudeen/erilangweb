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
  title: 'Object-oriented & errors',
  items: [
  { label: 'Object-oriented programming', slug: 'oop' },
  { label: 'Error handling', slug: 'error-handling' },
  { label: 'Pattern matching', slug: 'pattern-matching' },
  { label: 'Enums and constants', slug: 'enums-constants' }]

},
{
  title: 'Modules & async',
  items: [
  { label: 'Modules and packages', slug: 'modules-packages' },
  { label: 'Asynchronous programming', slug: 'async' },
  { label: 'Working with files and data', slug: 'files-data' }]

},
{
  title: 'Tooling',
  items: [
  { label: 'The standard library', slug: 'standard-library' },
  { label: 'The interactive shell (REPL)', slug: 'repl' },
  { label: 'Command-line tools', slug: 'cli-tools' }]

},
{
  title: 'Reference',
  items: [
  { label: 'Style guide and best practices', slug: 'style-guide' },
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
  body: 'Write real Erilang and run it right in your browser against the real interpreter — no install required.',
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
  title: 'Functions',
  body: 'Defining and calling functions, returning more than one value, closures, and recursion.',
  meta: 'Guide',
  to: '/docs/functions'
},
{
  title: 'Object-oriented programming',
  body: 'Classes, inheritance, interfaces, data classes, and operator overloading.',
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
  title: 'The standard library',
  body: 'math, os, time and datetime, regex, bytes, hash, net, socket, gui, and more.',
  meta: 'Reference',
  to: '/docs/standard-library'
}];
