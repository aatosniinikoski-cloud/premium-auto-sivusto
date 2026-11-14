import { Closing } from '../components/Footer';
import { Commissions } from '../components/home/Commissions';
import { Compare } from '../components/home/Compare';
import { Disciplines } from '../components/home/Disciplines';
import { Hero } from '../components/home/Hero';
import { Manifesto } from '../components/home/Manifesto';
import { Process } from '../components/home/Process';

export function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Disciplines />
      <Compare />
      <Process />
      <Commissions />
      <Closing />
    </>
  );
}
