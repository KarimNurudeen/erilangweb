import { DownloadIcon, MailIcon, MessagesSquareIcon, PackageIcon, RssIcon } from 'lucide-react';
import { ChannelIcon } from '../data/community';

export const CHANNEL_ICONS: Record<ChannelIcon, typeof MailIcon> = {
  forum: MessagesSquareIcon,
  package: PackageIcon,
  release: DownloadIcon,
  blog: RssIcon,
  mail: MailIcon
};
