const eff_item = [
  { key: 0, label: "全部终端生效" },
  { key: 1, label: "仅在线终端生效" },
  { key: 2, label: "仅离线走终端生效" },
];
const eff_time = [
  { key: 0, label: "全部时间" },
  { key: 1, label: "周六日" },
  { key: 2, label: "自定义" },
];
// 操作权限
const permissions = [
  { key: 0, title: "可读" },
  { key: 1, title: "不可复制" },
  { key: 2, title: "不可删除" },
];
const warnOptions = [
  { key: 0, title: "短期内泄密多个文件时告警" },
  { key: 1, title: "发现泄密时告警" },
];

const contentOptions = [
  { key: 0, title: "智能分析" },
  { key: 1, title: "实时分析" },
];
// 外发途径
const routeOptions = [
  { key: 0, title: "所有途径" },
  { key: 1, title: "指定外发途径" },
];
// 规则
const rulesOptions = [
  { key: 0, title: "全部文件" },
  { key: 1, title: "复合规则" },
];
// 是否备份
const isBackupOptions = [
  { key: 0, title: "备份" },
  { key: 1, title: "不备份" },
];
// 指定外发路径
const specifyRouteOptions = [
  { key: 0, title: "浏览器" },
  { key: 1, title: "即使通讯软件" },
  { key: 2, title: "电子邮件客户端" },
  { key: 3, title: "网盘" },
  { key: 4, title: "移动存储" },
  { key: 5, title: "自定义程序" },
];
const unitOptions = [
  { key: 0, title: "KB" },
  { key: 1, title: "MB" },
  { key: 2, title: "GB" },
  { key: 3, title: "TB" },
];
const statusOptions = [
  { key: 0, title: "停用" },
  { key: 1, title: "启用" },
];
const outgoOptions = [
  { key: 0, title: "拒绝外发" },
  { key: 1, title: "允许外发" },
];
export {
  eff_item,
  eff_time,
  permissions,
  warnOptions,
  contentOptions,
  routeOptions,
  rulesOptions,
  isBackupOptions,
  specifyRouteOptions,
  unitOptions,
  statusOptions,
  outgoOptions,
};
