export type ChannelIcon = 'forum' | 'package' | 'mail' | 'blog' | 'release';

export interface CommunityChannel {
  name: string;
  description: string;
  icon: ChannelIcon;
  to: string;
}

export const channels: CommunityChannel[] = [
{
  name: 'Forum',
  description: 'Ask questions, report what’s broken, and talk through ideas with whoever else is building alongside you.',
  icon: 'forum',
  to: '/forum'
},
{
  name: 'Package index',
  description: 'Publish and discover libraries with the built-in package manager.',
  icon: 'package',
  to: '/packages'
},
{
  name: 'Releases',
  description: 'Every version, with what changed and why.',
  icon: 'release',
  to: '/releases'
},
{
  name: 'Blog',
  description: 'Longer write-ups on the decisions behind the language.',
  icon: 'blog',
  to: '/blog'
},
{
  name: 'Newsletter',
  description: 'A short note whenever there is a release worth reading about.',
  icon: 'mail',
  to: '/community#newsletter'
}];


export interface ContributionPath {
  title: string;
  body: string;
  action: string;
  to: string;
}

export const contributionPaths: ContributionPath[] = [
{
  title: 'Report what’s confusing',
  body: 'Post questions, friction points, or bugs in the forum. Every thread helps shape the next release.',
  action: 'Go to the forum',
  to: '/forum'
},
{
  title: 'Publish a package',
  body: 'Built something useful? Publish it to the index so others can erilang install it.',
  action: 'Browse the index',
  to: '/packages'
},
{
  title: 'Hear when the source opens up',
  body: 'The interpreter and standard library aren’t public yet. Subscribe to know the moment code contributions become possible.',
  action: 'Get notified',
  to: '#newsletter'
}];
