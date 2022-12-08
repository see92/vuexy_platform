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
export { eff_item, eff_time, permissions, warnOptions, contentOptions };
