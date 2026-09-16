export interface Target {
  id: string;
  label: string;
  description: string;
  icon: 'server' | 'terminal' | 'globe' | 'cpu' | 'smartphone';
}

export const targets: Target[] = [
{
  id: 'data',
  label: 'Data science',
  description: 'LOAD a table, clean and group it, then CHART it — every chart comes with a real, data-computed spoken description, not just a picture.',
  icon: 'cpu'
},
{
  id: 'backend',
  label: 'Backend services & APIs',
  description: 'Handlers, database queries, and JSON responses, written in plain English keywords.',
  icon: 'server'
},
{
  id: 'cli',
  label: 'Command-line tools',
  description: 'Argument parsing, file I/O, and process automation from a single .eri script.',
  icon: 'terminal'
},
{
  id: 'network',
  label: 'Network programming',
  description: 'Sockets, HTTP requests, and email — call ASYNC DEFINE functions and AWAIT the result.',
  icon: 'globe'
},
{
  id: 'gui',
  label: 'Small games & GUI programs',
  description: 'Windows, drawing, and keyboard and mouse input with the built-in gui namespace.',
  icon: 'smartphone'
}];


export interface Pillar {
  title: string;
  body: string;
}

export const pillars: Pillar[] = [
{
  title: 'One file, or many',
  body: 'INCLUDE brings in another file under a chosen namespace, so its functions and values are reached with a dot, the same way a library is used.'
},
{
  title: 'Control what you share',
  body: 'An EXPORT line limits what is actually reachable from outside a file, keeping the rest private, internal detail.'
},
{
  title: 'A real package ecosystem',
  body: 'Publish a reusable package with a manifest describing its name, version, and dependencies, then erilang install it anywhere.'
}];
