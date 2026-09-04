(() => {
  const domains = {
    overview: {
      category: 'VC IMPACT ATLAS', title: '五個影響力場域', short: '一個核心命題 · 五個改變場域',
      statement: '從五個影響力場域探索 Vincent 的影響力體系；每一個場域都有自己的專業主張、知識、方法、案例與證據，並共同圍繞同一個核心命題。',
      path: ['專業主張', '知識與方法', '案例與證據'], border: '#46534e'
    },
    orange: {
      category: '影響力場域 01', title: 'SDGs 體驗學習與永續行動', short: '體驗 × 永續行動',
      statement: '從參與式體驗開始，讓人看見經濟、社會與環境的系統關係，把理解轉化為永續行動。',
      path: ['體驗', '反思', '行動'], border: '#ef6b27', href: 'domains/sdgs/index.html'
    },
    purple: {
      category: '影響力場域 02', title: '永續影響力管理與價值創造', short: '影響力管理 × 價值創造',
      statement: '從改變目標、成果證據到價值溝通，協助組織看見做了什麼，以及真正改變了什麼。',
      path: ['改變', '證據', '價值'], border: '#a132a3', href: 'domains/impact-management/index.html'
    },
    blue: {
      category: '影響力場域 03', title: 'NPO 領導力與永續治理', short: '系統思考 × 永續治理',
      statement: '以系統思考與因人情境領導陪伴主管成長，讓團隊關係、組織能力與治理品質持續成熟。',
      path: ['系統', '領導', '治理'], border: '#1595d0', href: 'domains/npo-leadership/index.html'
    },
    yellow: {
      category: '影響力場域 04', title: '共識引導與公民對話', short: '引導 × 公民對話',
      statement: '設計能容納不同觀點的共同空間，讓人被聽見、彼此理解，逐步形成共識與共同行動。',
      path: ['對話', '理解', '共識'], border: '#c99700', href: 'domains/facilitation/index.html'
    },
    green: {
      category: '影響力場域 05', title: '組織學習與人才發展', short: '組織學習 × 人才發展',
      statement: '把零散培訓整理成支持策略、可追蹤成效的人才發展與組織學習系統。',
      path: ['學習', '能力', '發展'], border: '#07955e', href: 'domains/organization-learning/index.html'
    }
  };

  const card = document.querySelector('.focus-card');
  if (!card) return;

  const buttons = [...document.querySelectorAll('.atlas-node')];
  const category = card.querySelectorAll('.focus-topline > span')[1];
  const short = card.querySelector('.focus-topline em');
  const title = card.querySelector('h2');
  const statement = card.querySelector(':scope > p');
  const pathBox = card.querySelector('.focus-path');
  const overviewToggle = card.querySelector('.focus-overview-toggle');

  function selectDomain(id) {
    const domain = domains[id];
    if (!domain) return;
    buttons.forEach((button) => {
      const selected = id !== 'overview' && button.classList.contains('node-' + id);
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    card.classList.toggle('overview-card', id === 'overview');
    overviewToggle.hidden = id === 'overview';
    card.style.setProperty('--swatch', domain.border);
    category.textContent = domain.category;
    short.textContent = domain.short;
    title.textContent = domain.title;
    statement.textContent = domain.statement;
    pathBox.replaceChildren();
    domain.path.forEach((step, index) => {
      const group = document.createElement('span');
      group.className = 'path-group';
      const label = document.createElement('span');
      label.textContent = step;
      group.append(label);
      if (index < domain.path.length - 1) group.append(document.createElement('i'));
      pathBox.append(group);
    });
    card.querySelector('.focus-link')?.remove();
    if (domain.href) {
      const link = document.createElement('a');
      link.className = 'focus-link';
      link.href = domain.href;
      link.append(document.createTextNode('進入此影響力場域 '));
      const arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      link.append(arrow);
      card.append(link);
    }
  }

  buttons.forEach((button) => {
    const id = Object.keys(domains).find((key) => button.classList.contains('node-' + key));
    if (id) button.addEventListener('click', () => selectDomain(id));
  });
  overviewToggle?.addEventListener('click', () => selectDomain('overview'));
})();
