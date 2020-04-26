const MiddleBottomData = [
  {
    status: '未恢复',
    occurTime: '12:30:21',
    level: '紧急',
    alarmInfo: 'Host hardware power status',
    isShow: true
  },
  {
    status: '未恢复',
    occurTime: '12:11:22',
    level: '紧急',
    alarmInfo: 'Host connection and power state',
    isShow: true
  },
  {
    status: '未恢复',
    occurTime: '11:21:12',
    level: '紧急',
    alarmInfo: 'vSphere HA host status',
    isShow: true
  },
  {
    status: '未恢复',
    occurTime: '10:22:11',
    level: '重要',
    alarmInfo: 'Host memory usage',
    isShow: true
  },
  {
    status: '未恢复',
    occurTime: '09:21:31',
    level: '重要',
    alarmInfo: 'Insufficient vSphere HA failover resources',
    isShow: true
  }
];

const RightOneData = [
  {
    host: '192.168.0.42',
    level: '正常',
    cpu: '32.07%',
    mem: '79.95%',
    vm: '31'
  },
  {
    host: '192.168.0.72',
    level: '正常',
    cpu: '23.42%',
    mem: '59.74%',
    vm: '17'
  },
  {
    host: '192.168.0.41',
    level: '正常',
    cpu: '20.12%',
    mem: '73.34%',
    vm: '24'
  },
  {
    host: '192.168.0.71',
    level: '正常',
    cpu: '19.11%',
    mem: '85.70%',
    vm: '25'
  },
  {
    host: '192.168.0.57',
    level: '正常',
    cpu: '9.85%',
    mem: '86.70%',
    vm: '7'
  },
  {
    host: '192.168.0.12',
    level: '重要',
    cpu: '8.11%',
    mem: '92.54%',
    vm: '9'
  },
  {
    host: '192.168.0.132',
    level: '正常',
    cpu: '6.38%',
    mem: '93.17%',
    vm: '7'
  },
  {
    host: '192.168.0.192',
    level: '重要',
    cpu: '3.91%',
    mem: '91.36%',
    vm: '3'
  },
  {
    host: '192.168.0.193',
    level: '重要',
    cpu: '3.79%',
    mem: '90.21%',
    vm: '6'
  },
  {
    host: '192.168.0.195',
    level: '正常',
    cpu: '2.78%',
    mem: '43.61%',
    vm: '4'
  },
  {
    host: '172.16.12.51',
    level: '重要',
    cpu: '1.67%',
    mem: '91.22%',
    vm: '21'
  },
  {
    host: '192.168.0.11',
    level: '正常',
    cpu: '1.63%',
    mem: '41.28%',
    vm: '7'
  },
  {
    host: '192.168.0.131',
    level: '正常',
    cpu: '1.60%',
    mem: '89.24%',
    vm: '2'
  },
  {
    host: '192.168.0.58',
    level: '正常',
    cpu: '1.10%',
    mem: '51.17%',
    vm: '11'
  },
  {
    host: '10.8.2.243',
    level: '正常',
    cpu: '0.45%',
    mem: '27.67%',
    vm: '2'
  },
  {
    host: '172.16.12.52',
    level: '紧急',
    cpu: '-',
    mem: '-',
    vm: '1'
  },
  {
    host: '192.168.0.194',
    level: '重要',
    cpu: '-',
    mem: '-',
    vm: '0'
  }
];

const RightTwoData = [
  {
    listData: [
      {
        host: '192.168.0.144 OA数据库',
        cpuUsage: 68
      },
      {
        host: '192.168.0.167 智慧城市',
        cpuUsage: 25
      },
      {
        host: '10.2.0.214 高新自动化 redis',
        cpuUsage: 7.78
      },
      {
        host: '192.168.0.86 TMS集群',
        cpuUsage: 7.26
      },
      {
        host: '192.168.0.130 微信考勤oracle数据库（orcl）',
        cpuUsage: 6.61
      },
      {
        host: '192.168.0.19 食堂消费系统',
        cpuUsage: 3.5
      },
      {
        host: '192.168.0.28 用友应用',
        cpuUsage: 3
      },
      {
        host: '192.168.0.152 集团wms',
        cpuUsage: 0.83
      },
      {
        host: '192.168.0.100 财务报账',
        cpuUsage: 0.75
      },
      {
        host: '192.168.0.184逸宸仓储',
        cpuUsage: 0.33
      },
      {
        host: '192.168.0.168 资金应用服务器',
        cpuUsage: 0.44
      },
      {
        host: '192.168.0.27 HTMS应用',
        cpuUsage: 0.16
      }
    ]
  },
  {
    listData: [
      {
        host: '192.168.0.167 智慧城市',
        cpuUsage: 66.87
      },
      {
        host: '10.2.0.214 高新自动化redis',
        cpuUsage: 58.13
      },
      {
        host: '192.168.0.144 OA数据库',
        cpuUsage: 57.09
      },
      {
        host: '192.168.0.168 资金应用服务器',
        cpuUsage: 49.82
      },
      {
        host: '192.168.0.152 集团wms',
        cpuUsage: 45.21
      },
      {
        host: '192.168.0.100 财务报账',
        cpuUsage: 39.88
      },
      {
        host: '192.168.0.184 逸宸仓储',
        cpuUsage: 38.51
      },
      {
        host: '192.168.0.28 用友应用',
        cpuUsage: 25.55
      },
      {
        host: '192.168.0.86 TMS集群',
        cpuUsage: 23.84
      },
      {
        host: '192.168.0.19 食堂消费系统',
        cpuUsage: 18.92
      },
      {
        host: '192.168.0.27 HTMS应用',
        cpuUsage: 18.46
      },
      {
        host: '192.168.0.130 微信考勤oracle数据库（orcl）',
        cpuUsage: 3.89
      }
    ]
  }
];
RightTwoData.forEach(item => {
  item.listData.forEach((val, idx) => {
    val.isShow = true;
    val.num = idx + 1 + '';
    val.cpuUsage = val.cpuUsage.toFixed(1);
  });
});

const LineDashedData1 = {
  output: [
    562.10315109304,
    158.60576663007947,
    350.4264892699349,
    811.2880688100587,
    911.5691414093237,
    735.2711175148297,
    758.1148711415273,
    1074.1060892943506,
    569.1372333097436,
    935.8012041215609,
    203.57041802311167,
    222.85220221695377,
    490.1608013275087
  ],
  input: [
    191.7847337042906,
    914.1714089374251,
    549.5989358915753,
    143.64921101733137,
    973.4612026868764,
    851.993859063264,
    733.8129251947541,
    542.77213834475,
    353.97098722096223,
    83.75781704703907,
    72.30925954229645,
    183.4530273649258,
    495.9132820361634
  ],
  time: [
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00'
  ]
};
const LineDashedData2 = {
  muteHealth: [
    63.674254673383835,
    79.64498830034455,
    60.70365188826191,
    93.90808865698398,
    44.24946419353252,
    43.5760060014901,
    65.60311941633235,
    82.56955991189513,
    18.728262818622042,
    38.61434562447214,
    33.91167255182766,
    1.7433311681783414,
    39.34019883782266
  ],
  pcHealth: [
    53.669783297050756,
    83.49500917935158,
    44.081092260056074,
    67.44681498218804,
    2.0072440594139707,
    14.64509119501235,
    21.10705539448029,
    22.58465815590033,
    10.811695225814976,
    66.60815449363602,
    17.52303415469515,
    39.076199271241954,
    81.07204011657065
  ],
  time: [
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00'
  ]
};
const barData = [
  {
    name: 'SPINE',
    noraml: 402,
    alert: 232,
    unknown: 80
  },
  {
    name: 'ACCESS',
    noraml: 103,
    alert: 22,
    unknown: 80
  },
  {
    name: 'LEAF',
    noraml: 402,
    alert: 232,
    unknown: 80
  },
  {
    name: '安全设备',
    noraml: 402,
    alert: 232,
    unknown: 80
  }
];
export {
  MiddleBottomData,
  RightOneData,
  RightTwoData,
  LineDashedData1,
  LineDashedData2,
  barData
};
