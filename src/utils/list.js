export default class List {
  constructor(
    row,
    col,
    data,
    limitMoveNum,
    toggleRow,
    noToggleRow,
    noHeader,
    step,
    isAnim
  ) {
    this.row = row;
    this.col = col;
    this.data = data;
    this.limitMoveNum = limitMoveNum;
    this.noToggleRow = noToggleRow;
    this.toggleRow = toggleRow;
    this.noHeader = noHeader;
    this.step = step;
    this.isAnim = isAnim;
  }
  setData(data) {
    this.data = data;
  }
  setAnim() {
    this.isAnim = true;
  }
}
