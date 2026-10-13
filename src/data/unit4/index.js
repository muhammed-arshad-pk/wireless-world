import introMobileIp from './introMobileIp';
import operationMobileIp from './operationMobileIp';
import terminology from './terminology';
import architecture from './architecture';
import wapIntro from './wapIntro';
import wapArchitecture from './wapArchitecture';
import wae from './wae';

const withExtras = (t) => ({ ...t, quiz: [...t.quiz, ...(t.deep?.extraQuiz ?? [])] });

export const unit4Topics = [introMobileIp, operationMobileIp, terminology, architecture, wapIntro, wapArchitecture, wae].map(withExtras);
