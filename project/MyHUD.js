export class MyHUD {
    constructor() {
        this.hp = 100;
        this.maxHp = 100;

        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            z-index: 999;
            font-family: Arial, sans-serif;
            color: white;
            text-shadow: 1px 1px 2px black;
        `;

        // HP Row
        const hpRow = document.createElement('div');
        hpRow.style.cssText = 'display:flex; align-items:center; gap:10px;';

        this.heart = document.createElement('div');
        this.heart.innerHTML = '❤️';
        this.heart.style.fontSize = '36px';

        this.barBg = document.createElement('div');
        this.barBg.style.cssText = `
            width: 200px; height: 22px;
            background: #555; border-radius: 11px;
            overflow: hidden; border: 2px solid #333;
        `;
        this.barFill = document.createElement('div');
        this.barFill.style.cssText = `
            width: 100%; height: 100%;
            background: #4caf50; border-radius: 11px;
            transition: width 0.3s, background 0.3s;
        `;
        this.barBg.appendChild(this.barFill);
        hpRow.appendChild(this.heart);
        hpRow.appendChild(this.barBg);

        // Damage/Heal flash
        this.feedbackEl = document.createElement('div');
        this.feedbackEl.style.cssText = `
            font-size: 18px; font-weight: bold;
            min-height: 24px; transition: opacity 0.5s;
        `;

        // Stats row
        this.statsEl = document.createElement('div');
        this.statsEl.style.cssText = `
            font-size: 15px;
            background: rgba(0,0,0,0.45);
            padding: 6px 12px;
            border-radius: 8px;
            line-height: 1.7;
        `;

        this.container.appendChild(hpRow);
        this.container.appendChild(this.feedbackEl);
        this.container.appendChild(this.statsEl);
        document.body.appendChild(this.container);

        this._feedbackTimer = null;
        this._wagonBales = 0;
        this._barnBales = 0;
        this._score = 0;
        this._updateStats();
    }

    setHP(value) {
        this.hp = Math.max(0, Math.min(value, this.maxHp));
        const pct = (this.hp / this.maxHp) * 100;
        this.barFill.style.width = pct + '%';
        if (pct > 60)      this.barFill.style.background = '#4caf50';
        else if (pct > 30) this.barFill.style.background = '#ff9800';
        else               this.barFill.style.background = '#f44336';
    }

    setDamage(amount) {
        this._showFeedback(`-${amount} HP`, '#ff4444');
    }

    setHeal(amount) {
        this._showFeedback(`+${amount} HP`, '#66ff66');
    }

    _showFeedback(text, color) {
        this.feedbackEl.textContent = text;
        this.feedbackEl.style.color = color;
        this.feedbackEl.style.opacity = '1';
        if (this._feedbackTimer) clearTimeout(this._feedbackTimer);
        this._feedbackTimer = setTimeout(() => {
            this.feedbackEl.style.opacity = '0';
        }, 1200);
    }

    setWagonBales(n) {
        this._wagonBales = n;
        this._updateStats();
    }

    setBarnBales(n) {
        this._barnBales = n;
        this._updateStats();
    }

    setScore(seconds) {
        this._score = seconds;
        this._updateStats();
    }

    _updateStats() {
        const mins = Math.floor(this._score / 60).toString().padStart(2,'0');
        const secs = Math.floor(this._score % 60).toString().padStart(2,'0');
        this.statsEl.innerHTML = `
            Hay bales in the Wagon: ${this._wagonBales}<br>
            Hay bales in the Barn: ${this._barnBales}<br>
            ⏱️ Score: ${mins}:${secs}
        `;
    }

    destroy() {
        document.body.removeChild(this.container);
    }

    showGameOver(score) {
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed; top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.75);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            z-index: 9999; color: white;
            font-family: Arial, sans-serif;
        `;
        const mins = Math.floor(score / 60).toString().padStart(2,'0');
        const secs = Math.floor(score % 60).toString().padStart(2,'0');
        this.overlay.innerHTML = `
            <div style="font-size:64px">💀</div>
            <div style="font-size:40px; font-weight:bold; margin:10px">GAME OVER</div>
            <div style="font-size:20px; margin:10px">Survived: ${mins}:${secs}</div>
            <button id="restartBtn" style="margin-top:20px; padding:12px 30px;
                font-size:18px; border:none; border-radius:8px;
                background:#4caf50; color:white; cursor:pointer;">
                Play Again
            </button>
        `;
        document.body.appendChild(this.overlay);
        return this.overlay.querySelector('#restartBtn');
    }

    showWin(score, bales) {
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed; top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,80,0,0.75);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            z-index: 9999; color: white;
            font-family: Arial, sans-serif;
        `;
        const mins = Math.floor(score / 60).toString().padStart(2,'0');
        const secs = Math.floor(score % 60).toString().padStart(2,'0');
        this.overlay.innerHTML = `
            <div style="font-size:64px">🏆</div>
            <div style="font-size:40px; font-weight:bold; margin:10px">YOU WIN!</div>
            <div style="font-size:20px; margin:10px">All ${bales} bales delivered!</div>
            <div style="font-size:20px; margin:5px">Time: ${mins}:${secs}</div>
            <button id="restartBtn" style="margin-top:20px; padding:12px 30px;
                font-size:18px; border:none; border-radius:8px;
                background:#4caf50; color:white; cursor:pointer;">
                Play Again
            </button>
        `;
        document.body.appendChild(this.overlay);
        return this.overlay.querySelector('#restartBtn');
    }

    hideOverlay() {
        if (this.overlay) {
            document.body.removeChild(this.overlay);
            this.overlay = null;
        }
    }
}