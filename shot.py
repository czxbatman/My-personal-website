from playwright.sync_api import sync_playwright
import os

os.makedirs("shots", exist_ok=True)
BASE = "http://localhost:5173"
PAGES = [
    ("/", "01-home"),
    ("/projects", "02-projects"),
    ("/projects/desktop-pet", "03-project-detail"),
    ("/about", "04-about"),
    ("/blog", "05-blog"),
    ("/gallery", "06-gallery"),
    ("/resume", "07-resume"),
    ("/now", "08-now"),
    ("/not-exist-page", "09-404"),
]

with sync_playwright() as p:
    try:
        browser = p.chromium.launch(headless=True, channel="msedge")
    except Exception:
        browser = p.chromium.launch(headless=True, channel="chrome")
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))

    for path, name in PAGES:
        page.goto(BASE + path)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(700)
        page.screenshot(path=f"shots/{name}.png", full_page=True)
        print(f"shot: {name}  title={page.title()}")

    # 暗色模式首页
    page.goto(BASE + "/")
    page.wait_for_load_state("networkidle")
    page.click('button[aria-label="切换深浅模式"]')
    page.wait_for_timeout(500)
    page.screenshot(path="shots/10-home-dark.png", full_page=True)
    print("shot: 10-home-dark")

    # 命令面板
    page.keyboard.press("Control+k")
    page.wait_for_timeout(500)
    page.screenshot(path="shots/11-command-palette.png")
    print("shot: 11-command-palette")

    # 强调色切换（薄荷绿）
    page.keyboard.press("Escape")
    page.click('button[aria-label="切换强调色"]')
    page.wait_for_timeout(400)
    page.screenshot(path="shots/12-accent-picker.png")
    print("shot: 12-accent-picker")

    print("JS errors:", errors if errors else "none")
    browser.close()
