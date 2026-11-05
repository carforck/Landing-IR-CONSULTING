"""Genera iconos Lottie de estilo lineal (trim paths) en la paleta de IR Consulting.
Uso: python3 -I gen_lottie.py <dir_salida>
Canvas 100x100, 30 fps, 66 frames (~2.2 s). El último frame es el estado final completo.
"""
import json, math, os, sys

FR, OP, W = 30, 66, 3.6

def hexc(h):
    h = h.lstrip('#')
    return [round(int(h[i:i + 2], 16) / 255, 4) for i in (0, 2, 4)] + [1]

LIGHT = dict(P=hexc('#0b1f38'), S=hexc('#0b7a72'), A=hexc('#c9a467'), BG=hexc('#ffffff'))
DARK = dict(P=hexc('#ffffff'), S=hexc('#2ec4b6'), A=hexc('#d4b06f'), BG=hexc('#0b1f38'))

EO = {'x': [0.33], 'y': [0]}
EI = {'x': [0.2], 'y': [1]}

def st(v):
    return {'a': 0, 'k': v}

def an(*kfs):
    """kfs: (t, value) ... value escalar o lista."""
    out = []
    for n, (t, v) in enumerate(kfs):
        v = v if isinstance(v, list) else [v]
        k = {'t': t, 's': v}
        if n < len(kfs) - 1:
            k['o'] = EO; k['i'] = EI
        out.append(k)
    return {'a': 1, 'k': out}

def tr(p=(0, 0), a=(0, 0), s=None, r=None, o=None):
    return {'ty': 'tr', 'p': st(list(p)), 'a': st(list(a)),
            's': s or st([100, 100]), 'r': r or st(0), 'o': o or st(100),
            'sk': st(0), 'sa': st(0)}

def path(vs, closed=False, ins=None, outs=None):
    n = len(vs)
    ins = ins or [[0, 0]] * n
    outs = outs or [[0, 0]] * n
    return {'ty': 'sh', 'ks': st({'i': ins, 'o': outs, 'v': [list(v) for v in vs], 'c': closed})}

def ellipse(c, d):
    return {'ty': 'el', 'p': st(list(c)), 's': st([d, d] if not isinstance(d, (list, tuple)) else list(d)), 'd': 1}

def rect(c, size, r=0):
    return {'ty': 'rc', 'p': st(list(c)), 's': st(list(size)), 'r': st(r), 'd': 1}

def stroke(c, w=W, cap=2):
    return {'ty': 'st', 'c': st(c), 'o': st(100), 'w': st(w), 'lc': cap, 'lj': 2, 'ml': 4}

def fill(c):
    return {'ty': 'fl', 'c': st(c), 'o': st(100), 'r': 1}

def trim(t0, t1):
    return {'ty': 'tm', 's': st(0), 'e': an((t0, 0), (t1, 100)), 'o': st(0), 'm': 1}

def group(items, t=None):
    return {'ty': 'gr', 'it': items + [t or tr()]}

def pop(t0, t1, center):
    """Escala 0 -> 108 -> 100 con opacidad, anclada en center."""
    tm = t0 + (t1 - t0) * 0.7
    return tr(p=center, a=center,
              s=an((t0, [0, 0]), (tm, [108, 108]), (t1, [100, 100])),
              o=an((t0, 0), (t0 + 3, 100)))

def fade_in(t0, t1, frm=(0, 0)):
    return tr(p=(0, 0), a=(0, 0) if frm == (0, 0) else (0, 0),
              o=an((t0, 0), (t1, 100)))

def layer(ind, groups, name):
    return {'ddd': 0, 'ind': ind, 'ty': 4, 'nm': name, 'sr': 1,
            'ks': {'o': st(100), 'r': st(0), 'p': st([0, 0, 0]), 'a': st([0, 0, 0]), 's': st([100, 100, 100])},
            'ao': 0, 'shapes': groups, 'ip': 0, 'op': OP, 'st': 0, 'bm': 0}

def anim(name, groups):
    # groups: lista en orden de pintura (primero = fondo). Lottie pinta el primer layer encima.
    layers = [layer(i + 1, [g], f'{name}-{i}') for i, g in enumerate(reversed(groups))]
    return {'v': '5.7.4', 'fr': FR, 'ip': 0, 'op': OP, 'w': 100, 'h': 100, 'nm': name,
            'ddd': 0, 'assets': [], 'layers': layers}

# ---------------- iconos ----------------

def compass(c):
    tick = lambda a: path([(50 + 30 * math.sin(a), 50 - 30 * math.cos(a)), (50 + 24 * math.sin(a), 50 - 24 * math.cos(a))])
    needle_n = path([(50, 26), (57, 50), (43, 50)], True)
    needle_s = path([(43, 50), (57, 50), (50, 74)], True)
    rot = an((14, -110), (40, 52), (52, 40))
    return [
        group([ellipse((50, 50), 76), stroke(c['P']), trim(0, 24)]),
        group([tick(0), tick(math.pi / 2), tick(math.pi), tick(3 * math.pi / 2), stroke(c['S'], 3), trim(10, 26)]),
        group([needle_s, stroke(c['P'], 3)], tr(p=(50, 50), a=(50, 50), r=rot, o=an((14, 0), (20, 100)))),
        group([needle_n, fill(c['A']), stroke(c['A'], 3)], tr(p=(50, 50), a=(50, 50), r=rot, o=an((14, 0), (20, 100)))),
        group([ellipse((50, 50), 7), fill(c['BG']), stroke(c['P'], 3)], pop(30, 40, (50, 50))),
    ]

def bars(c):
    axis = path([(16, 14), (16, 84), (86, 84)])
    bar = lambda x, h, t0: group([path([(x, 80), (x, 80 - h)]), stroke(c['S'], 9, 1), trim(t0, t0 + 20)])
    trend = path([(24, 56), (44, 46), (58, 50), (80, 24)])
    head = path([(68, 24), (80, 24), (80, 36)])
    return [
        group([axis, stroke(c['P']), trim(0, 16)]),
        bar(32, 20, 10), bar(50, 32, 16), bar(68, 46, 22),
        group([trend, stroke(c['A']), trim(34, 52)]),
        group([head, stroke(c['A'])], tr(o=an((50, 0), (54, 100)))),
    ]

def coins(c):
    def coin(y, t0):
        return group([rect((40, y), (46, 12), 6), fill(c['BG']), stroke(c['P'], 3.2)],
                     tr(p=(0, 0), a=(0, 0), o=an((t0, 0), (t0 + 4, 100))) | {'p': an((t0, [0, -22]), (t0 + 12, [0, 0]))})
    big = group([ellipse((72, 38), 32), fill(c['BG']), stroke(c['A'], 3.4)], pop(40, 52, (72, 38)))
    ess = path([(77, 32.5), (72, 38), (67, 43.5)], False,
               ins=[[0, 0], [-6, -3], [0.5, 4.5]], outs=[[-0.5, -4.5], [6, 3], [0, 0]])
    bar_in = group([ess, path([(72, 26.5), (72, 29.5)]), path([(72, 46.5), (72, 49.5)]), stroke(c['A'], 2.6), trim(46, 58)])
    base = group([path([(10, 86), (90, 86)]), stroke(c['S'], 3)], tr())
    base['it'].insert(2, trim(0, 14))
    return [base, coin(78, 4), coin(66, 14), coin(54, 24), coin(42, 32), big, bar_in]

def sheet(c):
    doc = path([(22, 10), (62, 10), (78, 26), (78, 90), (22, 90)], True)
    fold = path([(62, 10), (62, 26), (78, 26)])
    rows = [path([(32, y), (68, y)]) for y in (40, 52, 64)]
    col = path([(46, 34), (46, 70)])
    badge = group([ellipse((74, 76), 26), fill(c['A']), stroke(c['BG'], 4)], pop(36, 46, (74, 76)))
    chk = group([path([(67, 76), (72, 81), (81, 71)]), stroke(c['BG'], 3.4), trim(44, 56)])
    return [
        group([doc, stroke(c['P']), trim(0, 24)]),
        group([fold, stroke(c['P'], 3), trim(14, 24)]),
        group(rows + [col, stroke(c['S'], 2.6), trim(16, 36)]),
        badge, chk,
    ]

SHIELD = dict(vs=[(50, 10), (80, 21), (80, 48), (50, 90), (20, 48), (20, 21)],
              ins=[[0, 0], [0, 0], [0, 0], [18, -12], [0, 22], [0, 0]],
              outs=[[0, 0], [0, 0], [0, 22], [-18, -12], [0, 0], [0, 0]])

def shield(c):
    sh = path(SHIELD['vs'], True, SHIELD['ins'], SHIELD['outs'])
    return [
        group([sh, stroke(c['P']), trim(0, 28)]),
        group([path([(36, 50), (46, 60), (65, 39)]), stroke(c['A'], 4.4), trim(28, 44)]),
    ]

def case(c):
    body = rect((44, 58), (64, 44), 6)
    handle = path([(34, 36), (34, 28), (54, 28), (54, 36)])
    band = path([(12, 56), (76, 56)])
    clasp = rect((44, 56), (10, 8), 2)
    arrow = path([(62, 30), (88, 10)])
    head = path([(76, 10), (88, 10), (88, 22)])
    return [
        group([body, stroke(c['P']), trim(0, 24)]),
        group([handle, stroke(c['P']), trim(14, 26)]),
        group([band, stroke(c['S'], 3), trim(20, 34)]),
        group([clasp, fill(c['BG']), stroke(c['S'], 3)], pop(30, 40, (44, 56))),
        group([arrow, stroke(c['A']), trim(38, 52)]),
        group([head, stroke(c['A'])], tr(o=an((50, 0), (54, 100)))),
    ]

def magnifier(c):
    move = an((0, [-8, 4]), (40, [0, 0]))
    lens = group([ellipse((42, 42), 50), stroke(c['P']), trim(0, 22)])
    handle = group([path([(60, 60), (84, 84)]), stroke(c['P'], 6), trim(16, 28)])
    spark = group([path([(28, 48), (36, 40), (44, 46), (56, 32)]), stroke(c['A'], 3.4), trim(26, 46)])
    dot = group([ellipse((56, 32), 6), fill(c['A'])], pop(44, 52, (56, 32)))
    return [group([lens, handle, spark, dot], tr(p=(0, 0), a=(0, 0)) | {'p': move})]

def plan(c):
    sheetp = rect((50, 50), (76, 76), 6)
    route = path([(26, 70), (42, 46), (60, 58), (74, 30)])
    nodes = [((26, 70), 32), ((42, 46), 38), ((60, 58), 44), ((74, 30), 50)]
    out = [
        group([sheetp, stroke(c['P']), trim(0, 22)]),
        group([path([(18, 34), (82, 34)]), path([(18, 66), (82, 66)]), path([(34, 18), (34, 82)]), path([(66, 18), (66, 82)]),
               stroke(c['S'], 1.2), trim(8, 24)], tr(o=st(35))),
        group([route, stroke(c['A'], 3.4), trim(22, 50)]),
    ]
    for (p, t) in nodes:
        out.append(group([ellipse(p, 9), fill(c['BG']), stroke(c['A'], 3)], pop(t - 4, t + 6, p)))
    return out

def gear_path(cx, cy, R, r, n):
    vs = []
    for k in range(n):
        a0 = 2 * math.pi * k / n
        w = 2 * math.pi / n
        for frac, rad in ((0.0, r), (0.12, R), (0.42, R), (0.54, r)):
            a = a0 + frac * w
            vs.append((round(cx + rad * math.sin(a), 2), round(cy - rad * math.cos(a), 2)))
    return path(vs, True)

def gears(c):
    big = group([gear_path(40, 56, 30, 23, 9), ellipse((40, 56), 18), stroke(c['P'], 3.4), trim(0, 26)],
                tr(p=(40, 56), a=(40, 56), r=an((0, -40), (OP - 1, 40))))
    small = group([gear_path(72, 28, 18, 13, 7), ellipse((72, 28), 9), stroke(c['A'], 3.2), trim(10, 30)],
                  tr(p=(72, 28), a=(72, 28), r=an((0, 60), (OP - 1, -60))))
    return [big, small]

def goal(c):
    axis = path([(14, 14), (14, 86), (86, 86)])
    line = path([(22, 74), (40, 58), (54, 64), (72, 40)])
    pole = path([(72, 40), (72, 14)])
    flag = path([(72, 14), (88, 19), (72, 25)], True)
    return [
        group([axis, stroke(c['P']), trim(0, 16)]),
        group([line, stroke(c['S']), trim(12, 38)]),
        group([pole, stroke(c['P'], 3), trim(36, 46)]),
        group([flag, fill(c['A'])], pop(44, 54, (72, 19))),
    ]

def summit(c):
    mount = path([(8, 84), (38, 40), (52, 58), (64, 46), (92, 84)])
    pole = path([(38, 40), (38, 14)])
    flag = path([(38, 14), (56, 20), (38, 26)], True)
    return [
        group([path([(8, 84), (92, 84)]), stroke(c['S'], 3), trim(0, 14)]),
        group([mount, stroke(c['P']), trim(4, 30)]),
        group([pole, stroke(c['P'], 3), trim(28, 38)]),
        group([flag, fill(c['A'])], pop(36, 48, (38, 20))),
    ]

def eye(c):
    almond = path([(8, 50), (50, 24), (92, 50), (50, 76)], True,
                  ins=[[-0, 0], [-20, 0], [0, 0], [20, 0]], outs=[[0, 0], [20, 0], [0, 0], [-20, 0]])
    return [
        group([almond, stroke(c['P']), trim(0, 26)], None),
        group([ellipse((50, 50), 24), stroke(c['A'], 3.6)], pop(20, 32, (50, 50))),
        group([ellipse((50, 50), 9), fill(c['S'])], pop(28, 38, (50, 50))),
    ]

ICONS = {
    'estrategia': (compass, LIGHT), 'finanzas': (bars, LIGHT), 'recursos': (coins, LIGHT),
    'contabilidad': (sheet, LIGHT), 'control': (shield, LIGHT), 'proyectos': (case, LIGHT),
    'diagnosticar': (magnifier, DARK), 'disenar': (plan, DARK), 'implementar': (gears, DARK), 'medir': (goal, DARK),
    'mision': (summit, LIGHT), 'vision': (eye, DARK),
}

if __name__ == '__main__':
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    for name, (fn, pal) in ICONS.items():
        data = anim(name, fn(pal))
        with open(os.path.join(out, f'{name}.json'), 'w') as f:
            json.dump(data, f, separators=(',', ':'))
        print(name, os.path.getsize(os.path.join(out, f'{name}.json')))
