const { Engine, Bodies, Composite, Runner } = Matter;

const canvas = document.getElementById('teaser-canvas');
const ctx = canvas.getContext('2d');

// Physics layout in CSS pixels — independent of device pixel ratio
const W = window.innerWidth;
const H = window.innerHeight;

// Scale canvas buffer to physical pixels so it stays sharp on retina/mobile
const dpr = window.devicePixelRatio || 1;
canvas.width  = W * dpr;
canvas.height = H * dpr;
ctx.scale(dpr, dpr);

// --- Physics setup ---

const engine = Engine.create({ gravity: { y: 1.2 } });

const WALL = 100;

Composite.add(engine.world, [
    // floor
    Bodies.rectangle(W / 2, H + WALL / 2, W + WALL * 2, WALL, { isStatic: true }),
    // left wall
    Bodies.rectangle(-WALL / 2, H / 2, WALL, H * 3, { isStatic: true }),
    // right wall
    Bodies.rectangle(W + WALL / 2, H / 2, WALL, H * 3, { isStatic: true }),
]);

Runner.run(Runner.create(), engine);

// --- Text piece generation ---

const words = TEASER_TEXT.split(/\s+/).filter(w => w.length > 0);

function randomPiece() {
    const r = Math.random();

    if (r < 0.20) {
        // Single word
        const word = words[Math.floor(Math.random() * words.length)];
        return { text: word, type: 'word' };

    } else if (r < 0.55) {
        // 2–4 word phrase
        const i = Math.floor(Math.random() * (words.length - 5));
        const len = 2 + Math.floor(Math.random() * 3);
        return { text: words.slice(i, i + len).join(' '), type: 'phrase' };

    } else if (r < 0.80) {
        // 5–9 word fragment
        const i = Math.floor(Math.random() * (words.length - 10));
        const len = 5 + Math.floor(Math.random() * 5);
        return { text: words.slice(i, i + len).join(' '), type: 'fragment' };

    } else {
        // 10–20 word long fragment
        const i = Math.floor(Math.random() * (words.length - 21));
        const len = 10 + Math.floor(Math.random() * 11);
        return { text: words.slice(i, i + len).join(' '), type: 'long' };
    }
}

function randomFontSize(type) {
    // Sizes as fractions of viewport width — scales smoothly on any screen
    switch (type) {
        case 'word':     return Math.floor(W * (0.025 + Math.random() * 0.030)); // ~2.5–5.5vw
        case 'phrase':   return Math.floor(W * (0.014 + Math.random() * 0.012)); // ~1.4–2.6vw
        case 'fragment': return Math.floor(W * (0.009 + Math.random() * 0.007)); // ~0.9–1.6vw
        case 'long':     return Math.floor(W * (0.007 + Math.random() * 0.004)); // ~0.7–1.1vw
    }
}

function randomMaxWidth(type) {
    // Max widths also viewport-relative, capped so nothing exceeds the screen
    switch (type) {
        case 'word':     return null;
        case 'phrase':   return Math.floor(W * (0.13 + Math.random() * 0.13)); // 13–26vw
        case 'fragment': return Math.floor(W * (0.19 + Math.random() * 0.16)); // 19–35vw
        case 'long':     return Math.floor(W * (0.24 + Math.random() * 0.20)); // 24–44vw
    }
}

function wrapText(text, maxWidth) {
    const tokens = text.split(' ');
    const lines = [];
    let current = '';

    for (const token of tokens) {
        const test = current ? current + ' ' + token : token;
        if (ctx.measureText(test).width > maxWidth && current) {
            lines.push(current);
            current = token;
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);
    return lines;
}

// --- Spawning ---

const MAX_BODIES = 200;

function spawnPiece() {
    // Cull oldest dynamic body when limit reached
    const dynamic = Composite.allBodies(engine.world).filter(b => !b.isStatic);
    if (dynamic.length >= MAX_BODIES) {
        Composite.remove(engine.world, dynamic[0]);
    }

    const piece = randomPiece();
    const size = randomFontSize(piece.type);
    const font = `${size}px "Libre Caslon Display", serif`;
    const lineHeight = size * 1.1;

    ctx.font = font;

    const maxWidth = randomMaxWidth(piece.type);
    const lines = maxWidth ? wrapText(piece.text, maxWidth) : [piece.text];

    // Body width = widest line; body height = all lines stacked
    const bodyW = Math.max(...lines.map(l => ctx.measureText(l).width)) + 4;
    const bodyH = lines.length * lineHeight + 2;

    // Spawn at random x across the viewport, just above the top edge
    const x = WALL + Math.random() * (W - WALL * 2);
    const y = -bodyH / 2 - 5;

    const body = Bodies.rectangle(x, y, bodyW, bodyH, {
        restitution: 0.1,
        friction: 0.7,
        frictionAir: 0.01,
        density: 0.003,
        angle: (Math.random() - 0.5) * 0.3,
    });

    body.textData = { lines, font, lineHeight, bodyW };

    Composite.add(engine.world, body);
}

// --- Render loop ---

const SPAWN_INTERVAL = 700; // ms
let lastSpawn = -SPAWN_INTERVAL; // spawn immediately on first frame

function draw(timestamp) {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, W, H);

    if (timestamp - lastSpawn >= SPAWN_INTERVAL) {
        spawnPiece();
        lastSpawn = timestamp;
    }

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (const body of Composite.allBodies(engine.world)) {
        if (body.isStatic || !body.textData) continue;

        const { lines, font, lineHeight, bodyW } = body.textData;

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.font = font;

        const startY = -((lines.length - 1) * lineHeight) / 2;
        if (lines.length === 1) {
            ctx.textAlign = 'center';
            ctx.fillText(lines[0], 0, startY);
        } else {
            ctx.textAlign = 'left';
            const leftEdge = -bodyW / 2 + 2;
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], leftEdge, startY + i * lineHeight);
            }
        }

        ctx.restore();
    }
}

// Wait for fonts before measuring text or starting the loop
document.fonts.ready.then(() => requestAnimationFrame(draw));
