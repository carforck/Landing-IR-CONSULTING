# Genera los entregables de marca IR Consulting (vector). Idempotente: sobrescribe con el mismo resultado.
import os
NAVY='#0b1f38'; NAVY_DEEP='#071528'
FONT="@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&amp;display=swap');"
def defs(p):
    return f'''<defs>
    <linearGradient id="{p}g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#a8844f"/><stop offset=".55" stop-color="#d9bb80"/><stop offset="1" stop-color="#f1dca8"/></linearGradient>
    <linearGradient id="{p}s" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#8e949b"/><stop offset=".6" stop-color="#d5d9dd"/><stop offset="1" stop-color="#f4f5f6"/></linearGradient>
    <linearGradient id="{p}sd" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#5f666e"/><stop offset="1" stop-color="#9aa1a8"/></linearGradient>
  </defs>'''
def icon(p, knock, light=False):
    s = f'url(#{p}sd)' if light else f'url(#{p}s)'; g=f'url(#{p}g)'
    return f'''{defs(p)}
  <rect x="92" y="46" width="12" height="22" fill="{s}"/><rect x="110" y="32" width="12" height="36" fill="{s}"/><rect x="128" y="16" width="12" height="52" fill="{s}"/>
  <rect x="56" y="74" width="28" height="108" fill="{g}"/>
  <path fill="{s}" fill-rule="evenodd" d="M96 96H140C161 96 174 109 174 127C174 142 165 152 152 155L178 182H148L126 157H122V182H96ZM122 116V137H139C147 137 151 133 151 126.5C151 120 147 116 139 116Z"/>
  <line x1="132" y1="122" x2="172" y2="80" stroke="{knock}" stroke-width="13" stroke-linecap="square"/>
  <line x1="132" y1="122" x2="170" y2="82" stroke="{s}" stroke-width="7" stroke-linecap="square"/>
  <path d="M186 64L182 92L160 72Z" fill="{s}"/>
  <line x1="24" y1="186" x2="154" y2="46" stroke="{knock}" stroke-width="16"/>
  <line x1="24" y1="186" x2="154" y2="46" stroke="{g}" stroke-width="9"/>
  <line x1="52" y1="190" x2="146" y2="88" stroke="{knock}" stroke-width="14"/>
  <line x1="52" y1="190" x2="146" y2="88" stroke="{g}" stroke-width="7"/>
  <path d="M176 22L168 60L138 34Z" fill="{g}"/>'''
def svg(vb, body, bg=None, label='IR Consulting'):
    w,h=vb
    rect=f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{label}">\n  <style>{FONT}</style>\n  {rect}\n  {body}\n</svg>\n'
TXT="font-family:Montserrat,'Manrope',Arial,sans-serif"
for mode,knock,bg,light in [('oscuro',NAVY,NAVY,False),('claro','#ffffff','#ffffff',True),('transparente-oscuro',NAVY,None,False)]:
    p=mode[0]
    word_ir = f'url(#{p}g)'; word_c = f'url(#{p}sd)' if light else f'url(#{p}s)'
    sub = '#5f666e' if light else '#c9ccd0'; sub2 = '#7a8188' if light else '#9ea4ab'
    # isotipo
    open(f'isotipo-{mode}.svg','w').write(svg((200,200), icon(p,knock,light), bg))
    # apilado (como el original)
    body=f'''<g transform="translate(150 20) scale(1.5)">{icon(p,knock,light)}</g>
  <text x="300" y="400" text-anchor="middle" style="{TXT};font-weight:700;font-size:62px;letter-spacing:1px"><tspan fill="{word_ir}">IR </tspan><tspan fill="{word_c}">CONSULTING</tspan></text>
  <text x="300" y="448" text-anchor="middle" fill="{sub}" style="{TXT};font-weight:600;font-size:26px;letter-spacing:4px">ISABEL RODRÍGUEZ</text>
  <text x="300" y="484" text-anchor="middle" fill="{sub2}" style="{TXT};font-weight:600;font-size:17px;letter-spacing:1.5px">CONSULTORÍA ESTRATÉGICA Y FINANCIERA</text>'''
    open(f'logo-apilado-{mode}.svg','w').write(svg((600,520), body, bg))
    # horizontal (header / firmas)
    body=f'''<g transform="translate(6 6) scale(.6)">{icon(p,knock,light)}</g>
  <text x="140" y="74" style="{TXT};font-weight:700;font-size:44px;letter-spacing:.5px"><tspan fill="{word_ir}">IR </tspan><tspan fill="{word_c}">CONSULTING</tspan></text>
  <text x="142" y="104" fill="{sub2}" style="{TXT};font-weight:600;font-size:13.5px;letter-spacing:2.2px">CONSULTORÍA ESTRATÉGICA Y FINANCIERA</text>'''
    open(f'logo-horizontal-{mode}.svg','w').write(svg((560,132), body, bg))
# paleta
pal=[('Azul marino','#0b1f38','Fondo corporativo, header, footer'),('Marino profundo','#071528','Sombras y bandas oscuras'),
     ('Oro','#c9a467','Acento principal, cifras, detalles'),('Oro claro','#ecd49c','Brillos y degradados'),
     ('Plata','#c9ccd0','Texto sobre marino, isotipo'),('Grafito','#5f666e','Texto secundario sobre claro'),
     ('Turquesa Caribe','#2ec4b6','Botones y acentos de acción'),('Arena','#faf6ef','Fondos claros de sección')]
cells=''
for i,(n,h,u) in enumerate(pal):
    x=40+(i%4)*290; y=120+(i//4)*270
    stroke=' stroke="#e3e0d8"' if h in ('#faf6ef',) else ''
    cells+=f'''<rect x="{x}" y="{y}" width="260" height="150" rx="14" fill="{h}"{stroke}/>
  <text x="{x}" y="{y+182}" fill="#0b1f38" style="{TXT};font-weight:700;font-size:20px">{n}</text>
  <text x="{x}" y="{y+208}" fill="#5f666e" style="{TXT};font-weight:600;font-size:16px">{h.upper()}</text>
  <text x="{x}" y="{y+232}" fill="#7a8188" style="{TXT};font-size:13px">{u}</text>'''
body=f'''<text x="40" y="70" fill="#0b1f38" style="{TXT};font-weight:700;font-size:30px">IR Consulting · Paleta de colores</text>
  <text x="40" y="98" fill="#7a8188" style="{TXT};font-size:15px">Corporativa (marino, oro, plata) con acentos Caribe (turquesa, arena) · Tipografías: Montserrat (logo), Manrope + Inter (web)</text>
  {cells}'''
open('paleta-colores.svg','w').write(svg((1200,680), body, '#ffffff', 'Paleta IR Consulting'))
print('ok')
