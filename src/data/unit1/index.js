import intro from './intro';
import antennas from './antennas';
import propagation from './propagation';
import fading from './fading';
import encoding from './encoding';
import digitalModulation from './digitalModulation';
import analogModulation from './analogModulation';

const withExtras = (t) => ({ ...t, quiz: [...t.quiz, ...(t.deep?.extraQuiz ?? [])] });

export const unit1Topics = [intro, antennas, propagation, fading, encoding, digitalModulation, analogModulation].map(withExtras);
