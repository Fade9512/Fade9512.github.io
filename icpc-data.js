// Checklist: 算法技能点清单.xlsx, 技能点 sheet, rows 2–229.
const ICPC_CATEGORIES = [
  {
    "name": "基础能力",
    "focus": "C++ 容器、类型与复杂度",
    "method": "用小程序验证接口与边界，再在限时题中熟练使用。",
    "pitfall": "容器失效、比较器、整数溢出与复杂度估算。",
    "resource": "https://oi-wiki.org/lang/"
  },
  {
    "name": "基础思维",
    "focus": "把复杂枚举改写为可维护的信息",
    "method": "从暴力程序出发，分析重复计算，再证明优化后的单调性或不变量。",
    "pitfall": "边界、重复计数，以及单调性是否成立。",
    "resource": "https://oi-wiki.org/basic/"
  },
  {
    "name": "贪心",
    "focus": "选择规则与正确性证明",
    "method": "先写选择规则，用反例排除错误规则，再尝试交换论证。",
    "pitfall": "“当前最优”需要证明，不能仅凭样例判断。",
    "resource": "https://oi-wiki.org/basic/"
  },
  {
    "name": "图论基础",
    "focus": "建图、遍历与结构识别",
    "method": "先将状态映射成点与边，在小图上手算并核对访问顺序。",
    "pitfall": "有向性、重边、自环、不连通与递归深度。",
    "resource": "https://oi-wiki.org/graph/"
  },
  {
    "name": "最短路",
    "focus": "边权条件决定算法",
    "method": "先判断边权和图规模，再建立距离状态与松弛操作。",
    "pitfall": "负边、不可达、距离溢出；零权边下最短路子图未必是 DAG。",
    "resource": "https://oi-wiki.org/graph/shortest-path/"
  },
  {
    "name": "并查集",
    "focus": "维护集合归属及集合间关系",
    "method": "先做连通性，再扩展到相对关系和历史回滚。",
    "pitfall": "根节点的含义；回滚版本通常不能直接用路径压缩。",
    "resource": "https://oi-wiki.org/ds/"
  },
  {
    "name": "最小生成树",
    "focus": "连通所有点的最小总边权",
    "method": "用小图枚举生成树校验，再研究割与环的性质。",
    "pitfall": "最小生成树不同于最短路树；图不连通时只能得到森林。",
    "resource": "https://oi-wiki.org/graph/"
  },
  {
    "name": "树",
    "focus": "利用无环结构维护路径与子树",
    "method": "先掌握 DFS 序与父子关系，再处理 LCA、路径和换根。",
    "pitfall": "根的选择、深链递归、子树区间与路径的区别。",
    "resource": "https://oi-wiki.org/graph/"
  },
  {
    "name": "Tarjan",
    "focus": "用 DFS 序提取连通结构",
    "method": "分别理解有向图 SCC 和无向图割点、桥，再练缩点。",
    "pitfall": "有向与无向图的 low 定义、父边编号及重边。",
    "resource": "https://oi-wiki.org/graph/"
  },
  {
    "name": "匹配与网络流",
    "focus": "把选择与资源约束建成网络",
    "method": "写清点、边、容量及流量对应的现实意义，再验证建图。",
    "pitfall": "残量边、容量类型，以及流量可行性与目标值。",
    "resource": "https://oi-wiki.org/graph/"
  },
  {
    "name": "动态规划",
    "focus": "状态、转移、顺序和边界",
    "method": "先给状态一句话定义，再推转移、定初始化，最后优化空间。",
    "pitfall": "状态是否完整；不可达状态、循环顺序和转移依赖。",
    "resource": "https://oi-wiki.org/dp/"
  },
  {
    "name": "DP优化",
    "focus": "在正确转移上减少计算",
    "method": "先写未优化 DP，再检查单调性、可分离项或数据结构条件。",
    "pitfall": "先证明优化条件；用随机小数据对拍原始 DP。",
    "resource": "https://oi-wiki.org/dp/"
  },
  {
    "name": "数据结构",
    "focus": "根据查询和修改设计维护信息",
    "method": "先说明区间信息如何合并、修改如何作用，再选择结构。",
    "pitfall": "下标、区间约定、单位元，以及延迟标记的组合顺序。",
    "resource": "https://oi-wiki.org/ds/"
  },
  {
    "name": "字符串",
    "focus": "利用前后缀、自动机和匹配结构",
    "method": "先在短字符串上逐步模拟状态，再做重复、周期和多模式题。",
    "pitfall": "空串、重叠匹配、字符集与哈希碰撞。",
    "resource": "https://oi-wiki.org/string/"
  },
  {
    "name": "数论",
    "focus": "整除、同余、素数和算术函数",
    "method": "先算小整数例子，明确定理条件，再写快速计算。",
    "pitfall": "模数条件、逆元存在性、负余数与乘法溢出。",
    "resource": "https://oi-wiki.org/math/"
  },
  {
    "name": "组合数学",
    "focus": "避免重复与遗漏的计数",
    "method": "先定义计数对象，比较直接计数、补集、容斥和递推。",
    "pitfall": "对象是否有序、是否可重复，以及模意义下的除法。",
    "resource": "https://oi-wiki.org/math/"
  },
  {
    "name": "线性代数",
    "focus": "把关系写成向量、矩阵和线性方程",
    "method": "先手算小矩阵，再练消元、基与线性变换。",
    "pitfall": "实数与模数域的区别、秩、自由变量和数值误差。",
    "resource": "https://oi-wiki.org/math/"
  },
  {
    "name": "博弈论",
    "focus": "从后继状态推导胜负",
    "method": "先画小状态图，标注终止状态，寻找状态递推或可组合结构。",
    "pitfall": "先后手约定、无路可走的规则，以及游戏是否无环。",
    "resource": "https://oi-wiki.org/math/"
  },
  {
    "name": "概率期望",
    "focus": "把随机过程写成状态与方程",
    "method": "先定义随机变量或状态，再利用线性性、转移或方程组求解。",
    "pitfall": "条件概率、吸收条件、自环与期望是否有限。",
    "resource": "https://oi-wiki.org/math/"
  },
  {
    "name": "计算几何",
    "focus": "点、向量与几何谓词",
    "method": "先建立统一点向量工具，再做方向、相交、凸包与扫描线。",
    "pitfall": "共线、重合、端点、精度以及叉积整数溢出。",
    "resource": "https://oi-wiki.org/geometry/"
  },
  {
    "name": "位运算",
    "focus": "用二进制表示状态和集合",
    "method": "先手算掩码与移位，再分析子集枚举和异或性质。",
    "pitfall": "移位范围、符号位、空子集与整数类型。",
    "resource": "https://oi-wiki.org/math/"
  },
  {
    "name": "多项式",
    "focus": "识别卷积与形式幂级数结构",
    "method": "先手算小规模卷积，再对拍朴素乘法与快速算法。",
    "pitfall": "变换长度、模数条件、截断范围和数值误差。",
    "resource": "https://oi-wiki.org/math/"
  },
  {
    "name": "离线算法",
    "focus": "改变处理顺序以复用计算",
    "method": "先确认答案不依赖在线反馈，再组织事件和恢复答案顺序。",
    "pitfall": "排序规则、相等键的先后与数据结构回滚。",
    "resource": "https://oi-wiki.org/misc/"
  },
  {
    "name": "分治",
    "focus": "拆分问题并计算跨区间贡献",
    "method": "写清递归问题、边界与合并操作，再分析递归复杂度。",
    "pitfall": "合并前后的排序不变量，以及跨区间贡献是否重复。",
    "resource": "https://oi-wiki.org/basic/"
  },
  {
    "name": "高级图论",
    "focus": "从约束和图结构识别专门模型",
    "method": "先核对适用结构，再在小实例上验证转换和模板。",
    "pitfall": "不要混淆二分图与一般图、有向割与无向割。",
    "resource": "https://oi-wiki.org/graph/"
  },
  {
    "name": "高级数据结构",
    "focus": "维护动态森林的路径信息",
    "method": "先具备旋转树与懒标记基础，再逐步验证 link、cut 和查询。",
    "pitfall": "辅助树与原树、翻转标记、连通性和非法操作。",
    "resource": "https://oi-wiki.org/ds/"
  }
];
const ICPC_SKILLS = [
  {
    "id": "s001",
    "category": "基础能力",
    "name": "C++ STL 容器与常用算法",
    "priority": "S",
    "standard": "熟练使用 vector/map/set/unordered_map/deque/queue/stack/sort/unique/lower_bound",
    "prerequisite": "C++基础",
    "practiceTarget": 15,
    "sourceRow": 2
  },
  {
    "id": "s002",
    "category": "基础能力",
    "name": "priority_queue 与自定义比较",
    "priority": "S",
    "standard": "能快速写大小根堆和结构体比较器",
    "prerequisite": "C++ STL",
    "practiceTarget": 8,
    "sourceRow": 3
  },
  {
    "id": "s003",
    "category": "基础能力",
    "name": "pair / tuple / lambda",
    "priority": "S",
    "standard": "能自然用于排序、状态存储与局部函数",
    "prerequisite": "C++基础",
    "practiceTarget": 8,
    "sourceRow": 4
  },
  {
    "id": "s004",
    "category": "基础能力",
    "name": "bitset",
    "priority": "A",
    "standard": "会位操作、集合压缩及 bitset 优化",
    "prerequisite": "位运算",
    "practiceTarget": 8,
    "sourceRow": 5,
    "core": "把一个集合或一排布尔状态压成若干机器字。移位后按位或可批量完成可达性转移。",
    "complexity": "一次整段位运算约 O(N/w)，w 为机器字位数。",
    "pitfall": "bitset<N> 的 N 是编译期常量；注意移位方向、范围和位串下标。",
    "practice": "在同一组数据上对拍普通布尔 DP 与 bitset 背包。"
  },
  {
    "id": "s005",
    "category": "基础能力",
    "name": "__int128",
    "priority": "S",
    "standard": "会输入输出与防溢出计算",
    "prerequisite": "整数类型",
    "practiceTarget": 5,
    "sourceRow": 6
  },
  {
    "id": "s006",
    "category": "基础能力",
    "name": "复杂度估算",
    "priority": "S",
    "standard": "看到 n 立刻判断可接受复杂度与常数风险",
    "prerequisite": "渐进复杂度",
    "practiceTarget": 20,
    "sourceRow": 7
  },
  {
    "id": "s007",
    "category": "基础思维",
    "name": "枚举与暴力优化",
    "priority": "S",
    "standard": "会缩减枚举维度、预处理、剪枝",
    "prerequisite": "复杂度估算",
    "practiceTarget": 25,
    "sourceRow": 8
  },
  {
    "id": "s008",
    "category": "基础思维",
    "name": "前缀和",
    "priority": "S",
    "standard": "一维区间和 O(1) 查询",
    "prerequisite": "数组",
    "practiceTarget": 10,
    "sourceRow": 9,
    "core": "设 s[0]=0，s[i+1] 为前 i+1 个数之和。区间 [l,r] 的和用两个前缀相减。",
    "complexity": "预处理 O(n)，每次查询 O(1)，空间 O(n)。",
    "pitfall": "统一下标与区间约定；区间总和可能需要 long long。",
    "practice": "练静态区间求和，再加入负数，比较与逐项累加的结果。",
    "code": "vector<long long> prefixSum(const vector<long long>& a) {\n    vector<long long> s(a.size() + 1, 0);\n    for (int i = 0; i < (int)a.size(); ++i) s[i + 1] = s[i] + a[i];\n    return s;\n}\n// 原数组 0-based，闭区间 [l,r] 的和 = s[r+1] - s[l]。",
    "article": "https://cses.fi/book/book.pdf",
    "problem": {
      "title": "Static Range Sum Queries",
      "url": "https://cses.fi/problemset/task/1646"
    }
  },
  {
    "id": "s009",
    "category": "基础思维",
    "name": "二维前缀和",
    "priority": "S",
    "standard": "矩形和 O(1) 查询",
    "prerequisite": "前缀和",
    "practiceTarget": 8,
    "sourceRow": 10,
    "core": "用左、上两个前缀减去重复区域，构造从原点到每格的矩形和。",
    "complexity": "预处理 O(nm)，矩形查询 O(1)。",
    "pitfall": "容斥符号和第 0 行 / 列的初始化。",
    "practice": "先在 3×4 小矩阵中手算四项容斥，再实现多个矩形查询。"
  },
  {
    "id": "s010",
    "category": "基础思维",
    "name": "差分",
    "priority": "S",
    "standard": "区间修改后线性还原",
    "prerequisite": "前缀和",
    "practiceTarget": 8,
    "sourceRow": 11,
    "core": "将区间加转为两个端点的变化，全部修改完成后做前缀和还原。",
    "complexity": "单次记录修改 O(1)，最终还原 O(n)。",
    "pitfall": "差分适用于批量修改后统一查询；不能直接替代在线区间查询结构。",
    "practice": "从区间加法开始，再思考在线查询为什么需要 BIT 或线段树。"
  },
  {
    "id": "s011",
    "category": "基础思维",
    "name": "二维差分",
    "priority": "A",
    "standard": "矩形批量修改",
    "prerequisite": "差分",
    "practiceTarget": 6,
    "sourceRow": 12
  },
  {
    "id": "s012",
    "category": "基础思维",
    "name": "离散化 / 坐标压缩",
    "priority": "S",
    "standard": "保持相对次序并映射到紧凑整数域",
    "prerequisite": "排序",
    "practiceTarget": 10,
    "sourceRow": 13,
    "core": "只保留数值的相对顺序，将离散的坐标映射到连续编号。",
    "complexity": "排序预处理 O(n log n)，二分查询 O(log n)。",
    "pitfall": "编号差不是原始距离；需要长度时保留真实坐标。",
    "practice": "把大坐标区间统计题压成小下标，检查相等元素映射一致。"
  },
  {
    "id": "s013",
    "category": "基础思维",
    "name": "双指针 / 尺取",
    "priority": "S",
    "standard": "识别单调区间并做到线性扫描",
    "prerequisite": "单调性",
    "practiceTarget": 15,
    "sourceRow": 14,
    "core": "保持左右指针单调移动，以可维护的窗口信息替代重复枚举。",
    "complexity": "若每个指针最多走 n 步且单步维护 O(1)，总计 O(n)。",
    "pitfall": "需要证明窗口调整规则；有负数时，按和移动的常见规则可能失效。",
    "practice": "比较正数数组与含负数数组的区间和题，给出反例。"
  },
  {
    "id": "s014",
    "category": "基础思维",
    "name": "滑动窗口",
    "priority": "S",
    "standard": "维护固定或可变长度窗口信息",
    "prerequisite": "双指针",
    "practiceTarget": 12,
    "sourceRow": 15,
    "core": "维护一个固定或变化长度区间，加入右端并在必要时移出左端。",
    "complexity": "取决于维护信息；频次计数通常 O(n)，堆或树可能 O(n log n)。",
    "pitfall": "删除左端元素后，频次、答案与合法性都要正确更新。",
    "practice": "先做固定长度和，再做无重复元素的最长区间。"
  },
  {
    "id": "s015",
    "category": "基础思维",
    "name": "二分答案",
    "priority": "S",
    "standard": "能证明判定函数单调并正确处理边界",
    "prerequisite": "二分查找",
    "practiceTarget": 20,
    "sourceRow": 16,
    "core": "把“最小可行值”转成判定问题，证明判定随答案单调变化后做二分。",
    "complexity": "O(log R × T_check)，R 为搜索范围大小。",
    "pitfall": "边界必须覆盖答案；检查 mid、累加量和返回的可行性。",
    "practice": "先手列 false/true 边界，再做产量、最小时间或最大最小值题。",
    "code": "// ok(x) 先 false 后 true，且 ok(hi) 为 true。\nlong long firstTrue(long long lo, long long hi,\n                    const function<bool(long long)>& ok) {\n    while (lo < hi) {\n        long long mid = lo + (hi - lo) / 2;\n        if (ok(mid)) hi = mid;\n        else lo = mid + 1;\n    }\n    return lo;\n}",
    "article": "https://cp-algorithms.com/num_methods/binary_search.html",
    "problem": {
      "title": "Factory Machines",
      "url": "https://cses.fi/problemset/task/1620"
    }
  },
  {
    "id": "s016",
    "category": "基础思维",
    "name": "三分",
    "priority": "B",
    "standard": "处理单峰/单谷函数的离散或连续搜索",
    "prerequisite": "单峰性",
    "practiceTarget": 5,
    "sourceRow": 17
  },
  {
    "id": "s017",
    "category": "基础思维",
    "name": "倍增思想",
    "priority": "S",
    "standard": "将跳跃或答案拆成二进制幂",
    "prerequisite": "二进制",
    "practiceTarget": 10,
    "sourceRow": 18
  },
  {
    "id": "s018",
    "category": "基础思维",
    "name": "Meet-in-the-middle",
    "priority": "A",
    "standard": "识别 n≈40 的指数问题并折半",
    "prerequisite": "枚举",
    "practiceTarget": 10,
    "sourceRow": 19,
    "core": "将 n 个对象分成两半，分别枚举状态，再排序、哈希或双指针合并。",
    "complexity": "通常约 O(2^(n/2) poly(n))，具体取决于合并方式。",
    "pitfall": "不能忽略两半合并的时间和内存；重复状态需按题意处理。",
    "practice": "用 n 较小的全集枚举对拍折半的子集和。"
  },
  {
    "id": "s019",
    "category": "基础思维",
    "name": "扫描线思想",
    "priority": "A",
    "standard": "把二维事件按一维排序并动态维护另一维",
    "prerequisite": "排序+数据结构",
    "practiceTarget": 12,
    "sourceRow": 20
  },
  {
    "id": "s020",
    "category": "基础思维",
    "name": "离线处理",
    "priority": "S",
    "standard": "改变询问顺序以换取更低复杂度",
    "prerequisite": "排序",
    "practiceTarget": 15,
    "sourceRow": 21
  },
  {
    "id": "s021",
    "category": "基础思维",
    "name": "贡献法",
    "priority": "S",
    "standard": "从元素/边/位置对总答案的贡献反推",
    "prerequisite": "计数",
    "practiceTarget": 20,
    "sourceRow": 22
  },
  {
    "id": "s022",
    "category": "基础思维",
    "name": "不变量 / 奇偶性",
    "priority": "S",
    "standard": "主动寻找操作前后保持不变的量",
    "prerequisite": "数学思维",
    "practiceTarget": 15,
    "sourceRow": 23
  },
  {
    "id": "s023",
    "category": "基础思维",
    "name": "构造",
    "priority": "S",
    "standard": "从约束反推结构并验证合法性",
    "prerequisite": "思维题",
    "practiceTarget": 20,
    "sourceRow": 24
  },
  {
    "id": "s024",
    "category": "基础思维",
    "name": "随机化",
    "priority": "B",
    "standard": "会 shuffle、随机采样与随机哈希",
    "prerequisite": "概率",
    "practiceTarget": 5,
    "sourceRow": 25
  },
  {
    "id": "s025",
    "category": "贪心",
    "name": "排序贪心",
    "priority": "S",
    "standard": "能给出交换论证或单调性证明",
    "prerequisite": "排序",
    "practiceTarget": 20,
    "sourceRow": 26,
    "core": "先提出一个排序键，再用交换相邻元素或不变量解释为什么该顺序不劣。",
    "complexity": "常见 O(n log n)，但总复杂度还取决于扫描中的操作。",
    "pitfall": "比较器要满足严格弱序；排序键必须有证明。",
    "practice": "找两种看似合理的排序规则，并构造反例淘汰其中一种。",
    "problem": {
      "title": "Tasks and Deadlines",
      "url": "https://cses.fi/problemset/task/1630"
    }
  },
  {
    "id": "s026",
    "category": "贪心",
    "name": "区间贪心",
    "priority": "S",
    "standard": "熟悉按左/右端点排序的选择、覆盖、选点模型",
    "prerequisite": "排序",
    "practiceTarget": 15,
    "sourceRow": 27,
    "core": "区间选择常按右端点排序；覆盖与选点问题的规则可能不同。",
    "complexity": "常见 O(n log n)。",
    "pitfall": "先分清“选择最多不交区间”“覆盖目标”和“最少选点”。",
    "practice": "分别写三个问题的决策规则，检查端点相等时能否共存。",
    "problem": {
      "title": "Movie Festival",
      "url": "https://cses.fi/problemset/task/1629"
    }
  },
  {
    "id": "s027",
    "category": "贪心",
    "name": "优先队列贪心",
    "priority": "S",
    "standard": "排序扫描过程中用堆维护最优候选",
    "prerequisite": "堆",
    "practiceTarget": 15,
    "sourceRow": 28
  },
  {
    "id": "s028",
    "category": "贪心",
    "name": "延迟决策",
    "priority": "S",
    "standard": "在必须决策前保留选择空间",
    "prerequisite": "贪心",
    "practiceTarget": 10,
    "sourceRow": 29
  },
  {
    "id": "s029",
    "category": "贪心",
    "name": "反悔贪心",
    "priority": "A",
    "standard": "先选后撤销，用堆维护当前最优集合",
    "prerequisite": "优先队列",
    "practiceTarget": 12,
    "sourceRow": 30,
    "core": "允许先接受候选，再在出现冲突时撤销代价最大的已选决策，常用堆维护。",
    "complexity": "常见 O(n log n)。",
    "pitfall": "必须证明撤销规则不损害最优性，不能任意选择一个元素删除。",
    "practice": "保留暴力子集程序，在小规模随机实例上验证贪心。"
  },
  {
    "id": "s030",
    "category": "贪心",
    "name": "交换论证",
    "priority": "S",
    "standard": "能严格证明局部交换不劣",
    "prerequisite": "贪心基础",
    "practiceTarget": 10,
    "sourceRow": 31
  },
  {
    "id": "s031",
    "category": "图论基础",
    "name": "图的邻接表存储",
    "priority": "S",
    "standard": "无向/有向/带权图均能快速建图",
    "prerequisite": "C++ STL",
    "practiceTarget": 8,
    "sourceRow": 32
  },
  {
    "id": "s032",
    "category": "图论基础",
    "name": "DFS",
    "priority": "S",
    "standard": "遍历、连通块、树结构统计熟练",
    "prerequisite": "递归/栈",
    "practiceTarget": 15,
    "sourceRow": 33,
    "core": "一次走到不能继续，再回溯；可用于遍历、连通块与树上统计。",
    "complexity": "遍历 O(n+m)，额外栈深度最坏 O(n)。",
    "pitfall": "图中先标记再递归；深链要考虑显式栈以避免栈溢出。",
    "practice": "先做网格连通块，再练树的子树大小和进入 / 退出时机。",
    "problem": {
      "title": "Counting Rooms",
      "url": "https://cses.fi/problemset/task/1192"
    }
  },
  {
    "id": "s033",
    "category": "图论基础",
    "name": "BFS",
    "priority": "S",
    "standard": "无权最短路与层次遍历熟练",
    "prerequisite": "队列",
    "practiceTarget": 15,
    "sourceRow": 34,
    "core": "从起点逐层扩展，节点首次入队时即可确定无权图的最短距离。",
    "complexity": "O(n+m) 时间，O(n) 距离及队列空间。",
    "pitfall": "入队时标记；带一般边权时不能直接按层数当距离。",
    "practice": "在小迷宫中记录父节点，恢复一条最短路。",
    "code": "// 节点编号 [0,n)，不可达节点距离为 -1。\nvector<int> bfs(const vector<vector<int>>& g, int s) {\n    vector<int> d(g.size(), -1);\n    queue<int> q;\n    d[s] = 0; q.push(s);\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        for (int v : g[u]) if (d[v] == -1) {\n            d[v] = d[u] + 1;\n            q.push(v);\n        }\n    }\n    return d;\n}",
    "article": "https://cp-algorithms.com/graph/breadth-first-search.html",
    "problem": {
      "title": "Labyrinth",
      "url": "https://cses.fi/problemset/task/1193"
    }
  },
  {
    "id": "s034",
    "category": "图论基础",
    "name": "多源 BFS",
    "priority": "S",
    "standard": "多个起点同时入队建最短距离层",
    "prerequisite": "BFS",
    "practiceTarget": 8,
    "sourceRow": 35,
    "core": "将所有起点距离置为 0 并同时入队，得到每点到最近起点的距离。",
    "complexity": "O(n+m)。",
    "pitfall": "各起点初始距离相同；时间限制或动态障碍可能需要先后两次 BFS。",
    "practice": "做最近设施距离，再练危险源扩散与人的可行路径。",
    "problem": {
      "title": "Monsters",
      "url": "https://cses.fi/problemset/task/1194"
    }
  },
  {
    "id": "s035",
    "category": "图论基础",
    "name": "0-1 BFS",
    "priority": "S",
    "standard": "边权仅 0/1 时用 deque 求最短路",
    "prerequisite": "BFS+deque",
    "practiceTarget": 10,
    "sourceRow": 36,
    "core": "边权为 0 的松弛放队首，为 1 的放队尾，以双端队列维护距离顺序。",
    "complexity": "标准 0-1 BFS 为 O(n+m)。",
    "pitfall": "普通 BFS 的“首次访问即不再更新”规则不能直接套用。",
    "practice": "用随机 0/1 边权图与 Dijkstra 对拍。",
    "article": "https://cp-algorithms.com/graph/01_bfs.html"
  },
  {
    "id": "s036",
    "category": "图论基础",
    "name": "连通块",
    "priority": "S",
    "standard": "图/网格连通性统计",
    "prerequisite": "DFS/BFS",
    "practiceTarget": 10,
    "sourceRow": 37
  },
  {
    "id": "s037",
    "category": "图论基础",
    "name": "拓扑排序",
    "priority": "S",
    "standard": "Kahn/DFS 思路与 DAG DP 联用",
    "prerequisite": "DAG",
    "practiceTarget": 12,
    "sourceRow": 38,
    "core": "反复删除入度为 0 的点；成功输出 n 个点才说明有向图无环。",
    "complexity": "O(n+m)。",
    "pitfall": "修改入度前保留原数据；拓扑序可以不唯一。",
    "practice": "先输出拓扑序，再在同一顺序上做 DAG 最长路。",
    "code": "// 节点编号 [0,n)。若存在环，返回空序列。\nvector<int> topoSort(const vector<vector<int>>& g) {\n    int n = g.size(); vector<int> deg(n), order;\n    for (auto& edges : g) for (int v : edges) ++deg[v];\n    queue<int> q;\n    for (int u = 0; u < n; ++u) if (!deg[u]) q.push(u);\n    while (!q.empty()) {\n        int u = q.front(); q.pop(); order.push_back(u);\n        for (int v : g[u]) if (--deg[v] == 0) q.push(v);\n    }\n    if ((int)order.size() != n) return {};\n    return order;\n}",
    "article": "https://cp-algorithms.com/graph/topological-sort.html",
    "problem": {
      "title": "Course Schedule",
      "url": "https://cses.fi/problemset/task/1679"
    }
  },
  {
    "id": "s038",
    "category": "图论基础",
    "name": "环检测",
    "priority": "S",
    "standard": "有向/无向图都能判断环",
    "prerequisite": "DFS/DSU",
    "practiceTarget": 8,
    "sourceRow": 39
  },
  {
    "id": "s039",
    "category": "图论基础",
    "name": "二分图判定",
    "priority": "S",
    "standard": "染色并识别奇环",
    "prerequisite": "BFS/DFS",
    "practiceTarget": 10,
    "sourceRow": 40,
    "problem": {
      "title": "Building Teams",
      "url": "https://cses.fi/problemset/task/1668"
    }
  },
  {
    "id": "s040",
    "category": "图论基础",
    "name": "欧拉路 / 欧拉回路",
    "priority": "A",
    "standard": "掌握存在条件与 Hierholzer",
    "prerequisite": "图的度数",
    "practiceTarget": 10,
    "sourceRow": 41
  },
  {
    "id": "s041",
    "category": "最短路",
    "name": "Dijkstra",
    "priority": "S",
    "standard": "堆优化实现，识别非负权图",
    "prerequisite": "优先队列",
    "practiceTarget": 15,
    "sourceRow": 42,
    "core": "非负权图中，反复确定当前最短的未确定距离，并松弛出边。",
    "complexity": "二叉堆实现通常 O((n+m) log n)，空间 O(n+m)。",
    "pitfall": "只适用于非负权；跳过堆中过期状态，并防止距离加法溢出。",
    "practice": "先做单源最短路，再扩展路径恢复和状态图。",
    "code": "using ll = long long;\nconst ll DIJK_INF = numeric_limits<ll>::max() / 4;\n// 所有边权非负；节点编号 [0,n)。g[u] 存 (v,w)。\nvector<ll> dijkstra(const vector<vector<pair<int,ll>>>& g, int s) {\n    vector<ll> d(g.size(), DIJK_INF);\n    priority_queue<pair<ll,int>, vector<pair<ll,int>>, greater<pair<ll,int>>> q;\n    d[s] = 0; q.push({0, s});\n    while (!q.empty()) {\n        auto [du, u] = q.top(); q.pop();\n        if (du != d[u]) continue;\n        for (auto [v, w] : g[u]) {\n            if (w <= DIJK_INF - du && du + w < d[v]) {\n                d[v] = du + w;\n                q.push({d[v], v});\n            }\n        }\n    }\n    return d;\n}",
    "article": "https://cp-algorithms.com/graph/dijkstra_sparse.html",
    "problem": {
      "title": "Shortest Routes I",
      "url": "https://cses.fi/problemset/task/1671"
    }
  },
  {
    "id": "s042",
    "category": "最短路",
    "name": "Floyd-Warshall",
    "priority": "S",
    "standard": "全源最短路与传递闭包",
    "prerequisite": "DP",
    "practiceTarget": 8,
    "sourceRow": 43,
    "core": "按中间点 k 逐步扩大允许经过的点集，用 d[i][k]+d[k][j] 更新 d[i][j]。",
    "complexity": "O(n^3) 时间、O(n^2) 空间。",
    "pitfall": "k 必须在最外层；无穷大相加和重边取最小值要处理。",
    "practice": "与多次 Dijkstra 在非负小图上对拍。",
    "article": "https://cp-algorithms.com/graph/all-pair-shortest-path-floyd-warshall.html",
    "problem": {
      "title": "Shortest Routes II",
      "url": "https://cses.fi/problemset/task/1672"
    }
  },
  {
    "id": "s043",
    "category": "最短路",
    "name": "Bellman-Ford",
    "priority": "A",
    "standard": "负边与负环检测",
    "prerequisite": "最短路",
    "practiceTarget": 6,
    "sourceRow": 44
  },
  {
    "id": "s044",
    "category": "最短路",
    "name": "状态图最短路",
    "priority": "S",
    "standard": "把状态并入节点，如 (v,mask)",
    "prerequisite": "BFS/Dijkstra+状态设计",
    "practiceTarget": 20,
    "sourceRow": 45
  },
  {
    "id": "s045",
    "category": "最短路",
    "name": "分层图",
    "priority": "A",
    "standard": "把特殊操作次数扩成层",
    "prerequisite": "状态图",
    "practiceTarget": 10,
    "sourceRow": 46
  },
  {
    "id": "s046",
    "category": "最短路",
    "name": "最短路 DAG",
    "priority": "A",
    "standard": "提取所有最短路相关边并在 DAG 上处理",
    "prerequisite": "Dijkstra",
    "practiceTarget": 8,
    "sourceRow": 47,
    "core": "保留满足 d[u]+w=d[v] 的边以分析最短路结构。",
    "complexity": "先求距离，再扫描边 O(m)；其余复杂度取决于结构处理。",
    "pitfall": "严格正权时距离递增，可形成 DAG；零权边可能构成环，需另行处理。",
    "practice": "分别画正权与零权反例，再讨论最短路计数的可用条件。"
  },
  {
    "id": "s047",
    "category": "最短路",
    "name": "次短路",
    "priority": "A",
    "standard": "维护第一/第二短距离",
    "prerequisite": "Dijkstra",
    "practiceTarget": 8,
    "sourceRow": 48
  },
  {
    "id": "s048",
    "category": "最短路",
    "name": "第 K 短路",
    "priority": "B",
    "standard": "了解 A* / 多次扩展思路",
    "prerequisite": "Dijkstra",
    "practiceTarget": 5,
    "sourceRow": 49
  },
  {
    "id": "s049",
    "category": "最短路",
    "name": "Johnson",
    "priority": "C",
    "standard": "了解稀疏图全源最短路重标权",
    "prerequisite": "Bellman-Ford+Dijkstra",
    "practiceTarget": 3,
    "sourceRow": 50
  },
  {
    "id": "s050",
    "category": "并查集",
    "name": "普通并查集",
    "priority": "S",
    "standard": "路径压缩+按秩/大小合并",
    "prerequisite": "树",
    "practiceTarget": 10,
    "sourceRow": 51,
    "core": "用代表元记录集合归属，合并集合时按大小，并在查找时压缩路径。",
    "complexity": "均摊每次 O(α(n))，空间 O(n)。",
    "pitfall": "只能高效合并，不能直接删除边；集合大小应在根上维护。",
    "practice": "先做连通性，再做按时间或边权排序的离线合并。",
    "code": "struct DSU {\n    vector<int> p, sz;\n    explicit DSU(int n): p(n), sz(n, 1) { iota(p.begin(), p.end(), 0); }\n    int find(int x) {\n        while (p[x] != x) { p[x] = p[p[x]]; x = p[x]; }\n        return x;\n    }\n    bool unite(int a, int b) {\n        a = find(a); b = find(b);\n        if (a == b) return false;\n        if (sz[a] < sz[b]) swap(a, b);\n        p[b] = a; sz[a] += sz[b];\n        return true;\n    }\n};",
    "article": "https://atcoder.github.io/ac-library/production/document_en/dsu.html",
    "problem": {
      "title": "Building Roads",
      "url": "https://cses.fi/problemset/task/1666"
    }
  },
  {
    "id": "s051",
    "category": "并查集",
    "name": "带权并查集",
    "priority": "A",
    "standard": "维护节点到父节点的相对关系",
    "prerequisite": "DSU",
    "practiceTarget": 10,
    "sourceRow": 52
  },
  {
    "id": "s052",
    "category": "并查集",
    "name": "扩展域并查集",
    "priority": "A",
    "standard": "多类关系拆域建模",
    "prerequisite": "DSU",
    "practiceTarget": 8,
    "sourceRow": 53
  },
  {
    "id": "s053",
    "category": "并查集",
    "name": "可撤销并查集",
    "priority": "B",
    "standard": "支持回滚历史合并",
    "prerequisite": "DSU+栈",
    "practiceTarget": 6,
    "sourceRow": 54
  },
  {
    "id": "s054",
    "category": "最小生成树",
    "name": "Kruskal",
    "priority": "S",
    "standard": "排序边+DSU，能证明正确性",
    "prerequisite": "DSU",
    "practiceTarget": 12,
    "sourceRow": 55,
    "core": "按边权从小到大尝试加入边，用并查集避免环，直到连接所有点。",
    "complexity": "排序 O(m log m)，并查集合并近线性。",
    "pitfall": "图不连通时不能返回“一棵生成树”；总权值使用足够宽的类型。",
    "practice": "将小图所有生成树枚举结果与算法对照。",
    "problem": {
      "title": "Road Reparation",
      "url": "https://cses.fi/problemset/task/1675"
    }
  },
  {
    "id": "s055",
    "category": "最小生成树",
    "name": "Prim",
    "priority": "A",
    "standard": "稠密/特殊图上的 MST",
    "prerequisite": "优先队列",
    "practiceTarget": 6,
    "sourceRow": 56
  },
  {
    "id": "s056",
    "category": "最小生成树",
    "name": "MST Cut/Cycle 性质",
    "priority": "S",
    "standard": "能用性质解决非裸 MST 题",
    "prerequisite": "Kruskal",
    "practiceTarget": 10,
    "sourceRow": 57
  },
  {
    "id": "s057",
    "category": "最小生成树",
    "name": "次小生成树",
    "priority": "A",
    "standard": "MST + 路径最大边替换",
    "prerequisite": "LCA/MST",
    "practiceTarget": 8,
    "sourceRow": 58
  },
  {
    "id": "s058",
    "category": "最小生成树",
    "name": "Kruskal 重构树",
    "priority": "B",
    "standard": "按边权合并构造树处理瓶颈类询问",
    "prerequisite": "MST+DSU",
    "practiceTarget": 6,
    "sourceRow": 59
  },
  {
    "id": "s059",
    "category": "树",
    "name": "树的 DFS / 子树大小 / 深度",
    "priority": "S",
    "standard": "一遍 DFS 维护父亲、深度、子树",
    "prerequisite": "DFS",
    "practiceTarget": 12,
    "sourceRow": 60
  },
  {
    "id": "s060",
    "category": "树",
    "name": "树的直径",
    "priority": "S",
    "standard": "两次 DFS/BFS 或树 DP",
    "prerequisite": "树遍历",
    "practiceTarget": 10,
    "sourceRow": 61,
    "problem": {
      "title": "Tree Diameter",
      "url": "https://cses.fi/problemset/task/1131"
    }
  },
  {
    "id": "s061",
    "category": "树",
    "name": "树的重心",
    "priority": "A",
    "standard": "定义、求法及分治前置",
    "prerequisite": "子树大小",
    "practiceTarget": 8,
    "sourceRow": 62
  },
  {
    "id": "s062",
    "category": "树",
    "name": "LCA 倍增",
    "priority": "S",
    "standard": "O(nlogn) 预处理，O(logn) 查询",
    "prerequisite": "倍增+DFS",
    "practiceTarget": 15,
    "sourceRow": 63,
    "core": "预处理每个点的 2^k 级祖先，先抬平深度，再同时向上跳。",
    "complexity": "预处理 O(n log n)，每次 LCA 查询 O(log n)。",
    "pitfall": "根的父节点、最大层数、深度差的位运算。",
    "practice": "结合深度计算两点距离，再做树上路径题。",
    "article": "https://cp-algorithms.com/graph/lca_binary_lifting.html",
    "problem": {
      "title": "Distance Queries",
      "url": "https://cses.fi/problemset/task/1135"
    }
  },
  {
    "id": "s063",
    "category": "树",
    "name": "Euler Tour / DFS 序",
    "priority": "S",
    "standard": "子树映射为连续区间",
    "prerequisite": "DFS",
    "practiceTarget": 12,
    "sourceRow": 64
  },
  {
    "id": "s064",
    "category": "树",
    "name": "树上距离",
    "priority": "S",
    "standard": "dist(u,v)=dep[u]+dep[v]-2dep[lca]",
    "prerequisite": "LCA",
    "practiceTarget": 8,
    "sourceRow": 65
  },
  {
    "id": "s065",
    "category": "树",
    "name": "树上差分",
    "priority": "A",
    "standard": "点差分/边差分后自底向上汇总",
    "prerequisite": "LCA",
    "practiceTarget": 10,
    "sourceRow": 66
  },
  {
    "id": "s066",
    "category": "树",
    "name": "树链剖分",
    "priority": "A",
    "standard": "路径拆成 O(log n) 个连续区间",
    "prerequisite": "DFS序+线段树",
    "practiceTarget": 18,
    "sourceRow": 67
  },
  {
    "id": "s067",
    "category": "树",
    "name": "虚树",
    "priority": "B",
    "standard": "只保留关键点与必要 LCA 建压缩树",
    "prerequisite": "LCA",
    "practiceTarget": 6,
    "sourceRow": 68
  },
  {
    "id": "s068",
    "category": "树",
    "name": "点分治",
    "priority": "B",
    "standard": "按重心分治处理路径统计",
    "prerequisite": "树重心",
    "practiceTarget": 10,
    "sourceRow": 69
  },
  {
    "id": "s069",
    "category": "树",
    "name": "DSU on Tree",
    "priority": "B",
    "standard": "小并大维护子树信息",
    "prerequisite": "DFS序/启发式合并",
    "practiceTarget": 8,
    "sourceRow": 70
  },
  {
    "id": "s070",
    "category": "树",
    "name": "长链剖分",
    "priority": "C",
    "standard": "了解基于重儿子深度的 DP 优化",
    "prerequisite": "树DP",
    "practiceTarget": 3,
    "sourceRow": 71
  },
  {
    "id": "s071",
    "category": "Tarjan",
    "name": "SCC 强连通分量",
    "priority": "S",
    "standard": "Tarjan/Kosaraju 至少熟练一种",
    "prerequisite": "DFS lowlink",
    "practiceTarget": 15,
    "sourceRow": 72,
    "core": "把互相可达的点压成强连通分量；分量图是 DAG。",
    "complexity": "Tarjan 或 Kosaraju 均可做到 O(n+m)。",
    "pitfall": "Tarjan 的栈内标记和 low 更新规则；不能与无向图判桥模板混用。",
    "practice": "先标分量，再对缩点后的 DAG 做路径统计。",
    "article": "https://cp-algorithms.com/graph/strongly-connected-components.html"
  },
  {
    "id": "s072",
    "category": "Tarjan",
    "name": "SCC 缩点",
    "priority": "S",
    "standard": "强连通分量缩成 DAG 后继续 DP/统计",
    "prerequisite": "SCC+DAG",
    "practiceTarget": 12,
    "sourceRow": 73
  },
  {
    "id": "s073",
    "category": "Tarjan",
    "name": "割点",
    "priority": "A",
    "standard": "掌握 low/d fn 判定条件",
    "prerequisite": "Tarjan",
    "practiceTarget": 8,
    "sourceRow": 74
  },
  {
    "id": "s074",
    "category": "Tarjan",
    "name": "桥",
    "priority": "A",
    "standard": "掌握 low[v] > dfn[u]",
    "prerequisite": "Tarjan",
    "practiceTarget": 8,
    "sourceRow": 75
  },
  {
    "id": "s075",
    "category": "Tarjan",
    "name": "边双连通分量",
    "priority": "A",
    "standard": "删桥后连通块及桥树",
    "prerequisite": "桥",
    "practiceTarget": 8,
    "sourceRow": 76
  },
  {
    "id": "s076",
    "category": "Tarjan",
    "name": "点双连通分量",
    "priority": "B",
    "standard": "掌握点双与圆方树概念",
    "prerequisite": "割点",
    "practiceTarget": 6,
    "sourceRow": 77
  },
  {
    "id": "s077",
    "category": "Tarjan",
    "name": "Block-Cut Tree / 圆方树",
    "priority": "B",
    "standard": "把点双结构转成树处理",
    "prerequisite": "点双",
    "practiceTarget": 6,
    "sourceRow": 78
  },
  {
    "id": "s078",
    "category": "匹配与网络流",
    "name": "二分图最大匹配",
    "priority": "S",
    "standard": "会建左右部图并求最大匹配",
    "prerequisite": "二分图",
    "practiceTarget": 12,
    "sourceRow": 79
  },
  {
    "id": "s079",
    "category": "匹配与网络流",
    "name": "匈牙利算法",
    "priority": "A",
    "standard": "DFS 增广实现",
    "prerequisite": "二分图匹配",
    "practiceTarget": 8,
    "sourceRow": 80
  },
  {
    "id": "s080",
    "category": "匹配与网络流",
    "name": "Hopcroft-Karp",
    "priority": "A",
    "standard": "了解分层增广优化",
    "prerequisite": "二分图匹配",
    "practiceTarget": 5,
    "sourceRow": 81
  },
  {
    "id": "s081",
    "category": "匹配与网络流",
    "name": "Dinic 最大流",
    "priority": "S",
    "standard": "熟练写 BFS 分层 + DFS 增广",
    "prerequisite": "图论",
    "practiceTarget": 15,
    "sourceRow": 82
  },
  {
    "id": "s082",
    "category": "匹配与网络流",
    "name": "最小割",
    "priority": "S",
    "standard": "理解最大流最小割与割的建模",
    "prerequisite": "Dinic",
    "practiceTarget": 12,
    "sourceRow": 83
  },
  {
    "id": "s083",
    "category": "匹配与网络流",
    "name": "König 定理 / 最小点覆盖",
    "priority": "A",
    "standard": "二分图最大匹配与最小点覆盖互化",
    "prerequisite": "匹配",
    "practiceTarget": 8,
    "sourceRow": 84
  },
  {
    "id": "s084",
    "category": "匹配与网络流",
    "name": "DAG 最小路径覆盖",
    "priority": "A",
    "standard": "转二分图匹配",
    "prerequisite": "匹配+DAG",
    "practiceTarget": 8,
    "sourceRow": 85
  },
  {
    "id": "s085",
    "category": "匹配与网络流",
    "name": "费用流",
    "priority": "A",
    "standard": "最短路增广并维护费用",
    "prerequisite": "最大流+最短路",
    "practiceTarget": 12,
    "sourceRow": 86
  },
  {
    "id": "s086",
    "category": "匹配与网络流",
    "name": "上下界网络流",
    "priority": "B",
    "standard": "无源/有源上下界可行流转换",
    "prerequisite": "最大流",
    "practiceTarget": 6,
    "sourceRow": 87
  },
  {
    "id": "s087",
    "category": "匹配与网络流",
    "name": "最大权闭合子图",
    "priority": "B",
    "standard": "点权选择约束转最小割",
    "prerequisite": "最小割",
    "practiceTarget": 6,
    "sourceRow": 88
  },
  {
    "id": "s088",
    "category": "匹配与网络流",
    "name": "Hall 定理",
    "priority": "B",
    "standard": "会用于存在性证明和匹配判定",
    "prerequisite": "组合数学+匹配",
    "practiceTarget": 5,
    "sourceRow": 89
  },
  {
    "id": "s089",
    "category": "动态规划",
    "name": "线性 DP",
    "priority": "S",
    "standard": "状态定义、转移、边界、滚动优化",
    "prerequisite": "递推",
    "practiceTarget": 20,
    "sourceRow": 90,
    "core": "用状态表示前缀或位置的最优值 / 计数，按依赖顺序转移。",
    "complexity": "状态数 × 每个状态的转移代价。",
    "pitfall": "先定义状态，再决定初值；不可达状态不能无条件参与转移。",
    "practice": "用递归枚举与记忆化搜索对照，再改为递推。",
    "problem": {
      "title": "Dice Combinations",
      "url": "https://cses.fi/problemset/task/1633"
    }
  },
  {
    "id": "s090",
    "category": "动态规划",
    "name": "LIS",
    "priority": "S",
    "standard": "O(nlogn) tails/二分实现",
    "prerequisite": "二分",
    "practiceTarget": 10,
    "sourceRow": 91,
    "core": "维护每种长度递增子序列的最小末尾值，用 lower_bound 找替换位置。",
    "complexity": "O(n log n) 时间、O(n) 空间。",
    "pitfall": "严格递增用 lower_bound；不下降用 upper_bound。tails 本身通常不是原序列中的一条 LIS。",
    "practice": "与 O(n^2) DP 对拍，重点测试重复元素。",
    "code": "// 严格递增子序列长度；若求不下降子序列，改用 upper_bound。\nint lisLength(const vector<int>& a) {\n    vector<int> tails;\n    for (int x : a) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    return (int)tails.size();\n}",
    "article": "https://cp-algorithms.com/dynamic_programming/longest_increasing_subsequence.html",
    "problem": {
      "title": "Increasing Subsequence",
      "url": "https://cses.fi/problemset/task/1145"
    }
  },
  {
    "id": "s091",
    "category": "动态规划",
    "name": "LCS",
    "priority": "S",
    "standard": "经典二维 DP 与变体建模",
    "prerequisite": "二维DP",
    "practiceTarget": 8,
    "sourceRow": 92
  },
  {
    "id": "s092",
    "category": "动态规划",
    "name": "最大子段和",
    "priority": "S",
    "standard": "Kadane 与前缀最小值视角",
    "prerequisite": "线性DP",
    "practiceTarget": 8,
    "sourceRow": 93,
    "core": "设 f[i] 为以 i 结尾的最大子段和，在重新开始和延长前一段之间选择。",
    "complexity": "O(n) 时间，可用 O(1) 额外空间。",
    "pitfall": "题目是否允许空子段；全负数组必须单独核对初始化。",
    "practice": "先写 O(n^2) 前缀和枚举，再推线性递推。",
    "problem": {
      "title": "Maximum Subarray Sum",
      "url": "https://cses.fi/problemset/task/1643"
    }
  },
  {
    "id": "s093",
    "category": "动态规划",
    "name": "编辑距离",
    "priority": "A",
    "standard": "插入删除替换二维 DP",
    "prerequisite": "二维DP",
    "practiceTarget": 6,
    "sourceRow": 94,
    "problem": {
      "title": "Edit Distance",
      "url": "https://cses.fi/problemset/task/1639"
    }
  },
  {
    "id": "s094",
    "category": "动态规划",
    "name": "0/1 背包",
    "priority": "S",
    "standard": "倒序容量转移",
    "prerequisite": "线性DP",
    "practiceTarget": 12,
    "sourceRow": 95,
    "core": "每件物品只用一次，容量倒序使转移读取上一件物品处理后的状态。",
    "complexity": "O(nW) 时间、O(W) 空间。",
    "pitfall": "容量正序会改变为可重复选取；恰好装满与不超过容量的初始化不同。",
    "practice": "手画两件物品的二维表，再压缩成一维并解释倒序。",
    "code": "// 每件最多选一次；w[i] > 0；容量为 W，不要求恰好装满。\nlong long knapsack01(const vector<int>& w, const vector<long long>& v, int W) {\n    vector<long long> f(W + 1, 0);\n    for (int i = 0; i < (int)w.size(); ++i)\n        for (int j = W; j >= w[i]; --j)\n            f[j] = max(f[j], f[j-w[i]] + v[i]);\n    return f[W];\n}",
    "article": "https://cp-algorithms.com/dynamic_programming/knapsack.html",
    "problem": {
      "title": "Book Shop",
      "url": "https://cses.fi/problemset/task/1158"
    }
  },
  {
    "id": "s095",
    "category": "动态规划",
    "name": "完全背包",
    "priority": "S",
    "standard": "正序容量转移",
    "prerequisite": "背包",
    "practiceTarget": 10,
    "sourceRow": 96,
    "core": "每类物品可重复使用，容量正序允许读取本轮已经更新的状态。",
    "complexity": "O(nW) 时间、O(W) 空间。",
    "pitfall": "要求正体积；计数题中的“组合 / 排列”还受两层循环顺序影响。",
    "practice": "与 0/1 背包共用小数据，说明循环方向改变了什么。",
    "code": "// 每类物品可无限选；w[i] > 0；不要求恰好装满。\nlong long knapsackComplete(const vector<int>& w, const vector<long long>& v, int W) {\n    vector<long long> f(W + 1, 0);\n    for (int i = 0; i < (int)w.size(); ++i)\n        for (int j = w[i]; j <= W; ++j)\n            f[j] = max(f[j], f[j-w[i]] + v[i]);\n    return f[W];\n}",
    "article": "https://cp-algorithms.com/dynamic_programming/knapsack.html",
    "problem": {
      "title": "Minimizing Coins",
      "url": "https://cses.fi/problemset/task/1634"
    }
  },
  {
    "id": "s096",
    "category": "动态规划",
    "name": "多重背包",
    "priority": "A",
    "standard": "二进制拆分/单调队列优化",
    "prerequisite": "背包",
    "practiceTarget": 8,
    "sourceRow": 97
  },
  {
    "id": "s097",
    "category": "动态规划",
    "name": "分组背包",
    "priority": "A",
    "standard": "每组至多选一个",
    "prerequisite": "背包",
    "practiceTarget": 8,
    "sourceRow": 98
  },
  {
    "id": "s098",
    "category": "动态规划",
    "name": "二维背包",
    "priority": "A",
    "standard": "多约束容量",
    "prerequisite": "背包",
    "practiceTarget": 6,
    "sourceRow": 99
  },
  {
    "id": "s099",
    "category": "动态规划",
    "name": "bitset 背包",
    "priority": "A",
    "standard": "用位运算优化可达性",
    "prerequisite": "bitset+背包",
    "practiceTarget": 8,
    "sourceRow": 100
  },
  {
    "id": "s100",
    "category": "动态规划",
    "name": "区间 DP",
    "priority": "S",
    "standard": "以长度递增处理 dp[l][r]",
    "prerequisite": "DP",
    "practiceTarget": 15,
    "sourceRow": 101,
    "core": "用 [l,r] 作为状态，按区间长度递增处理，并考虑分割或端点决策。",
    "complexity": "常见 O(n^3)，若只依赖两端也可能 O(n^2)。",
    "pitfall": "空区间、长度为 1 的边界，以及分割点范围。",
    "practice": "从端点博弈或合并代价出发，画完整依赖表。",
    "problem": {
      "title": "Removal Game",
      "url": "https://cses.fi/problemset/task/1097"
    }
  },
  {
    "id": "s101",
    "category": "动态规划",
    "name": "环形 DP",
    "priority": "A",
    "standard": "断环成链或复制数组",
    "prerequisite": "区间DP",
    "practiceTarget": 6,
    "sourceRow": 102
  },
  {
    "id": "s102",
    "category": "动态规划",
    "name": "树形 DP",
    "priority": "S",
    "standard": "子树状态合并",
    "prerequisite": "树+DP",
    "practiceTarget": 15,
    "sourceRow": 103
  },
  {
    "id": "s103",
    "category": "动态规划",
    "name": "换根 DP",
    "priority": "S",
    "standard": "两遍 DFS 传递全局信息",
    "prerequisite": "树形DP",
    "practiceTarget": 15,
    "sourceRow": 104
  },
  {
    "id": "s104",
    "category": "动态规划",
    "name": "树上背包",
    "priority": "A",
    "standard": "子树合并容量状态",
    "prerequisite": "树DP+背包",
    "practiceTarget": 10,
    "sourceRow": 105
  },
  {
    "id": "s105",
    "category": "动态规划",
    "name": "状态压缩 DP",
    "priority": "S",
    "standard": "bitmask 表示集合并设计状态",
    "prerequisite": "位运算+DP",
    "practiceTarget": 15,
    "sourceRow": 106,
    "core": "用二进制掩码表示已选集合，再将当前点或其他必要信息并入状态。",
    "complexity": "常见 O(2^n poly(n))，先估算状态空间。",
    "pitfall": "需要分清“集合”与“访问顺序”；状态内存可能先于时间成为瓶颈。",
    "practice": "在 n<=8 时枚举全排列，对拍更一般的状态转移。"
  },
  {
    "id": "s106",
    "category": "动态规划",
    "name": "TSP 状压 DP",
    "priority": "S",
    "standard": "dp[mask][last] 经典模型",
    "prerequisite": "状压DP",
    "practiceTarget": 8,
    "sourceRow": 107
  },
  {
    "id": "s107",
    "category": "动态规划",
    "name": "枚举子集技巧",
    "priority": "S",
    "standard": "for(s=mask;s;s=(s-1)&mask)，理解 3^n",
    "prerequisite": "位运算",
    "practiceTarget": 8,
    "sourceRow": 108
  },
  {
    "id": "s108",
    "category": "动态规划",
    "name": "数位 DP",
    "priority": "A",
    "standard": "tight/leading zero/记忆化",
    "prerequisite": "递归DP",
    "practiceTarget": 12,
    "sourceRow": 109
  },
  {
    "id": "s109",
    "category": "动态规划",
    "name": "SOS DP",
    "priority": "B",
    "standard": "子集/超集和变换",
    "prerequisite": "状压DP",
    "practiceTarget": 6,
    "sourceRow": 110
  },
  {
    "id": "s110",
    "category": "动态规划",
    "name": "轮廓 / 插头 DP",
    "priority": "B",
    "standard": "网格边界状态压缩",
    "prerequisite": "状压DP",
    "practiceTarget": 5,
    "sourceRow": 111
  },
  {
    "id": "s111",
    "category": "DP优化",
    "name": "滚动数组",
    "priority": "S",
    "standard": "识别只依赖相邻层并压空间",
    "prerequisite": "DP",
    "practiceTarget": 8,
    "sourceRow": 112
  },
  {
    "id": "s112",
    "category": "DP优化",
    "name": "前缀和优化 DP",
    "priority": "S",
    "standard": "把区间转移和降维",
    "prerequisite": "前缀和+DP",
    "practiceTarget": 10,
    "sourceRow": 113
  },
  {
    "id": "s113",
    "category": "DP优化",
    "name": "单调队列优化 DP",
    "priority": "A",
    "standard": "转移窗口有单调最值结构",
    "prerequisite": "单调队列",
    "practiceTarget": 10,
    "sourceRow": 114
  },
  {
    "id": "s114",
    "category": "DP优化",
    "name": "数据结构优化 DP",
    "priority": "A",
    "standard": "BIT/线段树维护转移最值",
    "prerequisite": "DP+数据结构",
    "practiceTarget": 12,
    "sourceRow": 115
  },
  {
    "id": "s115",
    "category": "DP优化",
    "name": "斜率优化 / CHT",
    "priority": "B",
    "standard": "识别线性函数最值转移",
    "prerequisite": "代数变形+DP",
    "practiceTarget": 8,
    "sourceRow": 116
  },
  {
    "id": "s116",
    "category": "DP优化",
    "name": "李超线段树优化 DP",
    "priority": "B",
    "standard": "动态维护直线集合查询最值",
    "prerequisite": "CHT+线段树",
    "practiceTarget": 6,
    "sourceRow": 117
  },
  {
    "id": "s117",
    "category": "DP优化",
    "name": "分治优化 DP",
    "priority": "B",
    "standard": "满足单调决策点时优化分层 DP",
    "prerequisite": "DP",
    "practiceTarget": 6,
    "sourceRow": 118
  },
  {
    "id": "s118",
    "category": "DP优化",
    "name": "Knuth 优化",
    "priority": "C",
    "standard": "了解四边形不等式与区间 DP 优化",
    "prerequisite": "区间DP",
    "practiceTarget": 3,
    "sourceRow": 119
  },
  {
    "id": "s119",
    "category": "数据结构",
    "name": "单调栈",
    "priority": "S",
    "standard": "求左右第一个更大/更小、贡献统计",
    "prerequisite": "栈",
    "practiceTarget": 15,
    "sourceRow": 120,
    "core": "维护单调的候选栈，弹出不可能再成为答案的元素。",
    "complexity": "每个元素最多入栈、出栈一次，总 O(n)。",
    "pitfall": "相等元素保留哪一个取决于严格 / 非严格关系和计数约定。",
    "practice": "先练左右最近更小元素，再用区间贡献统计答案。",
    "problem": {
      "title": "Nearest Smaller Values",
      "url": "https://cses.fi/problemset/task/1645"
    }
  },
  {
    "id": "s120",
    "category": "数据结构",
    "name": "单调队列",
    "priority": "S",
    "standard": "滑动窗口最值及 DP 优化",
    "prerequisite": "队列",
    "practiceTarget": 12,
    "sourceRow": 121,
    "core": "队列下标递增、值按需要单调，删除过期和被支配的候选。",
    "complexity": "固定窗口最值 O(n)。",
    "pitfall": "先删除过期下标，再输出合法窗口；相等值的处理影响最靠左 / 右位置。",
    "practice": "与朴素逐窗口求最大值对拍，测试 k=1 与 k=n。"
  },
  {
    "id": "s121",
    "category": "数据结构",
    "name": "树状数组 BIT",
    "priority": "S",
    "standard": "单点改+前缀和查询",
    "prerequisite": "前缀和+lowbit",
    "practiceTarget": 15,
    "sourceRow": 122,
    "core": "用 lowbit 将前缀分解成若干段，实现点更新和前缀聚合。",
    "complexity": "单点修改与前缀查询均 O(log n)，空间 O(n)。",
    "pitfall": "本模板为 1-based，下标 0 更新会死循环；区间和需要可逆的前缀运算。",
    "practice": "先练动态区间和，再扩展逆序对和离散化。",
    "code": "struct Fenwick {\n    int n; vector<long long> t;\n    explicit Fenwick(int n): n(n), t(n + 1, 0) {}\n    // 1 <= i <= n。\n    void add(int i, long long delta) {\n        assert(i >= 1 && i <= n);\n        for (; i <= n; i += i & -i) t[i] += delta;\n    }\n    // 0 <= i <= n；返回 [1,i] 的和。\n    long long prefix(int i) const {\n        assert(i >= 0 && i <= n);\n        long long ans = 0;\n        for (; i > 0; i -= i & -i) ans += t[i];\n        return ans;\n    }\n    long long range(int l, int r) const { return prefix(r) - prefix(l - 1); }\n};",
    "article": "https://atcoder.github.io/ac-library/production/document_en/fenwicktree.html",
    "problem": {
      "title": "Dynamic Range Sum Queries",
      "url": "https://cses.fi/problemset/task/1648"
    }
  },
  {
    "id": "s122",
    "category": "数据结构",
    "name": "BIT 区间改 / 区间查",
    "priority": "A",
    "standard": "差分化与双 BIT",
    "prerequisite": "BIT",
    "practiceTarget": 8,
    "sourceRow": 123
  },
  {
    "id": "s123",
    "category": "数据结构",
    "name": "权值 BIT / 逆序对",
    "priority": "A",
    "standard": "按值域统计排名/逆序",
    "prerequisite": "BIT+离散化",
    "practiceTarget": 10,
    "sourceRow": 124
  },
  {
    "id": "s124",
    "category": "数据结构",
    "name": "线段树",
    "priority": "S",
    "standard": "单点修改、区间查询、merge 设计",
    "prerequisite": "递归",
    "practiceTarget": 20,
    "sourceRow": 125,
    "core": "用树分治区间，保存可合并信息，并在修改后重算祖先。",
    "complexity": "常见建树 O(n)，点修改与区间查询 O(log n)。",
    "pitfall": "区间信息需可结合；本片段只演示点赋值与区间和，不包含懒标记。",
    "practice": "先与数组暴力查询对拍，再考虑区间修改的标记设计。",
    "code": "// 点赋值与区间和；下标 0-based，查询半开区间 [l,r)。\nstruct SegSum {\n    int n; vector<long long> t;\n    explicit SegSum(const vector<long long>& a): n(a.size()), t(2*n) {\n        for (int i = 0; i < n; ++i) t[n+i] = a[i];\n        for (int i = n-1; i > 0; --i) t[i] = t[i<<1] + t[i<<1|1];\n    }\n    void setPoint(int p, long long v) {\n        for (t[p += n] = v; p > 1; p >>= 1) t[p>>1] = t[p] + t[p^1];\n    }\n    long long query(int l, int r) const {\n        long long ans = 0;\n        for (l += n, r += n; l < r; l >>= 1, r >>= 1) {\n            if (l & 1) ans += t[l++];\n            if (r & 1) ans += t[--r];\n        }\n        return ans;\n    }\n};",
    "article": "https://atcoder.github.io/ac-library/production/document_en/segtree.html",
    "problem": {
      "title": "Dynamic Range Minimum Queries",
      "url": "https://cses.fi/problemset/task/1649"
    }
  },
  {
    "id": "s125",
    "category": "数据结构",
    "name": "Lazy Propagation",
    "priority": "S",
    "standard": "区间加/区间修改懒标记",
    "prerequisite": "线段树",
    "practiceTarget": 20,
    "sourceRow": 126,
    "core": "整段修改先更新节点信息并存标记，下探时再把标记传给子节点。",
    "complexity": "合并与标记作用为 O(1) 时，单次操作通常 O(log n)。",
    "pitfall": "新旧标记的复合顺序、区间长度、push 与 pull 的时机。",
    "practice": "先写区间加与区间和，再加入赋值，手算两种标记的次序。",
    "article": "https://atcoder.github.io/ac-library/production/document_en/lazysegtree.html"
  },
  {
    "id": "s126",
    "category": "数据结构",
    "name": "多 Lazy Tag / 区间赋值",
    "priority": "A",
    "standard": "正确处理 tag 覆盖与合成顺序",
    "prerequisite": "Lazy线段树",
    "practiceTarget": 10,
    "sourceRow": 127
  },
  {
    "id": "s127",
    "category": "数据结构",
    "name": "动态开点线段树",
    "priority": "A",
    "standard": "值域巨大时按需建树",
    "prerequisite": "线段树",
    "practiceTarget": 8,
    "sourceRow": 128
  },
  {
    "id": "s128",
    "category": "数据结构",
    "name": "权值线段树",
    "priority": "A",
    "standard": "维护频率、排名、第 k 小",
    "prerequisite": "线段树",
    "practiceTarget": 8,
    "sourceRow": 129
  },
  {
    "id": "s129",
    "category": "数据结构",
    "name": "线段树二分",
    "priority": "A",
    "standard": "利用节点信息在线段树上定位首个位置",
    "prerequisite": "线段树",
    "practiceTarget": 8,
    "sourceRow": 130
  },
  {
    "id": "s130",
    "category": "数据结构",
    "name": "可持久化线段树",
    "priority": "B",
    "standard": "版本化根节点与主席树 kth",
    "prerequisite": "线段树",
    "practiceTarget": 8,
    "sourceRow": 131
  },
  {
    "id": "s131",
    "category": "数据结构",
    "name": "Segment Tree Beats",
    "priority": "C",
    "standard": "区间 chmin/chmax 等高级维护",
    "prerequisite": "线段树",
    "practiceTarget": 3,
    "sourceRow": 132
  },
  {
    "id": "s132",
    "category": "数据结构",
    "name": "Sparse Table / RMQ",
    "priority": "S",
    "standard": "静态幂等区间查询 O(1)",
    "prerequisite": "倍增",
    "practiceTarget": 10,
    "sourceRow": 133
  },
  {
    "id": "s133",
    "category": "数据结构",
    "name": "根号分块",
    "priority": "A",
    "standard": "块内预处理+块间暴力",
    "prerequisite": "复杂度估算",
    "practiceTarget": 10,
    "sourceRow": 134
  },
  {
    "id": "s134",
    "category": "数据结构",
    "name": "莫队算法",
    "priority": "A",
    "standard": "离线排序移动左右端点维护答案",
    "prerequisite": "分块+增删维护",
    "practiceTarget": 10,
    "sourceRow": 135
  },
  {
    "id": "s135",
    "category": "数据结构",
    "name": "带修改莫队",
    "priority": "B",
    "standard": "加入时间维度",
    "prerequisite": "莫队",
    "practiceTarget": 5,
    "sourceRow": 136
  },
  {
    "id": "s136",
    "category": "字符串",
    "name": "Rolling Hash",
    "priority": "S",
    "standard": "O(1) 比较子串哈希，注意冲突",
    "prerequisite": "前缀哈希",
    "practiceTarget": 12,
    "sourceRow": 137,
    "problem": {
      "title": "String Matching",
      "url": "https://cses.fi/problemset/task/1753"
    }
  },
  {
    "id": "s137",
    "category": "字符串",
    "name": "双 Hash",
    "priority": "A",
    "standard": "降低随机碰撞风险",
    "prerequisite": "字符串Hash",
    "practiceTarget": 6,
    "sourceRow": 138
  },
  {
    "id": "s138",
    "category": "字符串",
    "name": "KMP / Prefix Function",
    "priority": "S",
    "standard": "模式匹配及 border/周期性质",
    "prerequisite": "字符串",
    "practiceTarget": 15,
    "sourceRow": 139,
    "core": "pi[i] 表示模式串前缀 p[0..i] 的最长真前后缀长度。失配后跳到更短边界，而不是从头匹配。",
    "complexity": "构造 pi 为 O(m)，文本匹配 O(n+m)。",
    "pitfall": "0-based 的 pi 回退用 pi[j-1]；完整匹配后回退以保留重叠匹配。",
    "practice": "先手算 ababaca 的 pi，再做出现次数和周期题。",
    "code": "vector<int> prefixFunction(const string& p) {\n    vector<int> pi(p.size());\n    for (int i = 1; i < (int)p.size(); ++i) {\n        int j = pi[i-1];\n        while (j > 0 && p[i] != p[j]) j = pi[j-1];\n        if (p[i] == p[j]) ++j;\n        pi[i] = j;\n    }\n    return pi;\n}\n// 允许重叠出现；本片段约定空模式串的计数为 0。\nint countMatches(const string& s, const string& p) {\n    if (p.empty()) return 0;\n    auto pi = prefixFunction(p);\n    int j = 0, ans = 0;\n    for (char c : s) {\n        while (j > 0 && c != p[j]) j = pi[j-1];\n        if (c == p[j]) ++j;\n        if (j == (int)p.size()) { ++ans; j = pi[j-1]; }\n    }\n    return ans;\n}",
    "article": "https://cp-algorithms.com/string/prefix-function.html",
    "problem": {
      "title": "String Matching",
      "url": "https://cses.fi/problemset/task/1753"
    }
  },
  {
    "id": "s139",
    "category": "字符串",
    "name": "Z Algorithm",
    "priority": "S",
    "standard": "计算每个后缀与前缀的 LCP",
    "prerequisite": "字符串",
    "practiceTarget": 10,
    "sourceRow": 140,
    "core": "z[i] 表示从 i 开始的后缀与整串前缀的最长公共前缀长度，维护最右匹配区间加速。",
    "complexity": "O(n)。",
    "pitfall": "z[0] 的约定、右端点开闭和复用区间长度。",
    "practice": "用 O(n^2) 比较法对拍随机短串。",
    "article": "https://cp-algorithms.com/string/z-function.html"
  },
  {
    "id": "s140",
    "category": "字符串",
    "name": "Trie",
    "priority": "S",
    "standard": "前缀查询与字符树建模",
    "prerequisite": "树",
    "practiceTarget": 10,
    "sourceRow": 141
  },
  {
    "id": "s141",
    "category": "字符串",
    "name": "01 Trie",
    "priority": "A",
    "standard": "XOR 最大/最小类查询",
    "prerequisite": "Trie+位运算",
    "practiceTarget": 8,
    "sourceRow": 142
  },
  {
    "id": "s142",
    "category": "字符串",
    "name": "AC 自动机",
    "priority": "A",
    "standard": "多模式串匹配，fail 树/转移",
    "prerequisite": "Trie+KMP",
    "practiceTarget": 12,
    "sourceRow": 143
  },
  {
    "id": "s143",
    "category": "字符串",
    "name": "Manacher",
    "priority": "A",
    "standard": "线性求所有回文半径",
    "prerequisite": "回文",
    "practiceTarget": 8,
    "sourceRow": 144
  },
  {
    "id": "s144",
    "category": "字符串",
    "name": "最小表示法",
    "priority": "A",
    "standard": "循环字符串字典序最小旋转",
    "prerequisite": "字符串",
    "practiceTarget": 6,
    "sourceRow": 145
  },
  {
    "id": "s145",
    "category": "字符串",
    "name": "后缀数组 SA + LCP",
    "priority": "B",
    "standard": "后缀排序与最长公共前缀",
    "prerequisite": "排序+字符串",
    "practiceTarget": 8,
    "sourceRow": 146
  },
  {
    "id": "s146",
    "category": "字符串",
    "name": "后缀自动机 SAM",
    "priority": "B",
    "standard": "子串状态与 endpos",
    "prerequisite": "自动机",
    "practiceTarget": 8,
    "sourceRow": 147
  },
  {
    "id": "s147",
    "category": "字符串",
    "name": "回文树 PAM",
    "priority": "C",
    "standard": "回文子串状态自动机",
    "prerequisite": "回文",
    "practiceTarget": 3,
    "sourceRow": 148
  },
  {
    "id": "s148",
    "category": "数论",
    "name": "gcd / lcm / Euclid",
    "priority": "S",
    "standard": "整除关系基础工具",
    "prerequisite": "整数",
    "practiceTarget": 8,
    "sourceRow": 149,
    "core": "反复用 gcd(a,b)=gcd(b,a mod b)，直到余数为 0。",
    "complexity": "O(log min(a,b))。",
    "pitfall": "lcm 先除后乘并防溢出；注意 0 和负数的约定。",
    "practice": "先求 gcd/lcm，再证明一个整除性质。"
  },
  {
    "id": "s149",
    "category": "数论",
    "name": "扩展欧几里得",
    "priority": "S",
    "standard": "求 ax+by=gcd(a,b) 与逆元",
    "prerequisite": "Euclid",
    "practiceTarget": 10,
    "sourceRow": 150
  },
  {
    "id": "s150",
    "category": "数论",
    "name": "线性丢番图方程",
    "priority": "A",
    "standard": "求解 ax+by=c 的整数解",
    "prerequisite": "exgcd",
    "practiceTarget": 8,
    "sourceRow": 151
  },
  {
    "id": "s151",
    "category": "数论",
    "name": "模运算与快速幂",
    "priority": "S",
    "standard": "模加减乘、powmod、防溢出",
    "prerequisite": "二进制",
    "practiceTarget": 12,
    "sourceRow": 152,
    "core": "将指数拆成二进制，反复平方并按置位项累乘。",
    "complexity": "O(log b) 次乘法。",
    "pitfall": "模数必须为正，指数非负；大模数乘法要防溢出。",
    "practice": "用小指数朴素连乘对拍，再用于矩阵或组合数预处理。",
    "code": "// GNU++17；b >= 0，mod > 0。\nlong long modPow(long long a, long long b, long long mod) {\n    a %= mod; if (a < 0) a += mod;\n    long long ans = 1 % mod;\n    while (b > 0) {\n        if (b & 1) ans = (__int128)ans * a % mod;\n        a = (__int128)a * a % mod;\n        b >>= 1;\n    }\n    return ans;\n}",
    "article": "https://cp-algorithms.com/algebra/binary-exp.html",
    "problem": {
      "title": "Bit Strings",
      "url": "https://cses.fi/problemset/task/1617"
    }
  },
  {
    "id": "s152",
    "category": "数论",
    "name": "模逆元",
    "priority": "S",
    "standard": "费马/exgcd 求逆元与适用条件",
    "prerequisite": "快速幂+exgcd",
    "practiceTarget": 10,
    "sourceRow": 153,
    "core": "当 gcd(a,m)=1 时，寻找 x 使 ax≡1 (mod m)，可用扩展欧几里得；质数模数另有快速幂方法。",
    "complexity": "扩展欧几里得或快速幂均为对数级。",
    "pitfall": "逆元不总存在；用 a^(p-2) 需 p 为质数且 a 不被 p 整除。",
    "practice": "同时写两种方法，在素数模数下对照，并构造不存在逆元的例子。",
    "article": "https://cp-algorithms.com/algebra/module-inverse.html"
  },
  {
    "id": "s153",
    "category": "数论",
    "name": "Fermat / Euler 定理",
    "priority": "S",
    "standard": "降幂与逆元依据",
    "prerequisite": "模运算",
    "practiceTarget": 8,
    "sourceRow": 154
  },
  {
    "id": "s154",
    "category": "数论",
    "name": "欧拉函数 phi",
    "priority": "S",
    "standard": "定义、求值、筛法",
    "prerequisite": "质因数分解",
    "practiceTarget": 8,
    "sourceRow": 155
  },
  {
    "id": "s155",
    "category": "数论",
    "name": "埃氏筛 / 线性筛",
    "priority": "S",
    "standard": "素数与积性函数预处理",
    "prerequisite": "数组",
    "practiceTarget": 12,
    "sourceRow": 156,
    "core": "批量筛去合数；线性筛让每个合数由其最小质因子生成一次。",
    "complexity": "埃氏筛 O(n log log n)，线性筛 O(n)，均需 O(n) 级空间。",
    "pitfall": "i*p、i*i 的溢出，标记范围和筛选上界。",
    "practice": "与逐个试除检验小范围素数表，再附带最小质因子。"
  },
  {
    "id": "s156",
    "category": "数论",
    "name": "质因数分解",
    "priority": "S",
    "standard": "试除、筛后分解及因子枚举",
    "prerequisite": "素数",
    "practiceTarget": 12,
    "sourceRow": 157
  },
  {
    "id": "s157",
    "category": "数论",
    "name": "整除分块",
    "priority": "A",
    "standard": "floor(n/i) 值段只有 O(sqrt n) 个",
    "prerequisite": "整除",
    "practiceTarget": 10,
    "sourceRow": 158
  },
  {
    "id": "s158",
    "category": "数论",
    "name": "floor_sum",
    "priority": "A",
    "standard": "处理整除和/格点计数类递归",
    "prerequisite": "整除分块",
    "practiceTarget": 6,
    "sourceRow": 159
  },
  {
    "id": "s159",
    "category": "数论",
    "name": "中国剩余定理 CRT",
    "priority": "A",
    "standard": "互质模数同余方程组合",
    "prerequisite": "exgcd",
    "practiceTarget": 8,
    "sourceRow": 160
  },
  {
    "id": "s160",
    "category": "数论",
    "name": "exCRT",
    "priority": "A",
    "standard": "非互质模数组合",
    "prerequisite": "CRT+exgcd",
    "practiceTarget": 8,
    "sourceRow": 161
  },
  {
    "id": "s161",
    "category": "数论",
    "name": "Möbius 函数",
    "priority": "A",
    "standard": "会筛 mu 并理解平方因子性质",
    "prerequisite": "积性函数",
    "practiceTarget": 8,
    "sourceRow": 162
  },
  {
    "id": "s162",
    "category": "数论",
    "name": "Möbius 反演",
    "priority": "B",
    "standard": "识别 gcd 计数与因子卷积形式",
    "prerequisite": "莫比乌斯函数",
    "practiceTarget": 6,
    "sourceRow": 163
  },
  {
    "id": "s163",
    "category": "数论",
    "name": "Miller-Rabin",
    "priority": "B",
    "standard": "64 位整数快速素性测试",
    "prerequisite": "快速幂",
    "practiceTarget": 5,
    "sourceRow": 164
  },
  {
    "id": "s164",
    "category": "数论",
    "name": "Pollard-Rho",
    "priority": "B",
    "standard": "64 位大整数随机因数分解",
    "prerequisite": "Miller-Rabin+gcd",
    "practiceTarget": 5,
    "sourceRow": 165
  },
  {
    "id": "s165",
    "category": "数论",
    "name": "BSGS",
    "priority": "B",
    "standard": "离散对数 baby-step giant-step",
    "prerequisite": "模运算+哈希",
    "practiceTarget": 5,
    "sourceRow": 166
  },
  {
    "id": "s166",
    "category": "数论",
    "name": "杜教筛",
    "priority": "C",
    "standard": "前缀积性函数的筛法优化",
    "prerequisite": "莫比乌斯反演",
    "practiceTarget": 3,
    "sourceRow": 167
  },
  {
    "id": "s167",
    "category": "数论",
    "name": "Min_25 筛",
    "priority": "C",
    "standard": "大范围积性函数求和",
    "prerequisite": "数论进阶",
    "practiceTarget": 2,
    "sourceRow": 168
  },
  {
    "id": "s168",
    "category": "组合数学",
    "name": "排列组合基础",
    "priority": "S",
    "standard": "阶乘、组合数、组合恒等式",
    "prerequisite": "数学基础",
    "practiceTarget": 12,
    "sourceRow": 169,
    "core": "先确定对象有序还是无序、允许重复还是不允许，再选排列、组合或递推计数。",
    "complexity": "取决于计算方法；预处理阶乘后常见组合数查询可 O(1)。",
    "pitfall": "公式中的除法在模数下需要检查逆元条件。",
    "practice": "同一个选取问题分别按有序与无序计数，验证阶乘关系。",
    "problem": {
      "title": "Binomial Coefficients",
      "url": "https://cses.fi/problemset/task/1079"
    }
  },
  {
    "id": "s169",
    "category": "组合数学",
    "name": "阶乘 + 逆阶乘预处理",
    "priority": "S",
    "standard": "模质数下 O(1) 查询 C(n,k)",
    "prerequisite": "逆元",
    "practiceTarget": 10,
    "sourceRow": 170
  },
  {
    "id": "s170",
    "category": "组合数学",
    "name": "Lucas 定理",
    "priority": "A",
    "standard": "n,p 较大时模质数求组合数",
    "prerequisite": "组合数",
    "practiceTarget": 6,
    "sourceRow": 171
  },
  {
    "id": "s171",
    "category": "组合数学",
    "name": "Catalan 数",
    "priority": "A",
    "standard": "括号/树/不越界路径模型",
    "prerequisite": "组合数",
    "practiceTarget": 6,
    "sourceRow": 172
  },
  {
    "id": "s172",
    "category": "组合数学",
    "name": "容斥原理",
    "priority": "S",
    "standard": "集合交并计数与补集计数",
    "prerequisite": "组合思维",
    "practiceTarget": 15,
    "sourceRow": 173
  },
  {
    "id": "s173",
    "category": "组合数学",
    "name": "子集容斥",
    "priority": "A",
    "standard": "2^n 枚举约束集合",
    "prerequisite": "状压",
    "practiceTarget": 8,
    "sourceRow": 174
  },
  {
    "id": "s174",
    "category": "组合数学",
    "name": "鸽巢原理",
    "priority": "S",
    "standard": "存在性与重复结构证明",
    "prerequisite": "数学思维",
    "practiceTarget": 8,
    "sourceRow": 175
  },
  {
    "id": "s175",
    "category": "组合数学",
    "name": "插板法 Stars and Bars",
    "priority": "A",
    "standard": "非负/正整数解计数",
    "prerequisite": "组合数",
    "practiceTarget": 6,
    "sourceRow": 176
  },
  {
    "id": "s176",
    "category": "组合数学",
    "name": "Burnside 引理",
    "priority": "B",
    "standard": "群作用下轨道计数",
    "prerequisite": "群论基础",
    "practiceTarget": 5,
    "sourceRow": 177
  },
  {
    "id": "s177",
    "category": "组合数学",
    "name": "Pólya 计数",
    "priority": "C",
    "standard": "循环指标与着色计数",
    "prerequisite": "Burnside",
    "practiceTarget": 3,
    "sourceRow": 178
  },
  {
    "id": "s178",
    "category": "线性代数",
    "name": "高斯消元",
    "priority": "A",
    "standard": "实数/模域线性方程组求解与判秩",
    "prerequisite": "线性代数",
    "practiceTarget": 10,
    "sourceRow": 179
  },
  {
    "id": "s179",
    "category": "线性代数",
    "name": "XOR 高斯消元",
    "priority": "A",
    "standard": "GF(2) 线性方程",
    "prerequisite": "位运算",
    "practiceTarget": 8,
    "sourceRow": 180
  },
  {
    "id": "s180",
    "category": "线性代数",
    "name": "线性基",
    "priority": "A",
    "standard": "维护 XOR 线性空间与最值/排名",
    "prerequisite": "XOR+高斯思想",
    "practiceTarget": 12,
    "sourceRow": 181
  },
  {
    "id": "s181",
    "category": "线性代数",
    "name": "矩阵快速幂",
    "priority": "S",
    "standard": "线性递推/状态转移加速",
    "prerequisite": "快速幂",
    "practiceTarget": 12,
    "sourceRow": 182,
    "core": "把线性递推写成状态向量的一次矩阵转移，再二分快速幂跳过多步。",
    "complexity": "朴素矩阵乘法下 O(d^3 log k)。",
    "pitfall": "向量与矩阵的乘法方向、状态顺序和单位矩阵。",
    "practice": "从 Fibonacci 的 2×2 转移矩阵开始，与线性递推对拍。",
    "problem": {
      "title": "Fibonacci Numbers",
      "url": "https://cses.fi/problemset/task/1722"
    }
  },
  {
    "id": "s182",
    "category": "线性代数",
    "name": "行列式",
    "priority": "B",
    "standard": "高斯消元计算 determinant",
    "prerequisite": "高斯消元",
    "practiceTarget": 5,
    "sourceRow": 183
  },
  {
    "id": "s183",
    "category": "线性代数",
    "name": "Kirchhoff 矩阵树定理",
    "priority": "B",
    "standard": "生成树计数转 Laplacian 行列式",
    "prerequisite": "行列式+图论",
    "practiceTarget": 5,
    "sourceRow": 184
  },
  {
    "id": "s184",
    "category": "博弈论",
    "name": "必胜/必败态 DP",
    "priority": "S",
    "standard": "从终态递推胜负状态",
    "prerequisite": "DP",
    "practiceTarget": 10,
    "sourceRow": 185
  },
  {
    "id": "s185",
    "category": "博弈论",
    "name": "Nim",
    "priority": "A",
    "standard": "异或和判胜负",
    "prerequisite": "XOR",
    "practiceTarget": 8,
    "sourceRow": 186
  },
  {
    "id": "s186",
    "category": "博弈论",
    "name": "SG Function",
    "priority": "A",
    "standard": "有向无环博弈 mex 与异或合并",
    "prerequisite": "Nim+DAG",
    "practiceTarget": 10,
    "sourceRow": 187
  },
  {
    "id": "s187",
    "category": "概率期望",
    "name": "期望线性性",
    "priority": "S",
    "standard": "直接拆随机变量求期望，不要求独立",
    "prerequisite": "概率基础",
    "practiceTarget": 10,
    "sourceRow": 188,
    "core": "期望可逐项相加，不要求这些随机变量相互独立。",
    "complexity": "常将整体枚举转为元素贡献，实际复杂度取决于单项期望计算。",
    "pitfall": "能相加的是期望；概率相乘、方差相加通常还需要额外条件。",
    "practice": "为每个元素定义指示变量，再用蒙特卡洛小实验核对。"
  },
  {
    "id": "s188",
    "category": "概率期望",
    "name": "概率 DP",
    "priority": "A",
    "standard": "以概率为状态值进行转移",
    "prerequisite": "DP+概率",
    "practiceTarget": 10,
    "sourceRow": 189
  },
  {
    "id": "s189",
    "category": "概率期望",
    "name": "期望 DP",
    "priority": "A",
    "standard": "建立期望方程并处理自环",
    "prerequisite": "DP+期望",
    "practiceTarget": 12,
    "sourceRow": 190
  },
  {
    "id": "s190",
    "category": "概率期望",
    "name": "Markov Chain 基础",
    "priority": "B",
    "standard": "状态转移矩阵与稳态/有限步概率",
    "prerequisite": "矩阵+概率",
    "practiceTarget": 5,
    "sourceRow": 191
  },
  {
    "id": "s191",
    "category": "计算几何",
    "name": "Point / Vector 基础",
    "priority": "S",
    "standard": "统一点向量结构、加减乘除与精度",
    "prerequisite": "坐标几何",
    "practiceTarget": 12,
    "sourceRow": 192
  },
  {
    "id": "s192",
    "category": "计算几何",
    "name": "点积 Dot Product",
    "priority": "S",
    "standard": "夹角、投影、长度关系",
    "prerequisite": "向量",
    "practiceTarget": 8,
    "sourceRow": 193
  },
  {
    "id": "s193",
    "category": "计算几何",
    "name": "叉积 Cross Product",
    "priority": "S",
    "standard": "方向、面积、左右关系",
    "prerequisite": "向量",
    "practiceTarget": 12,
    "sourceRow": 194,
    "core": "二维叉积 x1*y2-y1*x2 的符号表示方向，绝对值表示平行四边形面积。",
    "complexity": "O(1)。",
    "pitfall": "先确认坐标范围，必要时使用 __int128；共线情况单独处理。",
    "practice": "画三点左转、右转和共线的小例子，再接线段相交。"
  },
  {
    "id": "s194",
    "category": "计算几何",
    "name": "Orientation",
    "priority": "S",
    "standard": "用叉积判断三点转向",
    "prerequisite": "叉积",
    "practiceTarget": 10,
    "sourceRow": 195,
    "problem": {
      "title": "Point Location Test",
      "url": "https://cses.fi/problemset/task/2189"
    }
  },
  {
    "id": "s195",
    "category": "计算几何",
    "name": "点在线段上",
    "priority": "S",
    "standard": "共线+包围盒判断",
    "prerequisite": "叉积",
    "practiceTarget": 6,
    "sourceRow": 196
  },
  {
    "id": "s196",
    "category": "计算几何",
    "name": "线段相交",
    "priority": "S",
    "standard": "跨立实验+特殊共线情况",
    "prerequisite": "Orientation",
    "practiceTarget": 12,
    "sourceRow": 197,
    "problem": {
      "title": "Line Segment Intersection",
      "url": "https://cses.fi/problemset/task/2190"
    }
  },
  {
    "id": "s197",
    "category": "计算几何",
    "name": "点到直线 / 线段距离",
    "priority": "S",
    "standard": "投影与端点分类",
    "prerequisite": "点积+叉积",
    "practiceTarget": 8,
    "sourceRow": 198
  },
  {
    "id": "s198",
    "category": "计算几何",
    "name": "直线交点",
    "priority": "A",
    "standard": "参数式/叉积求交",
    "prerequisite": "向量",
    "practiceTarget": 8,
    "sourceRow": 199
  },
  {
    "id": "s199",
    "category": "计算几何",
    "name": "多边形面积",
    "priority": "S",
    "standard": "Shoelace / 叉积和",
    "prerequisite": "叉积",
    "practiceTarget": 8,
    "sourceRow": 200
  },
  {
    "id": "s200",
    "category": "计算几何",
    "name": "Point in Polygon",
    "priority": "A",
    "standard": "射线法/绕数法并处理边界",
    "prerequisite": "线段相交",
    "practiceTarget": 8,
    "sourceRow": 201
  },
  {
    "id": "s201",
    "category": "计算几何",
    "name": "凸包",
    "priority": "S",
    "standard": "Andrew monotone chain",
    "prerequisite": "排序+叉积",
    "practiceTarget": 12,
    "sourceRow": 202,
    "core": "先按坐标排序，再维护上下凸链，用叉积决定何时弹出拐向错误的点。",
    "complexity": "O(n log n)。",
    "pitfall": "共线边界是否保留、重复点、只有 1 或 2 个点。",
    "practice": "与小规模枚举判断边界点对拍，再计算周长与直径。",
    "problem": {
      "title": "Convex Hull",
      "url": "https://cses.fi/problemset/task/2195"
    }
  },
  {
    "id": "s202",
    "category": "计算几何",
    "name": "旋转卡壳",
    "priority": "A",
    "standard": "凸包直径/最远点对",
    "prerequisite": "凸包",
    "practiceTarget": 8,
    "sourceRow": 203
  },
  {
    "id": "s203",
    "category": "计算几何",
    "name": "最近点对",
    "priority": "A",
    "standard": "分治 O(nlogn)",
    "prerequisite": "分治+几何",
    "practiceTarget": 8,
    "sourceRow": 204
  },
  {
    "id": "s204",
    "category": "计算几何",
    "name": "半平面交",
    "priority": "B",
    "standard": "按极角排序维护双端队列",
    "prerequisite": "直线+叉积",
    "practiceTarget": 5,
    "sourceRow": 205
  },
  {
    "id": "s205",
    "category": "计算几何",
    "name": "Minkowski Sum",
    "priority": "B",
    "standard": "凸多边形边向量合并",
    "prerequisite": "凸包",
    "practiceTarget": 5,
    "sourceRow": 206
  },
  {
    "id": "s206",
    "category": "计算几何",
    "name": "圆与直线/圆相交",
    "priority": "A",
    "standard": "交点、相交关系与数值稳定",
    "prerequisite": "向量+二次方程",
    "practiceTarget": 8,
    "sourceRow": 207
  },
  {
    "id": "s207",
    "category": "计算几何",
    "name": "最小覆盖圆",
    "priority": "B",
    "standard": "随机增量算法",
    "prerequisite": "随机化+圆",
    "practiceTarget": 5,
    "sourceRow": 208
  },
  {
    "id": "s208",
    "category": "计算几何",
    "name": "几何精度处理",
    "priority": "S",
    "standard": "eps、整数叉积、__int128、防误差",
    "prerequisite": "浮点数",
    "practiceTarget": 10,
    "sourceRow": 209
  },
  {
    "id": "s209",
    "category": "计算几何",
    "name": "矩形面积并扫描线",
    "priority": "A",
    "standard": "事件排序+线段树维护覆盖长度",
    "prerequisite": "扫描线+线段树",
    "practiceTarget": 10,
    "sourceRow": 210
  },
  {
    "id": "s210",
    "category": "位运算",
    "name": "lowbit / popcount",
    "priority": "S",
    "standard": "熟悉常用位技巧与内建函数",
    "prerequisite": "二进制",
    "practiceTarget": 8,
    "sourceRow": 211
  },
  {
    "id": "s211",
    "category": "位运算",
    "name": "前缀 XOR",
    "priority": "S",
    "standard": "区间 XOR O(1) 查询",
    "prerequisite": "前缀思想",
    "practiceTarget": 8,
    "sourceRow": 212
  },
  {
    "id": "s212",
    "category": "位运算",
    "name": "枚举子集 / 超集",
    "priority": "S",
    "standard": "正确分析 O(3^n) 等复杂度",
    "prerequisite": "bitmask",
    "practiceTarget": 10,
    "sourceRow": 213
  },
  {
    "id": "s213",
    "category": "位运算",
    "name": "XOR 线性基",
    "priority": "A",
    "standard": "与线性基条目联动，解决最大异或等",
    "prerequisite": "位运算",
    "practiceTarget": 8,
    "sourceRow": 214
  },
  {
    "id": "s214",
    "category": "多项式",
    "name": "卷积概念",
    "priority": "A",
    "standard": "识别 C[k]=sum A[i]B[k-i] 的结构",
    "prerequisite": "组合/生成函数",
    "practiceTarget": 8,
    "sourceRow": 215
  },
  {
    "id": "s215",
    "category": "多项式",
    "name": "NTT",
    "priority": "A",
    "standard": "模质数下快速卷积模板与适用模数",
    "prerequisite": "快速幂+多项式",
    "practiceTarget": 10,
    "sourceRow": 216,
    "article": "https://atcoder.github.io/ac-library/production/document_en/convolution.html"
  },
  {
    "id": "s216",
    "category": "多项式",
    "name": "FFT",
    "priority": "B",
    "standard": "复数快速傅里叶变换基本实现与误差",
    "prerequisite": "复数+分治",
    "practiceTarget": 6,
    "sourceRow": 217
  },
  {
    "id": "s217",
    "category": "多项式",
    "name": "FWT",
    "priority": "B",
    "standard": "XOR/AND/OR 卷积变换",
    "prerequisite": "位运算",
    "practiceTarget": 6,
    "sourceRow": 218
  },
  {
    "id": "s218",
    "category": "多项式",
    "name": "多项式求逆 / ln / exp",
    "priority": "C",
    "standard": "了解形式幂级数基础算法",
    "prerequisite": "NTT",
    "practiceTarget": 3,
    "sourceRow": 219
  },
  {
    "id": "s219",
    "category": "离线算法",
    "name": "DSU 离线",
    "priority": "A",
    "standard": "按边权/时间排序并逐步合并",
    "prerequisite": "DSU+排序",
    "practiceTarget": 10,
    "sourceRow": 220
  },
  {
    "id": "s220",
    "category": "离线算法",
    "name": "CDQ 分治",
    "priority": "B",
    "standard": "三维偏序/DP 转移中的分治贡献",
    "prerequisite": "BIT+分治",
    "practiceTarget": 8,
    "sourceRow": 221
  },
  {
    "id": "s221",
    "category": "离线算法",
    "name": "整体二分 / Parallel Binary Search",
    "priority": "B",
    "standard": "批量答案二分并离线验证",
    "prerequisite": "二分+数据结构",
    "practiceTarget": 8,
    "sourceRow": 222
  },
  {
    "id": "s222",
    "category": "分治",
    "name": "归并排序求逆序对",
    "priority": "S",
    "standard": "在 merge 时统计跨区间贡献",
    "prerequisite": "归并排序",
    "practiceTarget": 8,
    "sourceRow": 223
  },
  {
    "id": "s223",
    "category": "分治",
    "name": "分治思想",
    "priority": "S",
    "standard": "能设计子问题、合并答案并分析复杂度",
    "prerequisite": "递归",
    "practiceTarget": 10,
    "sourceRow": 224
  },
  {
    "id": "s224",
    "category": "高级图论",
    "name": "2-SAT",
    "priority": "A",
    "standard": "布尔约束转蕴含图 + SCC",
    "prerequisite": "SCC",
    "practiceTarget": 12,
    "sourceRow": 225
  },
  {
    "id": "s225",
    "category": "高级图论",
    "name": "差分约束",
    "priority": "A",
    "standard": "不等式系统转最短/最长路",
    "prerequisite": "最短路",
    "practiceTarget": 8,
    "sourceRow": 226
  },
  {
    "id": "s226",
    "category": "高级图论",
    "name": "一般图最大匹配 Blossom",
    "priority": "C",
    "standard": "了解用途，模板级储备即可",
    "prerequisite": "匹配",
    "practiceTarget": 2,
    "sourceRow": 227
  },
  {
    "id": "s227",
    "category": "高级图论",
    "name": "Stoer-Wagner 全局最小割",
    "priority": "C",
    "standard": "了解无向图全局最小割",
    "prerequisite": "图论",
    "practiceTarget": 2,
    "sourceRow": 228
  },
  {
    "id": "s228",
    "category": "高级数据结构",
    "name": "Link-Cut Tree",
    "priority": "C",
    "standard": "动态树路径查询/修改，了解即可",
    "prerequisite": "Splay+树",
    "practiceTarget": 2,
    "sourceRow": 229
  }
];
const ICPC_STAGES = [
  {
    "id": "basics",
    "name": "基础与常用思维",
    "goal": "熟练实现基础操作，能从暴力推到优化并说明正确性。",
    "ids": [
      "s001",
      "s002",
      "s003",
      "s005",
      "s006",
      "s007",
      "s008",
      "s009",
      "s010",
      "s012",
      "s013",
      "s014",
      "s015",
      "s025",
      "s026",
      "s030",
      "s210"
    ]
  },
  {
    "id": "graph",
    "name": "图论主线",
    "goal": "先会建图与遍历，再掌握最短路、并查集、生成树和 LCA。",
    "ids": [
      "s031",
      "s032",
      "s033",
      "s034",
      "s035",
      "s036",
      "s037",
      "s038",
      "s039",
      "s041",
      "s042",
      "s050",
      "s054",
      "s059",
      "s060",
      "s062"
    ]
  },
  {
    "id": "dp",
    "name": "动态规划主线",
    "goal": "独立写出状态、转移、边界和计算顺序，再处理常用模型。",
    "ids": [
      "s089",
      "s090",
      "s091",
      "s092",
      "s094",
      "s095",
      "s096",
      "s097",
      "s100",
      "s102",
      "s103",
      "s105",
      "s106",
      "s111",
      "s112"
    ]
  },
  {
    "id": "structures",
    "name": "数据结构与字符串",
    "goal": "根据操作选择结构，能分析维护信息、状态和边界。",
    "ids": [
      "s119",
      "s120",
      "s121",
      "s124",
      "s125",
      "s132",
      "s136",
      "s138",
      "s139",
      "s140",
      "s071",
      "s072"
    ]
  },
  {
    "id": "math",
    "name": "数学与几何基础",
    "goal": "熟悉整除、同余、计数和向量运算，并核对公式适用条件。",
    "ids": [
      "s148",
      "s149",
      "s151",
      "s152",
      "s153",
      "s154",
      "s155",
      "s156",
      "s168",
      "s169",
      "s172",
      "s174",
      "s181",
      "s187",
      "s191",
      "s192",
      "s193",
      "s194",
      "s196",
      "s199",
      "s201",
      "s208"
    ]
  },
  {
    "id": "advanced",
    "name": "按题补充专题",
    "goal": "在主线稳定后补 SCC、网络流、树链剖分、数位 DP 和专题算法。",
    "ids": [
      "s043",
      "s045",
      "s051",
      "s066",
      "s073",
      "s074",
      "s078",
      "s081",
      "s082",
      "s085",
      "s108",
      "s113",
      "s128",
      "s133",
      "s134",
      "s142",
      "s159",
      "s170",
      "s178",
      "s180",
      "s185",
      "s189",
      "s215",
      "s224"
    ]
  }
];
