(() => {
  const counterBtn = document.getElementById('counter-button');
  const counterEl = document.getElementById('local-counter');
  let localCount = parseInt(localStorage.getItem('nuonuo-count') || '0');

  // 图片列表
  const gifList = ['img/站立糯_nobg.png', 'img/phrolova2_nobg.png', 'img/phrolova3_nobg.png', 'img/不等了_nobg.png'];

  // 音频列表
  const audioList = ['audio/nuo1.mp3', 'audio/nuo2.mp3', 'audio/nuo3.mp3', 'audio/nuo4.mp3'];

  // 图片绑定专属音频
  const imageAudioMap = {
    'img/不等了_nobg.png': 'audio/风暴.wav'
  };

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function animateNuonuo(imgSrc) {
    const img = document.createElement('img');
    img.src = imgSrc || randomChoice(gifList);
    img.className = 'sweep-img';

    const header = document.querySelector('header');
    const headerRect = header.getBoundingClientRect();
    const btnRect = counterBtn.getBoundingClientRect();
    const midY = (headerRect.bottom + btnRect.top) / 2 + window.scrollY;
    img.style.top = (midY - 200) + 'px';

    document.body.appendChild(img);

    let pos = -500;
    const limit = window.innerWidth + 500;
    const id = setInterval(() => {
      if (pos >= limit) {
        clearInterval(id);
        img.remove();
      } else {
        pos += 20;
        img.style.right = pos + 'px';
      }
    }, 12);
  }

  function triggerRipple(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    counterBtn.appendChild(ripple);
    ripple.style.left = (e.clientX - e.target.getBoundingClientRect().left) + 'px';
    ripple.style.top = (e.clientY - e.target.getBoundingClientRect().top) + 'px';
    setTimeout(() => ripple.remove(), 400);
  }

  window.onload = function() {
    counterEl.textContent = parseInt(localCount).toLocaleString('en-US');
    counterBtn.innerText = '弗糯糯！';
    counterBtn.removeAttribute('disabled');

    counterBtn.addEventListener('click', function(e) {
      localCount++;
      counterEl.textContent = parseInt(localCount).toLocaleString('en-US');
      localStorage.setItem('nuonuo-count', localCount);
      triggerRipple(e);

      // 先选图
      const pickedImg = randomChoice(gifList);
      // 绑定音频：有专属音频用专属，否则随机
      const audioSrc = imageAudioMap[pickedImg] || randomChoice(audioList);
      const audio = new Audio(audioSrc);
      audio.play().catch(err => console.warn('音频播放失败:', err));
      audio.addEventListener('ended', function() { this.remove(); });

      animateNuonuo(pickedImg);

      // 卡片图切换：before → after → before
      const cardImg = document.getElementById('card-img');
      cardImg.src = 'img/after.png';
      setTimeout(() => { cardImg.src = 'img/before.png'; }, 500);
    });
  };
})();
