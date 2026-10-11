import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const origin = process.env.TEST_URL || 'http://127.0.0.1:4173'
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const errors = []
const paths = ['/projects', '/gallery', '/about', '/resume', '/now', '/blog']
await mkdir('shots', { recursive: true })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, reducedMotion: 'reduce' })
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(origin, { waitUntil: 'networkidle' })
  await page.locator('.helicopter-canvas[data-ready=true]').waitFor({ timeout: 45000 })
  const canvas = await page.locator('.helicopter-canvas canvas').elementHandle()
  const quick = page.getByRole('navigation', { name: '首页快捷浏览', exact: true })
  assert.equal(await quick.getByRole('link').count(), 7)
  await quick.getByRole('link', { name: '探索项目', exact: true }).focus()
  const outline = await quick.getByRole('link', { name: '探索项目', exact: true }).evaluate(el => getComputedStyle(el).outlineStyle)
  assert.equal(outline, 'solid')
  await page.screenshot({ path: 'shots/capsules-desktop.png' })
  for (const path of paths) {
    const link = quick.locator(`a[href="${path}"]`)
    await link.click()
    await page.waitForURL(url => url.pathname === path)
    assert.equal(await canvas.evaluate(el => el === document.querySelector('.helicopter-canvas canvas')), true)
    await page.getByRole('navigation', { name: '主导航', exact: true }).getByRole('link', { name: '首页', exact: true }).click()
    await quick.waitFor()
  }
  await quick.getByRole('button', { name: '搜索网站内容', exact: true }).click()
  await page.getByRole('dialog').waitFor()
  await page.keyboard.press('Escape')
  await quick.getByRole('link', { name: '在线简历', exact: true }).focus()
  await page.keyboard.press('Enter')
  await page.waitForURL('**/resume')
  assert.equal(await page.getByRole('navigation', { name: '主导航', exact: true }).getByRole('link', { name: '简历', exact: true }).getAttribute('aria-current'), 'page')
  await page.getByRole('navigation', { name: '主导航', exact: true }).getByRole('link', { name: '首页', exact: true }).click()
  const projects = page.getByRole('navigation', { name: '精选项目直达', exact: true })
  for (const slug of ['opc-finance-agent', 'brics-ai-training', 'desktop-helicopter']) {
    await projects.locator(`a[href="/projects/${slug}"]`).click()
    await page.waitForURL(`**/projects/${slug}`)
    await page.getByRole('navigation', { name: '主导航', exact: true }).getByRole('link', { name: '首页', exact: true }).click()
    await quick.waitFor()
  }
  await page.locator('.shortcut-board').scrollIntoViewIfNeeded()
  await page.screenshot({ path: 'shots/capsules-desktop-detail.png' })
  await page.getByRole('button', { name: '切换深浅模式', exact: true }).click()
  await page.screenshot({ path: 'shots/capsules-dark.png' })
  for (const width of [1280, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
    const buttons = await quick.locator('.capsule-link, .capsule-orb').evaluateAll(elements => elements.map(el => ({ width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height })))
    assert.ok(buttons.every(button => button.height >= 44 && button.width >= 44))
  }
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' })
  mobile.on('pageerror', error => errors.push(error.message))
  await mobile.goto(origin, { waitUntil: 'networkidle' })
  await mobile.locator('.helicopter-canvas[data-ready=true]').waitFor({ timeout: 45000 })
  await mobile.locator('.shortcut-board').scrollIntoViewIfNeeded()
  await mobile.screenshot({ path: 'shots/capsules-mobile.png' })
  await mobile.getByRole('navigation', { name: '首页快捷浏览', exact: true }).getByRole('link', { name: '学习画廊', exact: true }).tap()
  await mobile.waitForURL('**/gallery')
  await mobile.getByRole('button', { name: '打开菜单', exact: true }).tap()
  await mobile.getByRole('navigation', { name: '主导航', exact: true }).getByRole('link', { name: '近况', exact: true }).tap()
  await mobile.waitForURL('**/now')
  assert.equal(await mobile.getByRole('button', { name: '打开菜单', exact: true }).getAttribute('aria-expanded'), 'false')
  await mobile.getByRole('navigation', { name: '页尾站内导航', exact: true }).getByRole('link', { name: '关于', exact: true }).tap()
  await mobile.waitForURL('**/about')
  assert.equal(await mobile.locator('canvas').count(), 1)
  assert.deepEqual(errors, [])
  await writeFile('shots/capsules-verification.json', JSON.stringify({ quickRoutes: paths, projectRoutes: 3, keyboard: true, search: true, widths: [1280, 1024, 768, 390, 320], mobileTouch: true, singleCanvas: true, errors }, null, 2))
  console.log('CAPSULES_PASS: destinations, project shortcuts, search, keyboard, active state, mobile touch, responsive layout, single canvas')
} finally { await browser.close() }
