// Falling-text physics teaser for the K.ai landing page.
// Stack: Matter.js (rigid-body physics) + Canvas 2D (rendering).
// Matter.js runs its own internal simulation loop via Runner; we drive
// rendering separately with requestAnimationFrame so the two are decoupled
// — the physics always steps at its own fixed rate regardless of frame rate.

const { Engine, Bodies, Composite, Runner, Mouse, MouseConstraint } = Matter;

const canvas = document.getElementById('teaser-canvas');
const ctx = canvas.getContext('2d');

// W and H represent the layout space in CSS pixels. All physics body
// coordinates live in this space so mouse events (also in CSS pixels) map
// directly onto bodies without any coordinate transformation.
const W = window.innerWidth;
const H = window.innerHeight;

// On retina / high-DPI screens devicePixelRatio > 1. Setting the canvas
// buffer to physical pixels and then ctx.scale(dpr, dpr) keeps all drawing
// commands in CSS-pixel coordinates while the actual rasterisation happens
// at the screen's native resolution — preventing the blurry/stretched look.
const dpr = window.devicePixelRatio || 1;
canvas.width  = W * dpr;
canvas.height = H * dpr;
ctx.scale(dpr, dpr);

// --- Physics setup ---

// gravity.y is a multiplier on the default 9.8 m/s² approximation.
// 1.2 gives a slightly snappier fall than the default 1.0.
const engine = Engine.create({ gravity: { y: 1.2 } });

// Invisible static boundary walls. WALL is thick enough that fast-moving
// bodies can't tunnel through at normal frame rates (tunnelling becomes a
// risk when a body travels more than its own thickness in one physics step).
const WALL = 100;

Composite.add(engine.world, [
    // Floor sits just below the visible canvas bottom
    Bodies.rectangle(W / 2, H + WALL / 2, W + WALL * 2, WALL, { isStatic: true }),
    // Left and right walls extend 3× the canvas height so tall stacks of
    // bodies that pile above the viewport are still contained laterally
    Bodies.rectangle(-WALL / 2,      H / 2, WALL, H * 3, { isStatic: true }),
    Bodies.rectangle(W + WALL / 2,   H / 2, WALL, H * 3, { isStatic: true }),
]);

// Runner.run starts Matter's internal update loop on requestAnimationFrame.
// It targets 60 fps by default and handles variable delta-time correction,
// so physics stays consistent even when the tab is backgrounded.
Runner.run(Runner.create(), engine);

// --- Mouse / touch interaction ---

// Mouse.create binds to DOM pointer events on the canvas element. Because
// the canvas CSS dimensions match W × H, the raw clientX/clientY values
// from pointer events are already in physics-world coordinates — no offset
// or scale correction is needed on the mouse object itself.
const mouse = Mouse.create(canvas);

// MouseConstraint acts like a spring joint: when a body is clicked it gets
// pinned to the cursor position via a constraint. stiffness < 1 gives the
// characteristic elastic "drag" feel; at 1.0 the body would snap rigidly.
const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.2 }
});
Composite.add(engine.world, mouseConstraint);

// Matter.js adds wheel listeners that call preventDefault(), which blocks
// native page scrolling. Remove them while keeping drag interaction intact.
mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

// --- Text piece generation ---

// Pre-split once at startup. The regex collapses any whitespace sequence
// (spaces, newlines, tabs) and the filter removes empty strings that result
// from leading/trailing whitespace.
const words = TEASER_TEXT.split(/\s+/).filter(w => w.length > 0);

// Returns a random text snippet and its type label. Type determines font
// size and max-width ranges further down. The probability thresholds are
// chosen so single words appear least often — they look best as occasional
// punctuation among denser multi-line blocks.
function randomPiece() {
    const r = Math.random();

    if (r < 0.20) {
        // Single word — largest font, acts as a visual anchor
        const word = words[Math.floor(Math.random() * words.length)];
        return { text: word, type: 'word' };

    } else if (r < 0.55) {
        // 2–4 word phrase
        const i = Math.floor(Math.random() * Math.max(0, words.length - 5));
        const len = 2 + Math.floor(Math.random() * 3);
        return { text: words.slice(i, i + len).join(' '), type: 'phrase' };

    } else if (r < 0.80) {
        // 5–9 word fragment
        const i = Math.floor(Math.random() * Math.max(0, words.length - 10));
        const len = 5 + Math.floor(Math.random() * 5);
        return { text: words.slice(i, i + len).join(' '), type: 'fragment' };

    } else {
        // 10–20 word long fragment — smallest font, wraps to multiple lines
        const i = Math.floor(Math.random() * Math.max(0, words.length - 21));
        const len = 10 + Math.floor(Math.random() * 11);
        return { text: words.slice(i, i + len).join(' '), type: 'long' };
    }
}

// Font sizes expressed as fractions of viewport width rather than fixed px
// values. This is the canvas equivalent of CSS `vw` units — the visual
// weight of each piece stays proportional to the screen regardless of
// device. The random component within each range prevents a uniform grid
// feeling in the pile.
function randomFontSize(type) {
    switch (type) {
        case 'word':     return Math.floor(W * (0.025 + Math.random() * 0.05)); // ~2.5–7.5vw
        case 'phrase':   return Math.floor(W * (0.02  + Math.random() * 0.015)); // ~2.0–3.5vw
        case 'fragment': return Math.floor(W * (0.015 + Math.random() * 0.010)); // ~1.5–2.5vw
        case 'long':     return Math.floor(W * (0.010 + Math.random() * 0.005)); // ~1.0–1.5vw
    }
}

// Maximum line width before text wraps, also viewport-relative. Returning
// null for 'word' skips wrapping entirely — a single word never needs it.
// Having each piece wrap at a different random width is what creates the
// irregular, non-grid texture in the pile.
function randomMaxWidth(type) {
    switch (type) {
        case 'word':     return null;
        case 'phrase':   return Math.floor(W * (0.1 + Math.random() * 0.1)); // 10–20vw
        case 'fragment': return Math.floor(W * (0.15 + Math.random() * 0.10)); // 15–25vw
        case 'long':     return Math.floor(W * (0.2 + Math.random() * 0.20)); // 20–40vw
    }
}

// Greedy word-wrap using the canvas measurer as the source of truth for
// glyph widths. ctx.font must be set to the correct font before calling.
// This produces the exact same line breaks that will be rendered, which is
// critical — the physics body is sized to match the output of this function.
function wrapText(text, maxWidth) {
    const tokens = text.split(' ');
    const lines = [];
    let current = '';

    for (const token of tokens) {
        const test = current ? current + ' ' + token : token;
        // Only break if the line would overflow AND we already have content —
        // the second condition prevents an infinite loop on a single token
        // that is wider than maxWidth (it gets its own line regardless).
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

// Hard cap on simultaneous dynamic bodies. Beyond ~200 Matter.js broadphase
// starts to slow perceptibly on mid-range hardware. When the cap is hit we
// evict the oldest body (index 0 of the dynamic list, which is insertion
// order) rather than blocking new spawns, keeping the animation alive.
const MAX_BODIES = 200;

function spawnPiece() {
    const dynamic = Composite.allBodies(engine.world).filter(b => !b.isStatic);
    if (dynamic.length >= MAX_BODIES) {
        Composite.remove(engine.world, dynamic[0]);
    }

    const piece    = randomPiece();
    const size     = randomFontSize(piece.type);
    const font     = `${size}px "Libre Caslon Display", serif`;
    // lineHeight slightly tighter than the typographic default (1.2×) to
    // keep multi-line blocks compact so they stack densely
    const lineHeight = size * 1.1;

    // Wrap ctx state so font setting doesn't leak into the render loop.
    // ctx.font must be set before measureText — the browser uses the current
    // font metrics to calculate glyph advances.
    ctx.save();
    ctx.font = font;
    const maxWidth = randomMaxWidth(piece.type);
    const lines    = maxWidth ? wrapText(piece.text, maxWidth) : [piece.text];
    // bodyW is the widest rendered line; bodyH stacks all lines with lineHeight
    // spacing. The small padding (+4, +2) prevents text from clipping the body
    // edge and gives collision a tiny bit of breathing room.
    const bodyW = Math.max(...lines.map(l => ctx.measureText(l).width)) + 4;
    ctx.restore();

    const bodyH = lines.length * lineHeight + 2;

    // Spawn above the visible canvas (y < 0) so bodies fall in naturally.
    // x is randomised across the inner width, excluding the wall thickness
    // so bodies don't spawn inside a wall and get ejected sideways.
    const x = WALL + Math.random() * (W - WALL * 2);
    const y = -bodyH / 2 - 5;

    const body = Bodies.rectangle(x, y, bodyW, bodyH, {
        restitution: 0.1,   // near-zero bounce — bodies should thud, not bounce
        friction:    0.7,   // fairly grippy so stacks don't slide apart
        frictionAir: 0.01,  // light air resistance damps oscillation after landing
        density:     0.003, // low density keeps the simulation stable at this scale
        // Small random initial angle so pieces don't all land axis-aligned,
        // producing a more natural-looking pile
        angle: (Math.random() - 0.5) * 0.3,
    });

    // Store render data on the body object. We use a custom `textData`
    // property rather than Matter's built-in `body.render` namespace to
    // avoid conflicts with Matter's own rendering pipeline properties.
    // bodyW is stored here because body.bounds changes with rotation —
    // we need the original unrotated width to anchor the left-aligned text.
    body.textData = { lines, font, lineHeight, bodyW };

    Composite.add(engine.world, body);
}

// --- Render loop ---

const SPAWN_INTERVAL = 700; // ms between new pieces
// Initialise to -SPAWN_INTERVAL so the very first frame triggers a spawn
// immediately rather than waiting one full interval before anything appears
let lastSpawn = -SPAWN_INTERVAL;

function draw(timestamp) {
    requestAnimationFrame(draw);

    // clearRect rather than fillRect so the black body background shows
    // through — the canvas is transparent by default
    ctx.clearRect(0, 0, W, H);

    if (timestamp - lastSpawn >= SPAWN_INTERVAL) {
        spawnPiece();
        lastSpawn = timestamp;
    }

    ctx.fillStyle    = 'black';
    ctx.textBaseline = 'middle';

    for (const body of Composite.allBodies(engine.world)) {
        // Skip the static boundary walls (no textData) and any bodies that
        // somehow lack render data
        if (body.isStatic || !body.textData) continue;

        const { lines, font, lineHeight, bodyW } = body.textData;

        // Translate and rotate the canvas context to match the physics body's
        // current pose. All subsequent drawing is then in the body's local
        // coordinate space, with (0, 0) at the body's centre of mass.
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.font = font;

        // startY positions the top line so the whole block is vertically
        // centred on the body origin. For a single line this resolves to 0;
        // for N lines it offsets upward by half the total block height.
        const startY = -((lines.length - 1) * lineHeight) / 2;

        if (lines.length === 1) {
            // Single-line pieces are centred horizontally on the body origin
            ctx.textAlign = 'center';
            ctx.fillText(lines[0], 0, startY);
        } else {
            // Multi-line blocks are left-aligned. leftEdge anchors text to
            // the body's left side (body origin is centre, so left edge is
            // at -bodyW/2) with a 2px inset to match the spawn-time padding.
            ctx.textAlign = 'left';
            const leftEdge = -bodyW / 2 + 2;
            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], leftEdge, startY + i * lineHeight);
            }
        }

        ctx.restore();
    }
}

// document.fonts.ready resolves once all declared @font-face fonts have
// finished loading. Starting before this would cause ctx.measureText to
// return metrics for the fallback font (serif), producing incorrectly-sized
// physics bodies that don't match what eventually gets rendered.
document.fonts.ready.then(() => requestAnimationFrame(draw));
