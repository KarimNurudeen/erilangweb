export interface NavItem {
  label: string;
  to: string;
}

export const primaryNav: NavItem[] = [
{ label: 'Docs', to: '/docs' },
{ label: 'Try Sandbox', to: '/sandbox' },
{ label: 'Case studies', to: '/case-studies' },
{ label: 'Join Forum', to: '/forum' },
{ label: 'Community', to: '/community' }];


export interface FooterGroup {
  title: string;
  links: NavItem[];
}

export const footerGroups: FooterGroup[] = [
{
  title: 'Learn',
  links: [
  { label: 'Get started', to: '/docs/getting-started' },
  { label: 'Language guide', to: '/docs/language-basics' },
  { label: 'Standard library', to: '/docs/standard-library' },
  { label: 'Playground', to: '/sandbox' }]

},
{
  title: 'Project',
  links: [
  { label: 'Releases', to: '/releases' },
  { label: 'Packages', to: '/packages' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contributing', to: '/community' },
  { label: 'Governance', to: '/community' }]

},
{
  title: 'Community',
  links: [
  { label: 'Forum', to: '/forum' },
  { label: 'Meetups', to: '/community' },
  { label: 'Case studies', to: '/case-studies' },
  { label: 'Brand assets', to: '/community' }]

}];