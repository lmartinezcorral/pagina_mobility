#!/usr/bin/env python3
"""
Script de compresión de imágenes para Somos Mobility.
Optimiza PNG, JPG y SVG sin pérdida perceptible de calidad.
Objetivo: reducir tiempo de carga del sitio.

Uso: python scripts/compress-images.py

Nota: Los SVGs con imágenes embebidas (base64) pueden seguir siendo pesados.
Para optimizarlos: convertir a PNG con herramientas externas (ej. Inkscape, cairosvg).
"""
import os
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Instalando Pillow...")
    os.system(f"{sys.executable} -m pip install Pillow -q")
    from PIL import Image

# Rutas base
BASE = Path(__file__).resolve().parent.parent
LOGOS_DIR = BASE / "html" / "assets" / "images" / "logos_mobility"
TALLER_DIR = BASE / "html" / "assets" / "images" / "taller-masaje"

# Configuración
MAX_LOGO_SIZE = 800   # px - suficiente para retina (2x) en displays 400px
MAX_IMAGE_SIZE = 1200 # px - para brochure/flyers
PNG_COMPRESS_LEVEL = 9  # 0-9, 9 = máx compresión
JPEG_QUALITY = 85       # 80-90 buen balance calidad/tamaño


def compress_png(path: Path, max_size: int = MAX_LOGO_SIZE) -> tuple[int, int]:
    """Comprime PNG: redimensiona si es muy grande, optimiza."""
    img = Image.open(path).convert("RGBA")
    orig_size = path.stat().st_size
    w, h = img.size

    # Redimensionar si excede max_size
    if max(w, h) > max_size:
        ratio = max_size / max(w, h)
        new_size = (int(w * ratio), int(h * ratio))
        img = img.resize(new_size, Image.Resampling.LANCZOS)

    # Guardar optimizado
    img.save(path, "PNG", optimize=True, compress_level=PNG_COMPRESS_LEVEL)
    new_size = path.stat().st_size
    return orig_size, new_size


def compress_jpg(path: Path, max_size: int = MAX_IMAGE_SIZE) -> tuple[int, int]:
    """Comprime JPG: redimensiona si es muy grande, optimiza."""
    img = Image.open(path).convert("RGB")
    orig_size = path.stat().st_size
    w, h = img.size

    if max(w, h) > max_size:
        ratio = max_size / max(w, h)
        new_size = (int(w * ratio), int(h * ratio))
        img = img.resize(new_size, Image.Resampling.LANCZOS)

    img.save(path, "JPEG", quality=JPEG_QUALITY, optimize=True)
    new_size = path.stat().st_size
    return orig_size, new_size


def compress_svg(path: Path) -> tuple[int, int]:
    """Minifica SVG: elimina espacios extras, comentarios."""
    orig_size = path.stat().st_size
    text = path.read_text(encoding="utf-8", errors="ignore")

    # Eliminar comentarios
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)
    # Reducir espacios múltiples
    text = re.sub(r"\s+", " ", text)
    # Eliminar espacios alrededor de <>
    text = re.sub(r"\s*>\s*", ">", text)
    text = re.sub(r"\s*<\s*", "<", text)
    text = text.strip()

    path.write_text(text, encoding="utf-8")
    new_size = path.stat().st_size
    return orig_size, new_size


def format_size(n: int) -> str:
    return f"{n / 1024:.1f} KB"


def main():
    total_orig = 0
    total_new = 0

    print("=" * 60)
    print("Compresión de imágenes - Somos Mobility")
    print("=" * 60)

    # Logos (PNG)
    if LOGOS_DIR.exists():
        print(f"\n[logos_mobility] Max {MAX_LOGO_SIZE}px")
        for p in sorted(LOGOS_DIR.glob("*.png")):
            try:
                o, n = compress_png(p, MAX_LOGO_SIZE)
                total_orig += o
                total_new += n
                pct = (1 - n / o) * 100 if o else 0
                print(f"  {p.name}: {format_size(o)} -> {format_size(n)} (-{pct:.0f}%)")
            except Exception as e:
                print(f"  {p.name}: Error - {e}")

    # Taller: PNG
    if TALLER_DIR.exists():
        for p in sorted(TALLER_DIR.glob("*.png")):
            try:
                o, n = compress_png(p, MAX_IMAGE_SIZE)
                total_orig += o
                total_new += n
                pct = (1 - n / o) * 100 if o else 0
                print(f"  {p.name}: {format_size(o)} -> {format_size(n)} (-{pct:.0f}%)")
            except Exception as e:
                print(f"  {p.name}: Error - {e}")

    # Taller: JPG
    if TALLER_DIR.exists():
        print(f"\n[taller-masaje] JPEG max {MAX_IMAGE_SIZE}px, quality {JPEG_QUALITY}")
        for p in sorted(TALLER_DIR.glob("*.jpg")):
            try:
                o, n = compress_jpg(p, MAX_IMAGE_SIZE)
                total_orig += o
                total_new += n
                pct = (1 - n / o) * 100 if o else 0
                print(f"  {p.name}: {format_size(o)} -> {format_size(n)} (-{pct:.0f}%)")
            except Exception as e:
                print(f"  {p.name}: Error - {e}")

    # Taller: SVG
    if TALLER_DIR.exists():
        print(f"\n[taller-masaje] SVG minificación")
        for p in sorted(TALLER_DIR.glob("*.svg")):
            try:
                o, n = compress_svg(p)
                total_orig += o
                total_new += n
                pct = (1 - n / o) * 100 if o else 0
                print(f"  {p.name}: {format_size(o)} -> {format_size(n)} (-{pct:.0f}%)")
            except Exception as e:
                print(f"  {p.name}: Error - {e}")

    print("\n" + "=" * 60)
    saved = total_orig - total_new
    pct = (saved / total_orig * 100) if total_orig else 0
    print(f"Total: {format_size(total_orig)} -> {format_size(total_new)}")
    print(f"Ahorro: {format_size(saved)} (-{pct:.1f}%)")
    print("=" * 60)


if __name__ == "__main__":
    main()
