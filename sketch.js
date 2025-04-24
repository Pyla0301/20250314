let inputBox;
let slider;
let button;
let dropdown;
let displayText = "淡江大學"; // 預設文字為 "淡江大學"
let textSizeValue = 32; // 預設文字大小
let isBouncing = false; // 控制文字是否跳動
let offset = 0; // 用於跳動效果的偏移量

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);

  // 在視窗的上方建立文字框
  inputBox = createInput(displayText); // 設定預設文字為 "淡江大學"
  inputBox.position(10, 10);
  inputBox.size(300, 50); // 設定寬度為 300，高度為 50
  inputBox.style("font-family", "sans-serif"); // 設定字體為 Arial
  inputBox.style("font-size", "50px"); // 設定文字框內文字的字體大小為 50px

  // 在文字框右側建立滑桿
  slider = createSlider(20, 50, textSizeValue); // 滑桿範圍從 28 到 50，預設值為 32
  slider.position(440, 30); // 滑桿位置，往右移一些
  slider.style("width", "200px"); // 設定滑桿寬度

  // 在滑桿右側建立按鈕
  button = createButton("跳動文字"); // 按鈕文字為 "跳動文字"
  button.position(660, 20); // 按鈕位置
  button.size(100, 40); // 設定按鈕大小
  button.mousePressed(toggleBounce); // 點擊按鈕時切換跳動狀態

  // 在按鈕右側建立下拉選單
  dropdown = createSelect(); // 建立下拉選單
  dropdown.position(780, 20); // 下拉選單位置
  dropdown.size(150, 40); // 設定下拉選單大小
  dropdown.option("淡江大學"); // 新增選項
  dropdown.option("淡大教科系");
  dropdown.option("筆記");
  dropdown.changed(handleDropdownChange); // 當選項改變時執行對應的函數

  // 當文字框內容改變時，更新顯示的文字
  inputBox.input(() => {
    displayText = inputBox.value();
  });
}

function draw() {
  background(0); // 設定背景顏色為黑色

  // 在滑桿左側顯示 "文字大小"
  fill(255); // 設定文字顏色為白色
  textSize(20); // 設定文字大小
  textAlign(RIGHT, CENTER); // 文字靠右對齊
  text("文字大小", 420, 40); // 在滑桿左側顯示文字

  // 根據滑桿的值更新文字大小
  textSizeValue = slider.value();

  // 設定文字樣式
  textAlign(LEFT, TOP); // 文字從左上角開始對齊
  textSize(textSizeValue); // 設定文字大小
  fill(255); // 設定文字顏色為白色

  // 設定起始 y 座標
  let y = 100 + (isBouncing ? sin(offset) * 20 : 0); // 如果跳動，y 座標會隨 sin 函數改變
  let lineSpacing = textSizeValue + 10; // 每行文字的間隔，根據文字大小調整

  // 繪製文字直到填滿畫布
  while (y < height) {
    let repeatedText = displayText.split("").join(" "); // 在每個字元之間插入空格
    let fullLine = ""; // 初始化一行文字

    // 從 x = 0 開始，重複顯示文字直到填滿視窗寬度
    let x = 0;
    while (x < width) {
      fullLine += repeatedText + " "; // 在每一串文字之間插入空格
      x += textWidth(repeatedText + " "); // 計算文字寬度，更新 x
    }

    text(fullLine, 0, y); // 在指定 y 座標從 x = 0 開始顯示文字
    y += lineSpacing; // 更新 y 座標
  }

  // 更新跳動的偏移量
  if (isBouncing) {
    offset += 0.1;
  }
}

// 切換跳動狀態
function toggleBounce() {
  isBouncing = !isBouncing;
}

// 處理下拉選單的選項改變
function handleDropdownChange() {
  let selected = dropdown.value(); // 獲取選中的選項
  if (selected === "淡江大學") {
    window.open("https://www.tku.edu.tw/", "_blank"); // 開啟淡江大學首頁
  } else if (selected === "淡大教科系") {
    window.open("https://www.et.tku.edu.tw/", "_blank"); // 開啟淡江電機系首頁
  } else if (selected === "筆記") {
    window.open("http://hackmd.io/@cfchen/H15O7KGske", "_blank"); // 開啟指定的 HackMD 頁面
  }
}

// 當視窗大小改變時，重新調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
