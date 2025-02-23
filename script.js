document.addEventListener('wheel', function(event) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    const currentSection = document.querySelector('.section:target') || document.getElementById('section1');
    let nextSectionId;

    if (delta > 0) {
        // 下スクロール
        if (currentSection.id === 'section1') {
            nextSectionId = 'section2';
        } else if (currentSection.id === 'section2') {
            nextSectionId = 'section3';
        } else if (currentSection.id === 'section3') {
            nextSectionId = 'section4';
        } else {
            nextSectionId = 'section4';
        }
    } else {
        // 上スクロール
        if (currentSection.id === 'section4') {
            nextSectionId = 'section3';
        } else if (currentSection.id === 'section3') {
            nextSectionId = 'section2';
        } else if (currentSection.id === 'section2') {
            nextSectionId = 'section1';
        } else {
            nextSectionId = 'section1';
        }
    }

    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
        nextSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}, { passive: false });

// ページ読み込み時に最初のセクションにフォーカスを当てる
window.onload = function() {
    if (window.location.hash === '') {
        document.getElementById('section1').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};
