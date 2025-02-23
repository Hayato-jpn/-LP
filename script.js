const sections = document.querySelectorAll('.section');
let currentSectionIndex = 0; // 現在表示されているセクションのインデックス
let isScrolling = false; // スクロール中かどうかを判定するフラグ

// スクロール処理を行う関数
function scrollToSection(sectionIndex) {
  if (isScrolling) return;
  isScrolling = true;

  // スムーズスクロールを実行
  sections[sectionIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  // スクロール終了後にisScrollingフラグをfalseにする
  setTimeout(() => {
    isScrolling = false;
  }, 500); // スクロールアニメーションが終わるまでの時間
}

// マウスホイールによるスクロール処理
document.addEventListener('wheel', function(event) {
  event.preventDefault();

  if (isScrolling) return;

  const delta = Math.sign(event.deltaY);

  if (delta > 0 && currentSectionIndex < sections.length - 1) {
    // 下スクロール
    currentSectionIndex++;
  } else if (delta < 0 && currentSectionIndex > 0) {
    // 上スクロール
    currentSectionIndex--;
  }

  scrollToSection(currentSectionIndex);
}, { passive: false });

// スワイプ操作の処理
let touchstartY = 0;
let touchendY = 0;

document.addEventListener('touchstart', function(event) {
  touchstartY = event.changedTouches[0].screenY;
}, { passive: false });

document.addEventListener('touchend', function(event) {
  touchendY = event.changedTouches[0].screenY;
  handleSwipe();
}, { passive: false });

function handleSwipe() {
  if (isScrolling) return;

  const swipeThreshold = 50; // スワイプとして認識する移動距離

  if (touchendY < touchstartY - swipeThreshold && currentSectionIndex < sections.length - 1) {
    // 上スワイプ
    currentSectionIndex++;
    scrollToSection(currentSectionIndex);
  } else if (touchendY > touchstartY + swipeThreshold && currentSectionIndex > 0) {
    // 下スワイプ
    currentSectionIndex--;
    scrollToSection(currentSectionIndex);
  }
}

// ページ読み込み時に最初のセクションを表示
window.onload = function() {
  scrollToSection(0); // 最初のセクションをスクロールして表示
};
