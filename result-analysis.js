const dimensionCopy = {
  social: [
    '你更愿意独自安排运动，开始和结束都由自己决定。',
    '独自练习和有人陪伴，你都能接受，可以按当天安排选择。',
    '有人一起会让你更愿意参加，固定同伴或小组值得优先找。',
  ],
  competition: [
    '比分对你的吸引力较小，你更在意活动过程和自己的感受。',
    '你能接受计分，也想保留自由练习的空间。',
    '胜负会让你更投入，可以找水平接近的伙伴，逐步加入计分。',
  ],
  intensity: [
    '你偏向轻缓活动，希望练习时能从容掌握速度。',
    '你愿意适度出力，也希望中间有休息和调整的余地。',
    '你愿意投入较多体力，也会被需要持续出力的活动吸引。',
  ],
  skill: [
    '你更喜欢容易上手的动作，准备简单会让开始这件事更省心。',
    '你愿意花些时间学动作，能接受从基础动作积累熟练度。',
    '你愿意反复琢磨技巧，能拆开练、有具体反馈的项目更合拍。',
  ],
  outdoor: [
    '你倾向室内环境，固定地点和较少的出门准备更符合你的安排。',
    '室内和户外你都能接受，可以先按距离和当天的天气选择。',
    '户外环境更能吸引你，路线和沿途变化也是你想参与的部分。',
  ],
  rhythm: [
    '你更喜欢自主掌握速度和停顿，可以按自己的节奏完成练习。',
    '你能接受口令或节拍，也想留一点自己调整的空间。',
    '你喜欢动作跟着节拍连起来，短组合或跟拍练习值得试试。',
  ],
};

const typeReasons = {
  gentle: '动作幅度和速度都方便调整，也容易留意呼吸与身体感受。',
  strength: '这类练习能用动作、次数和阻力安排进度，适合一组一组积累。',
  steady: '重复而连贯的活动方便按时间或路程安排，也能自己调整速度。',
  racket: '来回击球能提供直接反馈，之后可以逐步加入计分和切磋。',
  team: '传接和配合让同伴参与到练习中，适合一起约定时间参加。',
  rhythmic: '短动作组合能跟音乐反复练，熟悉之后再把动作连起来。',
  combat: '基础动作可以拆开练，之后再逐步学习距离判断和攻防配合。',
  outdoor: '路线和环境能为活动增加变化，距离和路段也方便按日常安排选择。',
};

const timeCopy = {
  under20: '每次20分钟以内',
  '20to40': '每次20到40分钟',
  '40to60': '每次40到60分钟',
  '60plus': '每次可留出60分钟以上',
};

const budgetCopy = [
  '优先使用现有物品，尽量不新增花费',
  '接受简单器材或偶尔付场地费',
  '接受定期场地费或体验课',
  '接受持续课程和装备投入',
];

function optionText(data, questionId, ids) {
  const options = data.constraints.find(question => question.id === questionId)?.options || [];
  return ids.map(id => options.find(option => option.id === id)?.text).filter(Boolean);
}

export function buildResultAnalysis(result, conditions, data) {
  const historicalConditionsMissing = !conditions?.duration || !Array.isArray(conditions?.venues);
  conditions = conditions || {};
  const dimensionNotes = data.dimensions.map(dimension => {
    const score = result.scores[dimension.id];
    const band = score <= 1 ? 0 : score <= 4 ? 1 : 2;
    return { id: dimension.id, name: dimension.name, score, description: dimensionCopy[dimension.id][band] };
  });

  const primary = result.primary;
  const preferenceFirst = result.ranked?.[0];
  const fallback = primary && preferenceFirst && preferenceFirst.id !== primary.id;
  let lead = '当前条件下，没有一个类型能提供两个符合选择的入门项目。下面保留你的偏好分析，方便调整条件时参考。';
  const matchReasons = [];

  if (primary) {
    lead = fallback
      ? `结合你能安排的条件，建议先体验${primary.name}。偏好上更接近${preferenceFirst.name}，当前先选能实际开展的方向。`
      : `你的回答较接近${primary.name}，可以先从下面符合条件的入门项目试起。`;
    const closest = data.dimensions.map((dimension, index) => ({
      id: dimension.id,
      index,
      gap: Math.abs(result.scores[dimension.id] - primary.prototype[dimension.id]),
    })).sort((a, b) => a.gap - b.gap || a.index - b.index).slice(0, 2);
    matchReasons.push(...closest.map(dimension => dimensionNotes[dimension.index].description));
    matchReasons.push(typeReasons[primary.id] || primary.profile);
    if (fallback) matchReasons.push(`原先更接近的${preferenceFirst.name}在当前条件下不足两个可推荐项目，因此顺次选择了${primary.name}。`);
  } else {
    matchReasons.push('项目需要同时符合时间、场地、预算和排除项，当前组合留下的选择不足。');
  }

  const venueNames = optionText(data, 'venues', conditions.venues || []);
  const conditionParts = [timeCopy[conditions.duration]];
  if (venueNames.length) conditionParts.push(`可用地点是${venueNames.join('、')}`);
  else conditionParts.push('还没有可用地点');
  conditionParts.push(budgetCopy[Number(conditions.budget)]);
  const avoids = optionText(data, 'avoid', (conditions.avoid || []).filter(id => id !== 'none'));
  if (avoids.length) conditionParts.push(`已按你的选择排除${avoids.join('、')}`);
  if (conditions.limits === 'yes') conditionParts.push('你填了有动作或强度限制，推荐已避开身体对抗、高强度、水上、高处和易跌落项目');
  if (conditions.limits === 'unsure') conditionParts.push('你对动作或强度限制还拿不准，推荐先排除身体对抗、高强度、水上、高处和易跌落项目');
  const conditionsNote = historicalConditionsMissing
    ? '这份历史结果未保存当时的时间与场地条件。'
    : `${conditionParts.filter(Boolean).join('；')}。`;

  let startAdvice;
  if (!primary) {
    startAdvice = '先检查是否漏选方便到达的场地，或能否腾出稍长一点的时间。按真实情况修改条件后再看结果，排除项继续按你的意愿保留。';
  } else {
    startAdvice = `${primary.firstStep}第一次先做少量，结束后记下是否愿意再来，以及时间和地点是否方便。再逐步增加时长和强度。`;
    if (conditions.limits === 'yes' || conditions.limits === 'unsure') startAdvice += '开始前先明确需要避开的动作和强度，再安排体验。';
  }

  return { lead, dimensionNotes, matchReasons, conditionsNote, startAdvice };
}
