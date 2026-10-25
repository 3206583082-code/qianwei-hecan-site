const MEMBERS = [
  {
    id: 0,
    name: "外婆",
    meta: "75岁 · 女",
    condition: "糖尿病 + 高血压",
    goal: "控糖、低钠、稳血压；主食低GI，忌高糖、重油重盐。",
    avatar: "婆",
  },
  {
    id: 1,
    name: "爸爸",
    meta: "50岁 · 男",
    condition: "高血压",
    goal: "限盐、控脂、保护心血管。",
    avatar: "爸",
  },
  {
    id: 2,
    name: "妈妈",
    meta: "48岁 · 女",
    condition: "偏胖 · 血压偏高",
    goal: "高饱腹、低热量、高蛋白。",
    avatar: "妈",
  },
  {
    id: 3,
    name: "青年",
    meta: "21岁 · 男",
    condition: "偏瘦 · 常年手脚冰凉",
    goal: "温补、健脾养血；增加优质蛋白与温性药食同源食材。",
    avatar: "青",
  },
];

const ALL_MEMBERS = [0, 1, 2, 3];

function ing(name, grams, shop = true) {
  return { name, grams, shop };
}

function familyIng(name, grams, shop = true) {
  return ing(name, Math.round(grams * 4), shop);
}

function seasoningIng(name, grams, shop = true) {
  const lowSodium = name.includes("盐") || name.includes("豉油") || name.includes("糟辣椒");
  return ing(name, Math.round(grams * (lowSodium ? 1 : 2)), shop);
}

function dish(
  id,
  name,
  sub,
  category,
  desc,
  ingredients,
  seasoning,
  steps,
  nutrition,
  tcm,
  tags,
  suitable,
  contra,
  memberTips = {},
) {
  return {
    id,
    name,
    sub,
    category,
    desc,
    ingredients,
    seasoning,
    steps,
    nutrition,
    tcm,
    tags,
    suitable,
    contra,
    memberTips,
  };
}

function canto(
  name,
  desc,
  ingredients,
  seasoning,
  steps,
  nutrition,
  tcm,
  tags,
  contra,
  memberTips = {},
) {
  return {
    name,
    desc,
    ingredients,
    seasoning,
    steps,
    nutrition,
    tcm,
    tags,
    suitable: ALL_MEMBERS,
    contra,
    memberTips,
  };
}

const DAY_LABELS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const MONTH_START = new Date(2026, 9, 26);
const CANTO_SCALE = 2;

function dateLabel(index) {
  const date = new Date(MONTH_START);
  date.setDate(MONTH_START.getDate() + index);
  return `${date.getMonth() + 1}.${date.getDate()}`;
}

const GRAINS = [
  { name: "苦荞", grams: 35 },
  { name: "小米", grams: 40 },
  { name: "燕麦", grams: 35 },
  { name: "薏仁", grams: 30 },
  { name: "糙米", grams: 50 },
  { name: "黑豆", grams: 25 },
  { name: "藜麦", grams: 35 },
];

const ROOTS = [
  { name: "山药", grams: 60 },
  { name: "百合", grams: 20 },
  { name: "茯苓", grams: 10 },
  { name: "南瓜", grams: 70 },
];

const BP_BASES = [
  { name: "鸡蛋", grams: 55, ingredientName: "鸡蛋", method: "早餐蒸蛋", prep: "蛋液打散，加1.2倍温水" },
  { name: "豆腐", grams: 100, ingredientName: "嫩豆腐", method: "晨蒸豆腐", prep: "豆腐切块" },
  { name: "鸡丝", grams: 60, ingredientName: "鸡胸肉", method: "早餐拌鸡丝", prep: "鸡胸煮熟后撕成细丝" },
  { name: "虾仁", grams: 50, ingredientName: "虾仁", method: "晨蒸虾仁", prep: "虾仁去虾线" },
  { name: "瘦肉丝", grams: 50, ingredientName: "瘦猪肉", method: "早餐炒瘦肉丝", prep: "瘦肉切成细丝" },
  { name: "鹌鹑蛋", grams: 40, ingredientName: "鹌鹑蛋", method: "晨煮鹌鹑蛋", prep: "鹌鹑蛋洗净带壳煮熟" },
  { name: "鱼片", grams: 60, ingredientName: "白鱼片", method: "晨蒸鱼片", prep: "鱼片用姜丝稍腌" },
];

const BP_FLAVORS = [
  { name: "原味", grams: 0 },
  { name: "枸杞", grams: 5 },
  { name: "姜丝", grams: 5 },
  { name: "菌菇", grams: 30 },
];

const LP_MAINS = [
  { name: "鸡胸", grams: 100, ingredientName: "鸡胸肉", prep: "切薄片" },
  { name: "瘦牛肉", grams: 80, ingredientName: "瘦牛肉", prep: "切薄片" },
  { name: "鲈鱼", grams: 100, ingredientName: "鲈鱼", prep: "切块" },
  { name: "虾仁", grams: 70, ingredientName: "虾仁", prep: "去虾线" },
  { name: "豆腐", grams: 120, ingredientName: "嫩豆腐", prep: "切块" },
  { name: "鸡腿肉", grams: 90, ingredientName: "鸡腿肉", prep: "去皮切丁" },
  { name: "瘦猪肉", grams: 70, ingredientName: "瘦猪肉", prep: "切丝" },
];

const LP_METHODS = [
  {
    name: "番茄烩",
    oil: 3,
    salt: 1,
    extras: [familyIng("番茄", 100), familyIng("菌菇", 40)],
    action: "番茄切块炒出汁，放入主料和菌菇，小火焖熟。",
  },
  {
    name: "菌菇蒸",
    oil: 2,
    salt: 1,
    extras: [familyIng("菌菇", 50)],
    action: "主料与菌菇同盘，水开上锅蒸熟。",
  },
  {
    name: "酸汤煮",
    oil: 3,
    salt: 1,
    extras: [familyIng("番茄", 80), familyIng("菌菇", 30)],
    action: "番茄与菌菇加水煮成清酸汤，放入主料煮熟。",
  },
  {
    name: "糟辣椒炒",
    oil: 3,
    salt: 0.5,
    extras: [seasoningIng("糟辣椒", 5), seasoningIng("蒜", 3)],
    action: "热锅放油，下蒜末和少量糟辣椒爆香，再放入主料炒熟。",
  },
];

const LV_MAINS = [
  { name: "莴笋", grams: 180 },
  { name: "西兰花", grams: 160 },
  { name: "芦笋", grams: 150 },
  { name: "豌豆苗", grams: 150 },
  { name: "木耳菜", grams: 160 },
  { name: "青椒", grams: 120 },
  { name: "莲藕", grams: 150 },
];

const LV_METHODS = [
  { name: "清炒", oil: 3, salt: 1, extra: [], action: "热锅放油，下蔬菜大火快炒。" },
  { name: "蒜蓉", oil: 3, salt: 0.8, extra: [seasoningIng("蒜", 5)], action: "热锅放油，先下蒜末爆香，再放蔬菜快炒。" },
  { name: "白灼", oil: 2, salt: 0.5, extra: [seasoningIng("低盐豉油", 3)], action: "水开加少量油，放入蔬菜焯熟，捞出淋低盐豉油。" },
  { name: "凉拌", oil: 2, salt: 0.5, extra: [seasoningIng("香醋", 4), seasoningIng("蒜", 3)], action: "蔬菜焯水后过温水，加香醋和蒜末拌匀。" },
];

const LG_GRAINS = [
  { name: "糙米", grams: 50 },
  { name: "黑豆", grams: 50 },
  { name: "薏仁", grams: 45 },
  { name: "藜麦", grams: 40 },
  { name: "苦荞", grams: 40 },
  { name: "小米", grams: 45 },
  { name: "燕麦", grams: 40 },
];

const LG_LEGUMES = [
  { name: "杂豆", grams: 20 },
  { name: "鹰嘴豆", grams: 20 },
  { name: "白芸豆", grams: 20 },
  { name: "红豆", grams: 20 },
];

const DS_MAINS = [
  { name: "冬瓜", grams: 200 },
  { name: "竹荪", grams: 8 },
  { name: "山药", grams: 100 },
  { name: "葛根", grams: 20 },
  { name: "茯苓", grams: 15 },
  { name: "薏仁", grams: 25 },
  { name: "莲藕", grams: 120 },
];

const DS_PROTEINS = [
  { name: "排骨", grams: 80, type: "肉" },
  { name: "鸡肉", grams: 80, type: "肉" },
  { name: "豆腐", grams: 100, type: "豆" },
  { name: "虾仁", grams: 50, type: "海鲜" },
];

const DM_MAINS = [
  { name: "鲈鱼", grams: 120, ingredientName: "鲈鱼" },
  { name: "鸡胸", grams: 100, ingredientName: "鸡胸肉" },
  { name: "豆腐", grams: 130, ingredientName: "嫩豆腐" },
  { name: "白鱼", grams: 100, ingredientName: "白鱼" },
  { name: "虾仁", grams: 80, ingredientName: "虾仁" },
  { name: "瘦牛肉", grams: 80, ingredientName: "瘦牛肉" },
  { name: "鸭胸", grams: 80, ingredientName: "鸭胸肉" },
];

const DM_METHODS = [
  { name: "清蒸", oil: 2, salt: 0.8, extra: [], action: "主料铺姜丝，水开上锅蒸熟。" },
  { name: "姜香蒸", oil: 2, salt: 0.8, extra: [seasoningIng("姜", 4)], action: "主料铺姜丝，蒸熟后淋少量热油。" },
  { name: "蒜蓉蒸", oil: 2, salt: 0.8, extra: [seasoningIng("蒜", 5)], action: "主料铺蒜蓉，蒸熟后淋少量豉油。" },
  { name: "酸汤", oil: 3, salt: 1, extra: [familyIng("番茄", 80)], action: "番茄熬成酸汤，放入主料煮熟。" },
];

const CANTONESE_DEFS = [
  canto(
    "粤式白切鸡",
    "三浸三提，皮爽肉滑。",
    [ing("清远鸡", 500), ing("姜", 8), ing("葱", 10)],
    [ing("盐", 2), ing("花生油", 3), ing("低盐豉油", 3)],
    [
      "整鸡冷水下锅，水开后转小火，提起再浸入，重复三次。",
      "保持水面微沸，浸约18分钟至筷子插入无血水。",
      "捞出过冰水，斩件，配姜葱蓉和少量豉油。",
    ],
    "鸡肉低脂高蛋白，去皮后脂肪更少；姜葱蓉减少豉油依赖。",
    "鸡肉温中益气，生姜温中散寒。",
    ["粤菜", "优质蛋白", "低脂"],
    "痛风急性期控制鸡肉总量；高血压者少蘸豉油。",
  ),
  canto(
    "粤式清蒸鲈鱼",
    "火候轻，鱼肉细嫩。",
    [ing("鲈鱼", 450), ing("姜", 6), ing("葱", 8)],
    [ing("低盐豉油", 5), ing("花生油", 4), ing("盐", 0.5)],
    [
      "鲈鱼洗净，两面划刀，铺姜片。",
      "水开后上锅大火蒸8分钟，关火再虚蒸2分钟。",
      "倒去腥水，铺葱丝，淋热油和少量豉油。",
    ],
    "鲈鱼低脂高蛋白，含DHA和EPA，蒸制减少用油。",
    "鲈鱼补肝肾、益脾胃。",
    ["粤菜", "优质蛋白", "低脂"],
    "痛风急性期控制鱼类总量；豉油减量。",
  ),
  canto(
    "粤式蒜蓉蒸虾",
    "蒜香清鲜，虾肉弹嫩。",
    [ing("鲜虾", 350), ing("蒜", 12), ing("姜", 4)],
    [ing("低盐豉油", 4), ing("花生油", 3)],
    [
      "鲜虾开背去虾线，洗净沥干。",
      "蒜末炒香后铺在虾上，水开蒸5分钟。",
      "淋少量豉油和热油，撒葱花。",
    ],
    "虾仁高蛋白低脂肪，蒜香可减少盐。",
    "虾仁补肾温阳，蒜可温中。",
    ["粤菜", "优质蛋白", "低脂"],
    "虾过敏者禁用；痛风急性期控制虾类。",
  ),
  canto(
    "粤式豉汁蒸排骨",
    "豉香轻咸，肉质软嫩。",
    [ing("瘦排骨", 300), ing("豆豉", 6), ing("姜", 4), ing("蒜", 5)],
    [ing("低盐豉油", 4), ing("淀粉", 4), ing("花生油", 3)],
    [
      "排骨斩小块，浸泡去血水。",
      "豆豉、姜蒜与排骨拌匀，加少量淀粉抓匀。",
      "水开蒸20分钟至熟。",
    ],
    "瘦排骨提供蛋白和铁，豆豉少量提味，控制用盐。",
    "排骨益精补血，豆豉少量和中。",
    ["粤菜", "优质蛋白", "补铁"],
    "高尿酸者少食排骨；高血压者豆豉减量。",
  ),
  canto(
    "粤式荷塘小炒",
    "脆嫩清爽，色彩分明。",
    [ing("莲藕", 120), ing("荷兰豆", 80), ing("木耳", 8), ing("胡萝卜", 50)],
    [ing("花生油", 4), ing("盐", 1), ing("蒜", 4)],
    [
      "莲藕、胡萝卜切片，荷兰豆撕去老筋，木耳泡发。",
      "蔬菜分别焯水后捞出。",
      "热锅少油爆香蒜末，下蔬菜快炒，少盐调味。",
    ],
    "莲藕和荷兰豆高纤维低热量，木耳提供可溶性纤维。",
    "莲藕养血生津，木耳润燥。",
    ["粤菜", "高纤维", "低热量"],
    "脾胃虚寒者少油、趁热吃。",
  ),
  canto(
    "粤式白灼菜心",
    "碧绿脆嫩，豉油轻淋。",
    [ing("菜心", 350), ing("姜", 3), ing("葱", 3)],
    [ing("低盐豉油", 5), ing("花生油", 4)],
    [
      "菜心洗净，去老叶。",
      "水开加少量油，放入菜心焯至刚熟。",
      "捞出摆盘，淋少量豉油和热油。",
    ],
    "菜心高钾低热量，白灼少油，保留脆嫩。",
    "菜心清热生津。",
    ["粤菜", "高钾", "低热量"],
    "肾结石倾向者先焯水，豉油减量。",
  ),
  canto(
    "粤式冬瓜薏米老鸭汤",
    "汤清不腻，利水清润。",
    [ing("老鸭", 350), ing("冬瓜", 250), ing("薏米", 25), ing("姜", 5)],
    [ing("盐", 1.5), ing("白胡椒", 0.5)],
    [
      "老鸭斩块焯水去浮油，薏米提前泡。",
      "所有材料加清水炖1小时。",
      "加冬瓜再炖15分钟，少盐调味。",
    ],
    "冬瓜和薏米高钾低脂，鸭肉去皮后脂肪降低。",
    "冬瓜利水消肿，薏米健脾利湿，老鸭滋阴。",
    ["粤菜", "低脂", "高钾"],
    "高尿酸者少喝汤，多食冬瓜；虚寒便溏者薏米减量。",
  ),
  canto(
    "粤式蒸水蛋",
    "嫩滑如镜，少盐鲜香。",
    [ing("鸡蛋", 180), ing("温水", 220)],
    [ing("低盐豉油", 4), ing("香油", 2)],
    [
      "鸡蛋打散，加约1.2倍温水搅匀。",
      "过筛后覆保鲜膜，水开小火蒸10分钟。",
      "淋少量豉油和香油。",
    ],
    "鸡蛋优质蛋白，蒸制不用油，适合早餐和晚餐。",
    "鸡蛋养血润燥。",
    ["粤菜", "优质蛋白", "低脂"],
    "高胆固醇者鸡蛋适量；豉油减量。",
  ),
  canto(
    "粤式罗汉斋",
    "菌蔬同烩，清鲜不寡。",
    [ing("木耳", 10), ing("香菇", 30), ing("腐竹", 25), ing("胡萝卜", 60), ing("娃娃菜", 120)],
    [ing("花生油", 5), ing("盐", 1), ing("低盐豉油", 4)],
    [
      "木耳、香菇、腐竹分别泡发。",
      "热锅少油，先下香菇和胡萝卜炒香。",
      "加入其他蔬菜烩熟，少盐调味。",
    ],
    "菌菇和豆制品提供纤维与植物蛋白，蔬菜多钾。",
    "香菇健脾，木耳润燥，腐竹和中。",
    ["粤菜", "高纤维", "植物蛋白"],
    "慢性肾病患者按医嘱控制豆制品量。",
  ),
  canto(
    "粤式虾仁炒芦笋",
    "虾鲜笋嫩，清爽少油。",
    [ing("虾仁", 150), ing("芦笋", 220), ing("姜", 4)],
    [ing("花生油", 4), ing("盐", 1), ing("低盐豉油", 3)],
    [
      "虾仁去虾线，芦笋切段。",
      "芦笋焯水，热锅少油炒香姜片。",
      "下虾仁和芦笋快炒，少盐调味。",
    ],
    "虾仁高蛋白低脂肪，芦笋高钾低热量。",
    "虾仁补肾温阳，芦笋养阴润燥。",
    ["粤菜", "优质蛋白", "高钾"],
    "虾过敏者禁用；痛风急性期控制虾类。",
  ),
  canto(
    "粤式香菇滑鸡",
    "鸡肉滑嫩，菇香柔和。",
    [ing("去皮鸡腿肉", 250), ing("香菇", 40), ing("姜", 5), ing("葱", 5)],
    [ing("低盐豉油", 5), ing("淀粉", 4), ing("花生油", 3)],
    [
      "鸡腿肉去皮切块，用姜、少量豉油和淀粉抓匀。",
      "香菇泡发切块，与鸡块拌匀。",
      "水开蒸15分钟至熟。",
    ],
    "去皮鸡肉低脂高蛋白，香菇提鲜，减少盐。",
    "鸡肉温中益气，香菇健脾。",
    ["粤菜", "优质蛋白", "低脂"],
    "痛风急性期控制菌菇和鸡肉总量。",
  ),
  canto(
    "粤式芥蓝炒牛肉",
    "牛肉嫩滑，芥蓝爽脆。",
    [ing("瘦牛肉", 120), ing("芥蓝", 220), ing("姜", 4)],
    [ing("花生油", 5), ing("低盐豉油", 5), ing("淀粉", 3)],
    [
      "牛肉切薄片，用少量豉油和淀粉抓匀。",
      "芥蓝焯水，热锅少油炒牛肉至变色。",
      "加入芥蓝快炒，少盐调味。",
    ],
    "瘦牛肉补铁补蛋白，芥蓝高钾高纤维。",
    "牛肉补脾胃、益气血，芥蓝清热。",
    ["粤菜", "优质蛋白", "补铁"],
    "痛风急性期控制牛肉总量；少油。",
  ),
  canto(
    "粤式番茄牛肉滑蛋",
    "酸甜嫩滑，蛋白充足。",
    [ing("瘦牛肉", 100), ing("鸡蛋", 100), ing("番茄", 180), ing("葱", 4)],
    [ing("花生油", 5), ing("盐", 1), ing("低盐豉油", 3)],
    [
      "牛肉切薄片，用少量豉油和淀粉抓匀。",
      "鸡蛋打散，番茄切块。",
      "热锅少油，先炒牛肉，再下番茄和蛋液滑熟。",
    ],
    "牛肉和鸡蛋提供优质蛋白，番茄含钾和番茄红素。",
    "牛肉补脾胃，鸡蛋养血，番茄生津。",
    ["粤菜", "优质蛋白", "DASH"],
    "高胆固醇者鸡蛋适量；少油。",
  ),
  canto(
    "粤式清蒸豆腐",
    "细嫩清鲜，豆香本味。",
    [ing("嫩豆腐", 350), ing("葱", 6), ing("姜", 4)],
    [ing("低盐豉油", 6), ing("香油", 3)],
    [
      "豆腐切块，铺姜丝。",
      "水开蒸6分钟。",
      "倒去汁水，铺葱花，淋少量豉油和香油。",
    ],
    "豆腐植物蛋白丰富，低脂低热量。",
    "豆腐清热润燥。",
    ["粤菜", "植物蛋白", "低脂"],
    "慢性肾病患者按医嘱控制豆制品量。",
  ),
  canto(
    "粤式蒜蓉粉丝蒸娃娃菜",
    "蒜香清甜，粉丝吸汁。",
    [ing("娃娃菜", 280), ing("粉丝", 25), ing("蒜", 10)],
    [ing("低盐豉油", 5), ing("花生油", 4)],
    [
      "娃娃菜切瓣，粉丝泡软。",
      "蒜末炒香，与粉丝和娃娃菜拌匀。",
      "水开蒸8分钟，淋少量豉油。",
    ],
    "娃娃菜高钾低热量，粉丝适量控制主食。",
    "娃娃菜养胃，蒜温中。",
    ["粤菜", "高钾", "低热量"],
    "糖尿病老人控制粉丝量，当作部分主食。",
  ),
  canto(
    "粤式玉米胡萝卜猪骨汤",
    "汤色清亮，甘甜少盐。",
    [ing("猪骨", 300), ing("玉米", 180), ing("胡萝卜", 120), ing("姜", 5)],
    [ing("盐", 1.5)],
    [
      "猪骨焯水去浮沫。",
      "玉米切段，胡萝卜切块，与猪骨同炖1小时。",
      "少盐调味。",
    ],
    "玉米和胡萝卜提供钾与胡萝卜素，猪骨汤去油后脂肪降低。",
    "玉米健脾和中，胡萝卜养肝明目。",
    ["粤菜", "低脂", "高钾"],
    "高尿酸者少喝汤，多食玉米胡萝卜。",
  ),
  canto(
    "粤式凉瓜黄豆排骨汤",
    "微苦回甘，清热不腻。",
    [ing("凉瓜", 180), ing("黄豆", 30), ing("瘦排骨", 220), ing("姜", 5)],
    [ing("盐", 1.5)],
    [
      "排骨焯水去浮油，黄豆提前泡。",
      "所有材料加清水炖1小时。",
      "少盐调味，趁热食用。",
    ],
    "凉瓜低热量，黄豆提供植物蛋白，排骨去油后脂肪可控。",
    "凉瓜清热，黄豆健脾，排骨益精。",
    ["粤菜", "植物蛋白", "低热量"],
    "脾胃虚寒者少量，趁热；高尿酸者少喝汤。",
  ),
  canto(
    "粤式清蒸马蹄肉饼",
    "肉饼嫩滑，马蹄脆甜。",
    [ing("瘦猪肉", 180), ing("马蹄", 60), ing("姜", 4)],
    [ing("低盐豉油", 5), ing("淀粉", 4), ing("香油", 2)],
    [
      "猪肉剁碎，马蹄切小粒。",
      "肉末、马蹄、姜末和淀粉拌匀，压成饼。",
      "水开蒸15分钟，淋少量豉油。",
    ],
    "瘦猪肉提供蛋白和铁，马蹄清脆低脂。",
    "猪肉益精补血，马蹄清热生津。",
    ["粤菜", "优质蛋白", "低脂"],
    "高尿酸者少食猪肉；高血压者少蘸豉油。",
  ),
  canto(
    "粤式西洋菜陈肾汤",
    "汤味清润，西洋菜嫩。",
    [ing("西洋菜", 250), ing("陈肾", 30), ing("瘦排骨", 150), ing("姜", 5)],
    [ing("盐", 1.5)],
    [
      "排骨焯水，陈肾切片略泡。",
      "排骨、陈肾和姜片加清水炖50分钟。",
      "放入西洋菜再煮8分钟，少盐调味。",
    ],
    "西洋菜高钾低热量，汤去浮油后脂肪较低。",
    "西洋菜清热润肺。",
    ["粤菜", "高钾", "低热量"],
    "陈肾盐分较高，高血压者少量并减盐。",
  ),
  canto(
    "粤式白灼虾",
    "虾肉清甜，原味鲜嫩。",
    [ing("鲜虾", 400), ing("姜", 6), ing("葱", 6)],
    [ing("低盐豉油", 5), ing("花生油", 2)],
    [
      "鲜虾洗净，挑去虾线。",
      "水开加姜葱，放入虾煮至变红。",
      "捞出过温水，配少量豉油。",
    ],
    "虾仁高蛋白低脂肪，白灼少油。",
    "虾仁补肾温阳。",
    ["粤菜", "优质蛋白", "低脂"],
    "虾过敏者禁用；痛风急性期控制虾类。",
  ),
  canto(
    "粤式芋头蒸排骨",
    "芋头绵糯，排骨鲜香。",
    [ing("瘦排骨", 260), ing("芋头", 180), ing("姜", 5)],
    [ing("低盐豉油", 5), ing("淀粉", 4), ing("花生油", 3)],
    [
      "排骨斩块泡去血水，用豉油、姜和淀粉抓匀。",
      "芋头切块垫底，铺上排骨。",
      "水开蒸25分钟。",
    ],
    "芋头升糖较米饭慢，排骨补蛋白；蒸制少油。",
    "芋头健脾益气，排骨益精。",
    ["粤菜", "优质蛋白", "低GI"],
    "糖尿病老人芋头控制在半碗内，替代部分主食。",
  ),
  canto(
    "粤式清炒芥兰苗",
    "细嫩碧绿，蒜香轻快。",
    [ing("芥兰苗", 320), ing("蒜", 6)],
    [ing("花生油", 4), ing("盐", 1)],
    [
      "芥兰苗洗净。",
      "热锅少油爆香蒜末。",
      "下芥兰苗快炒至刚熟，少盐调味。",
    ],
    "芥兰苗高钾高纤维，低热量。",
    "芥兰清热利咽。",
    ["粤菜", "高钾", "低热量"],
    "脾胃虚寒者少油、趁热吃。",
  ),
  canto(
    "粤式菜干猪骨汤",
    "菜干香润，汤清味厚。",
    [ing("菜干", 30), ing("猪骨", 280), ing("姜", 6)],
    [ing("盐", 1.5)],
    [
      "菜干泡发洗净，猪骨焯水。",
      "所有材料加清水炖1小时。",
      "少盐调味。",
    ],
    "菜干提供纤维和钾，猪骨汤去油后脂肪较低。",
    "菜干清热润燥。",
    ["粤菜", "高钾", "低脂"],
    "菜干有盐分，高血压者少盐并先浸泡。",
  ),
  canto(
    "粤式霸王花猪骨汤",
    "清润甘淡，汤不油腻。",
    [ing("霸王花", 20), ing("猪骨", 280), ing("姜", 6)],
    [ing("盐", 1.5)],
    [
      "霸王花泡发，猪骨焯水。",
      "所有材料加清水炖1小时。",
      "少盐调味。",
    ],
    "霸王花提供膳食纤维，猪骨汤去浮油后脂肪降低。",
    "霸王花清热润肺。",
    ["粤菜", "高纤维", "低脂"],
    "高尿酸者少喝汤；脾虚便溏者少量。",
  ),
  canto(
    "粤式姜汁撞奶",
    "温润嫩滑，姜香柔和。",
    [ing("低脂牛奶", 250), ing("姜汁", 12)],
    [ing("代糖或极少糖", 2)],
    [
      "牛奶小火加热至约70度，不必煮沸。",
      "姜汁放入碗中，冲入热奶，静置凝固。",
      "糖尿病老人可少糖或不加糖。",
    ],
    "低脂奶提供钙和蛋白，姜汁带来温感，少糖更健康。",
    "牛奶润燥，生姜温中散寒。",
    ["粤菜", "优质蛋白", "温补"],
    "乳糖不耐受者改用无乳糖奶；糖尿病不加糖。",
  ),
  canto(
    "粤式豉油皇蒸鱼",
    "豉香提鲜，鱼肉细嫩。",
    [ing("白鱼", 420), ing("姜", 6), ing("葱", 8)],
    [ing("低盐豉油", 6), ing("花生油", 4)],
    [
      "白鱼洗净，铺姜片。",
      "水开蒸9分钟。",
      "倒去腥水，铺葱丝，淋热油和少量豉油。",
    ],
    "白鱼低脂高蛋白，蒸制少油，豉油控制盐。",
    "鱼肉健脾，生姜温中。",
    ["粤菜", "优质蛋白", "低脂"],
    "高血压者少蘸豉油；痛风急性期控制鱼类。",
  ),
  canto(
    "粤式罗汉上素",
    "菌菇腐竹，素而不淡。",
    [ing("香菇", 35), ing("木耳", 10), ing("腐竹", 30), ing("胡萝卜", 70), ing("西兰花", 120)],
    [ing("花生油", 5), ing("低盐豉油", 5), ing("盐", 1)],
    [
      "香菇、木耳、腐竹分别泡发。",
      "胡萝卜切片，西兰花切小朵焯水。",
      "热锅少油炒香菌菇，加入其他食材烩熟，少盐调味。",
    ],
    "菌菇和豆制品提供纤维与植物蛋白，西兰花高钾。",
    "香菇健脾，木耳润燥，西兰花健脾和胃。",
    ["粤菜", "高纤维", "植物蛋白"],
    "慢性肾病患者按医嘱控制豆制品量。",
  ),
  canto(
    "粤式南瓜蒸排骨",
    "南瓜清甜，排骨软嫩。",
    [ing("瘦排骨", 260), ing("南瓜", 180), ing("姜", 5)],
    [ing("低盐豉油", 5), ing("淀粉", 4), ing("花生油", 3)],
    [
      "排骨泡去血水，用豉油、姜和淀粉抓匀。",
      "南瓜切块垫底，铺上排骨。",
      "水开蒸25分钟。",
    ],
    "南瓜高钾、含胡萝卜素，控制份量可替代部分主食；排骨补蛋白。",
    "南瓜补中益气，排骨益精。",
    ["粤菜", "优质蛋白", "高钾"],
    "糖尿病老人南瓜控制在约80克。",
  ),
];

function makeBreakfastStaple(index) {
  const grain = GRAINS[index % GRAINS.length];
  const root = ROOTS[Math.floor(index / GRAINS.length) % ROOTS.length];
  const style = index < 14 ? "粥" : "糊";
  const name = `${grain.name}${root.name}${style}`;
  const ingredients = [familyIng(grain.name, grain.grams), familyIng(root.name, root.grams), ing("清水", 1120, false)];
  const steps = [
    `${grain.name}和${root.name}分别洗净，${grain.name}提前浸泡20分钟。`,
    `锅中加入清水，放入${grain.name}和${root.name}，大火煮开后转小火。`,
    style === "粥"
      ? "煮约25分钟，期间搅拌防粘，至米粒软烂即可，不加糖。"
      : "煮约18分钟后打成糊，回锅再煮2分钟，不加糖。",
  ];
  return dish(
    `b-staple-${index + 1}`,
    name,
    "低GI早餐主食",
    "主食",
    "软糯温润，不加糖，先控早餐升糖。",
    ingredients,
    [],
    steps,
    `${grain.name}提供慢碳水，${root.name}增加膳食纤维和钾，适合早餐平稳血糖。`,
    `${grain.name}健脾消积，${root.name}补脾养胃。`,
    ["低GI", "高纤维", "药食同源"],
    ALL_MEMBERS,
    "糖尿病不加糖，老人煮软并小口慢食。",
  );
}

function makeBreakfastSide(index) {
  const base = BP_BASES[index % BP_BASES.length];
  const flavor = BP_FLAVORS[Math.floor(index / BP_BASES.length) % BP_FLAVORS.length];
  const name = flavor.grams > 0 ? `${base.method}·${flavor.name}` : base.method;
  const ingredients = [familyIng(base.ingredientName, base.grams)];
  if (flavor.grams > 0) ingredients.push(familyIng(flavor.name, flavor.grams));
  const seasoning = [seasoningIng("盐", 0.5), seasoningIng("香油", 1)];
  const steps = [
    `${base.prep}。`,
    flavor.grams > 0 ? `加入${flavor.name}，继续蒸或拌至熟。` : "上锅蒸熟或煮熟。",
    "起锅前少盐调味，不额外加糖。",
  ];
  return dish(
    `b-side-${index + 1}`,
    name,
    "早餐优质蛋白",
    "蛋白",
    "一份温和蛋白，搭配主食和蔬菜。",
    ingredients,
    seasoning,
    steps,
    `${base.ingredientName}提供优质蛋白，${flavor.grams > 0 ? `${flavor.name}少量提味` : "原味低盐"}，适合早餐。`,
    `${base.name}养血益气，${flavor.name === "姜丝" ? "生姜温中散寒" : "调味温和"}。`,
    ["优质蛋白", "低盐"],
    ALL_MEMBERS,
    "高血压者少盐；高胆固醇者鸡蛋适量。",
  );
}

function makeLunchProtein(index) {
  const main = LP_MAINS[index % LP_MAINS.length];
  const method = LP_METHODS[Math.floor(index / LP_MAINS.length) % LP_METHODS.length];
  const name = `${method.name}${main.name}`;
  const ingredients = [familyIng(main.ingredientName, main.grams), ...method.extras];
  const seasoning = [seasoningIng("盐", method.salt), seasoningIng("植物油", method.oil), seasoningIng("姜", 3)];
  const steps = [
    `${main.ingredientName}${main.prep}，用少许姜丝和低盐豉油腌5分钟。`,
    method.action,
    "起锅前按量加盐，不额外勾芡或加糖。",
  ];
  return dish(
    `l-protein-${index + 1}`,
    name,
    "午餐优质蛋白",
    "蛋白",
    "贵州酸辣鲜香改良，低盐低油。",
    ingredients,
    seasoning,
    steps,
    `${main.name}提供优质蛋白，${method.name}以番茄或菌菇提鲜，减少盐和油。`,
    `${main.name === "豆腐" ? "豆腐清热润燥" : `${main.name}补益气血`}，${method.name === "糟辣椒炒" ? "少量糟辣椒开胃" : "温和健脾"}。`,
    ["优质蛋白", "低脂", "DASH"],
    ALL_MEMBERS,
    "高血压者控制糟辣椒和盐；痛风急性期按医嘱控制蛋白总量。",
  );
}

function makeLunchVeg(index) {
  const main = LV_MAINS[index % LV_MAINS.length];
  const method = LV_METHODS[Math.floor(index / LV_MAINS.length) % LV_METHODS.length];
  const name = `${method.name}${main.name}`;
  const ingredients = [familyIng(main.name, main.grams), ...method.extra];
  const seasoning = [seasoningIng("盐", method.salt), seasoningIng("植物油", method.oil)];
  const steps = [method.action, `${main.name}炒至断生，保持脆嫩。`, "起锅前少盐调味。"];
  return dish(
    `l-veg-${index + 1}`,
    name,
    "高钾蔬菜",
    "蔬菜",
    "午餐蔬菜盘，先吃蔬菜再吃主食。",
    ingredients,
    seasoning,
    steps,
    `${main.name}高钾低热量，${method.name}方式控制油盐。`,
    `${main.name}清热或养胃，搭配午餐蛋白质更均衡。`,
    ["高钾", "低热量", "高纤维"],
    ALL_MEMBERS,
    "脾胃虚寒者少油、趁热吃。",
  );
}

function makeLunchStaple(index) {
  const grain = LG_GRAINS[index % LG_GRAINS.length];
  const legume = LG_LEGUMES[Math.floor(index / LG_GRAINS.length) % LG_LEGUMES.length];
  const name = `${grain.name}${legume.name}饭`;
  const ingredients = [familyIng(grain.name, grain.grams), familyIng(legume.name, legume.grams), ing("清水", 560, false)];
  const steps = [
    `${grain.name}和${legume.name}提前浸泡，洗净。`,
    "按米水比例加水，电饭煲或砂锅煮至软烂。",
    "关火焖5分钟，不额外加盐。",
  ];
  return dish(
    `l-staple-${index + 1}`,
    name,
    "低GI主食",
    "主食",
    "杂粮配豆，升糖更慢。",
    ingredients,
    [],
    steps,
    `${grain.name}和${legume.name}增加膳食纤维与植物蛋白，降低餐后血糖波动。`,
    `${grain.name}补中益气，${legume.name}健脾利湿。`,
    ["低GI", "高纤维", "植物蛋白"],
    ALL_MEMBERS,
    "老人少量并煮软；消化弱者可减少豆类比例。",
  );
}

function makeDinnerSoup(index) {
  const main = DS_MAINS[index % DS_MAINS.length];
  const protein = DS_PROTEINS[Math.floor(index / DS_MAINS.length) % DS_PROTEINS.length];
  const name = `${main.name}${protein.name}汤`;
  const ingredients = [familyIng(main.name, main.grams), familyIng(protein.name, protein.grams), seasoningIng("姜", 3), ing("清水", 2000, false)];
  const seasoning = [seasoningIng("盐", 1)];
  const steps = [
    `${protein.name}焯水去浮油，${main.name}洗净切块。`,
    "锅中加清水，放入姜片和全部材料，大火煮开后转小火。",
    "炖30至45分钟，起锅前少盐调味。",
  ];
  return dish(
    `d-soup-${index + 1}`,
    name,
    "晚餐低盐汤品",
    "汤品",
    "汤清不腻，先吃汤中蔬菜和蛋白。",
    ingredients,
    seasoning,
    steps,
    `${main.name}提供钾和纤维，${protein.name}提供优质蛋白，汤去浮油后脂肪较低。`,
    `${main.name}健脾利湿，${protein.name === "豆腐" ? "豆腐清热" : `${protein.name}补益`}。`,
    ["低盐", "高钾", "药食同源"],
    ALL_MEMBERS,
    "高尿酸者少喝汤，多食汤中食材；高血压者少盐。",
  );
}

function makeDinnerMain(index) {
  const main = DM_MAINS[index % DM_MAINS.length];
  const method = DM_METHODS[Math.floor(index / DM_MAINS.length) % DM_METHODS.length];
  const name = `${method.name}${main.name}`;
  const ingredients = [familyIng(main.ingredientName, main.grams), ...method.extra];
  const seasoning = [seasoningIng("盐", method.salt), seasoningIng("植物油", method.oil)];
  const steps = [
    `${main.ingredientName}处理干净，用姜丝稍腌。`,
    method.action,
    "出锅前少盐调味，不额外勾芡。",
  ];
  return dish(
    `d-main-${index + 1}`,
    name,
    "晚餐优质蛋白",
    "蛋白",
    "蒸煮为主，晚餐清淡。",
    ingredients,
    seasoning,
    steps,
    `${main.name}提供优质蛋白，${method.name}减少煎炸，控制晚餐脂肪。`,
    `${main.name === "豆腐" ? "豆腐清热润燥" : `${main.name}补益`}，${method.name === "姜香蒸" ? "生姜温中" : "蒸煮温和"}。`,
    ["优质蛋白", "低脂", "低盐"],
    ALL_MEMBERS,
    "痛风急性期控制蛋白质总量；高血压者少蘸豉油。",
  );
}

function makeSummary(index, lunchProtein, dinnerMain, cantoName) {
  return `${DAY_LABELS[index % 7]}以${lunchProtein}和${dinnerMain}为主，晚餐加一道${cantoName}，整体低盐低油、主食低GI。`;
}

const DAYS = [];
for (let i = 0; i < 28; i += 1) {
  const week = Math.floor(i / 7);
  const bStaple = makeBreakfastStaple(i);
  const bSide = makeBreakfastSide(i);
  const lProtein = makeLunchProtein(i);
  const lVeg = makeLunchVeg(i);
  const lStaple = makeLunchStaple(i);
  const dSoup = makeDinnerSoup(i);
  const dMain = makeDinnerMain(i);
  const cantoDef = CANTONESE_DEFS[i];
  const cantoDish = {
    ...cantoDef,
    id: `canto-${i + 1}`,
    sub: "粤菜大师菜",
    category: "粤菜",
    ingredients: cantoDef.ingredients.map((item) =>
      item.name === "温水"
        ? item
        : { ...item, grams: Math.round(item.grams * CANTO_SCALE) },
    ),
  };

  DAYS.push({
    id: `day-${i + 1}`,
    week,
    label: DAY_LABELS[i % 7],
    date: dateLabel(i),
    summary: makeSummary(i, lProtein.name, dMain.name, cantoDish.name),
    meals: [
      {
        id: "breakfast",
        label: "早餐",
        time: week >= 2 ? "08:10" : "07:20",
        dishes: [bStaple, bSide],
      },
      {
        id: "lunch",
        label: "午餐",
        time: "12:10",
        dishes: [lProtein, lVeg, lStaple],
      },
      {
        id: "dinner",
        label: "晚餐",
        time: "18:30",
        dishes: [dSoup, dMain, cantoDish],
      },
    ],
  });
}

const WEEKS = [0, 1, 2, 3].map((week) => {
  const days = DAYS.filter((day) => day.week === week);
  return {
    id: week,
    label: `第${week + 1}周`,
    range: `${days[0].date} - ${days[days.length - 1].date}`,
  };
});

const HERBS = [
  {
    name: "茯苓",
    use: "健脾渗湿、宁心。可入汤、饼或米糊。",
    avoid: "阴虚火旺、虚寒滑精者不宜长期大量用。",
  },
  {
    name: "山药",
    use: "补脾养胃、生津益肺。蒸、煮、入粥或做饼。",
    avoid: "湿盛中满、积食明显者不宜一次大量。",
  },
  {
    name: "葛根",
    use: "生津、升清阳。少量入糊、羹或汤。",
    avoid: "低血压者少量；胃寒者不宜过凉食用。",
  },
  {
    name: "生姜",
    use: "温中止呕、散寒。蒸鱼、炒菜、姜枣茶均可。",
    avoid: "阴虚火旺、口干口苦、出血倾向者少量。",
  },
  {
    name: "大枣",
    use: "补中益气、养血。蒸蛋、汤、茶少量。",
    avoid: "糖尿病者减量；痰湿重、腹胀者少量。",
  },
  {
    name: "枸杞",
    use: "滋补肝肾、明目。蒸蛋、汤、拌菜少量。",
    avoid: "感冒发热、脾虚便溏者少食。",
  },
  {
    name: "薏苡仁",
    use: "健脾利湿。可煮饭、打糊或炖汤。",
    avoid: "孕妇、虚寒便溏者减量；老人煮软。",
  },
  {
    name: "百合",
    use: "润肺安神。入粥、羹或银耳汤。",
    avoid: "风寒咳嗽、胃寒便溏者少量。",
  },
];

function collectShopping(days) {
  const map = new Map();
  days.forEach((day) => {
    day.meals.forEach((meal) => {
      meal.dishes.forEach((recipe) => {
        recipe.ingredients.forEach((item) => {
          if (item.shop === false) return;
          map.set(item.name, (map.get(item.name) || 0) + item.grams);
        });
        recipe.seasoning.forEach((item) => {
          map.set(item.name, (map.get(item.name) || 0) + item.grams);
        });
      });
    });
  });
  return map;
}

const SHOPPING_CATEGORIES = [
  {
    title: "主食与豆类",
    keywords: ["苦荞", "小米", "燕麦", "薏仁", "糙米", "黑豆", "藜麦", "杂豆", "鹰嘴豆", "白芸豆", "红豆", "玉米", "红薯", "芋头", "南瓜", "山药", "葛根", "粉丝"],
  },
  {
    title: "蔬菜与菌菇",
    keywords: ["番茄", "西兰花", "莴笋", "冬瓜", "芦笋", "芥蓝", "菠菜", "空心菜", "娃娃菜", "豌豆苗", "青椒", "木耳", "菌菇", "折耳根", "莲藕", "百合", "竹荪", "菜心", "凉瓜", "西洋菜", "马蹄", "荷兰豆", "胡萝卜", "菜干", "霸王花"],
  },
  {
    title: "优质蛋白",
    keywords: ["鸡蛋", "鸡胸", "鸡腿", "鸡肉", "瘦牛肉", "瘦猪肉", "排骨", "鲈鱼", "白鱼", "虾仁", "豆腐", "豆浆", "鸭胸", "老鸭", "猪骨", "鱼片", "鹌鹑蛋", "清远鸡", "鲜虾", "陈肾"],
  },
  {
    title: "药食同源",
    keywords: ["茯苓", "葛根", "生姜", "大枣", "枸杞", "百合", "莲子", "竹荪", "霸王花", "薏米"],
  },
  {
    title: "调味与油",
    keywords: ["盐", "植物油", "低盐豉油", "豉油", "生抽", "香醋", "醋", "花椒油", "白胡椒", "糟辣椒", "蒜", "姜", "葱", "香油", "淀粉", "糖", "花生油", "豆豉", "代糖"],
  },
  {
    title: "饮品与水果",
    keywords: ["刺梨", "小番茄", "苦荞茶", "薄荷", "低脂牛奶", "姜汁"],
  },
];

function categorize(name) {
  for (const category of SHOPPING_CATEGORIES) {
    if (category.keywords.some((keyword) => name.includes(keyword))) {
      return category.title;
    }
  }
  return "其他";
}

function formatShopping(days) {
  const map = collectShopping(days);
  const grouped = new Map();
  map.forEach((grams, name) => {
    const title = categorize(name);
    if (!grouped.has(title)) grouped.set(title, []);
    grouped.get(title).push({ name, grams });
  });

  return SHOPPING_CATEGORIES.map((category) => {
    const items = grouped.get(category.title) || [];
    return {
      title: category.title,
      items: items.sort((a, b) => b.grams - a.grams),
    };
  }).filter((group) => group.items.length > 0);
}

const SHOPPING_BY_WEEK = WEEKS.map((week) =>
  formatShopping(DAYS.filter((day) => day.week === week.id)),
);
const SHOPPING_MONTH = formatShopping(DAYS);
