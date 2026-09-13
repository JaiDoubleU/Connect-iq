# Minimal Swiss

A minimalist analog watch face inspired by modern Swiss watch design and
contemporary fashion watches (Swatch, TAG Heuer, Tissot, Mondaine, Braun as
loose references) -- a physical wristwatch dial first, a smartwatch face
second.

## Architecture

**Layout** (`Layout.mc`) and **theme** (`Themes.mc`) are deliberately
separate:

- **Layout** controls positions, dimensions, hand geometry, marker placement,
  and complication placement. It is screen-size aware but theme-agnostic and
  identical across every theme.
- **Theme** controls colors, fonts, marker/hand rendering style, and accent
  treatment. Nothing in a theme depends on screen size.

`Drawing.mc` holds pure geometric helpers (polar coordinates, tapered hand
polygons, rectangular ticks) with no layout or theme policy. `Dial.mc` uses
those helpers to draw markers, the branding area, and complications,
consulting layout for *where* and theme for *how*.

## Themes

Selectable at runtime from watch face settings (no rebuild required):

| Theme | Reference | Palette |
|---|---|---|
| Minimal Swiss | Tissot / Mondaine | Off-white dial, charcoal type, restrained red accent |
| Swatch | Swatch | White dial, black type, bright red accent |
| Racing | TAG Heuer | Black dial, white type, red second hand |
| Monochrome | Braun | Black dial, white type, grey secondary info, no color accent |
| Custom | -- | User-selected background/text/marker/hand/accent colors |

## Settings

- **Theme** -- one of the five above
- **Hour Markers** -- numerals, indices, dots, or numerals+indices combo
- **Show Second Hand / Date / Battery / Heart Rate** -- independent toggles
- **Brand Name / Secondary Brand Text** -- optional text branding between 12
  o'clock and center; blank means no branding at all
- **Use Logo Image Instead of Brand Name** -- swaps the text branding for
  `Drawables.BrandLogo`, drawn at the bitmap's own pixel size (no runtime
  scaling), with `BrandSubText` still available underneath it

### Using your own logo

`resources*/drawables/brand_logo.png` ships as an obvious placeholder (a
dashed box reading "YOUR LOGO") in every resolution folder -- it exists so
the app has something to compile and show once the toggle is on. Replace it
in **each** `resources-round-*x*/drawables/brand_logo.png` (and the base
`resources/drawables/brand_logo.png`) with artwork you actually hold the
rights to use -- your own brand, or something you're licensed to use --
then rebuild. Do not use another company's trademarked logo here; that's
true regardless of where the image file comes from or how it's licensed as
a *file*, since a trademark isn't the same right as image copyright.

A few sizing notes for your replacement art:
- Keep it on a transparent background (PNG with alpha)
- Roughly a 3.5:1 to 4:1 width:height wordmark/lockup reads best in the
  branding area
- Pick colors that work against every theme's dial background, or keep the
  mark simple enough (e.g. a single flat color) that it stays legible on
  both the light (Swiss/Swatch) and dark (Racing/Monochrome) themes

Complications, when enabled, sit at fixed dial positions -- date at 3
o'clock, battery at 6, heart rate at 9 -- as plain large-type values, never
as a dashboard of boxes or icons.

## Building

Same toolchain as `cleanAnalog` (see the repo root README): open
`monkey.jungle` in VS Code with the Monkey C extension, then
**Monkey C: Build for Device** or **Run Without Debugging** to try it in the
simulator.
