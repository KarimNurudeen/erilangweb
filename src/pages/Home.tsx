import React from 'react';
import { Hero } from '../components/home/Hero';
import { WhyErilang } from '../components/home/WhyErilang';
import { EffectBanner } from '../components/home/EffectBanner';
import { LatestNews } from '../components/home/LatestNews';
import { Portability } from '../components/home/Portability';
import { InProduction } from '../components/home/InProduction';
import { CommunityPreview } from '../components/home/CommunityPreview';
import { GetStartedBanner } from '../components/home/GetStartedBanner';

export function Home() {
  return (
    <main>
      <Hero />
      <WhyErilang />
      <EffectBanner />
      <LatestNews />
      <InProduction />
      <Portability />
      <CommunityPreview />
      <GetStartedBanner />
    </main>);

}