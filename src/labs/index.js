// Maps a topic's `lab.key` to its interactive visualizer component.
import SpectrumViz from '../visuals/unit1/SpectrumViz';
import AntennaViz from '../visuals/unit1/AntennaViz';
import PropagationViz from '../visuals/unit1/PropagationViz';
import FadingViz from '../visuals/unit1/FadingViz';
import LineCodeViz from '../visuals/unit1/LineCodeViz';
import DigiModViz from '../visuals/unit1/DigiModViz';
import AnalogViz from '../visuals/unit1/AnalogViz';
import NetFundViz from '../visuals/unit2/NetFundViz';
import SatLinkViz from '../visuals/unit2/SatLinkViz';
import OrbitViz from '../visuals/unit2/OrbitViz';
import FdmaViz from '../visuals/unit2/FdmaViz';
import TdmaViz from '../visuals/unit2/TdmaViz';
import CellViz from '../visuals/unit2/CellViz';
import CdmaViz from '../visuals/unit2/CdmaViz';
import EvolutionViz from '../visuals/unit3/EvolutionViz';
import ModesViz from '../visuals/unit3/ModesViz';
import EssViz from '../visuals/unit3/EssViz';
import CsmaViz from '../visuals/unit3/CsmaViz';
import PhyViz from '../visuals/unit3/PhyViz';
import HeatmapViz from '../visuals/unit3/HeatmapViz';
import IrViz from '../visuals/unit3/IrViz';
import MobilityViz from '../visuals/unit4/MobilityViz';
import OperationViz from '../visuals/unit4/OperationViz';
import TermsViz from '../visuals/unit4/TermsViz';
import ArchViz from '../visuals/unit4/ArchViz';
import WapIntroViz from '../visuals/unit4/WapIntroViz';
import WapArchViz from '../visuals/unit4/WapArchViz';
import WaeViz from '../visuals/unit4/WaeViz';
import WlanBuildViz from '../visuals/unit5/WlanBuildViz';
import WlanAppsViz from '../visuals/unit5/WlanAppsViz';
import ReqViz from '../visuals/unit5/ReqViz';
import IrSendViz from '../visuals/unit5/IrSendViz';
import SpreadViz from '../visuals/unit5/SpreadViz';
import NarrowViz from '../visuals/unit5/NarrowViz';
import BtViz from '../visuals/unit5/BtViz';

export const labRegistry = {
  'w1-spectrum': SpectrumViz,
  'w1-antenna': AntennaViz,
  'w1-propagation': PropagationViz,
  'w1-fading': FadingViz,
  'w1-linecode': LineCodeViz,
  'w1-digimod': DigiModViz,
  'w1-analog': AnalogViz,
  'w2-netfund': NetFundViz,
  'w2-satsys': SatLinkViz,
  'w2-orbits': OrbitViz,
  'w2-fdma': FdmaViz,
  'w2-tdma': TdmaViz,
  'w2-cellular': CellViz,
  'w2-cdma': CdmaViz,
  'w3-evolution': EvolutionViz,
  'w3-modes': ModesViz,
  'w3-ess': EssViz,
  'w3-csma': CsmaViz,
  'w3-phy': PhyViz,
  'w3-heatmap': HeatmapViz,
  'w3-ir': IrViz,
  'w4-mobility': MobilityViz,
  'w4-operation': OperationViz,
  'w4-terms': TermsViz,
  'w4-arch': ArchViz,
  'w4-wap-intro': WapIntroViz,
  'w4-wap-arch': WapArchViz,
  'w4-wae': WaeViz,
  'w5-wlan': WlanBuildViz,
  'w5-apps': WlanAppsViz,
  'w5-req': ReqViz,
  'w5-ir': IrSendViz,
  'w5-ss': SpreadViz,
  'w5-nb': NarrowViz,
  'w5-bt': BtViz,
};
