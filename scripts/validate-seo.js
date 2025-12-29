#!/usr/bin/env node

/**
 * Script de Validação de SEO - ECG PrintCast
 *
 * Execute: node scripts/validate-seo.js
 *
 * Valida localmente:
 * - Meta tags Open Graph
 * - Twitter Cards
 * - Schema.org JSON-LD
 * - Sitemap e Robots
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 ECG PrintCast - Validação de SEO\n');

let errors = 0;
let warnings = 0;
let success = 0;

// Cores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const log = {
  success: (msg) => {
    success++;
    console.log(`${colors.green}✓${colors.reset} ${msg}`);
  },
  error: (msg) => {
    errors++;
    console.log(`${colors.red}✗${colors.reset} ${msg}`);
  },
  warning: (msg) => {
    warnings++;
    console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);
  },
  info: (msg) => {
    console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`);
  },
  section: (msg) => {
    console.log(`\n${colors.bold}${colors.cyan}${msg}${colors.reset}`);
  },
};

// 1. Verificar layout.tsx
log.section('1. Verificando app/layout.tsx');

try {
  const layoutPath = path.join(__dirname, '../app/layout.tsx');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');

  // Verificar metadataBase
  if (layoutContent.includes('metadataBase: new URL')) {
    log.success('metadataBase configurado');
  } else {
    log.error('metadataBase não encontrado');
  }

  // Verificar Open Graph
  if (layoutContent.includes('openGraph:')) {
    log.success('Open Graph configurado');

    if (layoutContent.includes('images:')) {
      log.success('Open Graph images configurado');
    } else {
      log.error('Open Graph images não configurado');
    }

    if (layoutContent.includes('locale: "pt_BR"')) {
      log.success('Open Graph locale configurado');
    } else {
      log.warning('Open Graph locale não configurado');
    }
  } else {
    log.error('Open Graph não encontrado');
  }

  // Verificar Twitter Cards
  if (layoutContent.includes('twitter:')) {
    log.success('Twitter Cards configurado');

    if (layoutContent.includes('card: "summary_large_image"')) {
      log.success('Twitter card type correto (summary_large_image)');
    } else {
      log.warning('Twitter card type pode não ser ideal');
    }
  } else {
    log.error('Twitter Cards não encontrado');
  }

  // Verificar robots
  if (layoutContent.includes('robots:')) {
    log.success('Robots meta tags configurados');
  } else {
    log.warning('Robots meta tags não configurados');
  }

  // Verificar PodcastSchema
  if (layoutContent.includes('PodcastSchema')) {
    log.success('PodcastSchema importado no layout');
  } else {
    log.error('PodcastSchema não importado');
  }

} catch (error) {
  log.error(`Erro ao ler layout.tsx: ${error.message}`);
}

// 2. Verificar PodcastSchema.tsx
log.section('2. Verificando components/PodcastSchema.tsx');

try {
  const schemaPath = path.join(__dirname, '../app/components/PodcastSchema.tsx');
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');

  if (schemaContent.includes('"@context": "https://schema.org"')) {
    log.success('Schema.org context configurado');
  } else {
    log.error('Schema.org context não encontrado');
  }

  if (schemaContent.includes('"@type": "PodcastSeries"')) {
    log.success('Tipo PodcastSeries configurado');
  } else {
    log.error('Tipo PodcastSeries não encontrado');
  }

  const requiredFields = ['name', 'description', 'url', 'image', 'author', 'publisher', 'sameAs'];
  requiredFields.forEach(field => {
    if (schemaContent.includes(`"${field}"`)) {
      log.success(`Campo obrigatório "${field}" presente`);
    } else {
      log.error(`Campo obrigatório "${field}" ausente`);
    }
  });

  // Verificar URLs das redes sociais
  const socialUrls = [
    'youtube.com/@ecgprintcast',
    'spotify.com/show',
    'instagram.com/print.cast',
  ];

  socialUrls.forEach(url => {
    if (schemaContent.includes(url)) {
      log.success(`URL social presente: ${url}`);
    } else {
      log.warning(`URL social pode estar ausente: ${url}`);
    }
  });

} catch (error) {
  log.error(`Erro ao ler PodcastSchema.tsx: ${error.message}`);
}

// 3. Verificar sitemap.ts
log.section('3. Verificando app/sitemap.ts');

try {
  const sitemapPath = path.join(__dirname, '../app/sitemap.ts');
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

  if (sitemapContent.includes('MetadataRoute.Sitemap')) {
    log.success('Tipo MetadataRoute.Sitemap correto');
  } else {
    log.error('Tipo MetadataRoute.Sitemap não encontrado');
  }

  if (sitemapContent.includes('changeFrequency')) {
    log.success('changeFrequency configurado');
  } else {
    log.warning('changeFrequency não configurado');
  }

  if (sitemapContent.includes('priority')) {
    log.success('priority configurado');
  } else {
    log.warning('priority não configurado');
  }

  if (sitemapContent.includes('lastModified')) {
    log.success('lastModified configurado');
  } else {
    log.warning('lastModified não configurado');
  }

  // Contar URLs no sitemap
  const urlMatches = sitemapContent.match(/url:/g);
  if (urlMatches) {
    log.info(`Total de URLs no sitemap: ${urlMatches.length}`);
  }

} catch (error) {
  log.error(`Erro ao ler sitemap.ts: ${error.message}`);
}

// 4. Verificar robots.ts
log.section('4. Verificando app/robots.ts');

try {
  const robotsPath = path.join(__dirname, '../app/robots.ts');
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');

  if (robotsContent.includes('MetadataRoute.Robots')) {
    log.success('Tipo MetadataRoute.Robots correto');
  } else {
    log.error('Tipo MetadataRoute.Robots não encontrado');
  }

  if (robotsContent.includes('sitemap:')) {
    log.success('Referência ao sitemap configurada');
  } else {
    log.error('Referência ao sitemap não encontrada');
  }

  if (robotsContent.includes('/admin/')) {
    log.success('Bloqueio de /admin/ configurado');
  } else {
    log.warning('Diretório /admin/ não está bloqueado');
  }

  if (robotsContent.includes('/api/')) {
    log.success('Bloqueio de /api/ configurado');
  } else {
    log.warning('Diretório /api/ não está bloqueado');
  }

} catch (error) {
  log.error(`Erro ao ler robots.ts: ${error.message}`);
}

// 5. Verificar imagens
log.section('5. Verificando imagens');

const imagesToCheck = [
  'public/images/logo_TVA-PC.webp',
  'public/images/logo_TV-Abigraf.png',
];

imagesToCheck.forEach(imagePath => {
  const fullPath = path.join(__dirname, '..', imagePath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    log.success(`${imagePath} existe (${Math.round(stats.size / 1024)}KB)`);
  } else {
    log.error(`${imagePath} não encontrado`);
  }
});

// Resumo final
log.section('📊 Resumo da Validação');

console.log(`
  ${colors.green}✓ Sucessos: ${success}${colors.reset}
  ${colors.yellow}⚠ Avisos: ${warnings}${colors.reset}
  ${colors.red}✗ Erros: ${errors}${colors.reset}
`);

if (errors === 0) {
  console.log(`${colors.green}${colors.bold}🎉 Tudo certo! Seu SEO está configurado corretamente.${colors.reset}\n`);
} else {
  console.log(`${colors.red}${colors.bold}❌ Encontrados ${errors} erro(s). Corrija antes do deploy.${colors.reset}\n`);
  process.exit(1);
}

if (warnings > 0) {
  console.log(`${colors.yellow}💡 Dica: Revise os ${warnings} aviso(s) para otimização máxima.${colors.reset}\n`);
}

console.log(`${colors.cyan}📚 Próximos passos:${colors.reset}`);
console.log(`  1. Execute: npm run build`);
console.log(`  2. Faça o deploy`);
console.log(`  3. Siga o guia: GOOGLE_SEARCH_CONSOLE.md\n`);
