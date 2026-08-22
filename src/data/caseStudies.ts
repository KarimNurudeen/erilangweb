export type CaseCategory = 'Backend' | 'Data' | 'Tooling' | 'Automation' | 'Accessibility';

export interface CaseStudy {
  id: string;
  company: string;
  category: CaseCategory;
  quote: string;
  author: string;
  role: string;
  metric: string;
  metricLabel: string;
}

export const caseCategories: CaseCategory[] = ['Backend', 'Data', 'Tooling', 'Automation', 'Accessibility'];

export const caseStudies: CaseStudy[] = [
{
  id: 'northwind',
  company: 'Northwind Freight',
  category: 'Backend',
  quote:
  'We replaced a tangle of routing scripts with one Erilang service. New engineers read the code and understand the flow on day one — nobody needs a syntax cheat sheet to get started.',
  author: 'Priya Raman',
  role: 'Principal Engineer',
  metric: '1 day',
  metricLabel: 'to onboard a new engineer'
},
{
  id: 'meridian',
  company: 'Meridian Health',
  category: 'Accessibility',
  quote:
  'Our clinical rules engine is maintained by a team that includes engineers who rely on screen readers. Erilang reads as English keywords instead of a wall of symbols, so nobody needs a workaround.',
  author: 'Tom Whitfield',
  role: 'Head of Platform',
  metric: 'Zero',
  metricLabel: 'screen-reader workarounds needed'
},
{
  id: 'lumen',
  company: 'Lumen Robotics',
  category: 'Data',
  quote:
  'We used to hand-roll CSV parsing across three different scripts. Now everything goes through LOAD and FILTER, and the report that took an analyst a full day runs in minutes.',
  author: 'Ana Beltrán',
  role: 'Data Lead',
  metric: '5 min',
  metricLabel: 'vs. a full day, for the weekly report'
},
{
  id: 'quill',
  company: 'Quill Analytics',
  category: 'Tooling',
  quote:
  'Our internal CLI suite is forty commands maintained by four people. The built-in linter and formatter removed an entire category of setup work for new contributors.',
  author: 'Devon Park',
  role: 'Developer Experience',
  metric: '40',
  metricLabel: 'commands, one CLI'
},
{
  id: 'atlas',
  company: 'Atlas Payments',
  category: 'Backend',
  quote:
  'AWAIT keeps our payment webhooks readable even with dozens of network calls in flight at once. Nobody on the team has to reason about callback order to trace a bug anymore.',
  author: 'Sarah Okonjo',
  role: 'Staff Engineer',
  metric: '0',
  metricLabel: 'callback-order bugs since the rewrite'
},
{
  id: 'verso',
  company: 'Verso Studio',
  category: 'Automation',
  quote:
  'We automate our entire release-notes pipeline with a couple of .eri scripts — pulling changelog entries, formatting them, and emailing the summary with smtp.send.',
  author: 'Luca Ferretti',
  role: 'CTO',
  metric: '3',
  metricLabel: 'scripts replaced a half-day manual process'
}];
