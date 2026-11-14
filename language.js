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
  "侯宇鑫": "Hou Yuxin",
  "回到来处": "Return",
  "返回戏剧": "Back to theatre",
  "返回首页": "Back to home",
  "返回诗歌扉页": "Back to poetry",
  "返回曲目列表": "Back to tracks",
  "进入尚未完成之处": "Enter the Unfinished",
  "作品栏目": "Works",
  "侯宇鑫艺术入场页": "Hou Yuxin — entrance",
  "据说岁月的模型不会停止演变。": "It is said that the model of time never stops evolving.",
  "为着均匀的呼吸与静默的词语。": "For steady breaths and silent words.",
  "一切的一切都与人类无关。": "Everything, absolutely everything, has nothing to do with humankind.",
  "另外的路建在海上。": "Other roads are built upon the sea.",
  "让人物进入空间，让空间逼近命运。": "Let characters enter space; let space draw close to fate.",
  "诗句面对一些问题的过程。": "A process in which verses confront certain questions.",
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
  "记录": "Records",
  "剧本试读 ↗": "Script excerpt (Chinese) ↗",
  "下载 PDF ↓": "Download PDF (Chinese) ↓",
  "下载 PDF ↗": "Download PDF (Chinese) ↗",
  "剧本试读": "Script excerpt (Chinese)",
  "收起试读": "Close excerpt",
  "收起试读，返回作品页面": "Close excerpt and return to the work",
  "剧本试读页面，可滚动": "Script excerpt pages, scrollable",
  "上一页": "Previous page",
  "下一页": "Next page",
  "放大": "Zoom in",
  "适宽": "Fit to width",
  "“过去一片寂静，未来无限光明。”": "“The past is silent; the future is infinitely bright.”",
  "一对为自己赋予“演员”和“夫妻”身份的男女，在结婚三十周年纪念日的夜晚，因为一只梦里的水怪重新翻开生活。角色与演员、现实与表演反复交换位置。": "On the night of their thirtieth wedding anniversary, a man and a woman who have taken on the roles of both actors and spouses reopen the story of their lives because of a sea monster glimpsed in a dream. Characters and actors, reality and performance, repeatedly exchange places.",
  "“人类如同猛犸，生活就是一场围猎。”": "“Human beings are like mammoths; life is a hunt.”",
  "一个患有渐冻症的剧作家死去之后，在意识消失前的六分钟里回看自己的一生。现实、邻居、小说家与猛犸围猎的梦境彼此嵌套。": "After his death, a playwright with ALS looks back on his life in the six minutes before his consciousness fades. Reality, neighbours, novelists and dreams of a mammoth hunt are nested within one another.",
  "“英雄的苦难是他们的境遇，人们的苦难是自身的生活。”": "“For heroes, suffering lies in their circumstances; for ordinary people, it lies in life itself.”",
  "代达罗斯逃离雅典来到克里特岛，为米诺斯建造迷宫。权力、罪行、父子关系与建筑师对秩序的执念不断彼此缠绕。": "Daedalus flees Athens for Crete and builds a labyrinth for Minos. Power, transgression, the relationship between father and son and the architect’s obsession with order become ever more entangled.",
  "“如果可以的话，我希望你们能拥抱我的灵魂。”": "“If you can, I hope you will embrace my soul.”",
  "以理查德·罗素未经许可驾驶客机升空并最终坠毁的真实事件为起点。死亡之后，他重新面对自己的一生、媒体的凝视、孤独和所谓自由。": "Taking as its starting point the real-life incident in which Richard Russell took off in a passenger aircraft without authorisation and ultimately crashed, the play follows him after death as he confronts his life, the gaze of the media, loneliness and what is called freedom.",
  "“无非就是想要个回答嘛，能怎么样呢？”": "“I just wanted an answer, that’s all. What’s so wrong with that?”",
  "三十一岁的杨翠翠因为骑走一辆电动车被带进派出所。审讯开始后，一个看似荒诞的小事件逐渐牵出她的婚姻、欲望、出身和一整段人生。": "Thirty-one-year-old Yang Cuicui is taken to a police station after riding away on an electric scooter. As the questioning unfolds, an apparently absurd minor incident gradually brings to light her marriage, desires, origins and the course of an entire life.",
  "2022年第一届中国淄博戏剧节首演": "Premiered at the 1st China Zibo Theatre Festival, 2022",
  "第一届中国淄博戏剧节小剧场展演单元优秀编剧奖": "Outstanding Playwright Award, Small Theatre Showcase, 1st China Zibo Theatre Festival",
  "广州西瓜剧场2022年戏剧大赛决赛竞演单元": "Finalist, 2022 Theatre Competition, Xigua Theatre, Guangzhou",
  "2022年第六届南宁市“新青年”戏剧节特邀展演剧目": "Invited production, 6th New Youth Theatre Festival, Nanning, 2022",
  "2023“戏剧中国”年度作品话剧类潜力剧本奖": "Promising Play Award (spoken drama), Theatre China 2023 annual selection",
  "2024年第六届大凉山国际戏剧节参演剧目": "Presented at the 6th Daliangshan International Theatre Festival, 2024",
  "2023年11月8日首演于晋中信息学院": "Premiered at Jinzhong College of Information, 8 November 2023",
  "2024年5月20日二轮演出于晋中信息学院": "Second run at Jinzhong College of Information, 20 May 2024",
  "2024培源艺术节展演剧目": "Presented at the 2024 Peiyuan Arts Festival",
  "广西艺术学院2023届本科毕业生优秀毕业论文奖": "Outstanding Undergraduate Graduation Thesis Award, Guangxi Arts University, 2023",
  "第三十六届中国金鸡百花电影节重点配套活动“2023青年编剧大会”戏剧类剧本优秀奖": "Outstanding Script Award (theatre), 2023 Young Screenwriters and Playwrights Conference, an associated event of the 36th China Golden Rooster and Hundred Flowers Film Festival",
  "2026年5月27日首演于晋中信息学院（全女班）": "Premiered at Jinzhong College of Information, 27 May 2026 (all-female cast)",
  "“戏剧中国”2024年度作品话剧类最佳剧本奖": "Best Play Award (spoken drama), Theatre China 2024 annual selection",
  "入围2025躬耕艺术节青年竞演单元并获“躬耕奖”": "Selected for the youth competition and received the Gonggeng Award, 2025 Gonggeng Arts Festival",
  "2025年第七届大凉山国际戏剧节入选剧目": "Selected for the 7th Daliangshan International Theatre Festival, 2025",
  "2026深圳城市戏剧季特邀剧目": "Invited production, 2026 Shenzhen City Theatre Season",
  "新作，暂无演出、入选或获奖记录。": "New work; no production, selection or award records to date.",
  "共同在场": "Together on Stage",
  "天亮之前，我们在寻找水怪。": "Before dawn, we are searching for the sea monster.",
  "在时间的围猎中，我们曾彼此作证。": "In the hunt of time, we once bore witness to one another.",
  "迷路的人已经沉寂，同行的人留在回声里。": "Those who lost their way have fallen silent; those who walked beside them remain in the echoes.",
  "一个人的独白，也曾由许多人共同托举。": "Even a single person’s monologue was once held up by many.",
  "演员阵容": "Cast",
  "主创与制作": "Creative and production team",
  "制作团队": "Production team",
  "编剧": "Playwright",
  "导演": "Director",
  "编剧 / 导演": "Playwright / Director",
  "编剧、导演": "Playwright and director",
  "化妆设计": "Make-up design",
  "舞美设计 / 海报设计": "Set and poster design",
  "舞美设计": "Scenic design",
  "舞台美术设计": "Scenic design",
  "舞美设计 / 多媒体影像设计": "Scenic and multimedia design",
  "多媒体影像设计": "Multimedia design",
  "人物形象设计": "Character styling",
  "人物妆造设计": "Hair and make-up design",
  "人物服饰设计": "Costume design",
  "平面设计": "Graphic design",
  "海报设计": "Poster design",
  "灯光设计": "Lighting design",
  "导演助理": "Assistant director",
  "舞台监督 / 导演助理": "Stage manager / Assistant director",
  "剧务统筹 / 舞台志愿者团队统筹": "Production and stage volunteer coordination",
  "音乐音效设计": "Music and sound design",
  "服化设计": "Costume and make-up design",
  "剧目制作总监": "Production director",
  "形体动作排演": "Movement direction",
  "执行舞监": "Stage management",
  "幕后跟组团队": "Backstage team",
  "晋中信息学院版": "Jinzhong College of Information production",
  "首演版、广州西瓜剧场演出版": "Premiere and Xigua Theatre, Guangzhou productions",
  "第六届南宁「新青年戏剧节」版": "6th New Youth Theatre Festival, Nanning production",
  "2023 · 首演版": "2023 · Premiere",
  "2024 · 演出版": "2024 · Production",
  "2026 · 首演版（全女班）": "2026 · Premiere (all-female cast)",
  "2024 首演版": "2024 premiere",
  "2024—2025 演出版": "2024–2025 production",
  "2025—2026 演出版": "2025–2026 production",
  "饰 女人（甲）": "Woman A",
  "饰 女人（乙）": "Woman B",
  "饰 女人（丙）": "Woman C",
  "饰 原始人甲": "Prehistoric human A",
  "饰 原始人乙": "Prehistoric human B",
  "饰 原始人丙": "Prehistoric human C",
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
  "饰 幼年的代达罗斯 / 长大后的代达罗斯、侍卫甲、小工": "Young and adult Daedalus / Guard A / Worker",
  "剧照": "Production photographs",
  "横向滑动 · 点击放大": "Swipe horizontally · Tap to enlarge",
  "切换画面 · 点击放大": "Browse · Click to enlarge",
  "左右滑动 · 点图查看完整画面": "Swipe left or right · Tap to view in full",
  "点击放大 · 小屏可横向滑动": "Click to enlarge · Swipe on small screens",
  "上一张剧照": "Previous photograph",
  "下一张剧照": "Next photograph",
  "关闭剧照浏览": "Close photographs",
  "关闭 ×": "Close ×",
  "← → 切换 · Esc 关闭": "← → Browse · Esc to close",
  "横向浏览剧照": "Browse production photographs horizontally",
  "离合悲欢——《她一瞬过载》概念曲": "Partings and Reunions — concept track for ALL AT ONCE",
  "概念：侯宇鑫 · 作曲、编曲：Suno": "Concept: Hou Yuxin · Composition and arrangement: Suno",
  "单曲循环": "Repeat track",
  "已开启": "On",
  "已关闭": "Off",
  "关于我": "About",
  "创作中关注的部分问题": "Questions in my practice",
  "经过": "Selected records",
  "此刻": "Now",
  "联系": "Contact",
  "侯宇鑫，青年戏剧编剧、导演，中国戏剧文学学会会员，文旅演艺高级导演。": "Hou Yuxin is an emerging playwright and theatre director, a member of the Chinese Theatre Literature Society and a senior director in cultural tourism performance.",
  "毕业于广西艺术学院戏剧影视文学系，曾任高校教师，进修于第二届全国“文旅演艺导演高级研修班”。": "A graduate of the Department of Dramatic, Film and Television Literature at Guangxi Arts University, he formerly taught at a university and completed the second national advanced training programme for cultural tourism performance directors.",
  "主要从事戏剧文本创作与舞台导演工作，同时进行诗歌、歌曲写作及跨媒介创作实践。": "His practice centres on playwriting and stage direction, alongside poetry, songwriting and cross-media creative work.",
  "主要作品包括话剧《海边有一栋倾斜的房子》、《猛犸》、《迷宫》、《面向自我的陈述》、《她一瞬过载》，音乐剧《风起形意》等。": "His major works include the plays EXPRESSERS, MAMMOTH, THE LABYRINTH, THE NARROW GATE and ALL AT ONCE, and the musical 风起形意 (Feng Qi Xing Yi).",
  "一些不断出现、又没有固定答案的问题。": "Questions that keep returning, without fixed answers.",
  "当一个人被赋予某种身份，他还能重新选择自己吗？": "When a person is assigned an identity, can they still choose who they are again?",
  "当命运与秩序开始发挥作用，人的行动究竟还有多少余地？": "When fate and order begin to exert their force, how much room for action remains?",
  "记忆能够保存什么？爱情、死亡与时间，又怎样改变我们讲述故事的方式？": "What can memory preserve? How do love, death and time change the way we tell stories?",
  "面对无法轻易解释的生活，笑声和荒诞能否成为表达的方式？": "Faced with a life that defies easy explanation, can laughter and absurdity become ways of expressing it?",
  "语言应当构筑的是空间。": "What language ought to construct is space.",
  "——《语言方式》，2026": "— Modes of Language, 2026",
  "主要创作及演出活动": "Selected creative work and performances",
  "展演": "Performance",
  "入选": "Selection",
  "创作": "Creation",
  "获奖": "Award",
  "AI介入创作": "AI-assisted creation",
  "编导、内容设计": "Writing, directing and content design",
  "导演、剧本改编、演员": "Director, adaptor and performer",
  "联合改编、演员": "Co-adaptor and performer",
  "演员": "Performer",
  "《道德算法》": "Moral Algorithm",
  "《风起形意》": "风起形意 (Feng Qi Xing Yi)",
  "《幽默交换集市》": "Humour Exchange Market",
  "《历史中的轶事一则》": "An Anecdote from History",
  "《冷场有罪》": "Silence Is a Crime",
  "《抛锚》": "Broken Down",
  "《未来实验笔记》": "Notes on Future Experiments",
  "《空间喜剧》": "Spatial Comedy",
  "《安娜的化妆间》": "Anna’s Dressing Room",
  "《面对斯芬克斯》": "Facing the Sphinx",
  "2026年5月27日首演于晋中信息学院乌马河剧院（全女班）。": "Premiered at the Wumahe Theatre, Jinzhong College of Information, on 27 May 2026 (all-female cast).",
  "作为受邀剧目入选2026深圳城市戏剧季。": "Selected as an invited production for the 2026 Shenzhen City Theatre Season.",
  "2026年创作的独角话剧作品。": "Solo play written in 2026.",
  "2026年使用AI平台介入创作的悬疑小剧场话剧。": "Small-theatre suspense play created with the involvement of AI platforms, 2026.",
  "获“戏剧中国”2024年度作品征选活动话剧类最佳剧本奖；获2025躬耕艺术节青年竞演单元“躬耕奖”。": "Best Play Award (spoken drama), Theatre China 2024 annual selection; Gonggeng Award, youth competition, 2025 Gonggeng Arts Festival.",
  "2025躬耕艺术节青年竞演单元；2025年第七届大凉山国际戏剧节。": "Youth competition, 2025 Gonggeng Arts Festival; 7th Daliangshan International Theatre Festival, 2025.",
  "获选山西省教育厅“2025年度省级高校原创文化精品”项目。": "Selected for the 2025 provincial university original cultural works programme of the Shanxi Provincial Department of Education.",
  "2025年即兴喜剧专场。": "Improvised comedy show, 2025.",
  "2025年使用AI平台介入创作的先锋历史话剧。": "Experimental historical play created with the involvement of AI platforms, 2025.",
  "获“戏剧中国”2023年度作品征选活动话剧类潜力剧本奖。": "Promising Play Award (spoken drama), Theatre China 2023 annual selection.",
  "展演于2024年第六届大凉山国际戏剧节。": "Presented at the 6th Daliangshan International Theatre Festival, 2024.",
  "入选并展演于2024北京培源艺术节；展演于2024年第六届大凉山国际戏剧节。": "Selected for and presented at the 2024 Beijing Peiyuan Arts Festival; presented at the 6th Daliangshan International Theatre Festival, 2024.",
  "2024年6月24日在山西保利大剧院演出并于山西省内各高校巡演；展演于2024年第六届大凉山国际戏剧节及第二十二届金刺猬大学生戏剧节。": "Performed at Shanxi Poly Grand Theatre on 24 June 2024 and toured universities in Shanxi; presented at the 6th Daliangshan International Theatre Festival and the 22nd Golden Hedgehog College Theatre Festival, 2024.",
  "获第二十二届金刺猬大学生戏剧节“优秀剧目奖”。": "Outstanding Production Award, 22nd Golden Hedgehog College Theatre Festival.",
  "2024年即兴喜剧专场。": "Improvised comedy show, 2024.",
  "获2023届广西艺术学院本科毕业生优秀毕业论文奖；获第三十六届中国金鸡百花电影节“2023青年编剧大会”戏剧类剧本优秀奖。": "Outstanding Undergraduate Graduation Thesis Award, Guangxi Arts University, 2023; Outstanding Script Award (theatre), 2023 Young Screenwriters and Playwrights Conference, 36th China Golden Rooster and Hundred Flowers Film Festival.",
  "2022年第一届中国淄博戏剧节小剧场话剧展演单元；作为受邀剧目展演于2022年南宁市“新青年”戏剧节。": "Small Theatre Showcase, 1st China Zibo Theatre Festival, 2022; invited production at the 2022 New Youth Theatre Festival in Nanning.",
  "获第一届中国淄博戏剧节小剧场话剧展演单元“优秀编剧奖”。": "Outstanding Playwright Award, Small Theatre Showcase, 1st China Zibo Theatre Festival.",
  "入选广州西瓜剧场2022年戏剧大赛决赛竞演单元。": "Finalist in the 2022 Theatre Competition at Xigua Theatre, Guangzhou.",
  "中国传媒大学与广西艺术学院联合制作，2022年第一届中国淄博戏剧节小剧场展演单元特邀剧目。": "Co-produced by Communication University of China and Guangxi Arts University; invited production, Small Theatre Showcase, 1st China Zibo Theatre Festival, 2022.",
  "获《作家天地》杂志社、《同步悦读》联合主办2022年“同步悦读首届全国文学大赛”诗歌组全国二等奖。": "Second prize nationally (poetry), 2022 inaugural Tongbu Yuedu National Literature Competition, jointly organised by Writers’ World magazine and Tongbu Yuedu.",
  "获2021年第二十六届广西艺术学院校园文化艺术节原创剧本竞赛一等奖。": "First prize, original playwriting competition, 26th Guangxi Arts University Campus Culture and Arts Festival, 2021.",
  "第三届深圳市拉阔戏剧节优秀展演剧目。": "Outstanding showcase production, 3rd Shenzhen Lakuo Theatre Festival.",
  "南宁市“新青年”戏剧节优秀展演剧目，第十届跨文化传播国际学术会议（ICIC）特邀展演剧目。": "Outstanding showcase production, New Youth Theatre Festival, Nanning; invited production at the 10th International Conference on Intercultural Communication (ICIC).",
  "戏剧仍然是主要的创作方式。除此之外，持续写作诗歌与歌词，探索音乐、人工智能与网页媒介参与创作的可能。": "Theatre remains my principal creative medium. Alongside it, I continue to write poetry and lyrics and explore the possibilities of music, artificial intelligence and the web as creative media.",
  "ECHYOX 保存已经完成的作品，也容纳尚在发生的尝试。": "ECHYOX preserves completed works and makes room for experiments still unfolding.",
  "作品、合作与交流。": "Works, collaborations and conversations.",
  "关于天空告诉我的一切": "Everything the Sky Has Told Me",
  "你要问路吗要问路吗问路吗路吗吗？": "Do You Need Directions Do You Need Directions Need Directions Directions Directions?",
  "跃下深渊的动机": "Motif for a Leap into the Abyss",
  "一个哑谜": "A Silent Riddle",
  "2021创作 · 2026完成编曲": "Written in 2021 · Arrangement completed in 2026",
  "作词、作曲：侯宇鑫 · 编曲：Suno": "Lyrics and composition: Hou Yuxin · Arrangement: Suno",
  "作词：侯宇鑫 · 作曲、编曲：Suno": "Lyrics: Hou Yuxin · Composition and arrangement: Suno",
  "作词：侯宇鑫": "Lyrics: Hou Yuxin",
  "作曲、编曲：Suno": "Composition and arrangement: Suno",
  "器乐作品 · 无歌词": "Instrumental · No lyrics",
  "器乐作品，无歌词": "Instrumental, no lyrics",
  "旋律：侯宇鑫 · 发展于 Suno Studio": "Melody: Hou Yuxin · Developed in Suno Studio",
  "歌词": "Lyrics (Chinese)",
  "器乐": "Instrumental",
  "上下滑动": "Scroll vertically",
  "歌词，可单独上下滚动": "Chinese lyrics, independently scrollable",
  "按年份阅读诗歌": "Read poems by year",
  "诗歌扉页": "Poetry opening page",
  "路途遥远，海浪呼啸": "The road is long; the waves roar",
  "一阵风准时吹来": "A gust of wind arrives on time",
  "《语言方式》": "Modes of Language",
  "诗歌目录": "Poetry archive",
  "诗歌 / 侯宇鑫": "Poetry / Hou Yuxin",
  "收起此页，返回诗歌列表": "Close poem and return to archive",
  "收起此页": "Close poem",
  "诗歌全文，可上下滚动": "Full poem in Chinese, scrollable",
  "上一首": "Previous",
  "下一首": "Next",
  "已是第一首诗": "First poem",
  "已是最后一首诗": "Last poem",
  "诗歌扉页，可选择年份阅读": "Poetry opening page; select a year to read",
  "没有，虚无": "Nothing, Nothingness",
  "午后": "Afternoon",
  "夜晚": "Night",
  "五十年后，永恒之前": "Fifty Years Later, Before Eternity",
  "女神": "Goddess",
  "命数的牢笼": "The Cage of Fate",
  "公元某年的村庄（组诗）": "A Village in an Unnamed Year (Poetry Sequence)",
  "浮舟于世": "A Boat Afloat in the World",
  "我": "I",
  "三年后，梦里开的花": "Three Years Later, Flowers Bloom in a Dream",
  "玛吉阿玛": "玛吉阿玛 (Majiama)",
  "岁月": "The Years",
  "浩荡，茫茫": "Vast, Boundless",
  "贫民窟": "Slum",
  "九行诗": "Nine Lines",
  "雨夜": "A Rainy Night",
  "海洋": "Ocean",
  "未来·想象光明·原野·十九岁": "Future · Imagining Light · The Open Fields · Nineteen",
  "姐姐，今晚你死去": "Sister, Tonight You Die",
  "破晓之前的挽歌": "Elegy Before Daybreak",
  "世界的最后边际": "The Furthest Edge of the World",
  "即使光明隐匿黑暗之中": "Even If Light Hides in Darkness",
  "斜阳在末日到来之前的天空高悬（组诗）": "The Setting Sun Hangs High Before the End of the World (Poetry Sequence)",
  "拂遍旷野的梦里的风": "The Wind in a Dream That Sweeps the Wilds",
  "太阳以西的地方（组诗）": "Somewhere West of the Sun (Poetry Sequence)",
  "新娘在落日余晖时刻的史诗": "Epic of a Bride in the Afterglow of Sunset",
  "大河（十九岁的诗）": "The Great River (A Poem at Nineteen)",
  "晚霞在白昼之后这样出现": "This Is How the Evening Glow Appears After Daylight",
  "一声风吟": "A Murmur of Wind",
  "过往诗篇": "Poems from the Past",
  "日出到日落的世间故事（组诗）": "Stories of the World from Sunrise to Sunset (Poetry Sequence)",
  "散佚诗篇：有关天空告诉我的一切（组诗）": "Scattered Poems: Everything the Sky Has Told Me (Poetry Sequence)",
  "醒来": "Wake",
  "一行诗就足以表达一切": "One Line of Poetry Is Enough to Say It All",
  "回答关于黑暗的一切的问题": "Answering All the Questions About Darkness",
  "幸存对我而言意味着什么": "What Survival Means to Me",
  "零伍幺六": "0516",
  "生命理论史稿": "Drafts of a Theory of Life",
  "最后一篇故事": "The Last Story",
  "如何杀死一只卑劣的艺术家": "How to Kill a Vile Artist",
  "自由落体运动": "Free Fall",
  "我们要去烧毁森林": "We Are Going to Burn the Forest",
  "被熄灭的冰封太阳——一种史诗的叙述法": "The Extinguished Frozen Sun — An Epic Mode of Narration",
  "未来实验笔记": "Notes on Future Experiments",
  "情诗延续法则": "Laws of Continuing a Love Poem",
  "而我只是一条孤寂行进的落寞疯狗": "And I Am Only a Forlorn Mad Dog Walking Alone",
  "大河（二零一九与二零二一）": "The Great River (2019 and 2021)",
  "希望的意志是生活的表征": "The Will to Hope Is a Sign of Life",
  "萨尔瓦利·耶斯塔米·K的情诗": "Love Poems of 萨尔瓦利·耶斯塔米·K",
  "思维地震的一场掩埋": "A Burial in an Earthquake of Thought",
  "网罗诗意时刻": "Gathering Poetic Moments",
  "致爱人": "To a Lover",
  "一匹野马奔向高原": "A Wild Horse Runs Towards the Plateau",
  "献给契诃夫": "To Chekhov",
  "月球下行的轨道": "The Moon’s Descending Orbit",
  "快去踏进爱的河里": "Hurry, Step into the River of Love",
  "语言方式": "Modes of Language",
  "凝望浪潮": "Gazing at the Waves",
  "《海边有一栋倾斜的房子》": "EXPRESSERS",
  "《猛犸》": "MAMMOTH",
  "《迷宫》": "THE LABYRINTH",
  "《面向自我的陈述》": "THE NARROW GATE",
  "《她一瞬过载》": "ALL AT ONCE"
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
 return a;
}
const brand=document.querySelector('.brand-link');
if(brand){const wrap=document.createElement('div');wrap.className='language-brand';brand.before(wrap);wrap.append(brand,switchLink());}
const entry=document.querySelector('.entry-gate');
if(entry){const a=switchLink();a.classList.add('entry-language-switch');entry.appendChild(a);}
if(!english)return;
root.lang='en';
function translate(value){
 if(!value)return value;
 const clean=value.trim();
 if(Object.prototype.hasOwnProperty.call(words,clean))return value.replace(clean,words[clean]);
 let m;
 if((m=clean.match(/^(.+?) · (\d{4})$/))&&words[m[1]])return words[m[1]]+' · '+m[2];
 if((m=clean.match(/^(.+?) — 侯宇鑫$/))&&words[m[1]])return words[m[1]]+' — Hou Yuxin';
 if((m=clean.match(/^回到来处：(.+)$/)))return 'Return: '+(words[m[1]]||m[1]);
 if((m=clean.match(/^(\d+) 首$/)))return m[1]+' poems';
 if((m=clean.match(/^阅读(\d{4})年的诗歌$/)))return 'Read poems from '+m[1];
 if((m=clean.match(/^(\d{4})年诗歌目录，(\d+)首$/)))return 'Poetry archive, '+m[1]+' — '+m[2]+' poems';
 if((m=clean.match(/^已显示(\d{4})年的(\d+)首诗$/)))return 'Showing '+m[2]+' poems from '+m[1];
 if((m=clean.match(/^(上一首|下一首)：(.+)$/)))return words[m[1]]+': '+(words[m[2]]||m[2]);
 if((m=clean.match(/^(.*?) \/ 剧本试读$/)))return (words[m[1]]||m[1])+' / Script excerpt (Chinese)';
 if((m=clean.match(/^(.*?) · 试读第 (\d+) 页$/)))return (words[m[1]]||m[1])+' · Excerpt page '+m[2];
 if((m=clean.match(/^(.*?) · 剧照$/)))return (words[m[1]]||m[1])+' · Production photographs';
 if((m=clean.match(/^(放大查看)?(《[^》]+》)剧照 (\d+)$/)))return (m[1]?'Enlarge ':'')+(words[m[2]]||m[2])+' · Photograph '+m[3];
 if((m=clean.match(/^第(\d+)(张|组)，共(\d+)(张|组)$/)))return m[1]+' of '+m[3]+(m[2]==='组'?' groups':' photographs');
 return value;
}
if(document.title==='侯宇鑫 HOU YUXIN')document.title='HOU YUXIN';
else document.title=translate(document.title);
const meta=document.querySelector('meta[name="description"]');
if(meta&&location.pathname.endsWith('becoming.html'))meta.content='Hou Yuxin — playwright and theatre director. Questions in his practice, selected works and current explorations.';
function note(where,copy){if(!where)return;const p=document.createElement('p');p.className='language-note';p.textContent=copy;where.insertAdjacentElement('afterend',p);}
note(document.querySelector('.poetry-page .page-intro'),'Poem titles are translated for browsing. Full poems are presented in their original Chinese.');
note(document.querySelector('#trackList .page-intro'),'Song titles and credits are translated. Lyrics remain in their original Chinese.');
// Retain original Chinese titles as the secondary title in each theatre work.
document.querySelectorAll('.work-hero h1').forEach(h=>{const secondary=h.nextElementSibling;if(secondary&&secondary.classList.contains('work-en')){const original=h.textContent;h.textContent=secondary.textContent;secondary.textContent=original;secondary.lang='zh-CN';secondary.setAttribute('data-keep-original','');}});
document.querySelectorAll('.play-row .title-line .en').forEach(e=>{e.hidden=true;});
document.querySelectorAll('.home .door .no').forEach(e=>{e.hidden=true;});
if(brand){const small=brand.querySelector('small');if(small)small.hidden=true;}
document.querySelectorAll('.poem-text,#poemReaderText,.entry-art').forEach(e=>{e.lang='zh-CN';e.setAttribute('data-keep-original','');});
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