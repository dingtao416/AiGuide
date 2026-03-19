import requests
from bs4 import BeautifulSoup
import time
import json

def fetch_article_content(url):
    """获取文章内容"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.encoding = 'utf-8'
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 提取文章标题
        title = soup.find('h1')
        title_text = title.get_text().strip() if title else "无标题"
        
        # 提取文章正文内容
        content_div = soup.find('div', class_='vp-doc') or soup.find('main') or soup.find('article')
        
        if content_div:
            # 移除导航、广告等元素
            for element in content_div.find_all(['nav', 'aside', 'footer', 'script', 'style']):
                element.decompose()
            
            paragraphs = content_div.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'li', 'blockquote'])
            content_text = []
            
            for p in paragraphs[:80]:  # 增加到80个段落
                text = p.get_text().strip()
                if text and len(text) > 10:  # 过滤掉太短的内容
                    content_text.append(text)
            
            return {
                'title': title_text,
                'content': content_text,
                'url': url
            }
        
        return None
        
    except Exception as e:
        return {'error': f"获取 {url} 失败: {e}"}

# 要分析的文章URL列表 - 增加更多不同类型的文章
article_urls = [
    "https://tobebetterjavaer.com/overview/",
    "https://tobebetterjavaer.com/basic-grammar/hello-world.html",
    "https://tobebetterjavaer.com/oo/object-class.html",
    "https://tobebetterjavaer.com/collection/hashmap.html",
    "https://tobebetterjavaer.com/thread/wangzhe-thread.html",
    "https://tobebetterjavaer.com/jvm/what-is-jvm.html",
    "https://tobebetterjavaer.com/springboot/maven.html",
    "https://tobebetterjavaer.com/interview/java-34.html",
    "https://tobebetterjavaer.com/xuexijianyi/LearnCS-ByYourself.html",
    "https://tobebetterjavaer.com/nice-article/weixin/miansmtgl.html"
]

results = []

for url in article_urls:
    print(f"正在分析: {url}")
    article = fetch_article_content(url)
    if article:
        results.append(article)
    time.sleep(1.5)  # 减少等待时间

# 将结果写入JSON文件
with open('articles_content_extended.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"成功获取了 {len(results)} 篇文章内容，已保存到 articles_content_extended.json")