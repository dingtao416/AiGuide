import requests
from bs4 import BeautifulSoup
import time

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
            
            for p in paragraphs[:50]:  # 只取前50个段落
                text = p.get_text().strip()
                if text and len(text) > 10:  # 过滤掉太短的内容
                    content_text.append(text)
            
            return {
                'title': title_text,
                'content': content_text[:30],  # 限制内容长度
                'url': url
            }
        
        return None
        
    except Exception as e:
        print(f"获取 {url} 失败: {e}")
        return None

# 要分析的文章URL列表
article_urls = [
    "https://tobebetterjavaer.com/overview/",
    "https://tobebetterjavaer.com/basic-grammar/hello-world.html",
    "https://tobebetterjavaer.com/oo/object-class.html",
    "https://tobebetterjavaer.com/collection/hashmap.html",
    "https://tobebetterjavaer.com/thread/wangzhe-thread.html"
]

print("开始获取文章内容...")

for url in article_urls:
    print(f"\n{'='*50}")
    print(f"正在分析: {url}")
    
    article = fetch_article_content(url)
    if article:
        print(f"标题: {article['title']}")
        print("内容摘要:")
        for i, paragraph in enumerate(article['content'][:10]):
            # 移除表情符号等特殊字符
            try:
                clean_paragraph = ''.join(c for c in paragraph if ord(c) < 65536)
                print(f"{i+1}. {clean_paragraph[:200]}...")
            except:
                print(f"{i+1}. [内容包含特殊字符，已跳过]")
    
    time.sleep(2)  # 避免请求过快

print("\n文章内容获取完成!")