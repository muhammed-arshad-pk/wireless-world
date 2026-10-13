import introWlan from './introWlan';
import applicationsWlan from './applicationsWlan';
import requirements from './requirements';
import infraredWlan from './infraredWlan';
import spreadSpectrum from './spreadSpectrum';
import narrowband from './narrowband';
import bluetooth from './bluetooth';

const withExtras = (t) => ({ ...t, quiz: [...t.quiz, ...(t.deep?.extraQuiz ?? [])] });

export const unit5Topics = [introWlan, applicationsWlan, requirements, infraredWlan, spreadSpectrum, narrowband, bluetooth].map(withExtras);
