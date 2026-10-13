import evolution from './evolution';
import intro80211 from './intro80211';
import general80211 from './general80211';
import mac80211 from './mac80211';
import phy80211 from './phy80211';
import radioSystems from './radioSystems';
import infrared from './infrared';

const withExtras = (t) => ({ ...t, quiz: [...t.quiz, ...(t.deep?.extraQuiz ?? [])] });

export const unit3Topics = [evolution, intro80211, general80211, mac80211, phy80211, radioSystems, infrared].map(withExtras);
