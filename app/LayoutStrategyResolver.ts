import { BaseKitId, HeroId } from './design-system';

export class LayoutStrategyResolver {
  static getLayout(config: { base: BaseKitId; hero: HeroId }) {
    let type: 'split' | 'full' | 'parallax' | 'monogram' | 'default' = 'default';
    if (config.hero === 'SPL') type = 'split';
    else if (config.hero === 'FUL') type = 'full';
    else if (config.hero === 'PRX') type = 'parallax';
    else if (config.hero === 'MON') type = 'monogram';

    let variant: 'minimal' | 'vintage' | 'default' = 'default';
    if (config.base === 'MIN') variant = 'minimal';
    else if (config.base === 'VIN') variant = 'vintage';

    return { type, variant };
  }
}