import React, { useMemo, useState } from 'react';
import { DownloadIcon, CopyIcon, CheckCircle2Icon } from 'lucide-react';
import { releases, ReleaseAsset } from '../lib/api';
import { detectOS } from '../utils/detectOS';

const OS_LABELS: Record<string, string> = {
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux'
};

interface ReleaseAssetsProps {
  assets: ReleaseAsset[];
}

function AssetItem({ asset, copied, onCopy, size = 'sm' }: {
  asset: ReleaseAsset;
  copied: boolean;
  onCopy: (assetId: number, value: string) => void;
  size?: 'sm' | 'lg';
}) {
  if (asset.kind === 'command') {
    return (
      <li>
        <button
          type="button"
          onClick={() => onCopy(asset.id, asset.value || '')}
          className={`flex w-full items-center justify-between gap-2 rounded-lg bg-ink text-left font-mono text-white/90 transition-colors duration-150 ease-eri hover:bg-neutral-800 ${size === 'lg' ? 'px-4 py-3 text-[14px]' : 'px-3.5 py-2.5 text-[13px]'}`}>
          <span className="truncate">{asset.value}</span>
          <CopyIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </button>
        {copied ?
          <p className="mt-1 text-[11.5px] text-accent">Copied!</p> :
          <p className="mt-1 text-[11.5px] text-muted">{asset.label}</p>}
      </li>);
  }

  return (
    <li>
      <a
        href={releases.assetDownloadUrl(asset.id)}
        className={size === 'lg' ?
          'flex items-center justify-between gap-2 rounded-lg bg-accent px-5 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-150 ease-eri hover:bg-accent-soft' :
          'flex items-center justify-between gap-2 rounded-lg border border-line px-3.5 py-2.5 text-[13.5px] text-white transition-colors duration-150 ease-eri hover:border-accent'}>
        {asset.label}
        <DownloadIcon className={size === 'lg' ? 'h-4 w-4 shrink-0' : 'h-3.5 w-3.5 shrink-0'} aria-hidden="true" />
      </a>
    </li>);
}

export function ReleaseAssets({ assets }: ReleaseAssetsProps) {
  const [copied, setCopied] = useState<number | null>(null);
  const detected = useMemo(() => detectOS(), []);

  const copy = (assetId: number, value: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(assetId);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const groupedAssets = assets.reduce<Record<string, ReleaseAsset[]>>((acc, asset) => {
    (acc[asset.os_type] ||= []).push(asset);
    return acc;
  }, {});

  if (assets.length === 0) {
    return (
      <p className="rounded-xl border border-line bg-surface p-6 text-[14px] text-muted">
        No downloadable assets have been attached to this release yet.
      </p>);
  }

  const detectedAssets = detected ? groupedAssets[detected] : undefined;
  const otherEntries = Object.entries(groupedAssets).filter(([os]) => os !== detected);

  return (
    <div className="flex flex-col gap-6">
      {detectedAssets &&
        <div className="rounded-2xl border border-accent/40 bg-accent/[0.06] p-5 sm:p-6">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-accent">
            <CheckCircle2Icon className="h-3.5 w-3.5" aria-hidden="true" />
            Recommended for your system
          </p>
          <h3 className="mt-1.5 text-xl font-bold text-white">{OS_LABELS[detected!] || detected}</h3>
          <ul className="mt-4 flex flex-col gap-2.5 sm:max-w-sm">
            {detectedAssets.map((asset) =>
              <AssetItem key={asset.id} asset={asset} copied={copied === asset.id} onCopy={copy} size="lg" />
            )}
          </ul>
        </div>
      }

      <div>
        {detectedAssets && otherEntries.length > 0 &&
          <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-muted">
            Other platforms
          </h3>
        }
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(detectedAssets ? otherEntries : Object.entries(groupedAssets)).map(([os, osAssets]) =>
            <div key={os}>
              <h3 className="text-[13px] font-bold uppercase tracking-wide text-muted">
                {OS_LABELS[os] || os}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {osAssets.map((asset) =>
                  <AssetItem key={asset.id} asset={asset} copied={copied === asset.id} onCopy={copy} />
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>);
}
