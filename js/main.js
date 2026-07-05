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

  function animateNuonuo(imgSrc, btnElement) {
    const img = document.createElement('img');
    img.src = imgSrc || randomChoice(gifList);
    img.className = 'sweep-img';

    const header = document.querySelector('header');
    const headerRect = header.getBoundingClientRect();
    const btnRect = (btnElement || counterBtn).getBoundingClientRect();
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

  function triggerRipple(e, btnEl) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    btnEl.appendChild(ripple);
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
      triggerRipple(e, counterBtn);

      // 弗糯糯不出现"不等了"
      const nuoGifList = ['img/站立糯_nobg.png', 'img/phrolova2_nobg.png', 'img/phrolova3_nobg.png'];
      const pickedImg = randomChoice(nuoGifList);
      const audio = new Audio(randomChoice(audioList));
      audio.play().catch(err => console.warn('音频播放失败:', err));
      audio.addEventListener('ended', function() { this.remove(); });

      animateNuonuo(pickedImg, counterBtn);

      const cardImg = document.getElementById('card-img');
      cardImg.src = 'img/after.png';
      setTimeout(() => { cardImg.src = 'img/before.png'; }, 500);
    });

    // i弗 按钮：只出现"不等了"
    const infoBtn = document.getElementById('info-btn');
    if (infoBtn) {
      infoBtn.addEventListener('click', function(e) {
        triggerRipple(e, infoBtn);
        const audio = new Audio('audio/风暴.wav');
        audio.play().catch(err => console.warn('音频播放失败:', err));
        audio.addEventListener('ended', function() { this.remove(); });
        animateNuonuo('img/不等了_nobg.png', infoBtn);

        const cardImg = document.getElementById('card-img');
        cardImg.src = 'img/after.png';
        setTimeout(() => { cardImg.src = 'img/before.png'; }, 2000);
      });
    }
  };
})();
