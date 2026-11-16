/* ECHYOX bilingual interface, review edition. Chinese source files remain intact.
  English renderings are editorial drafts; complete literary texts and the entry art remain Chinese. */
(function () {
'use strict';
const words = {
  "主页": "Home",
  "戏剧": "Theatre",
  "诗歌": "Poetry",
  "音乐": "Music",
  "寻找自己": "Becoming",
  "侯宇鑫": "Yuxin Hou",
  "回到来处": "Return",
  "返回戏剧": "Back to theatre",
  "返回首页": "Back to home page",
  "返回诗歌扉页": "Back to poetry",
  "返回曲目列表": "Back to track list",
  "进入尚未完成之处": "Enter the Unfinished",
  "作品栏目": "Works",
  "侯宇鑫艺术入场页": "Yuxin Hou — website entrance",
  "据说岁月的模型不会停止演变。": "It is said that the model of time never stops evolving.",
  "为着均匀的呼吸与静默的词语。": "For steady breathing and silent words.",
  "一切的一切都与人类无关。": "Everything, absolutely everything, has nothing to do with humanity.",
  "另外的路建在海上。": "Other roads are built upon the sea.",
  "让人物进入空间，让空间逼近命运。": "Let characters enter space, and let space draw closer to fate.",
  "诗句面对一些问题的过程。": "Exploring questions through verse.",
  "让旋律和文字各自拥有呼吸。": "Let melody and words each have room to breathe.",
  "海边有一栋倾斜的房子": "EXPRESSERS",
  "猛犸": "MAMMOTH",
  "迷宫": "THE LABYRINTH",
  "面向自我的陈述": "THE NARROW GATE",
  "她一瞬过载": "ALL AT ONCE",
  "无场次话剧": "Play without scene divisions",
  "多场次话剧": "Multi-scene play",
  "三幕悲剧": "Tragedy in three acts",
  "无场次独角话剧": "Solo play without scene divisions",
  "简介": "Synopsis",
  "记录": "Productions and recognition",
  "剧本试读 ↗": "Read script excerpt (Chinese) ↗",
  "下载 PDF ↓": "Download PDF (Chinese) ↓",
  "下载 PDF ↗": "Download PDF (Chinese) ↗",
  "剧本试读": "Script excerpt (Chinese)",
  "收起试读": "Close excerpt",
  "收起试读，返回作品页面": "Close the excerpt and return to the play",
  "剧本试读页面，可滚动": "Scrollable script excerpt",
  "上一页": "Previous page",
  "下一页": "Next page",
  "放大": "Zoom in",
  "适宽": "Fit to width",
  "“过去一片寂静，未来无限光明。”": "“The past is silent; the future is infinitely bright.”",
  "一对为自己赋予“演员”和“夫妻”身份的男女，在结婚三十周年纪念日的夜晚，因为一只梦里的水怪重新翻开生活。角色与演员、现实与表演反复交换位置。": "On the night of their thirtieth wedding anniversary, a man and a woman who have cast themselves as both ‘actors’ and ‘husband and wife’ revisit their lives after a dream about a creature from the water. Characters and actors, reality and performance, repeatedly exchange places.",
  "“人类如同猛犸，生活就是一场围猎。”": "“Human beings are like mammoths; life is a hunt in which we are surrounded.”",
  "一个患有渐冻症的剧作家死去之后，在意识消失前的六分钟里回看自己的一生。现实、邻居、小说家与猛犸围猎的梦境彼此嵌套。": "After death, a playwright with amyotrophic lateral sclerosis (ALS) looks back on a lifetime in the six minutes before consciousness fades. Reality, neighbours, novelists and a dream of a mammoth hunt are nested within one another.",
  "“英雄的苦难是他们的境遇，人们的苦难是自身的生活。”": "“For heroes, suffering lies in their circumstances; for ordinary people, it lies in life itself.”",
  "代达罗斯逃离雅典来到克里特岛，为米诺斯建造迷宫。权力、罪行、父子关系与建筑师对秩序的执念不断彼此缠绕。": "Daedalus flees Athens for Crete, where he builds a labyrinth for Minos. Power, crime, father–son relationships and the architect’s obsession with order become increasingly entangled.",
  "“如果可以的话，我希望你们能拥抱我的灵魂。”": "“If you can, I hope you will embrace my soul.”",
  "以理查德·罗素未经许可驾驶客机升空并最终坠毁的真实事件为起点。死亡之后，他重新面对自己的一生、媒体的凝视、孤独和所谓自由。": "The play takes as its starting point the real-life incident in which Richard Russell took off without authorisation in a passenger aircraft that subsequently crashed. After his death, he confronts his own life, the gaze of the media, loneliness and so-called freedom.",
  "“无非就是想要个回答嘛，能怎么样呢？”": "“All I want is an answer. What harm could that do?”",
  "三十一岁的杨翠翠因为骑走一辆电动车被带进派出所。审讯开始后，一个看似荒诞的小事件逐渐牵出她的婚姻、欲望、出身和一整段人生。": "Thirty-one-year-old Yang Cuicui is taken to a police station after riding away on an e-bike. As the interrogation unfolds, a seemingly absurd minor incident begins to uncover her marriage, desires, background and, ultimately, the story of her life.",
  "2022年第一届中国淄博戏剧节首演": "Premiered at the 1st Zibo Urban Theatre Festival in 2022",
  "第一届中国淄博戏剧节小剧场展演单元优秀编剧奖": "Outstanding Playwright Award, Small-Theatre Showcase, 1st Zibo Urban Theatre Festival",
  "广州西瓜剧场2022年戏剧大赛决赛竞演单元": "Selected for the final round of the 2022 theatre competition at Xigua Theatre, Guangzhou",
  "2022年第六届南宁市“新青年”戏剧节特邀展演剧目": "Invited production at the 6th New Youth Theatre Festival, Nanning, 2022",
  "2023“戏剧中国”年度作品话剧类潜力剧本奖": "Promising Script Award (Stage Play Category), 2023 ‘Theatre China’ Annual Works Selection",
  "2024年第六届大凉山国际戏剧节参演剧目": "Presented at the 6th Daliangshan International Theatre Festival, 2024",
  "2023年11月8日首演于晋中信息学院": "Premiered at Jinzhong College of Information, 8 November 2023",
  "2024年5月20日二轮演出于晋中信息学院": "Second run at Jinzhong College of Information, 20 May 2024",
  "2024培源艺术节展演剧目": "Presented at the 2024 Peiyuan Art Festival in Beijing",
  "广西艺术学院2023届本科毕业生优秀毕业论文奖": "Outstanding Undergraduate Thesis Award, Guangxi Arts University, Class of 2023",
  "中国金鸡百花电影节“2023青年编剧大会”戏剧类剧本优秀奖": "Outstanding Script Award (Theatre Category), 2023 Young Screenwriters and Playwrights Conference (held in conjunction with the China Golden Rooster & Hundred Flowers Film Festival)",
  "2026年5月27日首演于晋中信息学院（全女班）": "Premiered at Jinzhong College of Information, 27 May 2026 (all-female cast)",
  "“戏剧中国”2024年度作品话剧类最佳剧本奖": "Best Script Award (Stage Play Category), 2024 ‘Theatre China’ Annual Works Selection",
  "入围2025躬耕艺术节青年竞演单元并获“躬耕奖”": "Selected for the Youth Competition and received the Gonggeng Award at the 2025 Nanyang Gonggeng Arts Festival",
  "2025年第七届大凉山国际戏剧节入选并展演剧目": "Selected for and presented at the 7th Daliangshan International Theatre Festival, 2025",
  "2026深圳城市戏剧季特邀剧目": "Invited production for the 2026 Shenzhen City Theatre Season",
  "新作，暂无演出、入选或获奖记录。": "New play; no productions, festival selections or awards to date.",
  "共同在场": "Being Present Together",
  "天亮之前，我们在寻找水怪。": "Before dawn, we are searching for the sea monster.",
  "在时间的围猎中，我们曾彼此作证。": "In time’s hunt, we once bore witness to one another.",
  "迷路的人已经沉寂，同行的人留在回声里。": "Those who lost their way have fallen silent; those who walked with them remain in the echoes.",
  "一个人的独白，也曾由许多人共同托举。": "One person’s monologue was once held aloft by many.",
  "演员阵容": "Cast",
  "主创与制作": "Creative and production team",
  "制作团队": "Production team",
  "编剧": "Playwright",
  "导演": "Director",
  "编剧 / 导演": "Playwright / Director",
  "编剧、导演": "Playwright and director",
  "化妆设计": "Make-up design",
  "舞美设计 / 海报设计": "Set and poster design",
  "舞美设计": "Set design",
  "舞台美术设计": "Set design",
  "舞美设计 / 多媒体影像设计": "Set and multimedia design",
  "多媒体影像设计": "Multimedia design",
  "人物形象设计": "Character styling",
  "人物妆造设计": "Hair and make-up design",
  "人物服饰设计": "Costume design",
  "平面设计": "Graphic design",
  "海报设计": "Poster design",
  "灯光设计": "Lighting design",
  "导演助理": "Assistant director",
  "舞台监督 / 导演助理": "Stage manager / Assistant director",
  "剧务统筹 / 舞台志愿者团队统筹": "Production coordination and stage volunteer coordination",
  "音乐音效设计": "Music and sound design",
  "服化设计": "Costume and make-up design",
  "剧目制作总监": "Production director",
  "形体动作排演": "Movement direction",
  "执行舞监": "Stage manager",
  "幕后跟组团队": "Backstage production team",
  "晋中信息学院版": "Jinzhong College of Information production",
  "首演版、广州西瓜剧场演出版": "Premiere production and the Xigua Theatre production in Guangzhou",
  "第六届南宁「新青年戏剧节」版": "Production at the 6th New Youth Theatre Festival in Nanning",
  "2023 · 首演版": "2023 · Premiere",
  "2024 · 演出版": "2024 · Production",
  "2026 · 首演版（全女班）": "2026 · Premiere (all-female cast)",
  "2024 首演版": "2024 premiere",
  "2024—2025 演出版": "2024–2025 production",
  "2025—2026 演出版": "2025–2026 production",
  "饰 女人（甲）": "Woman A",
  "饰 女人（乙）": "Woman B",
  "饰 女人（丙）": "Woman C",
  "饰 原始人甲": "Prehistoric person A",
  "饰 原始人乙": "Prehistoric person B",
  "饰 原始人丙": "Prehistoric person C",
  "饰 护工小陈": "Care worker Xiao Chen",
  "饰 小说作家（甲）": "Novelist A",
  "饰 小说作家（乙）": "Novelist B",
  "饰 前图书馆管理员“X”（甲）": "Former librarian ‘X’ (A)",
  "饰 前图书馆管理员“X”（乙）": "Former librarian ‘X’ (B)",
  "饰 神婆": "Spirit medium",
  "饰 约耶夫·卢锡安": "约耶夫·卢锡安 (character name)",
  "饰 阿米尔·妮娜": "阿米尔·妮娜 (character name)",
  "饰 贾医生": "Dr Jia",
  "饰 主持人": "Host",
  "饰 代达罗斯": "Daedalus",
  "饰 米诺斯": "Minos",
  "饰 伊卡洛斯": "Icarus",
  "饰 克诺利": "克诺利 (character name)",
  "饰 先知、侍卫丙": "Prophet / Guard C",
  "饰 雅典使者、侍卫乙": "Athenian envoy / Guard B",
  "饰 雅典国王、代达罗斯之父": "King of Athens / Daedalus’s father",
  "饰 女祭司、希达罗斯": "Priestess / 希达罗斯 (character name)",
  "饰 幼年的代达罗斯 / 长大后的代达罗斯、侍卫甲、小工": "Young and adult Daedalus / Guard A / Labourer",
  "剧照": "Production photographs",
  "横向滑动 · 点击放大": "Swipe to browse · Select to enlarge",
  "切换画面 · 点击放大": "Browse · Click to enlarge",
  "左右滑动 · 点图查看完整画面": "Swipe left or right · Select a photograph to view it in full",
  "点击放大 · 小屏可横向滑动": "Click to enlarge · Swipe on small screens",
  "上一张剧照": "Previous photograph",
  "下一张剧照": "Next photograph",
  "关闭剧照浏览": "Close photo viewer",
  "关闭 ×": "Close ×",
  "← → 切换 · Esc 关闭": "← → Browse · Esc to close",
  "横向浏览剧照": "Browse production photographs",
  "离合悲欢——《她一瞬过载》概念曲": "Parting and Reunion, Sorrow and Joy — Concept Track for ALL AT ONCE",
  "概念：侯宇鑫 · 作曲、编曲：Suno": "Concept: Yuxin Hou · Composition and arrangement: Suno",
  "单曲循环": "Repeat track",
  "已开启": "On",
  "已关闭": "Off",
  "关于我": "About",
  "创作中关注的部分问题": "Questions in my practice",
  "经过": "Selected work",
  "此刻": "Now",
  "联系": "Contact",
  "侯宇鑫，青年戏剧编剧、导演，中国戏剧文学学会会员，文旅演艺高级导演。": "Yuxin Hou is a playwright and theatre director, a member of the Chinese Theatre Literature Association (中国戏剧文学学会), and a senior director of live performances for cultural tourism.",
  "毕业于广西艺术学院戏剧影视文学系，曾任高校教师，进修于第二届全国“文旅演艺导演高级研修班”。": "Hou graduated from the Department of Drama, Film and Television Literature at Guangxi Arts University, previously taught at a university, and attended the second national advanced training programme for directors of live performances in cultural tourism.",
  "主要从事戏剧文本创作与舞台导演工作，同时进行诗歌、歌曲写作及跨媒介创作实践。": "Hou’s practice centres on playwriting and theatre directing, alongside poetry, songwriting and work across media.",
  "主要作品包括话剧《海边有一栋倾斜的房子》、《猛犸》、《迷宫》、《面向自我的陈述》、《她一瞬过载》，音乐剧《风起形意》等。": "Major works include the plays EXPRESSERS, MAMMOTH, THE LABYRINTH, THE NARROW GATE and ALL AT ONCE, and the musical Feng Qi Xing Yi (风起形意).",
  "一些不断出现、又没有固定答案的问题。": "Questions that keep returning, without fixed answers.",
  "当一个人被赋予某种身份，他还能重新选择自己吗？": "When a person is assigned an identity, can they still choose who to become?",
  "当命运与秩序开始发挥作用，人的行动究竟还有多少余地？": "When fate and order begin to exert their force, how much room for action remains?",
  "记忆能够保存什么？爱情、死亡与时间，又怎样改变我们讲述故事的方式？": "What can memory preserve? How do love, death and time change the way we tell stories?",
  "面对无法轻易解释的生活，笑声和荒诞能否成为表达的方式？": "Faced with a life that defies easy explanation, can laughter and the absurd become forms of expression?",
  "语言应当构筑的是空间。": "What language should construct is space.",
  "——《语言方式》，2026": "— The Shape of Language, 2026",
  "主要创作及演出活动": "Selected creative and performance credits",
  "展演": "Performance",
  "入选": "Selection",
  "创作": "Creative work",
  "获奖": "Award",
  "AI介入创作": "AI-assisted creative work",
  "编导、内容设计": "Writer, director and content developer",
  "导演、剧本改编、演员": "Director, script adaptor and performer",
  "联合改编、演员": "Co-adaptor and performer",
  "演员": "Performer",
  "《道德算法》": "Moral Algorithm",
  "《风起形意》": "Feng Qi Xing Yi (风起形意)",
  "《幽默交换集市》": "The Humour Exchange Market",
  "《历史中的轶事一则》": "An Anecdote from History",
  "《冷场有罪》": "Dead Air Is a Crime",
  "《抛锚》": "Broken Down",
  "《未来实验笔记》": "Notes on Future Experiments",
  "《空间喜剧》": "Spatial Comedy",
  "《安娜的化妆间》": "Anna’s Dressing Room",
  "《面对斯芬克斯》": "Facing the Sphinx",
  "2026年5月27日首演于晋中信息学院乌马河剧院（全女班）。": "Premiered at Wumahe Theatre, Jinzhong College of Information, on 27 May 2026 (all-female cast).",
  "作为受邀剧目入选2026深圳城市戏剧季。": "Selected as an invited production for the 2026 Shenzhen City Theatre Season.",
  "2026年创作的独角话剧作品。": "A solo play written in 2026.",
  "2026年使用AI平台介入创作的悬疑小剧场话剧。": "A suspense play for a small theatre, developed with AI tools in 2026.",
  "获“戏剧中国”2024年度作品征选活动话剧类最佳剧本奖；获2025躬耕艺术节青年竞演单元“躬耕奖”。": "Best Script Award (Stage Play Category), 2024 ‘Theatre China’ Annual Works Selection; Gonggeng Award, Youth Competition, 2025 Nanyang Gonggeng Arts Festival.",
  "展演于2025躬耕艺术节青年竞演单元；入选并展演于2025年第七届大凉山国际戏剧节。": "Presented in the Youth Competition at the 2025 Nanyang Gonggeng Arts Festival; selected for and presented at the 7th Daliangshan International Theatre Festival, 2025.",
  "获选山西省教育厅“2025年度省级高校原创文化精品”项目。": "Selected for the Shanxi Provincial Department of Education’s 2025 provincial-level programme for outstanding original cultural works by higher education institutions.",
  "2025年即兴喜剧专场。": "Improvised comedy show, 2025.",
  "2025年使用AI平台介入创作的先锋历史话剧。": "An avant-garde historical play developed with AI tools in 2025.",
  "获“戏剧中国”2023年度作品征选活动话剧类潜力剧本奖。": "Promising Script Award (Stage Play Category), 2023 ‘Theatre China’ Annual Works Selection.",
  "展演于2024年第六届大凉山国际戏剧节。": "Presented at the 6th Daliangshan International Theatre Festival, 2024.",
  "入选并展演于2024北京培源艺术节；展演于2024年第六届大凉山国际戏剧节。": "Selected for and presented at the 2024 Peiyuan Art Festival in Beijing; presented at the 6th Daliangshan International Theatre Festival, 2024.",
  "2024年6月24日在山西保利大剧院演出并于山西省内各高校巡演；展演于2024年第六届大凉山国际戏剧节及第二十二届金刺猬大学生戏剧节。": "Performed at Shanxi Poly Grand Theatre on 24 June 2024 and toured higher education institutions across Shanxi; presented at the 6th Daliangshan International Theatre Festival and the 22nd Golden Hedgehog College Theatre Festival, both in 2024.",
  "获第二十二届金刺猬大学生戏剧节“优秀剧目奖”。": "Outstanding Production Award, 22nd Golden Hedgehog College Theatre Festival.",
  "2024年即兴喜剧专场。": "Improvised comedy show, 2024.",
  "获2023届广西艺术学院本科毕业生优秀毕业论文奖；获中国金鸡百花电影节“2023青年编剧大会”戏剧类剧本优秀奖。": "Outstanding Undergraduate Thesis Award, Guangxi Arts University, Class of 2023; Outstanding Script Award (Theatre Category), 2023 Young Screenwriters and Playwrights Conference (held in conjunction with the China Golden Rooster & Hundred Flowers Film Festival).",
  "2022年第一届中国淄博戏剧节小剧场话剧展演单元；作为受邀剧目展演于2022年南宁市“新青年”戏剧节。": "Presented in the Small-Theatre Showcase at the 1st Zibo Urban Theatre Festival in 2022; presented as an invited production at the New Youth Theatre Festival in Nanning in 2022.",
  "获第一届中国淄博戏剧节小剧场话剧展演单元“优秀编剧奖”。": "Outstanding Playwright Award, Small-Theatre Showcase, 1st Zibo Urban Theatre Festival.",
  "入选广州西瓜剧场2022年戏剧大赛决赛竞演单元。": "Selected for the final round of the 2022 theatre competition at Xigua Theatre, Guangzhou.",
  "中国传媒大学与广西艺术学院联合制作，2022年第一届中国淄博戏剧节小剧场展演单元特邀剧目。": "Co-produced by Communication University of China and Guangxi Arts University; presented as an invited production in the Small-Theatre Showcase at the 1st Zibo Urban Theatre Festival in 2022.",
  "获《作家天地》杂志社、《同步悦读》联合主办2022年“同步悦读首届全国文学大赛”诗歌组全国二等奖。": "Second Prize in Poetry (national level), inaugural Tongbu Yuedu National Literary Competition, 2022, jointly organised by Zuojia Tiandi (Writers’ World) magazine and Tongbu Yuedu.",
  "获2021年第二十六届广西艺术学院校园文化艺术节原创剧本竞赛一等奖。": "First Prize, Original Script Competition, 26th Campus Culture and Arts Festival, Guangxi Arts University, 2021.",
  "第三届深圳市拉阔戏剧节优秀展演剧目。": "Recognised as an outstanding showcase production at the 3rd Shenzhen Lakuo Theatre Festival.",
  "南宁市“新青年”戏剧节优秀展演剧目，第十届跨文化传播国际学术会议（ICIC）特邀展演剧目。": "Recognised as an outstanding showcase production at the New Youth Theatre Festival in Nanning; presented by invitation at the 10th International Conference on Intercultural Communication (ICIC).",
  "戏剧仍然是主要的创作方式。除此之外，持续写作诗歌与歌词，探索音乐、人工智能与网页媒介参与创作的可能。": "Theatre remains my principal creative medium. Alongside it, I continue to write poetry and lyrics and explore the possibilities of music, artificial intelligence and the web as creative media.",
  "ECHYOX 保存已经完成的作品，也容纳尚在发生的尝试。": "ECHYOX preserves completed works and makes room for experiments still unfolding.",
  "作品、合作与交流。": "For enquiries about my work, collaborations and artistic exchange.",
  "关于天空告诉我的一切": "All the Sky Has Told Me",
  "你要问路吗要问路吗问路吗路吗吗？": "Looking for a Way? For a Way? A Way? Way? …?",
  "跃下深渊的动机": "Motif for a Leap into the Abyss",
  "一个哑谜": "An Unspoken Riddle",
  "2021创作 · 2026完成编曲": "Written in 2021 · Arrangement completed in 2026",
  "作词、作曲：侯宇鑫 · 编曲：Suno": "Lyrics and composition: Yuxin Hou · Arrangement: Suno",
  "作词：侯宇鑫 · 作曲、编曲：Suno": "Lyrics: Yuxin Hou · Composition and arrangement: Suno",
  "作词：侯宇鑫": "Lyrics: Yuxin Hou",
  "作曲、编曲：Suno": "Composition and arrangement: Suno",
  "器乐作品 · 无歌词": "Instrumental · No lyrics",
  "器乐作品，无歌词": "Instrumental, no lyrics",
  "旋律：侯宇鑫 · 发展于 Suno Studio": "Melody: Yuxin Hou · Developed in Suno Studio",
  "歌词": "Lyrics (Chinese)",
  "器乐": "Instrumental",
  "上下滑动": "Scroll vertically",
  "歌词，可单独上下滚动": "Lyrics in Chinese; scroll to read",
  "按年份阅读诗歌": "Read poems by year",
  "诗歌扉页": "Poetry archive",
  "路途遥远，海浪呼啸": "The road is long; the waves roar",
  "一阵风准时吹来": "A gust of wind arrives on time",
  "《语言方式》": "The Shape of Language",
  "诗歌目录": "Poetry archive",
  "诗歌 / 侯宇鑫": "Poetry by Yuxin Hou",
  "收起此页，返回诗歌列表": "Close poem and return to archive",
  "收起此页": "Close poem",
  "诗歌全文，可上下滚动": "Full poem in Chinese; scroll to read",
  "上一首": "Previous",
  "下一首": "Next",
  "已是第一首诗": "First poem",
  "已是最后一首诗": "Last poem",
  "诗歌扉页，可选择年份阅读": "Poetry archive — choose a year to browse",
  "没有，虚无": "Nothing, Nothingness",
  "午后": "Afternoon",
  "夜晚": "Night",
  "五十年后，永恒之前": "Fifty Years On, Before Eternity",
  "女神": "Goddess",
  "命数的牢笼": "The Prison of Fate",
  "公元某年的村庄（组诗）": "A Village in an Unnamed Year (Poetry Sequence)",
  "浮舟于世": "Adrift in the World",
  "我": "I",
  "三年后，梦里开的花": "Three Years On, Flowers Bloom in a Dream",
  "玛吉阿玛": "Makye Ama (玛吉阿玛)",
  "岁月": "The Passage of Years",
  "浩荡，茫茫": "Vast and Boundless",
  "贫民窟": "Slum",
  "九行诗": "Nine Lines",
  "雨夜": "A Rainy Night",
  "海洋": "Ocean",
  "未来·想象光明·原野·十九岁": "The Future · Imagining Light · The Wilds · At Nineteen",
  "姐姐，今晚你死去": "Sister, Tonight You Die",
  "破晓之前的挽歌": "Elegy Before Daybreak",
  "世界的最后边际": "At the Far Edge of the World",
  "即使光明隐匿黑暗之中": "Even When Light Lies Hidden in Darkness",
  "斜阳在末日到来之前的天空高悬（组诗）": "The Setting Sun Hangs High on the Eve of the Apocalypse (Poetry Sequence)",
  "拂遍旷野的梦里的风": "A Dream-Wind Sweeping the Wilds",
  "太阳以西的地方（组诗）": "West of the Sun (Poetry Sequence)",
  "新娘在落日余晖时刻的史诗": "Epic of the Bride at Sundown",
  "大河（十九岁的诗）": "The Great River (A Poem Written at Nineteen)",
  "晚霞在白昼之后这样出现": "And So the Evening Glow Appears after Daylight",
  "一声风吟": "A Whisper of Wind",
  "过往诗篇": "Verses from the Past",
  "日出到日落的世间故事（组诗）": "Tales of the World from Dawn to Dusk (Poetry Sequence)",
  "散佚诗篇：有关天空告诉我的一切（组诗）": "Scattered Verses: All the Sky Has Told Me (Poetry Sequence)",
  "醒来": "Awake",
  "一行诗就足以表达一切": "A Single Line of Verse Can Say It All",
  "回答关于黑暗的一切的问题": "To Answer Every Question About Darkness",
  "幸存对我而言意味着什么": "What Surviving Means to Me",
  "零伍幺六": "Zero Five One Six",
  "生命理论史稿": "Drafts for a History of the Theory of Life",
  "最后一篇故事": "The Last Tale",
  "如何杀死一只卑劣的艺术家": "How to Kill a Vile Artist",
  "自由落体运动": "Free Fall",
  "我们要去烧毁森林": "We Shall Burn the Forest",
  "被熄灭的冰封太阳——一种史诗的叙述法": "The Extinguished, Frozen Sun — A Mode of Epic Narration",
  "未来实验笔记": "Notes on Future Experiments",
  "情诗延续法则": "The Laws by Which a Love Poem Lives On",
  "而我只是一条孤寂行进的落寞疯狗": "And I Am Only a Forlorn Mad Dog Wandering Alone",
  "大河（二零一九与二零二一）": "The Great River (2019 and 2021)",
  "希望的意志是生活的表征": "The Will to Hope Is the Mark of Life",
  "萨尔瓦利·耶斯塔米·K的情诗": "Love Poems of 萨尔瓦利·耶斯塔米·K",
  "思维地震的一场掩埋": "Buried in a Quake of Thought",
  "网罗诗意时刻": "Gathering Moments of Poetry",
  "致爱人": "To My Beloved",
  "一匹野马奔向高原": "A Wild Horse Gallops towards the Plateau",
  "献给契诃夫": "To Chekhov",
  "月球下行的轨道": "The Moon in a Descending Orbit",
  "快去踏进爱的河里": "Hurry, Step into the River of Love",
  "语言方式": "The Shape of Language",
  "凝望浪潮": "Gazing into the Waves",
  "《海边有一栋倾斜的房子》": "EXPRESSERS",
  "《猛犸》": "MAMMOTH",
  "《迷宫》": "THE LABYRINTH",
  "《面向自我的陈述》": "THE NARROW GATE",
  "《她一瞬过载》": "ALL AT ONCE",
  "左右滑动或使用方向键切换剧照": "Swipe or use the arrow keys to browse photographs",
  "选择剧照": "Select a photograph",
  "上一组剧照": "Previous group of photographs",
  "下一组剧照": "Next group of photographs",
  "三组空间中的六张剧照": "Six production photographs across three spaces",
  "田帅、侯宇鑫": "Shuai Tian, Yuxin Hou"
};
const root=document.documentElement;
const current=new URL(location.href);
const english=current.searchParams.get('lang')==='en';
const label=english?'中文':'EN';
const target=new URL(current.href);
if(english) target.searchParams.delete('lang'); else target.searchParams.set('lang','en');
function switchLink(){
 const a=document.createElement('a');a.className='language-switch';a.textContent=label;
 a.href=target.href;a.hreflang=english?'zh-CN':'en';a.lang=english?'zh-CN':'en';
 a.setAttribute('aria-label',english?'切换至中文':'Switch to English');a.setAttribute('data-language-switch','');
 a.addEventListener('click',()=>{const next=new URL(location.href);if(english)next.searchParams.delete('lang');else next.searchParams.set('lang','en');if(document.body.classList.contains('entry-passed')||document.body.classList.contains('entry-gate-finished'))next.hash='entry-revealed';a.href=next.href;});
 return a;
}
const brand=document.querySelector('.brand-link');
if(brand){const a=switchLink();a.classList.add('header-language-switch');brand.closest('.site-head').appendChild(a);}
const entry=document.querySelector('.entry-gate');
if(entry){const a=switchLink();a.classList.add('entry-language-switch');entry.appendChild(a);}
if(!english)return;
root.lang='en';
// The contact address follows the selected interface language; retain the original arrow.
const contact=document.querySelector('.contact-mail[data-contact-email-en]');
if(contact&&contact.firstChild&&contact.firstChild.nodeType===3){
 const address=contact.dataset.contactEmailEn;
 contact.firstChild.nodeValue=address+' ';
 contact.setAttribute('href','mailto:'+address);
}
function translate(value){
 if(!value)return value;
 const clean=value.trim();
 if(Object.prototype.hasOwnProperty.call(words,clean))return value.replace(clean,words[clean]);
 let m;
 if((m=clean.match(/^(.+?) · (\d{4})$/))&&words[m[1]])return words[m[1]]+' · '+m[2];
 if((m=clean.match(/^(.+?) — 侯宇鑫$/))&&words[m[1]])return words[m[1]]+' — Yuxin Hou';
 if((m=clean.match(/^回到来处：(.+)$/))){const destination=words[m[1]]||m[1];return /^Back to /i.test(destination)?destination:'Return: '+destination;}
 if((m=clean.match(/^(\d+) 首$/)))return m[1]+(Number(m[1])===1?' poem':' poems');
 if((m=clean.match(/^显示第\s*(\d+)\s*张剧照$/)))return 'Show photograph '+m[1];
 if((m=clean.match(/^(\d+\s*\/\s*\d+)\s*组$/)))return m[1]+(Number(m[1].split('/')[1].trim())===1?' group':' groups');
 if((m=clean.match(/^阅读(\d{4})年的诗歌$/)))return 'Read poems from '+m[1];
 if((m=clean.match(/^(\d{4})年诗歌目录，(\d+)首$/)))return 'Poetry archive, '+m[1]+' — '+m[2]+(Number(m[2])===1?' poem':' poems');
 if((m=clean.match(/^已显示(\d{4})年的(\d+)首诗$/)))return 'Showing '+m[2]+(Number(m[2])===1?' poem from ':' poems from ')+m[1];
  if(/^(?:(?:约|c\.)\s*)?\d{4}/.test(clean)&&/[年月日凌晨初稿约冬春夏秋]/.test(clean)){
   const dateEnglish=v=>v.replace(/．/g,'.').replace(/^\s*约\s*/,'c. ').replace(/(\d{4})年(\d{1,2})月(?:(\d{1,2})日)?/g,(_,y,mo,da)=>y+'.'+mo+(da?'.'+da:'')).replace(/(\d{4})年([春夏秋冬])/g,(_,y,q)=>({春:'Spring',夏:'Summer',秋:'Autumn',冬:'Winter'}[q]+' '+y)).replace(/\s*凌晨/g,' (early morning)');
   return dateEnglish(clean.replace(/（([^（）]*?)初稿：([^）]+)）/g,(_,scope,date)=>' ('+(scope==='第一首'?'first poem — ':scope?scope+' — ':'')+'first draft: '+dateEnglish(date)+')'));
  }
 if((m=clean.match(/^(上一首|下一首)：(.+)$/)))return words[m[1]]+': '+(words[m[2]]||m[2]);
 if((m=clean.match(/^(.*?) \/ 剧本试读$/)))return (words[m[1]]||m[1])+' / Script excerpt (Chinese)';
 if((m=clean.match(/^(.*?) · 试读第 (\d+) 页$/)))return (words[m[1]]||m[1])+' · Excerpt page '+m[2];
 if((m=clean.match(/^(.*?) · 剧照$/)))return (words[m[1]]||m[1])+' · Production photographs';
 if((m=clean.match(/^(放大查看)?(《[^》]+》)剧照 (\d+)$/)))return (m[1]?'Enlarge ':'')+(words[m[2]]||m[2])+' · Photograph '+m[3];
 if((m=clean.match(/^第(\d+)(张|组)，共(\d+)(张|组)$/)))return m[1]+' of '+m[3]+(m[2]==='组'?(Number(m[3])===1?' group':' groups'):(Number(m[3])===1?' photograph':' photographs'));
 return value;
}
if(document.title==='侯宇鑫 HOU YUXIN')document.title='HOU YUXIN';
else document.title=translate(document.title);
const meta=document.querySelector('meta[name="description"]');
 if(meta&&meta.dataset.descriptionEn)meta.content=meta.dataset.descriptionEn;
function note(where,copy){if(!where)return;const p=document.createElement('p');p.className='language-note';p.textContent=copy;where.insertAdjacentElement('afterend',p);}
note(document.querySelector('.poetry-page .page-intro'),'Poem titles are translated for browsing. Full poems are presented in their original Chinese.');
note(document.querySelector('#trackList .page-intro'),'Song titles and credits are translated. Lyrics remain in their original Chinese.');
// Retain original Chinese titles as the secondary title in each theatre work.
document.querySelectorAll('.work-hero h1').forEach(h=>{const secondary=h.nextElementSibling;if(secondary&&secondary.classList.contains('work-en')){const original=h.textContent;h.textContent=secondary.textContent;secondary.textContent=original;secondary.lang='zh-CN';secondary.setAttribute('data-keep-original','');}});
document.querySelectorAll('.play-row .title-line .en').forEach(e=>{e.hidden=true;});
document.querySelectorAll('.home .door .no').forEach(e=>{const h=e.closest('.door').querySelector('h1');if(h){e.textContent=h.textContent;e.lang='zh-CN';e.setAttribute('data-keep-original','');}});
if(brand){const small=brand.querySelector('small');if(small)small.hidden=true;}
document.querySelectorAll('.poem-text,#poemReaderText,.entry-art').forEach(e=>{e.lang='zh-CN';e.setAttribute('data-keep-original','');});

/* Render given-name-first transliterated collaborator credits only in the English archive.
   Original Chinese remains visible, and role/production labels are handled separately. */
const creditNames = {
  "李俊宏": "Junhong Li",
  "李黎欣童": "Lixintong Li",
  "李昊文": "Haowen Li",
  "张晓静": "Xiaojing Zhang",
  "侯宇鑫": "Yuxin Hou",
  "韦哲宇": "Zheyu Wei",
  "梁栋": "Dong Liang",
  "戴国婷": "Guoting Dai",
  "李萍乡": "Pingxiang Li",
  "郭锐锐": "Ruirui Guo",
  "郝雨晴": "Yuqing Hao",
  "韩昕彤": "Xintong Han",
  "张政": "Zheng Zhang",
  "王江涛": "Jiangtao Wang",
  "武义刚": "Yigang Wu",
  "张梓玥": "Ziyue Zhang",
  "牛锴": "Kai Niu",
  "李东阳": "Dongyang Li",
  "郑仪凯": "Yikai Zheng",
  "王嘉顺": "Jiashun Wang",
  "李娜": "Na Li",
  "汪洋": "Yang Wang",
  "崔欣瑶": "Xinyao Cui",
  "郭雨鑫": "Yuxin Guo",
  "霍禹龙": "Yulong Huo",
  "田帅": "Shuai Tian",
  "郭丽琨": "Likun Guo",
  "赵佳丽": "Jiali Zhao",
  "王丽仙": "Lixian Wang",
  "许海钰": "Haiyu Xu",
  "闫泽民": "Zemin Yan",
  "曹宸卿": "Chenqing Cao",
  "张芏": "Du Zhang",
  "邢鹏飞": "Pengfei Xing",
  "姜宇航": "Yuhang Jiang",
  "王青楠": "Qingnan Wang",
  "高宇婷": "Yuting Gao",
  "温骐毓": "Qiyu Wen",
  "杨严灿": "Yancan Yang",
  "吕小静": "Xiaojing Lyu",
  "陈宽": "Kuan Chen",
  "王一渤": "Yibo Wang",
  "朱惠敏": "Huimin Zhu",
  "王彤昕": "Tongxin Wang",
  "朱笑笑": "Xiaoxiao Zhu",
  "张昕": "Xin Zhang",
  "李雯俊": "Wenjun Li",
  "段宜君": "Yijun Duan",
  "曹之馨": "Zhixin Cao",
  "宋圣炘": "Shengxin Song",
  "葛梦蝶": "Mengdie Ge",
  "郭卓洛": "Zhuoluo Guo",
  "刘阳": "Yang Liu",
  "卞佳艺": "Jiayi Bian",
  "李玥鑫": "Yuexin Li",
  "奥米琦": "Miqi Ao",
  "吴梦凡": "Mengfan Wu",
  "易欣": "Xin Yi",
  "张亚琪": "Yaqi Zhang",
  "王瀚淼": "Hanmiao Wang",
  "崔宇帆": "Yufan Cui",
  "赵嘉敏": "Jiamin Zhao",
  "李文璇": "Wenxuan Li",
  "赵宁静": "Ningjing Zhao",
  "窦芝": "Zhi Dou",
  "邱若鹏": "Ruopeng Qiu",
  "王金铭": "Jinming Wang",
  "郭锦淼": "Jinmiao Guo",
  "白子凡": "Zifan Bai",
  "王溪娜": "Xina Wang",
  "陈永玉": "Yongyu Chen",
  "刘思彤": "Sitong Liu",
  "陈梓慧": "Zihui Chen",
  "徐晨晔": "Chenye Xu"
};
function renderCreditNames(container){
 const textNodes=Array.from(container.childNodes).filter(n=>n.nodeType===3&&n.nodeValue.trim());
 if(textNodes.length!==1)return;
 const original=textNodes[0];
 const list=original.nodeValue.trim().split('、').map(n=>n.trim());
 if(!list.length||!list.every(n=>Object.prototype.hasOwnProperty.call(creditNames,n)))return;
 const group=document.createElement('span');
 group.className=list.length>1?'credit-name-list credit-name-list--multiple':'credit-name-list';
 group.setAttribute('data-keep-original','');
 for(const n of list){
  const person=document.createElement('span');person.className='credit-name-pair';
  const roman=document.createElement('span');roman.className='credit-name-roman';roman.textContent=creditNames[n];
  const han=document.createElement('span');han.className='credit-name-han';han.lang='zh-CN';han.textContent=n;
  person.append(roman,han);group.appendChild(person);
 }
 original.replaceWith(group);
}
document.querySelectorAll('.work-collaborators .collab-person > dt,.work-collaborators .collab-credit > dd,.work-collaborators .collab-director-entry').forEach(renderCreditNames);
document.querySelectorAll('.work-collaborators').forEach(section=>{
 const header=section.querySelector('.work-collaborators-header');
 if(!header)return;
 const note=document.createElement('p');note.className='credit-name-note';note.textContent="Names are romanised in Hanyu Pinyin, with given names before family names. Original Chinese names are retained. Individual preferred spellings may differ.";
 header.after(note);
});

function localLink(a){
 if(a.hasAttribute('data-language-switch')||a.hasAttribute('download'))return;
 const href=a.getAttribute('href');if(!href||/^(#|mailto:|tel:|javascript:)/i.test(href))return;
 try{const u=new URL(href,location.href);if(u.protocol!==location.protocol||(u.protocol!=='file:'&&u.origin!==location.origin)||!(/\.html?$/i.test(u.pathname)||u.pathname.endsWith('/')))return;
 if(u.searchParams.get('lang')!=='en'){u.searchParams.set('lang','en');a.setAttribute('href',u.href);}
 }catch(_){}
}
function visit(el){
 if(el.nodeType===1){
   if(el.closest('[data-keep-original],script,style,[data-language-switch]'))return;
   if(el.matches('a[href]'))localLink(el);
   for(const attr of ['aria-label','title','alt','data-title']){
    const old=el.getAttribute(attr);if(old){const next=translate(old);if(next!==old)el.setAttribute(attr,next);}
   }
   if(el.matches('#songLyrics')&&!el.classList.contains('no-lyrics')){el.lang='zh-CN';return;}
   for(const child of Array.from(el.childNodes))visit(child);
 }else if(el.nodeType===3){
   const parent=el.parentElement;if(!parent||parent.closest('[data-keep-original],script,style,[data-language-switch]'))return;
   const lyrics=parent.closest('#songLyrics');if(lyrics&&!lyrics.classList.contains('no-lyrics'))return;
   const old=el.nodeValue, next=translate(old);if(next!==old)el.nodeValue=next;
 }
}
visit(document.body);
const observer=new MutationObserver(changes=>{for(const change of changes){
 if(change.type==='attributes'){if(change.attributeName==='href'&&change.target.matches('a'))localLink(change.target);else{const old=change.target.getAttribute(change.attributeName);const next=translate(old);if(old&&next!==old)change.target.setAttribute(change.attributeName,next);}}
 else if(change.type==='characterData')visit(change.target);
 else for(const node of change.addedNodes)visit(node);
}});
observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['href','aria-label','title','alt','data-title']});
})();