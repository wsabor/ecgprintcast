#!/bin/bash

# Script para otimizar imagem Open Graph
# Redimensiona para 1200x630 e comprime

echo "🖼️  Otimizando imagem Open Graph..."

INPUT="/Users/x-wing/DEV/ecgprintcast/public/images/og-image.png"
OUTPUT="/Users/x-wing/DEV/ecgprintcast/public/images/og-image-optimized.png"
BACKUP="/Users/x-wing/DEV/ecgprintcast/public/images/og-image-original.png"

# Verificar se a imagem existe
if [ ! -f "$INPUT" ]; then
    echo "❌ Erro: Imagem og-image.png não encontrada!"
    exit 1
fi

# Backup da original
echo "📦 Fazendo backup da imagem original..."
cp "$INPUT" "$BACKUP"

# Verificar se ImageMagick ou sips está disponível
if command -v sips &> /dev/null; then
    echo "✅ Usando sips (macOS)..."

    # Redimensionar para 1200x630 (crop para manter proporção)
    sips -z 630 1200 "$INPUT" --out "$OUTPUT"

    echo "✅ Imagem otimizada criada: og-image-optimized.png"
    echo "📏 Dimensões: 1200x630px"

    # Mostrar tamanho
    ORIGINAL_SIZE=$(du -h "$INPUT" | cut -f1)
    NEW_SIZE=$(du -h "$OUTPUT" | cut -f1)

    echo "📊 Tamanho original: $ORIGINAL_SIZE"
    echo "📊 Tamanho otimizado: $NEW_SIZE"

    # Perguntar se quer substituir
    echo ""
    echo "Para usar a versão otimizada, execute:"
    echo "mv /Users/x-wing/DEV/ecgprintcast/public/images/og-image-optimized.png /Users/x-wing/DEV/ecgprintcast/public/images/og-image.png"

elif command -v convert &> /dev/null; then
    echo "✅ Usando ImageMagick..."

    # Redimensionar e comprimir
    convert "$INPUT" -resize 1200x630^ -gravity center -extent 1200x630 -quality 85 "$OUTPUT"

    echo "✅ Imagem otimizada criada: og-image-optimized.png"
    echo "📏 Dimensões: 1200x630px"

    # Mostrar tamanho
    ORIGINAL_SIZE=$(du -h "$INPUT" | cut -f1)
    NEW_SIZE=$(du -h "$OUTPUT" | cut -f1)

    echo "📊 Tamanho original: $ORIGINAL_SIZE"
    echo "📊 Tamanho otimizado: $NEW_SIZE"

    echo ""
    echo "Para usar a versão otimizada, execute:"
    echo "mv $OUTPUT $INPUT"
else
    echo "⚠️  sips ou ImageMagick não encontrado!"
    echo ""
    echo "Você pode otimizar manualmente usando uma dessas opções:"
    echo ""
    echo "1. Online (mais fácil):"
    echo "   - https://www.iloveimg.com/resize-image"
    echo "   - https://tinypng.com/"
    echo "   - https://squoosh.app/"
    echo ""
    echo "2. Instalar ImageMagick:"
    echo "   brew install imagemagick"
    echo ""
    echo "Especificações:"
    echo "   - Dimensões: 1200x630 pixels (exato)"
    echo "   - Formato: PNG ou JPG"
    echo "   - Tamanho: < 1MB (ideal < 500KB)"
fi
