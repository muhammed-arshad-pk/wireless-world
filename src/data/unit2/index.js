import networking from './networking';
import satelliteSystems from './satelliteSystems';
import satelliteParams from './satelliteParams';
import fdma from './fdma';
import tdma from './tdma';
import cellular from './cellular';
import gen2g3g from './gen2g3g';

const withExtras = (t) => ({ ...t, quiz: [...t.quiz, ...(t.deep?.extraQuiz ?? [])] });

export const unit2Topics = [networking, satelliteSystems, satelliteParams, fdma, tdma, cellular, gen2g3g].map(withExtras);
