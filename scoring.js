const dimensionIds = ['social', 'competition', 'intensity', 'skill', 'outdoor', 'rhythm'];
const durationCaps = { under20: 20, '20to40': 40, '40to60': 60, '60plus': Infinity };
const indoorVenues = new Set(['home', 'gym', 'studio', 'pool', 'climbing', 'ice', 'court']);
const restrictedFlags = new Set(['contact', 'highIntensity', 'water', 'height', 'fallRisk']);

export function scoreQuiz(answers, conditions, data) {
  const scores = Object.fromEntries(dimensionIds.map(id => [id, 0]));
  const conditionSnapshot = {
    duration: conditions.duration,
    venues: [...conditions.venues],
    budget: conditions.budget,
    avoid: [...conditions.avoid],
    limits: conditions.limits,
  };
  for (const question of data.questions) {
    const option = question.options.find(choice => choice.id === answers[question.id]);
    if (!option) throw new Error(`Incomplete or invalid answer: ${question.id}`);
    scores[question.dimension] += option.score;
  }

  const ranked = data.types.map((type, index) => ({
    ...type,
    distance: dimensionIds.reduce((total, id) => total + Math.abs(scores[id] - type.prototype[id]), 0),
    index,
  })).sort((a, b) => a.distance - b.distance || a.index - b.index)
    .map(({ index, ...type }) => type);

  const cap = durationCaps[conditions.duration];
  const eligible = sport => sport
    && sport.venues.some(venue => conditions.venues.includes(venue))
    && (!conditions.avoid.includes('weather') || sport.venues.some(venue => conditions.venues.includes(venue) && indoorVenues.has(venue)))
    && sport.cost <= conditions.budget
    && sport.minMinutes <= cap
    && !sport.flags.some(flag => flag !== 'weather' && conditions.avoid.includes(flag))
    && !(conditions.limits !== 'none' && sport.flags.some(flag => restrictedFlags.has(flag)));

  const byPriority = (a, b) => (a.priority ?? 1) - (b.priority ?? 1);

  for (const type of ranked) {
    const seen = new Set();
    const sports = type.sports.filter(eligible).filter(sport => {
      if (seen.has(sport.id)) return false;
      seen.add(sport.id);
      return true;
    }).sort(byPriority);
    if (sports.length >= 2) {
      const primarySports = sports.slice(0, 6);
      const selected = new Set(primarySports.map(sport => sport.id));
      const alternatives = [];
      for (const otherType of ranked) {
        if (otherType.id === type.id) continue;
        let added = 0;
        for (const sport of otherType.sports.filter(eligible).sort(byPriority)) {
          if (!eligible(sport) || selected.has(sport.id)) continue;
          selected.add(sport.id);
          alternatives.push({ ...sport, typeName: otherType.name, typeId: otherType.id });
          added += 1;
          if (added === 2) break;
        }

      }
      return { scores, conditions: conditionSnapshot, primary: type, sports: primarySports, alternatives: alternatives.sort(byPriority).slice(0, 8), ranked };
    }
  }
  return { scores, conditions: conditionSnapshot, primary: null, sports: [], alternatives: [], ranked };
}
