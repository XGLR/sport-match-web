export const dimensions = [
  { id: 'social', name: '结伴意愿', low: '自己安排', high: '和人一起' },
  { id: 'competition', name: '胜负兴趣', low: '享受过程', high: '喜欢较量' },
  { id: 'intensity', name: '出力偏好', low: '轻缓活动', high: '充分出力' },
  { id: 'skill', name: '技术耐心', low: '容易上手', high: '愿意磨练' },
  { id: 'outdoor', name: '户外偏好', low: '室内省心', high: '喜欢户外' },
  { id: 'rhythm', name: '节奏偏好', low: '自主节奏', high: '跟随节拍' },
];

const question = (id, dimension, title, prompt, labels) => ({
  id, dimension, title, prompt,
  options: labels.map((text, score) => ({ id: 'ABCD'[score], text, score })),
});

export const questions = [
  question('q1', 'social', '有人约你一起运动', '时间和地点都合适，你更接近哪种想法？', ['我还是想自己练', '偶尔一起可以', '有人一起更容易出门', '我会主动张罗下次']),
  question('q2', 'competition', '一次活动结束后', '哪种收获更让你想再来？', ['身体活动开了', '做完自己定的小目标', '比上次多赢几分', '和水平接近的人分出胜负']),
  question('q3', 'intensity', '忙了一天后去运动', '如果身体状态正常，你想怎样动一动？', ['轻轻活动，呼吸平稳', '微微出汗，还能聊天', '认真出力，中间歇一歇', '想练到明显喘气和出汗']),
  question('q4', 'skill', '新动作总是做不顺', '你愿意花多少耐心？', ['想换个一学就会的', '再试几遍，别占太久', '愿意拆开动作慢慢练', '会找教程或教练反复琢磨']),
  question('q5', 'outdoor', '周末有一段空闲', '天气合适时，你更想在哪里运动？', ['在家，准备起来方便', '室内场馆，环境稳定', '附近公园，有点绿意', '去户外换条路线看看']),
  question('q6', 'rhythm', '运动时放起音乐', '你通常会怎么做？', ['按自己的节奏，音乐只是背景', '偶尔跟着节拍动一动', '喜欢让动作踩在拍子上', '想学一段能跟音乐完成的动作']),
  question('q7', 'social', '准备开始一项新运动', '哪种安排更适合你？', ['自己找时间试试', '和一个熟人一起', '加入固定的小班', '加入能常见面的运动小组']),
  question('q8', 'competition', '规则里有计分和排名', '这会怎样影响你的兴趣？', ['我更想自由活动', '可以记分，但不太在意', '有比分会更投入', '会认真想办法赢下来']),
  question('q9', 'intensity', '你有半小时可以运动', '更想把这段时间怎么用？', ['舒展身体，慢慢活动', '匀速走动，保持轻松', '安排几组需要出力的练习', '短时间集中投入体力']),
  question('q10', 'skill', '练了几次，进步还不明显', '什么内容能让你继续？', ['每次都能直接开始的活动', '重复几个简单动作', '看懂一个动作再逐步练好', '研究发力、路线或战术的细节']),
  question('q11', 'outdoor', '每周固定运动两次', '你更希望哪种环境？', ['出门越少越好', '固定室内地点', '熟悉的公园或步道', '能接触不同的户外环境']),
  question('q12', 'rhythm', '面对两种练习方式', '你更喜欢怎样完成动作？', ['自己决定速度和停顿', '有个大致顺序就行', '跟着口令或节拍完成', '把动作连成有节奏的一整段']),
];

export const constraints = [
  { id: 'duration', title: '一次能留出多长时间？', prompt: '按多数日子能做到的时间选，包含运动中的休息。', type: 'single', options: [
    { id: 'under20', text: '20分钟以内' }, { id: '20to40', text: '20到40分钟' }, { id: '40to60', text: '40到60分钟' }, { id: '60plus', text: '60分钟以上' },
  ] },
  { id: 'venues', title: '哪些地方你去起来方便？', prompt: '可多选。选你平时能到的地方。', type: 'multiple', options: [
    { id: 'home', text: '家里' }, { id: 'gym', text: '健身房' }, { id: 'court', text: '室内球馆' }, { id: 'outdoorCourt', text: '室外球场' }, { id: 'pool', text: '游泳馆' }, { id: 'park', text: '公园或步道' }, { id: 'studio', text: '舞蹈或运动教室' }, { id: 'climbing', text: '攀岩馆' }, { id: 'ice', text: '冰场' }, { id: 'snow', text: '雪场' },
  ] },
  { id: 'budget', title: '你愿意投入到什么程度？', prompt: '先按试一个月的打算选。具体费用以当地场馆为准。', type: 'single', options: [
    { id: '0', text: '先用现有东西，尽量不花钱' }, { id: '1', text: '可以添简单器材或偶尔付场地费' }, { id: '2', text: '可以定期付场地费或上体验课' }, { id: '3', text: '可以持续上课，也愿意添装备' },
  ] },
  { id: 'avoid', title: '哪些体验你想避开？', prompt: '可多选。推荐时会排除对应项目。', type: 'multiple', options: [
    { id: 'none', text: '这些都可以' }, { id: 'contact', text: '身体对抗' }, { id: 'water', text: '下水' }, { id: 'height', text: '高处活动' }, { id: 'group', text: '必须和别人一起' }, { id: 'weather', text: '受天气影响的户外活动' },
  ] },
  { id: 'limits', title: '现在有没有需要限制的动作或强度？', prompt: '例如受伤后尚未恢复，或医生交代过运动限制。', type: 'single', options: [
    { id: 'none', text: '没有已知限制' }, { id: 'yes', text: '有，需要控制动作或强度' }, { id: 'unsure', text: '暂时拿不准' },
  ] },
];

const commonSports = new Set(['stretch', 'taichi', 'yoga', 'bodyweight', 'machines', 'band', 'walk', 'jogging', 'jumprope', 'tabletennis', 'badminton', 'basketball', 'football', 'softvolley', 'dancebasic', 'aerobics', 'squaredance', 'boxingbasic', 'martialforms', 'parkstroll', 'cycling', 'hiking']);
const specialistSports = new Set(['bouldering', 'toprope', 'waterwalk', 'aquafitness', 'icedancebasic', 'zumba', 'fencing', 'snowshoe', 'crosscountryski']);
const sport = (id, name, venues, cost, minMinutes, flags, starter, reason) => ({ id, name, venues, cost, minMinutes, flags, starter, reason, priority: commonSports.has(id) ? 0 : specialistSports.has(id) ? 2 : 1 });
const profile = (social, competition, intensity, skill, outdoor, rhythm) => ({ social, competition, intensity, skill, outdoor, rhythm });

export const types = [
  {
    id: 'gentle', name: '身心协调型', tagline: '跟着呼吸，把动作做得更顺。',
    profile: '你更喜欢自己掌握速度，也愿意从轻缓的动作开始。动作清楚、随时能停的练习比较合拍。',
    firstStep: '找一小块平地，留出十分钟，试完再决定要不要继续。',
    watchFor: '动作做到舒服的范围。出现疼痛就停下，先弄清原因。',
    prototype: profile(1, 0, 0, 2, 1, 1),
    sports: [
      sport('mobility', '关节活动练习', ['home', 'gym', 'studio'], 0, 10, [], '坐稳或站稳，缓慢活动肩、肘、踝，每处做几次。', '时间短，速度和幅度都能自己调。'),
      sport('stretch', '轻柔拉伸', ['home', 'gym', 'studio'], 0, 10, [], '选两三个熟悉的部位，轻轻拉伸，保持自然呼吸。', '适合喜欢安静练习、慢慢感受动作的人。'),
      sport('taichi', '太极基础动作', ['home', 'park', 'studio'], 0, 15, [], '先学站姿和一个基础动作，在平地上慢慢练。', '动作可以拆开练，节奏由自己掌握。'),
      sport('yoga', '瑜伽入门', ['home', 'gym', 'studio'], 0, 20, [], '选轻缓的零基础教学，从站姿和坐姿练起，暂不做倒立和大幅度后弯。', '能把动作和呼吸配合起来，练习速度也方便调整。'),
    ],
  },
  {
    id: 'strength', name: '力量进阶型', tagline: '一组一组练，记下自己能做到什么。',
    profile: '你愿意认真出力，也在意每次练习有没有积累。能调整难度、记录次数的项目值得先试。',
    firstStep: '先学两个基础动作，用轻阻力完成一组，确认姿势后再加量。',
    watchFor: '先把动作练顺，再增加次数或重量。每组之间留出休息。',
    prototype: profile(1, 2, 5, 3, 0, 0),
    sports: [
      sport('band', '弹力带基础训练', ['home', 'gym', 'studio'], 1, 15, [], '检查弹力带是否完好，用轻阻力做一组坐姿划船。', '器材容易收纳，练习次数和阻力都方便调整。'),
      sport('bodyweight', '徒手力量入门', ['home', 'gym', 'park'], 0, 15, [], '从靠墙俯卧撑和坐下再起身开始，各做少量。', '能从简单版本开始，适合观察自己的进步。'),
      sport('machines', '固定器械入门', ['gym'], 2, 30, [], '请场馆人员带你调座椅，用轻重量学两台器械。', '动作路线清楚，方便按计划练习。'),
      sport('bouldering', '抱石入门', ['climbing'], 2, 40, ['height', 'fallRisk'], '预约新手指导，先学落地和下攀，在软垫区练低处的简单线路。', '每条线路能分成几个动作，适合反复琢磨发力和站位。'),
      sport('toprope', '顶绳攀岩入门', ['climbing'], 2, 60, ['height', 'fallRisk', 'group'], '预约有教练保护的新手课，先检查安全带和保护系统，再试简单线路。', '需要逐步掌握脚点和重心，可以按自己的进度练习。'),
    ],
  },
  {
    id: 'steady', name: '自主耐力型', tagline: '找一个能持续的速度，走完今天这一段。',
    profile: '你偏爱重复而连贯的运动，能接受花一段时间专心做一件事。路程、时间和节奏会给你反馈。',
    firstStep: '安排一段熟悉的路线或一台器械，先做十五分钟。',
    watchFor: '初次练习先保留余力，结束后观察当天和次日的身体反应。',
    prototype: profile(1, 1, 4, 1, 3, 1),
    sports: [
      sport('walk', '平地健走', ['park'], 0, 15, ['weather'], '选平整路线走十五分钟，速度以还能说完整句子为宜。', '路线和时长容易安排，适合逐步形成固定习惯。'),
      sport('jogging', '跑走交替', ['park'], 0, 20, ['weather', 'highIntensity', 'fallRisk'], '在平整步道先走几分钟，再穿插短段慢跑，累了就恢复步行。', '走和跑的时长可以调整，适合逐步尝试持续运动。'),
      sport('jumprope', '跳绳入门', ['gym', 'outdoorCourt'], 1, 15, ['highIntensity', 'fallRisk'], '确认场地允许跳绳，清出周围空间，先低跳几次，停下休息后再继续。', '器材简单，能按短组安排练习和休息。'),
      sport('indoorwalk', '室内步行', ['home', 'gym'], 0, 10, [], '清出通道，缓步走十分钟，中途可以休息。', '在室内就能开始，时间短也能安排。'),
      sport('stationarybike', '固定单车', ['gym'], 2, 20, [], '调好座椅，用轻阻力骑十分钟，休息后再决定是否继续。', '阻力和速度可调，适合喜欢连续节奏的人。'),
      sport('swimming', '游泳入门', ['pool'], 2, 40, ['water'], '预约有教练的成人入门课，从熟悉水性开始。', '需要专心配合呼吸和动作，适合愿意持续练习的人。'),
      sport('waterwalk', '浅水步行', ['pool'], 2, 30, ['water'], '先确认泳池允许浅水步行，在有救生员的区域由教练带着试走，双脚保持能站稳。', '速度和距离容易调整，能从短段重复练习开始。'),
      sport('aquafitness', '水中健身入门', ['pool'], 2, 40, ['water', 'group'], '先问泳池是否开设成人入门课，从浅水区的踏步和摆臂开始。', '跟着课程重复简单动作，适合想在水里持续活动的人。'),
      sport('skatingbasic', '滑冰基础课', ['ice'], 2, 40, ['fallRisk'], '预约成人新手课，戴好头盔和护具，先学站稳、起步和停下。', '可以从短距离滑行开始，逐步练习平衡和速度控制。'),
      sport('icedancebasic', '冰上舞蹈基础步法', ['ice'], 2, 40, ['fallRisk'], '先问冰场是否有零基础课程，由教练带着练双脚滑行和简单步法，暂不做旋转或跳跃。', '把滑行和步法连起来练，适合愿意反复磨练连续动作的人。'),
    ],
  },
  {
    id: 'racket', name: '球拍切磋型', tagline: '球来球往，每一拍都有回应。',
    profile: '你对比分有兴趣，也愿意磨练动作。能和同伴来回练、逐步加入计分的项目比较合拍。',
    firstStep: '约一位同样入门的同伴，先合作把球接起来。',
    watchFor: '先练站位和小步移动，逐步增加场地范围。',
    prototype: profile(4, 6, 3, 5, 1, 1),
    sports: [
      sport('tabletennis', '乒乓球', ['court', 'outdoorCourt'], 1, 30, ['group'], '借一副球拍，先练发球和近台慢速对打。', '来回反馈快，适合边练动作边体会较量。'),
      sport('badminton', '羽毛球', ['court', 'outdoorCourt'], 1, 30, ['group', 'fallRisk'], '从半场慢速对打开始，先练发球和接球。', '容易约同伴练习，之后能逐步加入计分。'),
      sport('tenniswall', '网球对墙练习', ['court', 'outdoorCourt'], 1, 20, [], '在允许练球的球墙前，从短距离落地球开始。', '一个人也能重复练习击球动作。'),
    ],
  },
  {
    id: 'team', name: '团队协作型', tagline: '有人接应，一起把这场玩下去。',
    profile: '你喜欢和人一起投入，也在意配合与现场反馈。固定小组会让你更愿意持续参加。',
    firstStep: '找写明欢迎新手的活动，先问清人数、规则和对抗程度。',
    watchFor: '初次参加先练配合，和同伴约好速度与接触边界。',
    prototype: profile(6, 4, 4, 3, 3, 1),
    sports: [
      sport('basketball', '篮球入门活动', ['court', 'outdoorCourt'], 1, 30, ['group', 'contact', 'fallRisk', 'highIntensity'], '从原地传球和近距离投篮开始，再参加新手练习。', '个人练习和团队配合都有清楚的反馈。'),
      sport('football', '足球入门活动', ['outdoorCourt'], 1, 30, ['group', 'contact', 'fallRisk', 'highIntensity', 'weather'], '先确认是允许踢球的足球场，与同伴练短距离传球，再参加新手活动。', '传接和跑位需要配合，适合喜欢共同完成进攻的人。'),
      sport('softvolley', '排球基础传垫球', ['court', 'outdoorCourt'], 1, 30, ['group'], '两三个人用软球练传球和垫球，约定不跳跃、不扑救，先不拦网。', '每次接球都需要同伴回应，适合喜欢配合的人。'),
      sport('frisbeepass', '飞盘基础传接', ['park'], 1, 30, ['group', 'weather'], '在开阔平地短距离传接，约定不扑接。', '规则可以从简，几个人就能开始配合。'),
    ],
  },
  {
    id: 'rhythmic', name: '舞动表达型', tagline: '音乐一起，动作就有了顺序。',
    profile: '你容易被节拍带动，喜欢把动作连起来。短组合和重复练习能让你看见自己越来越熟。',
    firstStep: '选一段新手慢速教学，先学十几秒的动作组合。',
    watchFor: '先减小动作幅度，把脚步练熟后再跟上原速。',
    prototype: profile(3, 0, 3, 3, 0, 6),
    sports: [
      sport('dancewalk', '低冲击跟拍走', ['home', 'gym', 'studio'], 0, 10, [], '选十分钟的慢速教学，从原地踏步和侧步开始。', '能跟音乐完成一段练习，也方便暂停。'),
      sport('dancebasic', '舞蹈基础组合', ['home', 'studio'], 0, 15, [], '挑一段没有跳跃和转圈的入门组合，分段跟练。', '短组合便于重复，适合喜欢动作与节拍配合的人。'),
      sport('aerobics', '健身操入门', ['home', 'gym', 'studio'], 0, 15, [], '选没有跳跃的慢速教学，从踏步和摆臂开始，先跟练一小段。', '动作重复、节拍清楚，方便自己调整幅度。'),
      sport('squaredance', '广场舞基础步', ['park', 'studio'], 0, 20, [], '挑一段步法简单、没有快速转圈的教学，先分开练脚步，再跟音乐。', '短组合便于反复练，也可以熟悉后找附近小组一起跳。'),
      sport('zumba', '尊巴入门课', ['gym', 'studio'], 2, 40, ['group', 'highIntensity'], '预约入门体验课，先用小幅度动作跟上节拍。', '集体音乐课能提供节奏和同伴反馈。'),
    ],
  },
  {
    id: 'combat', name: '对抗技艺型', tagline: '练好动作，再读懂对手的节奏。',
    profile: '你对攻防和动作细节有兴趣，也愿意通过反复练习掌握技巧。先试基础步法和出手，再决定是否参加对练。',
    firstStep: '选一节成人入门课，向教练说明经验，先练站姿和基础动作。',
    watchFor: '身体接触和对练会增加受伤风险。参加前问清护具、规则和新手安排。',
    prototype: profile(3, 5, 5, 6, 0, 2),
    sports: [
      sport('boxingbasic', '拳击基础空击', ['home', 'gym', 'studio'], 0, 15, [], '跟慢速入门教学学站姿和直拳，小幅出手，暂不加快速移动。', '能逐个练习攻防动作，自行控制速度和练习量。'),
      sport('martialforms', '武术基础套路', ['home', 'studio'], 0, 15, [], '选没有跳跃、踢腿和深蹲的基础手法组合，先慢练几个动作。', '动作可以拆开重复，适合琢磨姿势和衔接。'),
      sport('taekwondo', '跆拳道基础课', ['studio'], 2, 40, ['group', 'highIntensity', 'fallRisk'], '预约成人新手课，说明先学站姿和基础踢腿，暂不对练或跳踢。', '动作能分解练习，适合愿意反复琢磨姿势和出手时机的人。'),
      sport('fencing', '击剑体验课', ['studio'], 2, 40, ['contact', 'group', 'highIntensity', 'fallRisk'], '预约成人新手课，先学持剑、步法和护具使用。', '需要判断距离与时机，动作练习和攻防思考都有反馈。'),
    ],
  },
  {
    id: 'outdoor', name: '户外探索型', tagline: '换条路，给运动添一点风景。',
    profile: '你更愿意到户外活动，也对路线和环境有兴趣。能边动边观察周围的项目值得先试。',
    firstStep: '找一条熟悉、平整、能随时折返的路线，从短距离开始。',
    watchFor: '出发前看天气和路线，给返程留出时间。',
    prototype: profile(2, 0, 2, 2, 6, 0),
    sports: [
      sport('parkstroll', '公园漫步', ['park'], 0, 15, ['weather'], '选公园平路走十五分钟，留意沿途树木或建筑。', '可以随时停下观察，适合想换换环境的人。'),
      sport('citywalk', '街区步行', ['park'], 0, 20, ['weather'], '选一段有连续人行道的熟悉街区，走到预定地点再返回。', '路线可以常换，运动和探索能一起安排。'),
      sport('cycling', '休闲骑行', ['park'], 1, 40, ['weather', 'fallRisk'], '在允许骑行的平坦路段短距离体验，先检查车况并戴好头盔。', '适合喜欢沿路线移动、逐步扩大活动范围的人。'),
      sport('hiking', '平地徒步', ['park'], 0, 40, ['weather'], '选有标记、路面平整且能随时折返的郊野公园步道，先走短段。', '路线比日常散步更有变化，可以边走边熟悉周围环境。'),
      sport('snowshoe', '雪鞋步行', ['snow'], 2, 60, ['weather', 'fallRisk'], '先确认雪场有雪鞋和开放步道，跟随向导在平坦的标记路线短距离试走。', '可以边走边观察雪地环境，距离和速度也方便调整。'),
      sport('crosscountryski', '越野滑雪入门', ['snow'], 3, 60, ['weather', 'fallRisk'], '先确认雪场有越野雪道和新手课，由教练带着在平地练蹬步、滑行和停下。', '沿雪道连续移动，适合愿意学习技术、慢慢熟悉路线的人。'),
    ],
  },
];

export const catalog = [
  { id: 'walking', name: '步行与跑步', sports: ['散步', '健走', '街区步行', '公园漫步', '慢跑', '跑走交替', '田径跑', '越野跑', '定向运动'] },
  { id: 'strength', name: '力量与体能', sports: ['徒手力量', '弹力带训练', '哑铃训练', '壶铃训练', '固定器械', '杠铃训练', '循环训练', '举重', '力量举'] },
  { id: 'mobility', name: '舒展与身体控制', sports: ['关节活动', '轻柔拉伸', '太极', '八段锦', '瑜伽', '普拉提', '地面流动', '平衡练习'] },
  { id: 'racket', name: '球拍运动', sports: ['乒乓球', '羽毛球', '网球', '壁球', '匹克球', '短式网球', '柔力球'] },
  { id: 'team', name: '团队与传接', sports: ['篮球', '足球', '排球', '软式排球', '气排球', '飞盘', '腰旗橄榄球', '手球', '棒球', '垒球', '曲棍球'] },
  { id: 'dance', name: '舞蹈与律动', sports: ['跟拍走', '有氧舞蹈', '尊巴', '爵士舞', '街舞', '现代舞', '中国舞', '芭蕾基础', '拉丁舞', '交谊舞', '踢踏舞'] },
  { id: 'cycling', name: '骑行与轮上活动', sports: ['固定单车', '休闲骑行', '公路骑行', '山地骑行', '轮滑', '滑板', '长板', '小轮车'] },
  { id: 'water', name: '水上活动', sports: ['游泳', '水中步行', '水中健身', '桨板', '皮划艇', '赛艇', '龙舟', '帆船', '冲浪', '浮潜', '潜水', '自由潜水', '水球', '花样游泳', '滑水', '尾波冲浪', '帆板', '风筝冲浪', '漂流'] },
  { id: 'precision', name: '技巧与准确性', sports: ['台球', '保龄球', '飞镖', '射箭', '高尔夫', '迷你高尔夫', '地掷球', '门球', '丝巾抛接', '空竹'] },
  { id: 'outdoor', name: '山野与攀登', sports: ['平地徒步', '山地徒步', '登山', '抱石', '绳索攀岩', '攀树', '溯溪', '洞穴探险'] },
  { id: 'combat', name: '格斗与对抗', sports: ['拳击', '健身拳击', '散打', '跆拳道', '空手道', '柔道', '巴西柔术', '摔跤', '击剑', '剑道'] },
  { id: 'ice', name: '冰上运动', sports: ['滑冰', '花样滑冰', '速度滑冰', '短道速滑', '冰壶', '冰球', '冰上舞蹈'] },
  { id: 'snow', name: '雪上运动', sports: ['双板滑雪', '单板滑雪', '越野滑雪', '雪鞋徒步', '自由式滑雪', '跳台滑雪', '雪橇', '雪车'] },
  { id: 'adaptive', name: '适应性运动', sports: ['坐式体操', '坐式舞蹈', '坐式太极', '轮椅篮球', '轮椅网球', '轮椅羽毛球', '轮椅乒乓球', '坐式排球', '盲人门球', '盲人足球', '硬地滚球', '轮椅竞速', '手摇自行车', '适应性游泳'] },
  { id: 'motor', name: '机械与马术运动', sports: ['卡丁车', '场地摩托车', '越野摩托车', '汽车场地赛', '汽车拉力赛', '摩托艇', '马术基础骑乘', '马术盛装舞步', '马术障碍赛', '耐力骑乘', '马球'] },
];

